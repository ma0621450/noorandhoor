"use client";

import { useMemo } from "react";
import Button from "@/components/ui/Button";
import OffPlanLaunchCard from "@/components/ui/OffPlanLaunchCard";
import useAdminProperties from "@/hooks/useAdminProperties";
import { listingHomes } from "@/lib/admin/propertyPublic";
import propertyImage from "@/public/images/landingpage/propertyImg.png";
import carousel1 from "@/public/images/landingpage/landingpagecarousel1.jpg";
import carousel2 from "@/public/images/landingpage/landingpagecarousel2.jpg";
import carousel3 from "@/public/images/landingpage/landingpagecarousel3.jpg";
import carousel4 from "@/public/images/landingpage/landingpagecarousel4.jpg";

const FALLBACK_LAUNCHES = [
  {
    id: "fallback-1",
    image: carousel1,
    title: "Binghatti Skyflame",
    developer: "Binghatti Properties",
    price: "585K",
    href: "/off-plan",
  },
  {
    id: "fallback-2",
    image: carousel2,
    title: "Golf Vale",
    developer: "Emaar Properties",
    price: "1.10M",
    href: "/off-plan",
  },
  {
    id: "fallback-3",
    image: carousel3,
    title: "Binghatti Etherea",
    developer: "Binghatti Properties",
    price: "765K",
    href: "/off-plan",
  },
  {
    id: "fallback-4",
    image: carousel4,
    title: "Hudayriyat Golf Estates",
    developer: "Modon",
    price: "4.25M",
    href: "/off-plan",
  },
  {
    id: "fallback-5",
    image: propertyImage,
    title: "Greenz by Danube",
    developer: "Danube Properties",
    price: "3.5M",
    href: "/off-plan",
  },
  {
    id: "fallback-6",
    image: carousel1,
    title: "Residences DIFC Zabeel",
    developer: "DIFC Developments",
    price: "2.6M",
    href: "/off-plan",
  },
];

function formatLaunchPrice(value) {
  const amount = Number(value) || 0;
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    return `${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(2)}M`;
  }
  if (amount >= 1_000) {
    const thousands = amount / 1_000;
    return `${thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1)}K`;
  }
  return amount.toLocaleString("en-AE");
}

export default function OffPlanLaunches() {
  const { properties, isReady } = useAdminProperties();

  const launches = useMemo(() => {
    if (!isReady) return FALLBACK_LAUNCHES;
    const homes = listingHomes(properties, {
      market: "off-plan",
      featuredOnly: true,
      limit: 6,
    });
    const list = homes.length
      ? homes
      : listingHomes(properties, { market: "off-plan", limit: 6 });
    if (!list.length) return FALLBACK_LAUNCHES;

    return list.map((home) => ({
      id: home.id || home.slug,
      image: home.image || home.images?.[0] || propertyImage,
      title: home.title,
      developer: home.location || "Noor & Hoor",
      price: formatLaunchPrice(home.price),
      href: home.href || `/off-plan/${home.slug}`,
    }));
  }, [isReady, properties]);

  return (
    <section className="section-container">
      <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:gap-8 lg:mb-16 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="flex min-w-0 flex-col gap-4">
          <h3 className="section-sub-heading">Our Launches</h3>
          <h2 className="text-gold-gradient max-w-[640px]">
            Latest Off Plan Launches
          </h2>
        </div>

        <Button
          href="/off-plan"
          variant="secondary"
          className="w-full shrink-0 sm:w-auto lg:self-start"
        >
          View More
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
        {launches.map((launch) => (
          <OffPlanLaunchCard key={launch.id} launch={launch} />
        ))}
      </div>
    </section>
  );
}
