"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import DeveloperCard from "@/components/sections/developers/DeveloperCard";
import { FEATURED_DEVELOPERS } from "@/components/sections/developers/developersData";

function matchesDeveloper(developer, name, region) {
  if (name && developer.name.toLowerCase() !== name.toLowerCase()) return false;
  if (region && developer.region.toLowerCase() !== region.toLowerCase()) {
    return false;
  }
  return true;
}

function DevelopersFeaturedBody() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const region = searchParams.get("region") || "";
  const developers = useMemo(
    () =>
      FEATURED_DEVELOPERS.filter((developer) =>
        matchesDeveloper(developer, name, region),
      ),
    [name, region],
  );

  return (
    <section
      id="developer-listings"
      className="section-container scroll-mt-28"
    >
      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-normal uppercase tracking-[2.2px] text-white">
            Developers
          </p>
          <h2 className="text-gold-gradient text-left">Featured Developers</h2>
        </div>
        <Button
          variant="outline"
          className="h-[58px] w-full rounded-xl text-[13px] tracking-[1.3px] text-white sm:w-[234px]"
        >
          View More
        </Button>
      </div>

      {developers.length ? (
        <div className="grid grid-cols-1 gap-[33px] sm:grid-cols-2 lg:grid-cols-3">
          {developers.map((developer) => (
            <DeveloperCard key={developer.name} developer={developer} />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-sm text-white/45">
          No developers match these filters.
        </p>
      )}
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
