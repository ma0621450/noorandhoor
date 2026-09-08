"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import DeveloperCard from "@/components/sections/developers/DeveloperCard";
import Pagination from "@/components/ui/Pagination";
import { FEATURED_DEVELOPERS } from "@/components/sections/developers/developersData";
import {
  LISTING_PAGE_SIZE,
  listingPageHref,
  pageFromSearchParams,
  paginateItems,
} from "@/lib/listingPagination";

function DevelopersFeaturedBody() {
  const searchParams = useSearchParams();
  const developers = useMemo(() => FEATURED_DEVELOPERS, []);
  const { currentPage, totalPages, pageItems } = paginateItems(
    developers,
    pageFromSearchParams(searchParams),
    LISTING_PAGE_SIZE,
  );

  return (
    <section
      id="developer-listings"
      className="section-container scroll-mt-28"
    >
      <div className="mb-10 flex flex-col gap-4">
        <p className="text-xs font-normal uppercase tracking-[2.2px] text-white">
          Developers We Work With
        </p>
        <h2 className="text-gold-gradient text-left">Featured Developers</h2>
      </div>

      {pageItems.length ? (
        <div className="grid grid-cols-1 gap-[33px] sm:grid-cols-2 lg:grid-cols-3">
          {pageItems.map((developer) => (
            <DeveloperCard key={developer.name} developer={developer} />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-sm text-white/45">
          No developers listed yet.
        </p>
      )}

      {developers.length ? (
        <Pagination
          label="Developer pagination"
          currentPage={currentPage}
          totalPages={totalPages}
          hrefForPage={(pageNumber) =>
            listingPageHref(
              "/developers",
              pageNumber,
              searchParams,
              "developer-listings",
            )
          }
        />
      ) : null}
    </section>
  );
}

export default function DevelopersFeatured() {
  return (
    <Suspense
      fallback={
        <section className="section-container">
          <p className="py-10 text-center text-sm text-white/45">
            Loading developers...
          </p>
        </section>
      }
    >
      <DevelopersFeaturedBody />
    </Suspense>
  );
}
