export default function StatCard({ label, value, hint }) {
  return (
    <article className="rounded-2xl border border-[#ba8a44]/25 bg-[#161616] p-5">
      <p className="text-xs font-medium uppercase tracking-[1.6px] text-white/50">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold text-[#eec876]">{value}</p>
      {hint ? <p className="mt-2 text-xs text-white/45">{hint}</p> : null}
    </article>
  );
}
