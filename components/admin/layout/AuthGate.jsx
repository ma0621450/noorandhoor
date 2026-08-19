"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAdminAuth } from "@/components/admin/providers/AdminAuthProvider";
import AdminSplash from "@/components/admin/ui/AdminSplash";

export default function AuthGate({ children }) {
  const { user, isReady } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isReady || user) return;
    const next = encodeURIComponent(pathname || "/admin");
    router.replace(`/admin/login?next=${next}`);
  }, [isReady, user, router, pathname]);

  if (!isReady || !user) {
    return <AdminSplash label="Checking session" />;
  }

  return children;
}
