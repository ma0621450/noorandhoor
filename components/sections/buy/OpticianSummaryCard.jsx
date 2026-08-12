import Button from "@/components/ui/Button";

const ROWS = [
  { label: "Calendar Price", value: "Price" },
  { label: "Down Payment", value: "20.4 %" },
  { label: "Loan Term", value: "25 Years" },
  { label: "Interest Rate", value: "4.24 %" },
  { label: "Interest Bee | Estimated Fee", value: "$5,500" },
  { label: "Borrowing", value: "$106,290" },
  { label: "Monthly Payment", value: "$425.00", strong: true },
];

export default function OpticianSummaryCard() {
  return (
    <div className="w-full max-w-[357px] rounded-[10px] bg-[#0e1112] p-6 shadow-[0_10px_15px_rgba(0,0,0,0.1)]">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-full border-[1.6px] border-[#bc8741]">
          <div className="size-4 rounded-full border-[1.6px] border-[#bc8741]" />
        </div>
        <p className="bg-gradient-to-r from-[#bc8741] to-[#d6a85e] bg-clip-text text-xl text-transparent">
          Optician
        </p>
      </div>

      <div className="mb-4 flex flex-col py-6">
        {ROWS.map((row, index) => (
          <div
            key={row.label}
            className={`flex items-start justify-between gap-3 py-3 text-sm text-[#f5f5f5] ${
              index < ROWS.length - 1 ? "border-b border-[#e5e7eb]/70" : ""
            } ${row.strong ? "font-medium" : "font-normal"}`}
          >
            <span className="max-w-[147px] leading-5">{row.label}</span>
            <span className="shrink-0 text-right leading-5">{row.value}</span>
          </div>
        ))}
      </div>

      <Button
        type="button"
        className="h-10 w-full rounded-xl text-base font-medium normal-case tracking-normal"
      >
        New Comparison
      </Button>
    </div>
  );
}
