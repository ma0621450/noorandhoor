"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, LayoutDashboard, Newspaper, Plus, X } from "lucide-react";
import logo from "@/public/svgs/logo.svg";
import { ADMIN_NAV } from "@/lib/admin/constants";
import { cx } from "@/lib/admin/utils";

const ICONS = {
  "/admin": LayoutDashboard,
  "/admin/properties": Building2,
  "/admin/properties/new": Plus,
  "/admin/blogs": Newspaper,
  "/admin/blogs/new": Plus,
};

function isActive(pathname, item) {
  if (item.match === "exact") return pathname === item.href;
  if (pathname === item.href) return true;
  if (!pathname.startsWith(`${item.href}/`)) return false;
  return pathname !== `${item.href}/new`;
}

export default function AdminSidebar({ open, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      ) : null}

      <aside
        className={cx(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-[#ba8a44]/20 bg-[#0c0c0c] transition-transform lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Link href="/admin" className="flex items-center gap-3" onClick={onClose}>
            <Image src={logo} alt="Noor and Hoor" width={72} height={48} />
          </Link>
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={onClose}
            className="text-white/60 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="px-5 pb-3 text-[11px] font-semibold uppercase tracking-[1.8px] text-white/35">
          Admin
        </p>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {ADMIN_NAV.map((item) => {
            const Icon = ICONS[item.href];
            const active = isActive(pathname, item);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cx(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                  item.indent ? "ml-4" : "",
                  active
                    ? "bg-[#ba8a44]/15 text-[#eec876]"
                    : "text-white/70 hover:bg-white/5 hover:text-white",
                )}
              >
                {Icon ? <Icon className="h-4 w-4" strokeWidth={1.75} /> : null}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <p className="px-5 py-4 text-[11px] leading-5 text-white/30">
          Frontend preview. Swap the data layer for Supabase when you are ready.
        </p>
      </aside>
    </>
  );
}
