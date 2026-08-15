"use client";

import Image from "next/image";
import { Search, Home, Shield } from "lucide-react";
import googleLogo from "@/public/svgs/googlelogo.svg";
import Dropdown, { DropdownGroup } from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";
import HeroBackgroundCarousel, {
  HeroCarouselDots,
} from "@/components/ui/HeroBackgroundCarousel";

const TRUST_SIGNALS = [
  { icon: "home", text: "100+ Properties" },
  { icon: "shield", text: "150+ Partners Registered" },
  { icon: "google", text: "120+ Transactions" },
];

const FILTER_BORDER =
  "max-[599px]:border-b max-[599px]:border-white/20 max-[599px]:last:border-b-0 max-[849px]:w-full max-[849px]:min-w-0 min-[850px]:border-r min-[850px]:border-white/30 min-[850px]:last:border-r-0";

function FilterBar() {
  return (
    <div className="relative z-50 flex w-full max-w-[720px] flex-col gap-3 min-[850px]:w-auto min-[850px]:max-w-none min-[850px]:flex-row min-[850px]:items-center">
      <div className="w-full rounded-[10px] border border-white/40 bg-white/15 backdrop-blur-md max-[849px]:grid max-[849px]:grid-cols-1 min-[600px]:max-[849px]:grid-cols-2 min-[850px]:flex min-[850px]:h-14 min-[850px]:w-auto min-[850px]:items-center min-[850px]:overflow-visible min-[850px]:rounded-[10px]">
        <DropdownGroup>
          <Dropdown
            id="apt-property-type"
            options={["Home", "Studio", "Duplex", "Serviced", "Luxury Residences"]}
            placeholder="Property Type"
            className={`min-[850px]:h-14 min-[850px]:w-[217px] ${FILTER_BORDER}`}
          />
          <Dropdown
            id="apt-location"
            options={["Dubai Marina", "Downtown", "Palm Jumeirah", "Business Bay", "JBR"]}
            placeholder="Location"
            className={`min-[850px]:h-14 min-[850px]:w-[187px] ${FILTER_BORDER}`}
          />
          <Dropdown
            id="apt-price-range"
            options={["0 - 500K", "500K - 1M", "1M - 5M", "5M+"]}
            placeholder="Price Range"
            className={`min-[850px]:h-14 min-[850px]:w-[217px] ${FILTER_BORDER}`}
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
        className="hidden size-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#bc8741] to-[#d6a85e] transition hover:scale-105 min-[850px]:flex"
      >
        <Search className="text-[#111]" width={22} height={22} strokeWidth={2.5} />
      </button>
    </div>
  );
}

function TrustIcon({ type }) {
  if (type === "google") {
    return (
      <Image src={googleLogo} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
    );
  }
  if (type === "shield") {
    return <Shield className="h-7 w-7 text-[#ba8a44]" strokeWidth={1.5} />;
  }
  return <Home className="h-7 w-7 text-[#ba8a44]" strokeWidth={1.5} />;
}

export default function ApartmentsHero() {
  return (
    <section className="relative isolate z-20 min-h-svh w-full overflow-x-clip overflow-y-visible">
      <HeroBackgroundCarousel overlayClassName="bg-black/65">
        <div className="absolute inset-0 flex h-full flex-col items-center justify-center gap-8 px-4 pt-24 pb-8 text-center sm:gap-[38px] sm:px-8 lg:px-20">
          <h1 className="text-gold-gradient max-w-[1100px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Discover Luxury Apartments in the UAE.
          </h1>

          <p className="max-w-[720px] text-sm leading-[1.5] text-[#f5f5f5] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] sm:text-base md:text-lg lg:text-xl lg:leading-[30px]">
            Curated collection of the world&apos;s most prestigious properties.
            Experience unparalleled luxury and timeless elegance.
          </p>

          <FilterBar />

          <div className="flex w-full max-w-[570px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-[38px]">
            <Button
              variant="outline"
              className="h-14 w-full min-w-0 rounded-xl border-[#eec876] text-xs tracking-[1.3px] sm:w-[266px] sm:text-sm"
            >
              Free Consultation
            </Button>
            <Button
              variant="primary"
              className="h-14 w-full min-w-0 rounded-xl text-xs tracking-[1.3px] sm:w-[266px] sm:text-sm"
            >
              Investment Guide
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-10">
            {TRUST_SIGNALS.map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <TrustIcon type={icon} />
                <p className="text-left text-xs font-semibold text-[#f5f5f5] sm:text-sm">
                  {text}
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
