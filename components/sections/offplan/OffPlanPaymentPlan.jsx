"use client";

import { useEffect, useMemo, useState } from "react";
import { Percent, FileCheck } from "lucide-react";
import OffPlanInstallmentSchedule from "@/components/sections/offplan/OffPlanInstallmentSchedule";
import {
  formatMoney,
  getPaymentBreakdown,
  paymentSliderBounds,
  resolvePaymentPlan,
} from "@/components/sections/offplan/offPlanPayment";

export default function OffPlanPaymentPlan({
  defaultPrice,
  downPercent,
  installments,
  startDate,
}) {
  const planConfig = useMemo(
    () => ({ downPercent, installments, startDate }),
    [downPercent, installments, startDate],
  );
  const plan = useMemo(() => resolvePaymentPlan(planConfig), [planConfig]);
  const bounds = useMemo(
    () => paymentSliderBounds(defaultPrice),
    [defaultPrice],
  );

  const [price, setPrice] = useState(bounds.defaultPrice);

  useEffect(() => {
    setPrice(bounds.defaultPrice);
  }, [bounds.defaultPrice]);

  const { downPayment, financed, monthly } = getPaymentBreakdown(
    price,
    planConfig,
  );
  const fill =
    bounds.max === bounds.min
      ? 100
      : ((price - bounds.min) / (bounds.max - bounds.min)) * 100;

  return (
    <>
      <section className="w-full bg-[#111111] py-12 sm:py-16">
        <div className="mx-auto flex w-full max-w-[1170px] flex-col items-center px-4">
          <div className="mb-10 flex flex-col items-center gap-4 text-center">
            <p className="text-xs font-normal uppercase leading-[26px] text-[#F5F5F5]">
              Payment calculator
            </p>
            <h2 className="text-gold-gradient m-0">Payment Plan</h2>
          </div>

          <div className="grid w-full max-w-[1024px] grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="flex flex-col rounded-xl border border-[rgba(184,147,90,0.22)] p-8">
              <p className="text-sm font-medium tracking-[0.42px] text-[#F5F5F5]">
                Property Price
              </p>
              <p className="text-gold-gradient mt-2 font-[family-name:var(--font-heading)] text-4xl font-extrabold tracking-[-0.9px]">
                {formatMoney(price)}
              </p>

              <div className="mt-8">
                <input
                  type="range"
                  min={bounds.min}
                  max={bounds.max}
                  step={bounds.step}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  aria-label="Property price"
                  className="h-1 w-full cursor-pointer appearance-none rounded-full [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#111] [&::-webkit-slider-thumb]:bg-[#D7AC60] [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#111] [&::-moz-range-thumb]:bg-[#D7AC60]"
                  style={{
                    background: `linear-gradient(90deg, #D7AC60 ${fill}%, #E8DFC9 ${fill}%)`,
                  }}
                />
                <div className="mt-2 flex justify-between text-xs">
                  <span className="text-gold-gradient">
                    {formatMoney(bounds.min)}
                  </span>
                  <span className="text-gold-gradient">
                    {formatMoney(bounds.max)}
                  </span>
                </div>
              </div>

              <div className="mt-8 border-t border-[rgba(184,147,90,0.22)] pt-6">
                <p className="text-gold-gradient text-xs font-normal uppercase tracking-[1.2px]">
                  Financing Breakdown
                </p>
                <dl className="mt-5 flex flex-col gap-4">
                  {[
                    ["Property Price", formatMoney(price)],
                    [
                      `Down Payment (${Math.round(plan.downPercent)}%)`,
                      formatMoney(downPayment),
                    ],
                    [
                      `Financed Amount (${Math.round(100 - plan.downPercent)}%)`,
                      formatMoney(financed),
                    ],
                    ["Duration", `${plan.installments} months`],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4"
                    >
                      <dt className="text-gold-gradient text-sm font-normal">
                        {label}
                      </dt>
                      <dd className="text-gold-gradient m-0 text-sm font-medium">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="rounded-xl bg-[#1C1713] p-8">
                <p className="text-xs font-normal uppercase tracking-[1.2px] text-[#F5F5F5]">
                  Monthly Installment
                </p>
                <p className="text-gold-gradient mt-3 font-[family-name:var(--font-heading)] text-4xl font-extrabold leading-none sm:text-5xl">
                  {formatMoney(monthly)}
                </p>
                <p className="mt-1 text-sm text-[#F5F5F5]">
                  per month × {plan.installments} installments
                </p>
                <p className="mt-6 border-t border-[rgba(245,239,227,0.12)] pt-5 text-xs leading-4 text-[#F5F5F5]">
                  All installments are fixed. No variable rates, no surprises.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <BenefitCard
                  icon={Percent}
                  title="Zero Interest Financing"
                  body="Our payment plan carries no interest charges. You pay only the principal, split evenly across the term."
                />
                <BenefitCard
                  icon={FileCheck}
                  title="Legally Secured Agreement"
                  body="Every installment plan is backed by a notarized purchase agreement for your protection."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <OffPlanInstallmentSchedule price={price} plan={planConfig} />
    </>
  );
}

function BenefitCard({ icon: Icon, title, body }) {
  return (
    <div className="flex flex-col rounded-xl border border-[rgba(184,147,90,0.22)] p-6">
      <div className="flex items-center gap-3">
        <Icon className="h-6 w-6 shrink-0 text-[#B8935A]" strokeWidth={1.5} />
        <p className="text-gold-gradient m-0 text-sm font-medium leading-5">
          {title}
        </p>
      </div>
      <p className="mt-2 text-sm leading-[23px] text-[#F5F5F5]">{body}</p>
    </div>
  );
}
