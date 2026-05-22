import { NextResponse } from "next/server";
import net from "net";
import dns from "dns/promises";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    return NextResponse.json({ ok: false, error: "DATABASE_URL missing" }, { status: 500 });
  }

  const u = new URL(url);
  const host = u.hostname;
  const port = Number(u.port || "5432");

  const result: any = { host, port };

  try {
    result.dns = await dns.lookup(host, { all: true });
  } catch (e: any) {
    result.dnsError = { message: e?.message, code: e?.code };
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
  } catch (e: any) {
    result.tcp = { ok: false, ms: Date.now() - start, message: e?.message, code: e?.code };
  }

  return NextResponse.json(result);
}
