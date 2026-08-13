"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ApartmentPropertyCard from "@/components/sections/apartments/ApartmentPropertyCard";
import {
  getCategory,
  HOMES_PER_PAGE,
  TOTAL_PAGES,
} from "@/components/sections/buy-category/categoryConfig";

export default function CategoryHomes({ categoryKey }) {
  const category = getCategory(categoryKey);
  const homes = category.homes;
  const basePath = category.path;
  const [page, setPage] = useState(1);

  const pageItems = useMemo(() => {
    const start = (page - 1) * HOMES_PER_PAGE;
    return homes.slice(start, start + HOMES_PER_PAGE);
  }, [homes, page]);

  const currentIndex = (page - 1) * HOMES_PER_PAGE + pageItems.length;

  const goTo = (next) => {
    setPage(Math.min(Math.max(next, 1), TOTAL_PAGES));
  };

  return (
    <section className="section-full py-12 sm:py-14 lg:py-16">
      <div className="section-inner">
        <h2 className="text-gold-gradient mb-10 text-center sm:mb-12">Homes</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8 xl:grid-cols-4">
          {pageItems.map((property) => (
            <ApartmentPropertyCard
              key={`${page}-${property.id}`}
              property={property}
              basePath={basePath}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-6 sm:mt-12 sm:flex-row">
          <div className="inline-flex items-center gap-4 rounded-full bg-[#1a1a1a] px-4 py-2 text-sm text-white">
            <button
              type="button"
              aria-label="Previous page"
              onClick={() => goTo(page - 1)}
              disabled={page === 1}
              className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span>
              {String(currentIndex).padStart(2, "0")} / 42
            </span>
            <button
              type="button"
              aria-label="Next page"
              onClick={() => goTo(page + 1)}
              disabled={page === TOTAL_PAGES}
              className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {Array.from({ length: TOTAL_PAGES }).map((_, i) => {
              const n = i + 1;
              const active = n === page;
              return (
                <button
                  key={n}
                  type="button"
                  aria-label={`Go to page ${n}`}
                  onClick={() => goTo(n)}
                  className={`flex size-9 cursor-pointer items-center justify-center rounded-full border text-sm transition ${
                    active
                      ? "border-[#ba8a44] bg-[#ba8a44]/15 text-[#ba8a44]"
                      : "border-[#ba8a44]/60 text-[#ba8a44] hover:border-[#eec876] hover:text-[#eec876]"
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
              className="cursor-pointer text-[#ba8a44] transition hover:text-[#eec876] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
