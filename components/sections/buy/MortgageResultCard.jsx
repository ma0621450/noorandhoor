"use client";

import Button from "@/components/ui/Button";
import { formatAed } from "@/lib/mortgageCalculator";

function SectionTitle({ children }) {
  return (
    <p className="py-3 text-center text-[11px] font-semibold uppercase tracking-[1.6px] text-[#eec876]">
      {children}
    </p>
  );
}

function Row({ label, value, strong = false, last = false }) {
  return (
    <div
      className={`flex items-start justify-between gap-3 py-2.5 text-sm text-[#f5f5f5] ${
        last ? "" : "border-b border-white/15"
      } ${strong ? "font-semibold" : "font-normal"}`}
    >
      <span className="leading-5 text-[#f5f5f5]/85">{label}</span>
      <span className="shrink-0 text-right leading-5">{value}</span>
    </div>
  );
}

export default function MortgageResultCard({ result, onRedo }) {
  const { inputs } = result;

  return (
    <div className="flex h-full w-full flex-col rounded-[10px] bg-[#0e1112] p-5 shadow-[0_10px_15px_rgba(0,0,0,0.1)] sm:p-6">
      <div className="mb-1 flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-full border-[1.6px] border-[#bc8741]">
          <div className="size-4 rounded-full border-[1.6px] border-[#bc8741]" />
        </div>
        <p className="bg-gradient-to-r from-[#bc8741] to-[#d6a85e] bg-clip-text text-xl text-transparent">
          Option 1
        </p>
      </div>

      <SectionTitle>Property Details</SectionTitle>
      <p className="border-b border-white/15 pb-3 text-center text-sm text-[#f5f5f5]">
        {result.propertyLabel}
      </p>

      <div className="pt-1">
        <Row
          label="Price of Property"
          value={result.priceRangeLabel || formatAed(result.price)}
          strong
          last
        />
      </div>

      <SectionTitle>Upfront Payment</SectionTitle>
      <Row
        label="Down Payment"
        value={`${formatAed(result.downPaymentAmount)} (${result.downPaymentRangeLabel || `${result.downPercent}%`})`}
      />
      <Row label="Loan Term" value={`${result.years} Years`} />
      <Row
        label="Interest Rate"
        value={`${Number(inputs.interestRate).toFixed(2)}%`}
      />
      <Row label="Processing Fee" value={formatAed(result.processingFee)} />
      <Row label="Borrowing" value={formatAed(result.loanAmount)} />
      <Row
        label="Monthly Payment"
        value={formatAed(result.monthlyPayment, true)}
        strong
        last
      />

      <p className="mt-4 text-center text-[11px] leading-4 text-[#f5f5f5]/45">
        Estimate only. Final terms depend on bank approval and property
        valuation.
      </p>

      <div className="mt-auto pt-5">
        <Button
          type="button"
          onClick={onRedo}
          className="h-11 w-full rounded-xl text-sm font-semibold tracking-[1.2px]"
        >
          Redo
        </Button>
      </div>
    </div>
  );
}
