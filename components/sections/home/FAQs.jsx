"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    id: 1,
    question: "Are your real estate agents fully licensed?",
    answer:
      "Yes, all our agents are fully licensed and certified under UAE real estate regulations. We ensure professional and compliant services at all times.",
  },
  {
    id: 2,
    question: "Do you charge any fees for initial consultations?",
    answer:
      "No, initial consultations are usually free of charge. We guide you first before any commitment or cost.",
  },
  {
    id: 3,
    question: "Can I buy or sell a property with you remotely?",
    answer:
      "Yes, you can complete the entire process remotely. We handle virtual viewings, paperwork, and digital transactions.",
  },
  {
    id: 4,
    question: "Do you help clients with property bank loans?",
    answer:
      "Yes, we assist clients with mortgage and bank loan arrangements. We connect you with trusted UAE banks for smooth approval.",
  },
  {
    id: 5,
    question: "Are there any annual property taxes in Dubai?",
    answer:
      "No annual property tax is charged in Dubai. However, there are small service and maintenance fees.",
  },
  {
    id: 6,
    question: "Can I rent out my apartment if I live outside the UAE?",
    answer:
      "Yes, non-residents can rent out their properties in Dubai. We also help manage rentals and tenant handling remotely.",
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#ba8a44]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-4 text-left sm:px-6 sm:py-5"
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

export default function FAQs() {
  const [openId, setOpenId] = useState(FAQS[0].id);

  const toggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="section-container py-12 sm:py-16">
      <div className="mb-10 flex flex-col items-center gap-4 px-2 text-center sm:mb-12">
        <h3 className="section-sub-heading !tracking-widest">
          Frequently ask Questions
        </h3>
        <h2 className="text-gold-gradient">FAQs</h2>
        <div className="h-[4px] w-25 bg-[#B3813D]" />
        <p className="text-base font-normal sm:text-lg">
          Find answers to common questions about Noor & Hoor
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 sm:gap-4">
        {FAQS.map((faq) => (
          <FAQItem
            key={faq.id}
            faq={faq}
            isOpen={openId === faq.id}
            onToggle={() => toggle(faq.id)}
          />
        ))}
      </div>
    </section>
  );
}
