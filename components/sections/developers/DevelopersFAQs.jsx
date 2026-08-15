"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import {
  DEVELOPER_FAQS,
  FAQ_RESOURCES,
} from "@/components/sections/developers/developersData";

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#D4AF37]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-6 text-left"
      >
        <span className="text-lg font-bold text-white">{faq.question}</span>
        <ChevronDown
          className={`h-6 w-6 shrink-0 text-[#D4AF37] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          strokeWidth={2}
        />
      </button>
      {isOpen && (
        <div className="px-8 pb-6">
          <p className="text-base leading-[26px] text-[#F5F5F5]">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function DevelopersFAQs() {
  const [openId, setOpenId] = useState(DEVELOPER_FAQS[0].id);

  return (
    <section className="section-container">
      <div className="mb-10 flex flex-col items-center gap-4 text-center">
        <p className="section-sub-heading">Frequently Ask Questions</p>
        <h2 className="text-gold-gradient">FAQs</h2>
        <div className="section-divider" />
        <p className="max-w-[864px] text-lg text-white sm:text-xl">
          Doing solid-time analysis for semantic investments
        </p>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
        {FAQ_RESOURCES.map((resource) => (
          <article
            key={resource.title}
            className="relative h-[215px] overflow-hidden rounded-xl"
          >
            <Image
              src={resource.image}
              alt={resource.title}
              fill
              sizes="346px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-black/60" />
            <p className="absolute bottom-6 left-4 right-4 text-lg font-semibold leading-[23px] text-[#E9C349]">
              {resource.title}
            </p>
          </article>
        ))}
      </div>

      <div className="mx-auto flex w-full max-w-[832px] flex-col gap-4">
        {DEVELOPER_FAQS.map((faq) => (
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
