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
    question: "How can I find good real estate agents in Dubai?",
    answer:
      "Work with licensed brokers like Noor & Hoor who specialize in your preferred communities and investment goals.",
  },
  {
    id: 3,
    question: "Who is the best real estate broker in Dubai?",
    answer:
      "The best broker depends on your needs. We provide end-to-end support from selection to handover.",
  },
  {
    id: 4,
    question: "How long does the property purchase process take?",
    answer:
      "Most purchases complete within a few weeks, depending on financing, documentation, and developer timelines.",
  },
  {
    id: 5,
    question: "How much down payment is typically needed?",
    answer:
      "Down payments commonly start around 20%, though exact figures vary by bank and property type.",
  },
  {
    id: 6,
    question: "How do I determine the value of my property?",
    answer:
      "We assess market comps, community demand, rental yields, and projected growth to estimate fair value.",
  },
];

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
          className={`h-5 w-5 shrink-0 text-[#ba8a44] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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

export default function BuyFAQs() {
  const [openId, setOpenId] = useState(FAQS[0].id);

  return (
    <section className="section-container">
      <div className="mb-10 flex flex-col items-center gap-4 px-2 text-center">
        <h3 className="section-sub-heading !tracking-widest">
          Frequently ask Questions
        </h3>
        <h2 className="text-gold-gradient">FAQs</h2>
        <div className="section-divider" />
        <p className="text-base font-normal sm:text-lg">
          Find answers to common questions about Greece Gold
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 sm:gap-4">
        {FAQS.map((faq) => (
          <FAQItem
            key={faq.id}
            faq={faq}
            isOpen={openId === faq.id}
            onToggle={() => setOpenId((current) => (current === faq.id ? null : faq.id))}
          />
        ))}
      </div>
    </section>
  );
}
