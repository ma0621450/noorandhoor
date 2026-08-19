export default function AdminSplash({ label = "Loading admin" }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#111]">
      <div className="text-center">
        <div className="mx-auto size-10 animate-spin rounded-full border-2 border-[#ba8a44]/20 border-t-[#eec876]" />
        <p className="mt-4 text-sm text-white/50">{label}</p>
      </div>
    </div>
  );
}
