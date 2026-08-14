"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

const GROUPS = [
  {
    label: "I am looking to:",
    options: ["Invest for High ROI", "Acquire a Luxury Residence"],
  },
  {
    label: "Preferred Insights:",
    options: ["Market Evaluation", "Developer Review"],
  },
  {
    label: "Contact:",
    options: ["Schedule a Video Call", "Request Documentation"],
  },
];

function Pill({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-[34px] rounded border px-4 text-xs font-medium tracking-[0.48px] text-[#F5F5F5] ${
        selected ? "border-[#E9C349] bg-[#E9C349]/10" : "border-[#E9C349]/40"
      }`}
    >
      {label}
    </button>
  );
}

export default function DevelopersLeadForm() {
  const [selected, setSelected] = useState({
    "I am looking to:": GROUPS[0].options[0],
    "Preferred Insights:": GROUPS[1].options[0],
    "Contact:": GROUPS[2].options[0],
  });

  return (
    <section className="section-full py-12 sm:py-14 lg:py-16">
      <div className="section-inner">
        <div className="rounded-[20px] bg-[#252525] px-4 py-[60px] sm:px-6">
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <h2 className="text-gold-gradient">Lead Generation</h2>
            <div className="section-divider" />
          </div>

          <form
            className="mx-auto flex w-full max-w-[576px] flex-col gap-5 rounded-2xl bg-[#1A1A1A] p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            {GROUPS.map((group) => (
              <div
                key={group.label}
                className="flex flex-col gap-3 sm:flex-row sm:items-start"
              >
                <p className="w-full shrink-0 text-sm font-medium text-[#E9C349] sm:w-[176px] sm:text-right">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.options.map((option) => (
                    <Pill
                      key={option}
                      label={option}
                      selected={selected[group.label] === option}
                      onClick={() =>
                        setSelected((current) => ({
                          ...current,
                          [group.label]: option,
                        }))
                      }
                    />
                  ))}
                </div>
              </div>
            ))}

            <Button
              type="submit"
              className="mt-2 h-11 w-full rounded-[10px] text-sm tracking-[1.68px]"
            >
              Submit Inquiry for Consultation
            </Button>
            <p className="text-center text-xs text-[#F5F5F5]">
              Certified Local Property Advisor 100% Secured
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
