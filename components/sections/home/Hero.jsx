"use client";

import Image from "next/image";
import heroImage from "@/public/images/landingpage/landingpagebg.jpg";
import carouselImage1 from "@/public/images/landingpage/landingpagecarousel1.jpg";
import carouselImage2 from "@/public/images/landingpage/landingpagecarousel2.jpg";
import carouselImage3 from "@/public/images/landingpage/landingpagecarousel3.jpg";
import carouselImage4 from "@/public/images/landingpage/landingpagecarousel4.jpg";
import { CircleCheck, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Dropdown, { DropdownGroup } from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";

const SLIDE_IMAGES = [heroImage, carouselImage1, carouselImage2, carouselImage3, carouselImage4];

const FEATURES = [
    "Serving Clients Across the UAE",
    "Residential & Commercial Experts",
    "Trusted Property Guides",
];

const SLIDE_INTERVAL = 5000;

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % SLIDE_IMAGES.length);
        }, SLIDE_INTERVAL);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative z-20 h-svh w-full overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                {SLIDE_IMAGES.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeIndex ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <Image
                            src={image}
                            alt="Hero background"
                            fill
                            sizes="100vw"
                            priority={index === 0}
                            className="object-cover object-[50%_20%]"
                        />
                    </div>
                ))}
            </div>

            <div className="absolute inset-0 bg-black/70" />

            <div className="absolute inset-0 flex h-full flex-col items-center justify-center gap-4 px-4 pt-24 pb-6 text-center sm:gap-6 md:gap-8">
                <h1 className="text-gold-gradient">
                    Explore Your Dream Property in UAE
                </h1>

                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
                    {FEATURES.map((description, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <CircleCheck className="stroke-[#ba8a44]" />
                            <p className="text-sm sm:text-base">{description}</p>
                        </div>
                    ))}
                </div>

                <p className="max-w-[744px] text-sm sm:text-base md:text-lg lg:text-2xl">
                    Your trusted UAE real estate firm offering expert guidance for property buying, selling, and investment.
                </p>

                <div className="w-full min-[850px]:w-auto">
                    <FilterBar />
                </div>
                <div className="flex items-center gap-2" aria-hidden="true">
                    {SLIDE_IMAGES.map((_, index) => (
                        <span
                            key={index}
                            className={`h-2 w-2 rounded-full transition-colors duration-300 ${index === activeIndex ? "bg-[#ba8a44] w-[60px]" : "bg-white/40"
                                }`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Hero;

const FILTER_MOBILE_BORDER =
    "max-[599px]:border-b max-[599px]:border-white/20 max-[599px]:last:border-b-0 max-[849px]:w-full max-[849px]:min-w-0";

export const FilterBar = () => {
    return (
        <div className="relative z-50 flex w-full flex-col gap-3 min-[850px]:w-auto min-[850px]:flex-row min-[850px]:items-center min-[850px]:gap-3">
            <div className="w-full rounded-xl border border-white/20 bg-white/20 p-3 backdrop-blur-md max-[849px]:grid max-[849px]:grid-cols-1 min-[600px]:max-[849px]:grid-cols-2 min-[850px]:flex min-[850px]:w-auto min-[850px]:items-center min-[850px]:gap-4">
                <DropdownGroup>
                    <Dropdown
                        id="rent"
                        options={["Rent", "Buy"]}
                        placeholder="Rent"
                        className={FILTER_MOBILE_BORDER}
                    />

                    <Dropdown
                        id="location"
                        options={["Location", "Dubai Marina", "Downtown"]}
                        placeholder="Location"
                        className={FILTER_MOBILE_BORDER}
                    />

                    <div
                        aria-hidden="true"
                        className="hidden h-px bg-white/20 min-[600px]:max-[849px]:col-span-2 min-[600px]:max-[849px]:block"
                    />

                    <Dropdown
                        id="property-type"
                        options={["Property Type", "Apartment", "Villa"]}
                        placeholder="Property Type"
                        className={FILTER_MOBILE_BORDER}
                    />

                    <Dropdown
                        id="price-range"
                        options={["Price Range", "0 - 500K", "500K - 1M"]}
                        placeholder="Price Range"
                        className={FILTER_MOBILE_BORDER}
                    />
                </DropdownGroup>
            </div>

            <Button
                type="button"
                variant="primary"
                aria-label="Search properties"
                className="w-full gap-2 py-3 text-xs min-[850px]:hidden"
            >
                <span>Search</span>
                <Search className="h-4 w-4" strokeWidth={2.5} />
            </Button>

            <button
                type="button"
                aria-label="Search properties"
                className="hidden shrink-0 rounded-full p-3 transition hover:scale-105 min-[850px]:block"
            >
                <Search
                    className="cursor-pointer text-[#ba8a44]"
                    width={30}
                    height={30}
                    strokeWidth={2.5}
                />
            </button>
        </div>
    );
};
