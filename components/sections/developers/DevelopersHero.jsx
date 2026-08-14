"use client";

import { Search } from "lucide-react";
import Dropdown, { DropdownGroup } from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";
import HeroBackgroundCarousel, {
  HeroCarouselDots,
} from "@/components/ui/HeroBackgroundCarousel";
import OffPlanTrustSignals from "@/components/sections/offplan/OffPlanTrustSignals";

const FILTER_BORDER =
  "max-[599px]:border-b max-[599px]:border-white/25 max-[599px]:last:border-b-0 max-[849px]:w-full max-[849px]:min-w-0 min-[850px]:border-r min-[850px]:border-white/25 min-[850px]:last:border-r-0";

function FilterBar() {
  return (
    <div className="relative z-50 flex w-full max-w-[720px] flex-col gap-3 min-[850px]:w-auto min-[850px]:max-w-none min-[850px]:flex-row min-[850px]:items-center">
      <div className="w-full rounded-[10px] border border-white/20 bg-white/20 backdrop-blur-[6px] max-[849px]:grid max-[849px]:grid-cols-1 min-[600px]:max-[849px]:grid-cols-2 min-[850px]:flex min-[850px]:h-14 min-[850px]:overflow-hidden min-[850px]:rounded-[10px] min-[850px]:border-0">
        <DropdownGroup>
          <Dropdown
            id="dev-name"
            options={["Emaar", "Damac", "Nakheel", "Sobha", "wasl", "Omniyat"]}
            placeholder="Developer Name"
            className={`min-[850px]:h-14 min-[850px]:w-[217px] ${FILTER_BORDER}`}
          />
          <Dropdown
            id="dev-region"
            options={["Dubai", "Abu Dhabi", "Sharjah", "Ajman"]}
            placeholder="Region"
            className={`min-[850px]:h-14 min-[850px]:w-[217px] ${FILTER_BORDER}`}
          />
          <Dropdown
            id="dev-budget"
            options={["0 - 1M", "1M - 5M", "5M - 10M", "10M+"]}
            placeholder="Budget"
            className={`min-[850px]:h-14 min-[850px]:w-[187px] ${FILTER_BORDER}`}
          />
        </DropdownGroup>
      </div>

      <Button
        type="button"
        variant="primary"
        aria-label="Search developers"
        className="w-full gap-2 py-3 text-xs min-[850px]:hidden"
      >
        <span>Search</span>
        <Search className="h-4 w-4" strokeWidth={2.5} />
      </Button>

      <button
        type="button"
        aria-label="Search developers"
        className="hidden size-[60px] shrink-0 cursor-pointer items-center justify-center rounded backdrop-blur-[6px] transition hover:scale-105 min-[850px]:flex"
      >
        <Search className="text-[#d6a85e]" width={39} height={39} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default function DevelopersHero() {
  return (
    <section className="relative isolate z-20 h-svh min-h-[691px] w-full overflow-hidden">
      <HeroBackgroundCarousel overlayClassName="bg-black/60">
        <div className="absolute inset-0 flex h-full flex-col items-center justify-center gap-[38px] px-4 pt-24 pb-8 text-center sm:px-8 lg:px-20">
          <h1 className="text-gold-gradient max-w-[1121px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Navigate the UAE&apos;s Real Estate Architects
          </h1>

          <p className="max-w-[744px] text-sm font-light leading-[1.38] text-[#f5f5f5] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] sm:text-base md:text-lg lg:text-2xl lg:leading-[33px]">
            Explore Trusted Property Developers &amp; Premier Investments.
          </p>

          <FilterBar />

          <Button
            variant="primary"
            className="h-14 w-full max-w-[304px] rounded-xl text-xs tracking-[1.3px] backdrop-blur-[6px] sm:text-sm"
          >
            Find My Developer Advisor
          </Button>

          <OffPlanTrustSignals />
          <HeroCarouselDots />
        </div>
      </HeroBackgroundCarousel>
    </section>
  );
}
