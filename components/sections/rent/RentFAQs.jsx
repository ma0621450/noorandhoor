"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    id: 1,
    question: "What is the minimum investment required for Greece",
    answer:
      "The minimum investment is €250,000 for properties that qualify under the current investment guidelines.",
  },
  {
    id: 2,
    question: "What documents: need required documents?",
    answer:
      "Typically passport, Emirates ID, proof of income, tenancy application, and security deposit details.",
  },
  {
    id: 3,
    question: "How does your fee structures?",
    answer:
      "Agency fees are commonly around 5% of the annual rent, plus any applicable VAT.",
  },
  {
    id: 4,
    question: "What mas your lease renewals?",
    answer:
      "We manage renewals with clear timelines, market-aligned pricing, and transparent communication.",
  },
  {
    id: 5,
    question: "What right your tenant rights?",
    answer:
      "Tenants are protected under UAE Rental Law covering deposits, maintenance, and eviction procedures.",
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#D4AF37] bg-[#111] shadow-[0_10px_15px_rgba(0,0,0,0.1)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-6 text-left transition hover:bg-[#ba8a44]/10"
      >
        <span className="text-base font-bold text-white sm:text-lg">
          {faq.question}
        </span>
        <ChevronDown
          className={`h-6 w-6 shrink-0 text-[#D4AF37] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="text-base leading-[26px] text-[#f5f5f5]">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function RentFAQs() {
  const [openId, setOpenId] = useState(FAQS[0].id);

  return (
    <section className="section-container">
      <div className="mb-10 flex flex-col items-center gap-4 px-2 text-center">
        <h3 className="section-sub-heading !tracking-widest">
          Frequently ask Questions
        </h3>
        <h2 className="text-gold-gradient">Renting With Us : FAQs</h2>
        <div className="section-divider" />
        <p className="text-base font-normal text-white sm:text-xl">
          Find answers to common questions about Greece Gold
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-[832px] flex-col gap-4">
        {FAQS.map((faq) => (
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
