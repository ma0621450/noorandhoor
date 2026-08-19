import { cx } from "@/lib/admin/utils";

const SIZE = {
  md: "min-h-11 px-4 text-sm",
  sm: "min-h-9 px-3 text-xs",
  icon: "size-9 p-0",
};

const VARIANT = {
  primary:
    "bg-gradient-to-r from-[#bc8741] to-[#d6a85e] text-white hover:brightness-110",
  secondary:
    "border border-[#ba8a44]/70 bg-transparent text-white hover:bg-[#ba8a44]/15",
  ghost: "text-white/80 hover:bg-white/8 hover:text-white",
  danger:
    "border border-red-500/30 bg-red-500/10 text-red-200 hover:bg-red-500/20",
};

export default function AdminButton({
  children,
  className = "",
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-wide transition disabled:cursor-not-allowed disabled:opacity-50",
        SIZE[size],
        VARIANT[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
