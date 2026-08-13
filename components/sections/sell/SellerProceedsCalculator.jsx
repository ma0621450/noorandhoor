import Button from "@/components/ui/Button";

const ROWS = [
  { label: "Property Sale Estimator", value: "value" },
  { label: "Estimated Property Value", value: "$850,000" },
  { label: "Agent Commission", value: "2.0%" },
  { label: "Transfer & Legal Fees", value: "$4,500" },
  { label: "Marketing Costs", value: "$1,200" },
  { label: "Outstanding Mortgage", value: "$320,000" },
  { label: "Estimated Net Proceeds", value: "$507,300", strong: true },
];

export default function SellerProceedsCalculator() {
  return (
    <div className="w-full max-w-[357px] rounded-[10px] bg-[#0e1112] p-6 shadow-[0_10px_15px_rgba(0,0,0,0.1)]">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-full border-[1.6px] border-[#bc8741]">
          <div className="size-4 rounded-full border-[1.6px] border-[#bc8741]" />
        </div>
        <p className="bg-gradient-to-r from-[#bc8741] to-[#d6a85e] bg-clip-text text-xl text-transparent">
          Seller Proceeds Calculator
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
            <span className="max-w-[180px] leading-5">{row.label}</span>
            <span className="shrink-0 text-right leading-5">{row.value}</span>
          </div>
        ))}
      </div>

      <Button
        type="button"
        className="h-10 w-full rounded-xl text-base font-medium normal-case tracking-normal"
      >
        Calculate Seller Returns
      </Button>
    </div>
  );
}
