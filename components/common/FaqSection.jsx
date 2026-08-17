"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { DETAIL_FAQS } from "@/components/sections/detail/detailData";

const FAQ_PRESETS = {
  home: {
    description: "Find answers to common questions about Noor & Hoor",
    items: [
      {
        question: "Are your real estate agents fully licensed?",
        answer:
          "Yes, all our agents are fully licensed and certified under UAE real estate regulations. We ensure professional and compliant services at all times.",
      },
      {
        question: "Do you charge any fees for initial consultations?",
        answer:
          "No, initial consultations are usually free of charge. We guide you first before any commitment or cost.",
      },
      {
        question: "Can I buy or sell a property with you remotely?",
        answer:
          "Yes, you can complete the entire process remotely. We handle virtual viewings, paperwork, and digital transactions.",
      },
      {
        question: "Do you help clients with property bank loans?",
        answer:
          "Yes, we assist clients with mortgage and bank loan arrangements. We connect you with trusted UAE banks for smooth approval.",
      },
      {
        question: "Are there any annual property taxes in Dubai?",
        answer:
          "No annual property tax is charged in Dubai. However, there are small service and maintenance fees.",
      },
      {
        question: "Can I rent out my apartment if I live outside the UAE?",
        answer:
          "Yes, non-residents can rent out their properties in Dubai. We also help manage rentals and tenant handling remotely.",
      },
    ],
  },
  buy: {
    description: "Find answers to common questions about buying UAE property",
    items: [
      {
        question: "What is the minimum investment required?",
        answer:
          "Minimum investment depends on the property and financing route. Our team can recommend options for your budget.",
      },
      {
        question: "How can I find a good real estate agent in Dubai?",
        answer:
          "Work with a licensed brokerage that specializes in your preferred communities and investment goals.",
      },
      {
        question: "How long does the property purchase process take?",
        answer:
          "Most purchases complete within a few weeks, depending on financing, documentation, and developer timelines.",
      },
      {
        question: "How much down payment is typically needed?",
        answer:
          "Down payments commonly start around 20%, though exact figures vary by bank and property type.",
      },
      {
        question: "How is a property's value determined?",
        answer:
          "We assess comparable sales, demand, rental yield, condition, and projected growth.",
      },
    ],
  },
  rent: {
    title: "Renting With Us: FAQs",
    description: "Find answers to common questions about renting in the UAE",
    items: [
      {
        question: "Which documents are required to rent?",
        answer:
          "Typically you need a passport, Emirates ID, proof of income, tenancy application, and deposit details.",
      },
      {
        question: "How are agency fees structured?",
        answer:
          "Agency fees are commonly around 5% of annual rent, plus applicable VAT.",
      },
      {
        question: "How are lease renewals managed?",
        answer:
          "We manage renewals with clear timelines, market-aligned pricing, and transparent communication.",
      },
      {
        question: "What rights do tenants have?",
        answer:
          "UAE rental law covers deposits, maintenance responsibilities, notices, and eviction procedures.",
      },
    ],
  },
  sell: {
    description: "Frequently asked questions for property sellers",
    items: [
      {
        question: "How do I determine the value of my property?",
        answer:
          "We use recent transactions, local demand, condition, and comparable listings to provide an accurate valuation.",
      },
      {
        question: "How long does it take to sell a property?",
        answer:
          "Timelines vary by location, pricing, and demand. Well-priced properties can attract buyers within weeks.",
      },
      {
        question: "What documents do I need to sell?",
        answer:
          "Usually a title deed, Emirates ID or passport, NOC, service-charge clearance, and tenancy details if occupied.",
      },
      {
        question: "Can I sell a property that has a mortgage?",
        answer:
          "Yes. We coordinate liability clearance with the bank and settlement during transfer.",
      },
      {
        question: "What costs are involved in selling?",
        answer:
          "Common costs include commission, trustee and transfer fees, service charges, and mortgage liabilities.",
      },
      {
        question: "Should I renovate before selling?",
        answer:
          "Light improvements may help, but we advise based on buyer demand and expected return.",
      },
    ],
  },
  detail: {
    description: "Find answers to common questions about Noor & Hoor",
    items: DETAIL_FAQS,
  },
};

export function FaqAccordion({ items }) {
  const normalizedItems = items.map((item, index) => ({
    ...item,
    id: item.id ?? index + 1,
  }));
  const [openId, setOpenId] = useState(normalizedItems[0]?.id ?? null);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 sm:gap-4">
      {normalizedItems.map((faq) => {
        const isOpen = faq.id === openId;

        return (
          <article
            key={faq.id}
            className="overflow-hidden rounded-xl border border-[#ba8a44] bg-[#111]"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() =>
                setOpenId((current) => (current === faq.id ? null : faq.id))
              }
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-[#ba8a44]/10 sm:px-6 sm:py-5"
            >
              <span className="text-sm font-semibold text-white sm:text-base">
                {faq.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-[#ba8a44] transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen ? (
              <div className="px-4 pb-4 sm:px-6 sm:pb-5">
                <p className="text-sm leading-relaxed text-white/85 sm:text-base">
                  {faq.answer}
                </p>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

export default function FaqSection({ variant = "home" }) {
  const preset = FAQ_PRESETS[variant] || FAQ_PRESETS.home;

  return (
    <section className="section-container">
      <div className="mb-10 flex flex-col items-center gap-4 px-2 text-center sm:mb-12">
        <p className="section-sub-heading">Frequently Asked Questions</p>
        <h2 className="text-gold-gradient">{preset.title || "FAQs"}</h2>
        <div className="section-divider" />
        <p className="max-w-3xl text-sm text-white/85 sm:text-base lg:text-lg">
          {preset.description}
        </p>
      </div>
      <FaqAccordion items={preset.items} />
    </section>
  );
}
