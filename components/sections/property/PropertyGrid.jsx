"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/ui/PropertyCard";
import Pagination from "@/components/ui/Pagination";
import useAdminProperties from "@/hooks/useAdminProperties";
import { listingHomes } from "@/lib/admin/propertyPublic";
import { filtersFromSearchParams } from "@/lib/listingFilters";
import {
  LISTING_PAGE_SIZE,
  listingPageHref,
  pageFromSearchParams,
  paginateItems,
} from "@/lib/listingPagination";

export const PROPERTIES_PER_PAGE = LISTING_PAGE_SIZE;

function PropertyGridBody({
  category,
  homesPerPage = PROPERTIES_PER_PAGE,
  market = "buy",
}) {
  const searchParams = useSearchParams();
  const { properties, isReady } = useAdminProperties();
  const filters = useMemo(
    () => filtersFromSearchParams(searchParams),
    [searchParams],
  );

  const homes = useMemo(() => {
    if (!isReady) return [];
    return listingHomes(properties, { market, category, filters });
  }, [category, filters, isReady, market, properties]);

  const requestedPage = pageFromSearchParams(searchParams);
  const { currentPage, totalPages, pageItems } = paginateItems(
    homes,
    requestedPage,
    homesPerPage,
  );
  const hasFilters = Object.keys(filters).length > 0;

  return (
    <section
      id="property-listings"
      className="section-full scroll-mt-28 bg-[#111111] py-12 sm:py-14 lg:pb-20 lg:pt-16"
    >
      <div className="section-inner">
        <div className="mb-10 flex flex-col items-center gap-4 text-center sm:mb-12">
          <p className="section-sub-heading">{category.eyebrow}</p>
          <h2 className="text-gold-gradient">{category.heading}</h2>
        </div>

        {!isReady ? (
          <p className="py-16 text-center text-sm text-white/45">
            Loading properties...
          </p>
        ) : pageItems.length ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((property) => (
              <PropertyCard
                key={`${currentPage}-${property.id}`}
                property={property}
                basePath={property.basePath || category.path}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <p className="text-sm text-white/45">
              {hasFilters
                ? "No properties match these filters."
                : "No properties listed in this category yet."}
            </p>
            {hasFilters ? (
              <a
                href={`${category.path}#property-listings`}
                className="text-xs font-semibold uppercase tracking-[1.3px] text-[#eec876] transition hover:text-[#f5f5f5]"
              >
                Reset filters
              </a>
            ) : null}
          </div>
        )}

        {isReady && homes.length ? (
          <Pagination
            label="Property pagination"
            currentPage={currentPage}
            totalPages={totalPages}
            hrefForPage={(pageNumber) =>
              listingPageHref(
                category.path,
                pageNumber,
                searchParams,
                "property-listings",
              )
            }
          />
        ) : null}
      </div>
    </section>
  );
}

export default function PropertyGrid(props) {
  return (
    <Suspense
      fallback={
        <section className="section-full bg-[#111111] py-12 sm:py-14 lg:pb-20 lg:pt-16">
          <p className="py-16 text-center text-sm text-white/45">
            Loading properties...
          </p>
        </section>
      }
    >
      <PropertyGridBody {...props} />
    </Suspense>
  );
}
