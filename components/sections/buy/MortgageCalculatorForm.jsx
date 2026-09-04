"use client";

import Button from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { MORTGAGE_FIELDS } from "@/lib/mortgageCalculator";

const FIELD_CLASS =
  "h-11 w-full rounded-lg border border-[#d1d5dc]/70 bg-[#111] px-4 text-sm text-[#f5f5f5] outline-none transition focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40";

export default function MortgageCalculatorForm({ values, onChange, onCalculate }) {
  return (
    <form
      className="flex w-full flex-col gap-3 rounded-[10px] bg-[#0e1112] p-5 shadow-[0_10px_15px_rgba(0,0,0,0.1)] sm:p-6"
      onSubmit={(event) => {
        event.preventDefault();
        onCalculate();
      }}
    >
      <div>
        <h3 className="text-gold-gradient text-lg font-medium">
          Mortgage Calculator
        </h3>
        <p className="mt-1 text-sm text-[#f5f5f5]/70">
          Select your details, then calculate to see Option 1.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {MORTGAGE_FIELDS.map((field) => (
          <label key={field.key} className="flex flex-col gap-1.5">
            <span className="text-xs font-medium uppercase tracking-[1.2px] text-[#f5f5f5]/55">
              {field.label}
            </span>
            <Select
              aria-label={field.label}
              className={FIELD_CLASS}
              value={values[field.key]}
              onChange={(event) => onChange(field.key, event.target.value)}
              options={field.options}
            />
          </label>
        ))}
      </div>

      <Button
        type="submit"
        className="mt-2 h-11 w-full rounded-xl text-sm font-semibold tracking-[1.2px]"
      >
        Calculate
      </Button>
    </form>
  );
}
