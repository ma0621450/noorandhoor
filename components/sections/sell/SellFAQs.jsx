"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    id: 1,
    question: "How do I determine the value of my property?",
    answer:
      "Our experts use recent market transactions, local demand trends, and your property’s condition to provide an accurate valuation.",
  },
  {
    id: 2,
    question: "How long does it take to sell a property?",
    answer:
      "Timelines vary by location, pricing, and demand. Well-priced homes in active communities often attract serious buyers within weeks.",
  },
  {
    id: 3,
    question: "What documents do I need to sell my property?",
    answer:
      "Typically you’ll need title deed, Emirates ID/passport, NOC (if applicable), service charge clearance, and tenancy details if occupied.",
  },
  {
    id: 4,
    question: "Can I sell my property if it still has a mortgage?",
    answer:
      "Yes. We coordinate with your bank for liability clearance and ensure the outstanding mortgage is settled at transfer.",
  },
  {
    id: 5,
    question: "What are the costs involved in selling a property?",
    answer:
      "Common costs include agency commission, transfer fees, trustee fees, and any outstanding service charges or mortgage liabilities.",
  },
  {
    id: 6,
    question: "Should I renovate my property before selling?",
    answer:
      "Light refreshes can help, but major renovations aren’t always necessary. We’ll advise based on buyer demand and expected return.",
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#d4af37] bg-[#111] shadow-md">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-5 text-left transition hover:bg-[#ba8a44]/10 sm:px-8 sm:py-6"
      >
        <span className="text-base font-bold text-white sm:text-lg">
          {faq.question}
        </span>
        <ChevronDown
          className={`h-6 w-6 shrink-0 text-[#d4af37] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-5 sm:px-8 sm:pb-6">
          <p className="text-sm leading-[26px] text-[#f5f5f5] sm:text-base">
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function SellFAQs() {
  const [openId, setOpenId] = useState(FAQS[0].id);

  return (
    <section className="section-container">
      <div className="mb-10 flex flex-col items-center gap-4 px-2 text-center">
        <h3 className="section-sub-heading !tracking-widest">
          Frequently Ask Questions
        </h3>
        <h2 className="text-gold-gradient">FAQs</h2>
        <div className="section-divider" />
        <p className="max-w-[832px] text-base text-white sm:text-xl">
          Frequently Asked Questions (FAQs) for Property Sellers
        </p>
      </div>

      <div className="mx-auto flex max-w-[832px] flex-col gap-4">
        {FAQS.map((faq) => (
          <FAQItem
            key={faq.id}
            faq={faq}
            isOpen={openId === faq.id}
            onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
          />
        ))}
      </div>
    </section>
  );
}
