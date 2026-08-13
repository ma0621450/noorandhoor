"use client";

import LocationCard from "@/components/ui/LocationCard";
import { useRef, useState } from "react";
import villasImage from "@/public/images/buy/villas.png";
import apartmentsImage from "@/public/images/buy/apartments.png";
import townhousesImage from "@/public/images/buy/townhouses.png";
import penthouseImage from "@/public/images/buy/penthouse.png";
import otherPropertiesImage from "@/public/images/buy/otherproperties.png";

const CATEGORIES = [
  { image: villasImage, name: "Villas", propertyCount: 13, href: "/buy/villas" },
  { image: apartmentsImage, name: "Apartments", propertyCount: 13, href: "/buy/apartments" },
  { image: townhousesImage, name: "Town Houses", propertyCount: 16, href: "/buy/townhouses" },
  { image: penthouseImage, name: "Penthouses", propertyCount: 18, href: "/buy/penthouses" },
  { image: otherPropertiesImage, name: "Other Properties", propertyCount: 18, href: "/buy/properties" },
];

export default function PropertyCategories() {
  const scrollRef = useRef(null);
  const dragState = useRef({ startX: 0, scrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (event) => {
    const container = scrollRef.current;
    if (!container) return;

    container.setPointerCapture(event.pointerId);
    setIsDragging(true);
    dragState.current = {
      startX: event.pageX,
      scrollLeft: container.scrollLeft,
    };
  };

  const handlePointerMove = (event) => {
    if (!isDragging) return;

    const container = scrollRef.current;
    if (!container) return;

    const distance = event.pageX - dragState.current.startX;
    container.scrollLeft = dragState.current.scrollLeft - distance;
  };

  const handlePointerUp = (event) => {
    const container = scrollRef.current;
    if (container?.hasPointerCapture(event.pointerId)) {
      container.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  };

  return (
    <section className="section-container">
      <div className="flex flex-col items-center gap-4 text-center">
        <h3 className="section-sub-heading !text-[#B3813D]">Categories</h3>
        <h2 className="text-gold-gradient">Property Categories</h2>
        <div className="section-divider" />
        <p className="max-w-[346px] text-sm text-[#f5f5f5] md:text-base">
          Tailored architecture to match your intent
        </p>
      </div>

      <div
        ref={scrollRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`mt-8 flex touch-none select-none gap-10 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:mt-12 [&::-webkit-scrollbar]:hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        {CATEGORIES.map((category) => (
          <LocationCard
            key={category.name}
            image={category.image}
            name={category.name}
            propertyCount={category.propertyCount}
            href={category.href}
            width={290}
          />
        ))}
      </div>
    </section>
  );
}
