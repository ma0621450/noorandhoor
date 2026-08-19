"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import logo from "@/public/svgs/logo.svg";
import { useAdminAuth } from "@/components/admin/providers/AdminAuthProvider";
import AdminButton from "@/components/admin/ui/AdminButton";
import { TextField } from "@/components/admin/ui/Fields";
import AdminSplash from "@/components/admin/ui/AdminSplash";
import { safeAdminNext } from "@/lib/admin/paths";

export default function LoginForm() {
  const { user, isReady, login } = useAdminAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const nextPath = safeAdminNext(searchParams.get("next"));

  useEffect(() => {
    if (isReady && user) {
      router.replace(nextPath);
      router.refresh();
    }
  }, [isReady, user, router, nextPath]);

  if (!isReady || user) {
    return <AdminSplash label="Opening admin" />;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.replace(nextPath);
    router.refresh();
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#111] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-[#ba8a44]/30 bg-[#161616] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
        <div className="mb-8 text-center">
          <Image src={logo} alt="Noor and Hoor" width={96} height={64} className="mx-auto" />
          <h1 className="admin-heading mt-5 text-2xl font-semibold text-white">
            Admin sign in
          </h1>
          <p className="mt-2 text-sm text-white/55">
            Sign in with your admin email and password.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <TextField
            id="email"
            label="Email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error ? <p className="text-sm text-red-300">{error}</p> : null}

          <AdminButton type="submit" className="w-full uppercase tracking-[1.2px]" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign in"}
          </AdminButton>
        </form>
      </div>
    </div>
  );
}
