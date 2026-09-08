"use client";

import { useRef } from "react";
import Link from "next/link";

import Button from "@/components/ui/Button";
import CommunityCard from "@/components/ui/CommunityCard";

import villasImage from "@/public/images/buy/villas.png";
import apartmentsImage from "@/public/images/buy/apartments.png";
import otherPropertiesImage from "@/public/images/buy/otherproperties.png";
import penthouseImage from "@/public/images/buy/penthouse.png";

const DEFAULT_COMMUNITIES = [
  {
    id: 1,
    image: villasImage,
    title: "Palm Jumeirah",
    subtitle: "Beach Community",
    description: "Luxury waterfront Villas, Apartments, Resorts",
  },
  {
    id: 2,
    image: apartmentsImage,
    title: "Downtown",
    subtitle: "City Center",
    description: "Burj Khalifa, Dubai Mall, Dubai Opera",
  },
  {
    id: 3,
    image: otherPropertiesImage,
    title: "Dubai Islands",
    subtitle: "Waterfront",
    description: "Diverse Development, Hotels, Residential",
  },
  {
    id: 4,
    image: penthouseImage,
    title: "Jumeirah Golf Estates",
    subtitle: "Waterfront",
    description: "Premium Golf Two Championship Courses, Earth Villas",
  },
];

export default function PopularCommunities({
  title = "Popular Communities",
  communities = DEFAULT_COMMUNITIES,
  ctaLabel = "View More",
  cardCtaLabel,
  href = "/buy",
}) {
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const firstCard = container.firstElementChild;

    if (!firstCard) return;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(container).gap) || 0;

    const scrollAmount = cardWidth + gap;

    container.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="section-container">
      {/* Section Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-gold-gradient max-w-xl">{title}</h2>

        <Link href={href} className="w-full shrink-0 sm:w-auto">
          <Button variant="secondary" className="h-14 w-full sm:w-auto">
            {ctaLabel}
          </Button>
        </Link>
      </div>

      {/* Communities Carousel */}
      <div
        ref={carouselRef}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 sm:gap-8 lg:gap-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {communities.map((community) => (
          <div
            key={community.id}
            className="shrink-0 snap-start"
          >
            <CommunityCard
              {...community}
              ctaLabel={cardCtaLabel || community.ctaLabel}
            />
          </div>
        ))}
      </div>

      {/* Carousel Arrows */}
      <div className="mt-6 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollCarousel("left")}
          aria-label="Previous community"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#80651F] text-white transition-colors hover:bg-[#C9A24D] hover:text-black"
        >
          <span className="mb-1 text-3xl font-light leading-none">
            ‹
          </span>
        </button>

        <button
          type="button"
          onClick={() => scrollCarousel("right")}
          aria-label="Next community"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#80651F] text-white transition-colors hover:bg-[#C9A24D] hover:text-black"
        >
          <span className="mb-1 text-3xl font-light leading-none">
            ›
          </span>
        </button>
      </div>
    </section>
  );
}