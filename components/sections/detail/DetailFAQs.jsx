"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { DETAIL_FAQS } from "@/components/sections/detail/detailData";

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#ba8a44]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-[#ba8a44]/10 sm:px-6 sm:py-5"
      >
        <span className="text-sm font-semibold text-white sm:text-base">
          {faq.question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#ba8a44] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          strokeWidth={2}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 sm:px-6 sm:pb-5">
          <p className="text-sm leading-relaxed text-white">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function DetailFAQs() {
  const [openId, setOpenId] = useState(DETAIL_FAQS[0].id);

  return (
    <section className="section-full bg-[#111] py-10 sm:py-14">
      <div className="mx-auto mb-10 flex w-full max-w-[1280px] flex-col items-center gap-4 px-4 text-center sm:px-6 lg:px-10">
        <h3 className="section-sub-heading !tracking-widest">
          Frequently ask Questions
        </h3>
        <h2 className="text-gold-gradient">FAQs</h2>
        <div className="section-divider" />
        <p className="text-base font-normal text-white sm:text-lg">
          Find answers to common questions about Noor &amp; Hoor
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 px-4 sm:gap-4 sm:px-6">
        {DETAIL_FAQS.map((faq) => (
          <FAQItem
            key={faq.id}
            faq={faq}
            isOpen={openId === faq.id}
            onToggle={() =>
              setOpenId((current) => (current === faq.id ? null : faq.id))
            }
          />
        ))}
      </div>
    </section>
  );
}
