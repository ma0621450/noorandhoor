export default function OffPlanListedDate({ date = "27 June 2026" }) {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4">
      <p className="text-gold-gradient m-0 font-[family-name:var(--font-body)] text-xl font-semibold capitalize leading-12 sm:text-2xl">
        Listed Date {date}
      </p>
    </div>
  );
}
