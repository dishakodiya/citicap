import { NextResponse } from "next/server";
import dns from "dns/promises";
import net from "net";

type DnsEntry = { address: string; family: number };

type DebugResult = {
  host: string;
  port: number;
  dns?: DnsEntry[];
  dnsError?: { message?: string; code?: string };
  tcp?: { ok: boolean; ms: number; message?: string; code?: string };
};

function asError(value: unknown): Error | null {
  return value instanceof Error ? value : null;
}

function getErrorCode(err: Error | null) {
  const code = (err as unknown as { code?: unknown })?.code;
  return typeof code === "string" ? code : undefined;
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    return NextResponse.json(
      { ok: false, error: "DATABASE_URL missing" },
      { status: 500 },
    );
  }

  const u = new URL(url);
  const host = u.hostname;
  const port = Number(u.port || "5432");

  const result: DebugResult = { host, port };

  try {
    const entries = await dns.lookup(host, { all: true });
    result.dns = entries.map((e) => ({ address: e.address, family: e.family }));
  } catch (e) {
    const err = asError(e);
    result.dnsError = { message: err?.message, code: getErrorCode(err) };
  }

  const start = Date.now();
  try {
    await new Promise<void>((resolve, reject) => {
      const socket = net.createConnection({ host, port, timeout: 5000 });
      socket.on("connect", () => {
        socket.end();
        resolve();
      });
      socket.on("timeout", () => {
        socket.destroy(new Error("timeout"));
      });
      socket.on("error", reject);
    });

    result.tcp = { ok: true, ms: Date.now() - start };
  } catch (e) {
    const err = asError(e);
    result.tcp = {
      ok: false,
      ms: Date.now() - start,
      message: err?.message,
      code: getErrorCode(err),
    };
  }

  return NextResponse.json(result);
}
