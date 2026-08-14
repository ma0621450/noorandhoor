"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

const MIN = 1_000_000;
const MAX = 10_000_000;
const DEFAULT = 4_300_000;
const ROI_RATE = 0.18;

function formatAedShort(value) {
  const millions = value / 1_000_000;
  if (millions >= 1) return `AED ${millions.toFixed(1)}M`;
  return `AED ${Math.round(value / 1000)}K`;
}

export default function DevelopersInvestment() {
  const [amount, setAmount] = useState(DEFAULT);
  const fill = ((amount - MIN) / (MAX - MIN)) * 100;
  const roi = amount * ROI_RATE;

  return (
    <section className="section-full py-12 sm:py-14 lg:py-16">
      <div className="section-inner">
        <div className="rounded-[20px] bg-[#252525] px-4 py-12 sm:px-8 lg:px-16 lg:py-16">
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <h2 className="text-gold-gradient">Off-Plan Investment</h2>
            <div className="section-divider" />
          </div>

          <div className="mx-auto grid max-w-[1030px] grid-cols-1 gap-[30px] lg:grid-cols-2">
            <div className="flex flex-col gap-5 rounded-2xl bg-[#1A1A1A] p-8">
              <h3 className="detail-section-title m-0 text-center text-[22px] font-medium leading-[33px] text-[#E9C349]">
                ROI Dynamic
              </h3>
              <p className="flex items-center gap-3 text-xs tracking-[1.2px] text-[#F5F5F5]">
                [ SELECT INVESTMENT AMOUNT ]
                <span className="text-2xl text-[#D6A85E]">→</span>
              </p>

              <div>
                <input
                  type="range"
                  min={MIN}
                  max={MAX}
                  step={100000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  aria-label="Investment amount"
                  className="h-1 w-full cursor-pointer appearance-none rounded-full [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#E9C349] [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#E9C349]"
                  style={{
                    background: `linear-gradient(90deg, #E9C349 ${fill}%, #333333 ${fill}%)`,
                  }}
                />
                <div className="mt-2 flex justify-between text-xs text-[#F5F5F5]">
                  <span>Amount</span>
                  <span className="text-[#E9C349]">{formatAedShort(amount)}</span>
                  <span>Max</span>
                </div>
              </div>

              <p className="text-center text-xs text-[#F5F5F5]">
                Est. ROI:{" "}
                <span className="text-[#E9C349]">{formatAedShort(roi)}</span> / year
              </p>

              <Button
                variant="outline"
                className="mx-auto h-[34px] min-h-0 rounded border-[#E9C349] px-6 text-xs tracking-[1.2px] text-[#E9C349]"
              >
                [ View Projected ROI ]
              </Button>
            </div>

            <div className="flex flex-col justify-center gap-4 rounded-2xl bg-[#1A1A1A] p-8">
              <p className="text-xs font-normal uppercase tracking-[1.2px] text-[#E9C349]">
                Capitalizing on the Off-Plan Curve:
              </p>
              <h3 className="detail-section-title m-0 text-[30px] font-normal leading-[39px] text-white">
                Structural Wealth Generation
              </h3>
              <p className="text-sm leading-6 text-[#F5F5F5]">
                Get expert analysis on current market trends, opportunities, and
                strategic long-term planning for optimal growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
