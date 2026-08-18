"use client";

import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import PropertyCard from "@/components/ui/PropertyCard";

export default function PropertyGrid({
  category,
  homesPerPage = 8,
  totalPages = 3,
}) {
  const [page, setPage] = useState(1);

  const pageItems = useMemo(() => {
    const start = (page - 1) * homesPerPage;
    return category.homes.slice(start, start + homesPerPage);
  }, [category.homes, homesPerPage, page]);

  const goTo = (next) => {
    setPage(Math.min(Math.max(next, 1), totalPages));
  };

  return (
    <section className="section-full bg-[#111111] py-12 sm:py-14 lg:pb-20 lg:pt-16">
      <div className="section-inner">
        <div className="mb-10 flex flex-col items-center gap-4 text-center sm:mb-12">
          <p className="section-sub-heading">{category.eyebrow}</p>
          <h2 className="text-gold-gradient">{category.heading}</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pageItems.map((property) => (
            <PropertyCard
              key={`${page}-${property.id}`}
              property={property}
              basePath={property.basePath || category.path}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:mt-12 sm:justify-end">
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            const active = pageNumber === page;

            return (
              <button
                key={pageNumber}
                type="button"
                aria-label={`Go to page ${pageNumber}`}
                aria-current={active ? "page" : undefined}
                onClick={() => goTo(pageNumber)}
                className={`flex size-10 cursor-pointer items-center justify-center rounded-full border text-sm font-medium transition ${
                  active
                    ? "border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37]"
                    : "border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
          <button
            type="button"
            aria-label="Next page"
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages}
            className="flex size-10 cursor-pointer items-center justify-center text-[#d4af37] transition hover:text-[#eec876] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
