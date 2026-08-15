"use client";

import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import OffPlanListingCard from "@/components/sections/offplan/OffPlanListingCard";
import {
  getOffPlanCategory,
  HOMES_PER_PAGE,
  TOTAL_PAGES,
} from "@/components/sections/offplan/offplanCategoryConfig";

export default function OffPlanHomes({ categoryKey }) {
  const category = getOffPlanCategory(categoryKey);
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
    <section className="section-full bg-[#111111] pb-16 pt-10 sm:pb-20 sm:pt-12">
      <div className="section-inner flex flex-col items-center gap-10 lg:gap-[59px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-xs font-normal uppercase leading-[26px] text-[#f5f5f5]">
            off plan Properties
          </p>
          <h2 className="text-gold-gradient text-[clamp(2rem,4vw,2.875rem)] leading-[1.04] lg:leading-[48px]">
            {category.heading}
          </h2>
        </div>

        <div className="grid w-full grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pageItems.map((property) => (
            <OffPlanListingCard
              key={`${page}-${property.id}`}
              property={property}
              basePath={category.path}
            />
          ))}
        </div>

        <div className="flex w-full items-center justify-center sm:justify-end">
          <div className="flex items-center gap-[11px]">
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
                  className={`flex h-[38px] w-[26px] cursor-pointer items-center justify-center rounded-full border border-[#D4AF37] text-sm font-medium text-[#D4AF37] transition ${
                    active ? "bg-[#D4AF37]/15" : "hover:bg-[#D4AF37]/10"
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
              className="cursor-pointer text-[#D4AF37] transition hover:text-[#eec876] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-6 w-3" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
