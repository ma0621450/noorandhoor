"use client";

import { useMemo, useState } from "react";
import MortgageCalculatorForm from "@/components/sections/buy/MortgageCalculatorForm";
import MortgageResultCard from "@/components/sections/buy/MortgageResultCard";
import PreApprovalForm from "@/components/sections/buy/PreApprovalForm";
import {
  DEFAULT_MORTGAGE_INPUTS,
  calculateMortgage,
  formatAed,
} from "@/lib/mortgageCalculator";

export default function FinancialArchitecture() {
  const [inputs, setInputs] = useState(DEFAULT_MORTGAGE_INPUTS);
  const [result, setResult] = useState(null);

  const estimatedPayment = useMemo(
    () => (result ? formatAed(result.monthlyPayment, true) : ""),
    [result],
  );

  function handleChange(key, value) {
    setInputs((current) => ({ ...current, [key]: value }));
  }

  function handleCalculate() {
    setResult(calculateMortgage(inputs));
  }

  function handleRedo() {
    setResult(null);
  }

  return (
    <section className="section-full py-12 sm:py-14 lg:py-16">
      <div className="section-inner">
        <div className="w-full rounded-[20px] bg-[#252525] px-3 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
          <h2 className="text-gold-gradient text-center">
            Plan Your Property Financing
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-[#f5f5f5]/70 sm:text-base">
            {result
              ? "Review Option 1, then submit a pre-approval request."
              : "Enter your details to estimate your monthly mortgage payments and click calculate."}
          </p>

          {!result ? (
            <div className="mx-auto mt-10 max-w-[520px] lg:mt-12">
              <MortgageCalculatorForm
                values={inputs}
                onChange={handleChange}
                onCalculate={handleCalculate}
              />
            </div>
          ) : (
            <div className="mx-auto mt-10 grid max-w-[920px] items-stretch gap-8 lg:mt-12 lg:grid-cols-2">
              <MortgageResultCard result={result} onRedo={handleRedo} />
              <PreApprovalForm estimatedPayment={estimatedPayment} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
