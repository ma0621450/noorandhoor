import Link from "next/link";
import AdminButton from "@/components/admin/ui/AdminButton";

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-[#141414] px-6 py-16 text-center">
      <h2 className="admin-heading text-lg font-semibold text-white">{title}</h2>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm text-white/55">{description}</p>
      ) : null}
      {actionHref ? (
        <Link href={actionHref} className="mt-6 inline-flex">
          <AdminButton>{actionLabel}</AdminButton>
        </Link>
      ) : null}
      {onAction ? (
        <AdminButton className="mt-6" onClick={onAction}>
          {actionLabel}
        </AdminButton>
      ) : null}
    </div>
  );
}
