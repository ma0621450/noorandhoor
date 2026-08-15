"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import dubai2024 from "@/public/images/buy/insights/dubai-2024.png";
import dubaiQ1 from "@/public/images/buy/insights/dubai-q1-2025.png";
import dubaiQ2 from "@/public/images/buy/insights/dubai-q2-2025.png";

const SLIDES = [
  {
    id: 1,
    image: dubai2024,
    category: "Seller Guides",
    title: "2026 Seller's Market Report",
    description: "Buyer demand trends",
  },
  {
    id: 2,
    image: dubaiQ1,
    category: "Property Selling Resources",
    title: "Maximizing Your Property Value",
    description: "Home preparation checklist",
  },
  {
    id: 3,
    image: dubaiQ2,
    category: "Off-Market Seller Opportunities",
    title: "Private Buyer Network Report",
    description: "Active buyer demand",
  },
];

export default function SellerInsights() {
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];

  const prev = () => setActive((i) => (i === 0 ? SLIDES.length - 1 : i - 1));
  const next = () => setActive((i) => (i === SLIDES.length - 1 ? 0 : i + 1));

  return (
    <section className="section-full pb-12 sm:pb-14 lg:pb-16">
      <div className="w-full rounded-b-[20px] bg-[#252525] pb-12 pt-10 sm:pb-16">
        <div className="section-inner">
          <h2 className="text-gold-gradient text-center">
            Seller Insights &amp; Resources
          </h2>

          <div className="relative mx-auto mt-10 max-w-[896px] lg:mt-12">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="relative h-[220px] overflow-hidden rounded-[10px] sm:h-[256px]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 436px"
                  className="object-cover"
                />
              </div>

              <div className="flex min-h-[220px] flex-col justify-center rounded-[10px] bg-black p-6 shadow-md sm:h-[256px] sm:p-8">
                <p className="mb-2 text-sm text-[#f5f5f5]">{slide.category}</p>
                <h3 className="mb-3 text-base font-medium text-[#f5f5f5] sm:mb-4 sm:text-lg">
                  {slide.title}
                </h3>
                <p className="mb-5 text-sm text-[#f5f5f5] sm:mb-6">
                  {slide.description}
                </p>
                <button
                  type="button"
                  className="inline-flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-[#f5f5f5] transition hover:text-[#eec876]"
                >
                  <Download className="h-4 w-4" />
                  Download Guide
                </button>
              </div>
            </div>

            <button
              type="button"
              aria-label="Previous slide"
              onClick={prev}
              className="absolute left-2 top-[110px] z-10 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-[#f5f5f5] sm:top-[128px] md:left-0 lg:-left-8"
            >
              <ChevronLeft className="h-6 w-6 text-black" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={next}
              className="absolute right-2 top-[110px] z-10 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-[#f5f5f5] sm:top-[128px] md:right-0 lg:-right-8"
            >
              <ChevronRight className="h-6 w-6 text-black" />
            </button>

            <div className="mt-8 flex items-center justify-center gap-2">
              {SLIDES.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setActive(index)}
                  className={`h-2 cursor-pointer rounded-full transition-all ${
                    index === active
                      ? "w-8 bg-[#f5f5f5]"
                      : "w-2 bg-[#f5f5f5]/40 hover:bg-[#f5f5f5]/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
