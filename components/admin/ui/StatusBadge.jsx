import { cx } from "@/lib/admin/utils";

const STYLES = {
  available: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  reserved: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  sold: "border-white/15 bg-white/8 text-white/70",
  published: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  draft: "border-white/15 bg-white/8 text-white/70",
  featured: "border-[#ba8a44]/40 bg-[#ba8a44]/15 text-[#eec876]",
};

export default function StatusBadge({ status }) {
  const key = String(status || "").toLowerCase();
  return (
    <span
      className={cx(
        "inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.8px]",
        STYLES[key] || STYLES.draft,
      )}
    >
      {status}
    </span>
  );
}
