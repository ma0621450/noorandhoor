"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, LogOut, Menu } from "lucide-react";
import { useAdminAuth } from "@/components/admin/providers/AdminAuthProvider";
import AdminButton from "@/components/admin/ui/AdminButton";

export default function AdminTopbar({ onMenu }) {
  const { user, logout } = useAdminAuth();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-white/8 bg-[#111]/95 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open sidebar"
          onClick={onMenu}
          className="rounded-lg p-2 text-white/80 hover:bg-white/8 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-sm font-medium text-white">{user?.name}</p>
          <p className="text-xs text-white/45">{user?.email}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/" target="_blank" rel="noreferrer">
          <AdminButton size="sm" variant="secondary">
            <ExternalLink className="h-3.5 w-3.5" />
            View site
          </AdminButton>
        </Link>
        <AdminButton
          size="sm"
          variant="ghost"
          onClick={async () => {
            await logout();
            router.replace("/admin/login");
            router.refresh();
          }}
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </AdminButton>
      </div>
    </header>
  );
}
