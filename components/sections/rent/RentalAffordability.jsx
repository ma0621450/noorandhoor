import { Calculator } from "lucide-react";
import Button from "@/components/ui/Button";

const COST_ROWS = [
  { label: "Calendar Price", value: "Price" },
  { label: "Monthly Rent", value: "AED 8,500" },
  { label: "Security Deposit", value: "5%" },
  { label: "Contract Duration", value: "12 Months" },
  { label: "Agency Fee", value: "5%" },
  { label: "Total Move-In Cost", value: "AED 9,175" },
  { label: "Monthly Commitment", value: "AED 8,500", strong: true },
];

const INPUT_CLASS =
  "h-[38px] w-full rounded border border-[#d1d5dc] bg-transparent px-4 text-sm text-[#f5f5f5] placeholder:text-[#f5f5f5]/50 outline-none transition focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40";

function CostEstimator() {
  return (
    <div className="w-full max-w-[357px] rounded-[10px] bg-[#0e1112] p-6 shadow-[0_10px_15px_rgba(0,0,0,0.1)]">
      <div className="mb-2 flex items-center gap-2">
        <Calculator className="h-8 w-8 text-[#bc8741]" strokeWidth={1.5} />
        <p className="bg-gradient-to-r from-[#bc8741] to-[#d6a85e] bg-clip-text text-xl text-transparent">
          Rental Cost Estimator
        </p>
      </div>

      <div className="mb-4 flex flex-col py-6">
        {COST_ROWS.map((row, index) => (
          <div
            key={row.label}
            className={`flex items-start justify-between gap-3 py-3 text-sm text-[#f5f5f5] ${
              index < COST_ROWS.length - 1 ? "border-b border-[#e5e7eb]/70" : ""
            } ${row.strong ? "font-medium" : "font-normal"}`}
          >
            <span className="max-w-[160px] leading-5">{row.label}</span>
            <span className="shrink-0 text-right leading-5">{row.value}</span>
          </div>
        ))}
      </div>

      <Button
        type="button"
        className="h-10 w-full rounded-xl text-base font-medium normal-case tracking-normal"
      >
        Estimate Costs
      </Button>
    </div>
  );
}

function EligibilityForm() {
  return (
    <form className="w-full max-w-[357px] rounded-[10px] bg-[#0e1112] p-6 shadow-[0_10px_15px_rgba(0,0,0,0.1)]">
      <h3 className="text-gold-gradient text-lg font-medium">
        Rental Eligibility Check
      </h3>
      <p className="mt-2 text-sm text-[#f5f5f5]">
        Check rental affordability and get property recommendations.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <select className={INPUT_CLASS} defaultValue="" aria-label="Property type">
          <option value="" disabled>
            Select option
          </option>
          <option>Apartment</option>
          <option>Villa</option>
          <option>Townhouse</option>
        </select>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#f5f5f5]">Monthly Income</span>
          <input type="text" placeholder="Income" className={INPUT_CLASS} />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#f5f5f5]">Employment Status</span>
          <input type="text" placeholder="Status" className={INPUT_CLASS} />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#f5f5f5]">Preferred Location</span>
          <input type="text" placeholder="Neighborhood or city" className={INPUT_CLASS} />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#f5f5f5]">Budget Range</span>
          <input type="text" placeholder="e.g. AED 8,000 - 15,000" className={INPUT_CLASS} />
        </label>

        <Button
          type="submit"
          className="mt-2 h-12 w-full !rounded-xl text-sm font-medium !normal-case !tracking-normal"
        >
          Check Rental Eligibility
        </Button>
      </div>
    </form>
  );
}

export default function RentalAffordability() {
  return (
    <section className="section-full py-12 sm:py-14 lg:py-16">
      <div className="section-inner">
        <div className="w-full rounded-[20px] bg-[#252525] px-4 py-12 sm:px-8 lg:px-16 lg:py-16">
          <h2 className="text-gold-gradient text-center">
            Rental Affordability Calculator
          </h2>

          <div className="mx-auto mt-10 flex max-w-[876px] flex-col items-center justify-center gap-8 lg:mt-12 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <CostEstimator />
            <EligibilityForm />
          </div>
        </div>
      </div>
    </section>
  );
}
