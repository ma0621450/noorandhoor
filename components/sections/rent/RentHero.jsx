"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import starIcon from "@/public/images/buy/hero/star.svg";
import securityIcon from "@/public/images/buy/hero/security.png";
import googleLogo from "@/public/svgs/googlelogo.svg";
import Dropdown, { DropdownGroup } from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";
import HeroBackgroundCarousel, {
  HeroCarouselDots,
} from "@/components/ui/HeroBackgroundCarousel";

const TRUST_SIGNALS = [
  { icon: starIcon, text: ["Rated 4.95 by", "Global investors"] },
  { icon: securityIcon, text: ["150+ Partners", "Registered"] },
  { icon: googleLogo, text: ["Over AED 120+", "transacted"] },
];

const FILTER_BORDER =
  "max-[599px]:border-b max-[599px]:border-[#eec876]/40 max-[599px]:last:border-b-0 max-[849px]:w-full max-[849px]:min-w-0 min-[850px]:border-r min-[850px]:border-[#eec876] min-[850px]:last:border-r-0";

function FilterBar() {
  return (
    <div className="relative z-50 flex w-full max-w-[720px] flex-col gap-3 min-[850px]:w-auto min-[850px]:max-w-none min-[850px]:flex-row min-[850px]:items-center">
      <div className="w-full rounded-[10px] border border-[#eec876]/50 bg-white/20 backdrop-blur-md max-[849px]:grid max-[849px]:grid-cols-1 min-[600px]:max-[849px]:grid-cols-2 min-[850px]:flex min-[850px]:h-14 min-[850px]:w-auto min-[850px]:items-center min-[850px]:overflow-hidden min-[850px]:rounded-[10px] min-[850px]:border-0 min-[850px]:p-0">
        <DropdownGroup>
          <Dropdown
            id="rent-property-type"
            options={["Apartment", "Villa", "Townhouse", "Penthouse"]}
            placeholder="Property Type"
            className={`min-[850px]:h-14 min-[850px]:w-[217px] ${FILTER_BORDER}`}
          />
          <Dropdown
            id="rent-location"
            options={["Dubai Marina", "Downtown", "Palm Jumeirah", "Business Bay", "JBR"]}
            placeholder="Location"
            className={`min-[850px]:h-14 min-[850px]:w-[187px] ${FILTER_BORDER}`}
          />
          <Dropdown
            id="rent-price-range"
            options={["0 - 50K", "50K - 100K", "100K - 200K", "200K+"]}
            placeholder="Price Range"
            className={`min-[850px]:h-14 min-[850px]:w-[217px] ${FILTER_BORDER}`}
          />
        </DropdownGroup>
      </div>

      <Button
        type="button"
        variant="primary"
        aria-label="Search rentals"
        className="w-full gap-2 py-3 text-xs min-[850px]:hidden"
      >
        <span>Search</span>
        <Search className="h-4 w-4" strokeWidth={2.5} />
      </Button>

      <button
        type="button"
        aria-label="Search rentals"
        className="hidden size-[56px] shrink-0 cursor-pointer items-center justify-center rounded transition hover:scale-105 min-[850px]:flex"
      >
        <Search className="text-[#ba8a44]" width={39} height={39} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default function RentHero() {
  return (
    <section className="relative isolate z-20 h-svh min-h-[691px] w-full overflow-hidden">
      <HeroBackgroundCarousel overlayClassName="bg-black/60">
        <div className="absolute inset-0 flex h-full flex-col items-center justify-center gap-[38px] px-4 pt-24 pb-8 text-center sm:px-8 lg:px-20">
          <h1 className="text-gold-gradient max-w-[1121px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Step into Luxury Rental Properties in UAE
          </h1>

          <p className="max-w-[744px] text-sm leading-[1.4] text-[#f5f5f5] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] sm:text-base md:text-lg lg:text-2xl lg:leading-[33px]">
            Curated collection of the world&apos;s most prestigious properties.
            Experience unparalleled luxury and timeless elegance.
          </p>

          <FilterBar />

          <div className="flex w-full max-w-[570px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-[38px]">
            <Button
              variant="outline"
              className="h-14 w-full min-w-0 rounded-xl border-[#eec876] text-xs tracking-[1.3px] sm:w-[266px] sm:text-sm"
            >
              Book Free Consultation
            </Button>
            <Button
              variant="primary"
              className="h-14 w-full min-w-0 rounded-xl text-xs tracking-[1.3px] sm:w-[266px] sm:text-sm"
            >
              Investment Guide
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-[30px]">
            {TRUST_SIGNALS.map(({ icon, text }) => (
              <div key={text[0]} className="flex items-center gap-2">
                <Image src={icon} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
                <p className="text-left text-xs font-semibold leading-[26px] text-[#f5f5f5] sm:text-base">
                  {text[0]}
                  <br />
                  {text[1]}
                </p>
              </div>
            ))}
          </div>

          <HeroCarouselDots />
        </div>
      </HeroBackgroundCarousel>
    </section>
  );
}
