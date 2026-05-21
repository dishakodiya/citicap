"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to console so it shows up in Vercel function logs
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-4 pt-32 pb-20">
      <div className="glass rounded-2xl p-8">
        <h1 className="text-2xl font-bold">Application error</h1>
        <p className="mt-2 text-sm text-slate-600">
          A server-side exception occurred. If you are the admin, check the Vercel logs.
        </p>
        {error.digest ? (
          <p className="mt-3 text-xs text-slate-500">Digest: {error.digest}</p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            onClick={() => reset()}
          >
            Try again
          </button>
          <Link
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900"
            href="/"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
