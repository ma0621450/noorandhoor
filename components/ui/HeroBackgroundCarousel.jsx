"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useState } from "react";
import heroImage from "@/public/images/landingpage/landingpagebg.jpg";
import carouselImage1 from "@/public/images/landingpage/landingpagecarousel1.jpg";
import carouselImage2 from "@/public/images/landingpage/landingpagecarousel2.jpg";
import carouselImage3 from "@/public/images/landingpage/landingpagecarousel3.jpg";
import carouselImage4 from "@/public/images/landingpage/landingpagecarousel4.jpg";

export const HERO_SLIDE_IMAGES = [
  heroImage,
  carouselImage1,
  carouselImage2,
  carouselImage3,
  carouselImage4,
];

const SLIDE_INTERVAL = 5000;
const HeroCarouselContext = createContext({
  activeIndex: 0,
  goToSlide: () => {},
});

export function HeroCarouselDots({ className = "" }) {
  const { activeIndex, goToSlide } = useContext(HeroCarouselContext);

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      role="tablist"
      aria-label="Hero slides"
    >
      {HERO_SLIDE_IMAGES.map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goToSlide(index)}
            className={`h-2 cursor-pointer rounded-full transition-all duration-300 hover:bg-[#ba8a44]/80 ${
              isActive ? "w-[60px] bg-[#ba8a44]" : "w-2 bg-white/40"
            }`}
          />
        );
      })}
    </div>
  );
}

export default function HeroBackgroundCarousel({
  overlayClassName = "bg-black/70",
  objectPosition = "object-[50%_20%]",
  children,
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDE_IMAGES.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <HeroCarouselContext.Provider value={{ activeIndex, goToSlide }}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {HERO_SLIDE_IMAGES.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="100vw"
              priority={index === 0}
              className={`object-cover ${objectPosition}`}
            />
          </div>
        ))}
        <div className={`absolute inset-0 ${overlayClassName}`} />
      </div>
      {children}
    </HeroCarouselContext.Provider>
  );
}
