"use client";

import { useState } from "react";
import CaretDown from "@/components/ui/CaretDown";
import {
  INSTALLMENT_COUNT,
  formatUsd,
  buildInstallments,
} from "@/components/sections/offplan/offPlanPayment";

const PREVIEW_COUNT = 7;

export default function OffPlanInstallmentSchedule({ price }) {
  const [expanded, setExpanded] = useState(false);
  const rows = buildInstallments(price);
  const visible = expanded ? rows : rows.slice(0, PREVIEW_COUNT);

  return (
    <section className="w-full bg-[#111111] pb-12 sm:pb-16">
      <div className="mx-auto flex w-full max-w-[1024px] flex-col items-center px-4">
        <h2 className="text-gold-gradient m-0 text-center text-[clamp(1.75rem,4vw,2.8rem)] font-semibold normal-case leading-[1.15] lg:text-[45px] lg:leading-[52px]">
          Every Installment, Laid Out
        </h2>
        <p className="mt-3 max-w-[672px] text-center text-sm leading-[23px] text-[#F5F5F5]">
          Based on your selected price of{" "}
          <span className="text-gold-gradient font-medium">{formatUsd(price)}</span>
          . Adjust the calculator above to update this schedule.
        </p>

        <div className="mt-14 w-full overflow-hidden rounded-xl border border-[rgba(184,147,90,0.22)] bg-[#FAF6EE]">
          <p className="bg-[#FAF6EE] px-4 pt-3 text-center text-xs text-[#7A6E5F] md:hidden">
            Swipe sideways to view all columns
          </p>
          <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="bg-[#111111]">
                  {["#", "Due Date", "Amount", "Balance Remaining"].map((col) => (
                    <th
                      key={col}
                      className={`px-6 py-3.5 text-[11.2px] font-medium uppercase tracking-[0.9px] ${
                        col === "Amount" || col === "Balance Remaining"
                          ? "text-right"
                          : ""
                      } ${col === "#" ? "sticky left-0 z-10 bg-[#111111]" : ""}`}
                    >
                      <span className="text-gold-gradient">{col}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map((row, i) => {
                  const isDown = Boolean(row.badge);
                  const stripe = i % 2 === 0 ? "bg-[#F5F5F5]" : "bg-[#FAF6EE]";
                  return (
                    <tr key={row.id} className={stripe}>
                      <td
                        className={`sticky left-0 z-10 px-6 py-4 text-[12.8px] ${stripe} ${
                          isDown ? "font-medium text-[#B8935A]" : "text-[#7A6E5F]"
                        }`}
                      >
                        {row.index}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={
                            isDown
                              ? "font-medium text-[#1C1713]"
                              : "font-normal text-[#111111]"
                          }
                        >
                          {row.date}
                        </span>
                        {row.badge && (
                          <span className="btn-gold ml-3 inline-flex rounded-lg px-2 py-0.5 text-xs font-normal text-[#F5F5F5]">
                            {row.badge}
                          </span>
                        )}
                      </td>
                      <td
                        className={`px-6 py-4 text-right text-sm tabular-nums ${
                          isDown
                            ? "font-medium text-gold-gradient"
                            : "text-[#111111]"
                        }`}
                      >
                        {formatUsd(row.amount)}
                      </td>
                      <td className="text-gold-gradient px-6 py-4 text-right text-sm tabular-nums">
                        {formatUsd(row.remaining)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            className="flex w-full items-center justify-center gap-2 bg-[#F5F5F5] py-4 text-sm font-medium text-[#111111]"
          >
            {expanded
              ? "Show fewer installments"
              : `Show all ${INSTALLMENT_COUNT} installments`}
            <CaretDown open={expanded} className="text-[#111111]" />
          </button>
        </div>
      </div>
    </section>
  );
}
