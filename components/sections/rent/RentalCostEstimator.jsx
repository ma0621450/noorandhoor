"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import Button from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import {
  DEFAULT_RENTAL_COST_INPUTS,
  RENTAL_COST_FIELDS,
  calculateRentalCost,
} from "@/lib/rentalCostCalculator";

const FIELD_CLASS =
  "h-[38px] w-full rounded border border-[#d1d5dc] bg-transparent px-4 text-sm text-[#f5f5f5] outline-none transition focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40";

const COST_TIPS = [
  "Security deposits are usually 5% of the annual rent for unfurnished homes.",
  "Agency fees are typically charged once at move-in, not every month.",
  "More cheques can ease cash flow, but some landlords prefer fewer payments.",
];

export default function RentalCostEstimator() {
  const [inputs, setInputs] = useState(DEFAULT_RENTAL_COST_INPUTS);
  const [result, setResult] = useState(null);

  function handleChange(key, value) {
    setInputs((current) => ({ ...current, [key]: value }));
  }

  if (result) {
    return (
      <div className="flex h-full w-full flex-col rounded-[10px] bg-[#0e1112] p-6 shadow-[0_10px_15px_rgba(0,0,0,0.1)]">
        <div className="mb-2 flex items-center gap-2">
          <Calculator className="h-8 w-8 shrink-0 text-[#bc8741]" strokeWidth={1.5} />
          <p className="bg-gradient-to-r from-[#bc8741] to-[#d6a85e] bg-clip-text text-xl text-transparent">
            Rental Cost Estimator
          </p>
        </div>

        <p className="mb-4 text-sm text-[#f5f5f5]/70">
          Estimated move-in and monthly costs based on your selections.
        </p>

        <div className="flex flex-1 flex-col py-2">
          {result.rows.map((row, index) => (
            <div
              key={row.label}
              className={`flex items-start justify-between gap-3 py-3 text-sm text-[#f5f5f5] ${
                index < result.rows.length - 1
                  ? "border-b border-[#e5e7eb]/20"
                  : ""
              } ${row.strong ? "font-semibold text-[#eec876]" : "font-normal"}`}
            >
              <span className="max-w-[160px] leading-5">{row.label}</span>
              <span className="shrink-0 text-right leading-5">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setResult(null)}
            className="h-12 w-full !rounded-xl text-sm font-medium tracking-[1.2px]"
          >
            Recalculate
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="flex h-full w-full flex-col rounded-[10px] bg-[#0e1112] p-6 shadow-[0_10px_15px_rgba(0,0,0,0.1)]"
      onSubmit={(event) => {
        event.preventDefault();
        setResult(calculateRentalCost(inputs));
      }}
    >
      <div className="mb-2 flex items-center gap-2">
        <Calculator className="h-8 w-8 shrink-0 text-[#bc8741]" strokeWidth={1.5} />
        <p className="bg-gradient-to-r from-[#bc8741] to-[#d6a85e] bg-clip-text text-xl text-transparent">
          Rental Cost Estimator
        </p>
      </div>

      <p className="mb-5 text-sm text-[#f5f5f5]/70">
        Select your rental details, then estimate total move-in cost.
      </p>

      <div className="flex flex-col gap-4">
        {RENTAL_COST_FIELDS.map((field) => (
          <label key={field.key} className="flex flex-col gap-1">
            <span className="text-sm font-medium text-[#f5f5f5]">
              {field.label}
            </span>
            <Select
              aria-label={field.label}
              className={FIELD_CLASS}
              value={inputs[field.key]}
              onChange={(event) => handleChange(field.key, event.target.value)}
              options={field.options}
            />
          </label>
        ))}
      </div>

      <div className="mt-5 flex flex-1 flex-col justify-end">
        <div className="rounded-xl border border-[#ba8a44]/35 bg-[#151515] p-4">
          <p className="text-xs font-semibold uppercase tracking-[1.2px] text-[#eec876]">
            Move-in tips
          </p>
          <ul className="mt-3 space-y-2.5">
            {COST_TIPS.map((tip) => (
              <li
                key={tip}
                className="flex gap-2 text-sm leading-5 text-[#f5f5f5]/75"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ba8a44]" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <Button
          type="submit"
          className="h-12 w-full !rounded-xl text-sm font-medium tracking-[1.2px]"
        >
          Estimate Costs
        </Button>
      </div>
    </form>
  );
}
