"use client";

import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import ApartmentPropertyCard from "@/components/sections/apartments/ApartmentPropertyCard";
import {
  getRentCategory,
  HOMES_PER_PAGE,
  TOTAL_PAGES,
} from "@/components/sections/rent-properties/rentCategoryConfig";

export default function PropertiesRentHomes({ categoryKey }) {
  const category = getRentCategory(categoryKey);
  const homes = category.homes;
  const [page, setPage] = useState(1);

  const pageItems = useMemo(() => {
    const start = (page - 1) * HOMES_PER_PAGE;
    return homes.slice(start, start + HOMES_PER_PAGE);
  }, [homes, page]);

  const goTo = (next) => {
    setPage(Math.min(Math.max(next, 1), TOTAL_PAGES));
  };

  return (
    <section className="section-full bg-[#111111] py-12 sm:py-14 lg:pb-20 lg:pt-16">
      <div className="section-inner">
        <div className="mb-10 flex flex-col items-center gap-4 text-center sm:mb-12 sm:gap-5">
          <p className="text-xs font-normal uppercase leading-[26px] tracking-wide text-[#f5f5f5]">
            {category.eyebrow}
          </p>
          <h2 className="text-gold-gradient text-[clamp(2rem,5vw,2.875rem)] leading-[1.04] font-extrabold uppercase">
            {category.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[30px] xl:grid-cols-4">
          {pageItems.map((property) => (
            <ApartmentPropertyCard
              key={`${page}-${property.id}`}
              property={property}
              basePath={category.path}
            />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-end gap-[11px] sm:mt-12">
          {Array.from({ length: TOTAL_PAGES }).map((_, i) => {
            const n = i + 1;
            const active = n === page;
            return (
              <button
                key={n}
                type="button"
                aria-label={`Go to page ${n}`}
                aria-current={active ? "page" : undefined}
                onClick={() => goTo(n)}
                className={`flex h-[38px] w-[26px] cursor-pointer items-center justify-center rounded-full border text-sm font-medium transition ${
                  active
                    ? "border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37]"
                    : "border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10"
                }`}
              >
                {n}
              </button>
            );
          })}
          <button
            type="button"
            aria-label="Next page"
            onClick={() => goTo(page + 1)}
            disabled={page === TOTAL_PAGES}
            className="cursor-pointer text-[#d4af37] transition hover:text-[#eec876] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-6 w-3" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
