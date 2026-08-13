"use client";

import { useRef, useState } from "react";
import LocationCard from "@/components/ui/LocationCard";
import dubai from "@/public/images/landingpage/dubai.png";
import abuDhabi from "@/public/images/landingpage/AbuDhabi.png";
import sharjah from "@/public/images/landingpage/Sharjah.png";
import ajman from "@/public/images/landingpage/Ajman.png";

const LOCATIONS = [
  { image: dubai, name: "Dubai Marina", subtitle: "The Vibrant Water Fall" },
  { image: abuDhabi, name: "Downtown Dubai", subtitle: "Iconic Living" },
  { image: sharjah, name: "Palm Jumeirah", subtitle: "Island Luxury" },
  { image: ajman, name: "Ajman", subtitle: "Coastal Living" },
];

export default function PrimeLocations() {
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
    <section className="section-full py-12 sm:py-14 lg:py-16">
      <div className="section-inner">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[632px]">
            <h3 className="section-sub-heading mb-4">Prime Locations</h3>
            <h2 className="text-gold-gradient max-w-[516px]">
              About Dubai&apos;s Premier Areas
            </h2>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="h-[3px] w-16 bg-gradient-to-r from-[#eec876] to-[#b3813d] lg:h-20 lg:w-[3px]" />
            <p className="max-w-[457px] text-sm font-medium leading-[26px] text-[#f5f5f5] md:text-base">
              Find your dream neighborhood and explore it with your home
              purchase advisor. We are here to help you find the perfect home
              for you.
            </p>
          </div>
        </div>

        <div
          ref={scrollRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`mt-10 flex touch-none select-none gap-10 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        >
          {LOCATIONS.map((location, index) => (
            <LocationCard
              key={`${location.name}-${index}`}
              image={location.image}
              name={location.name}
              subtitle={location.subtitle}
              width={290}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
