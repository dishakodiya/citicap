"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock } from "lucide-react";
import Button from "@/components/ui/Button";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-cyan-500/50 focus:outline-none";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    const result = await signIn("credentials", {
      username: trimmedUser,
      password: trimmedPass,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(
        "Invalid username or password. Use admin / admin123 (no extra spaces). If this persists, run: npm run db:seed"
      );
      return;
    }

    if (!result?.ok) {
      setError("Login failed. Restart the dev server and try again.");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 pt-24 pb-20">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          {/* <Image
            src="/logo.png"
            alt="Citicap Logo"
            width={64}
            height={64}
            className="mx-auto mb-4 rounded-xl"
          /> */}
          <Image
            src="/logo.png"
            alt="Citicap Logo"
            width={140}
            height={45}
            className="mx-auto mb-4 object-contain"
          />
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="mt-1 text-sm text-slate-500">
            Authorized personnel only
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass space-y-5 rounded-2xl p-8">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            <Lock size={18} />
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <p className="text-center text-xs text-slate-400">
            Demo: admin / admin123
          </p>
        </form>
      </div>
    </div>
  );
}
