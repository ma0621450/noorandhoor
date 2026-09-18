"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  buildPaymentPlanSummary,
  hasPaymentPlan,
} from "@/lib/admin/propertyPaymentPlan";

function formatMoney(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) return "";
  return `AED ${number.toLocaleString("en-AE", { maximumFractionDigits: 0 })}`;
}

function PhaseRow({ phase, open, onToggle, showAmount }) {
  const canExpand = phase.key === "construction" && phase.paymentCount > 1;

  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        type="button"
        onClick={canExpand ? onToggle : undefined}
        className={`flex w-full items-center gap-3 py-3.5 text-left ${
          canExpand ? "cursor-pointer" : "cursor-default"
        }`}
        aria-expanded={canExpand ? open : undefined}
      >
        {canExpand ? (
          <span className="inline-flex size-6 shrink-0 items-center justify-center rounded border border-white/15 text-white/60">
            <ChevronDown
              className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
            />
          </span>
        ) : (
          <span className="size-6 shrink-0" aria-hidden />
        )}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">{phase.label}</p>
          {canExpand ? (
            <p className="mt-0.5 text-xs text-white/45">
              {phase.paymentCount} payments
            </p>
          ) : null}
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-white">{phase.percent}%</p>
          {showAmount && phase.amount > 0 ? (
            <p className="mt-0.5 text-xs text-white/45">
              {formatMoney(phase.amount)}
            </p>
          ) : null}
        </div>
      </button>

      {canExpand && open ? (
        <ul className="mb-3 ml-9 space-y-2 border-l border-white/10 pl-4">
          {phase.rows.map((row) => (
            <li
              key={row.clientKey || row.id || `${row.label}-${row.percent}`}
              className="flex items-center justify-between gap-3 text-sm text-white/70"
            >
              <span>{row.label}</span>
              <span className="text-white/90">
                {row.percent}%
                {showAmount && row.amount > 0
                  ? ` · ${formatMoney(row.amount)}`
                  : ""}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function DetailPaymentPlan({
  milestones = [],
  totalPrice = 0,
}) {
  const summary = buildPaymentPlanSummary(milestones, totalPrice);
  const [openConstruction, setOpenConstruction] = useState(false);

  if (!hasPaymentPlan(milestones) || !summary) return null;

  const showAmount = Number(totalPrice) > 0;

  return (
    <section className="w-full bg-[#111111]">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-10 sm:py-12">
        <div className="w-full rounded-2xl border border-white/10 bg-[#161616] p-5 sm:p-6">
          <h2 className="m-0 text-lg font-semibold text-white">Payment plan</h2>

          <div className="mt-5 overflow-hidden rounded-full bg-white/10">
            <div className="flex h-3 w-full">
              {summary.phases.map((phase) => (
                <div
                  key={phase.key}
                  className="h-full"
                  style={{
                    width: `${phase.percent}%`,
                    backgroundColor: phase.color,
                  }}
                  title={`${phase.label} ${phase.percent}%`}
                />
              ))}
            </div>
          </div>

          <div className="mt-3 flex">
            {summary.phases.map((phase) => (
              <span
                key={`${phase.key}-label`}
                className="text-sm font-semibold text-white"
                style={{ width: `${phase.percent}%` }}
              >
                {phase.percent}%
              </span>
            ))}
          </div>

          <div className="mt-5 border-t border-white/10">
            {summary.phases.map((phase) => (
              <PhaseRow
                key={phase.key}
                phase={phase}
                open={openConstruction}
                onToggle={() => setOpenConstruction((value) => !value)}
                showAmount={showAmount}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
