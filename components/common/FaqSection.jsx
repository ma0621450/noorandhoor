"use client";

import { useState } from "react";
import Image from "next/image";
import CaretDown from "@/components/ui/CaretDown";
import { DETAIL_FAQS } from "@/components/sections/detail/detailData";
import {
  DEVELOPER_FAQS,
  FAQ_RESOURCES,
} from "@/components/sections/developers/developersData";

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
    description:
      "Got questions about buying property directly from us? We've got answers to help you decide with confidence.",
    items: [
      {
        question: "Do I need to be in the UAE to buy?",
        answer:
          "No, you don't. We handle the entire process remotely on your behalf. You can complete your purchase from anywhere in the world.",
      },
      {
        question: "What documents do I need to buy property?",
        answer:
          "You'll need a valid passport and proof of funds. Non-residents may need a few extra documents. We'll guide you through our full requirement list.",
      },
      {
        question: "How long does the buying process usually take?",
        answer:
          "Ready properties can close in 2-4 weeks with us. Off-plan purchases may take longer. Timelines depend on documentation and your payment plan.",
      },
      {
        question: "Can I rent out my property after buying?",
        answer:
          "Yes, absolutely. Most of our buyers rent out their property for strong returns. We can help you find tenants directly too.",
      },
      {
        question: "What happens if I want to cancel my purchase?",
        answer:
          "Cancellation policies depend on your contract stage with us. Early cancellations are usually simpler. We'll explain your options clearly before you sign anything.",
      },
      {
        question: "What currency is used for property payments?",
        answer:
          "Most transactions with us are done in AED. We also accept USD for certain purchases. We'll confirm accepted currencies before you proceed.",
      },
    ],
  },
  rent: {
    description: "Still have questions? Here's what most tenants ask us first.",
    items: [
      {
        question: "What documents do I need to rent a property?",
        answer:
          "You'll need a valid passport and Emirates ID, if available. Proof of income may also be required. We'll guide you through the exact list based on your situation.",
      },
      {
        question: "How much is the security deposit usually?",
        answer:
          "It's typically 5% of the annual rent for unfurnished units. Furnished properties may require a higher deposit. The exact amount depends on the property and landlord.",
      },
      {
        question: "Can I have pets in a rented property?",
        answer:
          "It depends on the property and landlord's policy. Many of our listings are pet-friendly. We'll confirm the details before you sign the lease.",
      },
      {
        question: "What happens if I want to leave before my lease ends?",
        answer:
          "Early termination usually involves a notice period and possible penalty. Terms vary by contract. We'll explain your options clearly before you sign.",
      },
      {
        question: "Do you offer short-term or holiday rentals?",
        answer:
          "Yes, we do offer short-term rental options. These are separate from standard annual leases. Let us know your duration, and we'll find a suitable match.",
      },
      {
        question: "Is parking included with rental properties?",
        answer:
          "It depends on the specific property. Many of our rental units include dedicated parking. We'll confirm this detail before you sign your lease.",
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
  developers: {
    title: "FAQs",
    description: "Doing solid-time analysis for semantic investments",
    items: DEVELOPER_FAQS,
    resources: FAQ_RESOURCES,
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
              <CaretDown
                open={isOpen}
                className="h-2 w-3 text-[#ba8a44]"
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
      {preset.resources?.length ? (
        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {preset.resources.map((resource) => (
            <article
              key={resource.title}
              className="relative h-[215px] overflow-hidden rounded-xl"
            >
              <Image
                src={resource.image}
                alt={resource.title}
                fill
                sizes="(max-width: 768px) 100vw, 346px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-black/60" />
              <p className="absolute bottom-6 left-4 right-4 text-lg font-semibold leading-[23px] text-[#E9C349]">
                {resource.title}
              </p>
            </article>
          ))}
        </div>
      ) : null}

      <FaqAccordion items={preset.items} />
    </section>
  );
}
