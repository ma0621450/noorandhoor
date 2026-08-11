"use client";

import Image from "next/image";
import backgroundImage from "@/public/images/landingpage/landingpagecarousel1.jpg";
import { Search, Shield, Star } from "lucide-react";
import google from "@/public/svgs/googlelogo.svg";
import Dropdown, { DropdownGroup } from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";

const TRUST_SIGNALS = [
  { icon: Star, text: "Rated 4.95 by Global investors" },
  { icon: Shield, text: "150+ Partners Registered" },
  { icon: null, text: "Over AED 120M+ transacted", google: google },
];

const FILTER_BORDER =
  "max-[599px]:border-b max-[599px]:border-white/20 max-[599px]:last:border-b-0 max-[849px]:w-full max-[849px]:min-w-0";

function PageHeroFilterBar() {
  return (
    <div className="relative z-50 flex w-full flex-col gap-3 min-[850px]:w-auto min-[850px]:flex-row min-[850px]:items-center min-[850px]:gap-3">
      <div className="w-full rounded-xl border border-white/20 bg-white/20 p-3 backdrop-blur-md max-[849px]:grid max-[849px]:grid-cols-1 min-[600px]:max-[849px]:grid-cols-2 min-[850px]:flex min-[850px]:w-auto min-[850px]:items-center min-[850px]:gap-4">
        <DropdownGroup>
          <Dropdown
            id="property-type"
            options={["Apartment", "Villa", "Penthouse", "Townhouse"]}
            placeholder="Property Type"
            className={FILTER_BORDER}
          />

          <Dropdown
            id="location"
            options={["Dubai Marina", "Downtown", "Palm Jumeirah", "Business Bay", "JBR"]}
            placeholder="Location"
            className={FILTER_BORDER}
          />

          <Dropdown
            id="price-range"
            options={["0 - 500K", "500K - 1M", "1M - 5M", "5M+"]}
            placeholder="Price Range"
            className={FILTER_BORDER}
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
}

export default function PageHero({ title, description }) {
  return (
    <section className="relative z-20 h-svh w-full overflow-hidden">
      <Image
        src={backgroundImage}
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="absolute inset-0 flex h-full flex-col items-center justify-center gap-5 px-4 pt-24 pb-8 text-center sm:gap-6 md:gap-8">
        <h1 className="text-gold-gradient max-w-[1120px]">{title}</h1>

        <p className="max-w-[700px] text-sm sm:text-base md:text-lg lg:text-xl">
          {description}
        </p>

        <div className="w-full min-[850px]:w-auto">
          <PageHeroFilterBar />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Button variant="outline" className="text-xs sm:text-sm">
            Book Free Consultation
          </Button>
          <Button variant="primary" className="text-xs sm:text-sm">
            Investment Guide
          </Button>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {TRUST_SIGNALS.map(({ icon: Icon, text, google }) => (
            <div key={text} className="flex items-center gap-2 max-w-[160px]">
              {google ? (
                <Image src={google} alt="Google" width={28} height={28} />
              ) : (
                <Icon className="h-[28px] w-[28px] stroke-[#ba8a44]" strokeWidth={2} />
              )}
              <p className="text-xs sm:text-sm">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
