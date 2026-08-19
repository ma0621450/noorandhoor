import Link from "next/link";
import { Plus } from "lucide-react";
import AdminButton from "@/components/admin/ui/AdminButton";

export default function PageHeader({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="mb-1 text-xs font-medium uppercase tracking-[1.8px] text-[#eec876]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="admin-heading text-2xl font-semibold text-white sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
            {description}
          </p>
        ) : null}
      </div>

      {actionHref ? (
        <Link href={actionHref}>
          <AdminButton className="w-full sm:w-auto">
            <Plus className="h-4 w-4" strokeWidth={2} />
            {actionLabel}
          </AdminButton>
        </Link>
      ) : null}

      {onAction ? (
        <AdminButton className="w-full sm:w-auto" onClick={onAction}>
          {actionLabel}
        </AdminButton>
      ) : null}
    </div>
  );
}
