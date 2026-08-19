import Link from "next/link";
import { ChevronRight } from "lucide-react";
import PropertyCard from "@/components/ui/PropertyCard";

function pageHref(path, pageNumber) {
  return pageNumber <= 1 ? path : `${path}?page=${pageNumber}`;
}

export default function PropertyGrid({
  category,
  homesPerPage = 8,
  totalPages = 3,
  page = 1,
}) {
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * homesPerPage;
  const pageItems = category.homes.slice(start, start + homesPerPage);

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
              key={`${currentPage}-${property.id}`}
              property={property}
              basePath={property.basePath || category.path}
            />
          ))}
        </div>

        <nav
          aria-label="Property pagination"
          className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:mt-12 sm:justify-end"
        >
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            const active = pageNumber === currentPage;

            return (
              <Link
                key={pageNumber}
                href={pageHref(category.path, pageNumber)}
                aria-label={`Go to page ${pageNumber}`}
                aria-current={active ? "page" : undefined}
                className={`flex size-10 items-center justify-center rounded-full border text-sm font-medium transition ${
                  active
                    ? "border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37]"
                    : "border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10"
                }`}
              >
                {pageNumber}
              </Link>
            );
          })}
          <Link
            href={pageHref(category.path, Math.min(currentPage + 1, totalPages))}
            aria-label="Next page"
            aria-disabled={currentPage === totalPages}
            className={`flex size-10 items-center justify-center text-[#d4af37] transition hover:text-[#eec876] ${
              currentPage === totalPages ? "pointer-events-none opacity-40" : ""
            }`}
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </Link>
        </nav>
      </div>
    </section>
  );
}
