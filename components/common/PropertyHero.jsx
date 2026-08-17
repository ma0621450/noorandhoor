"use client";

import Image from "next/image";
import { CircleCheck, Search } from "lucide-react";
import starIcon from "@/public/images/buy/hero/star.svg";
import securityIcon from "@/public/images/buy/hero/security.png";
import googleLogo from "@/public/svgs/googlelogo.svg";
import Button from "@/components/ui/Button";
import Dropdown, { DropdownGroup } from "@/components/ui/Dropdown";
import HeroBackgroundCarousel, {
  HeroCarouselDots,
} from "@/components/ui/HeroBackgroundCarousel";

const LOCATIONS = [
  "Dubai Marina",
  "Downtown",
  "Palm Jumeirah",
  "Business Bay",
  "JBR",
];

const SALE_PRICES = ["0 - 500K", "500K - 1M", "1M - 5M", "5M+"];
const RENT_PRICES = ["0 - 50K", "50K - 100K", "100K - 200K", "200K+"];

const STANDARD_TRUST_SIGNALS = [
  { icon: starIcon, lines: ["Rated 4.95 by", "Global Investors"] },
  { icon: securityIcon, lines: ["150+ Partners", "Registered"] },
  { icon: googleLogo, lines: ["Over AED 120+", "transacted"] },
];

const DEFAULT_ACTIONS = [
  { label: "Book Free Consultation", variant: "outline" },
  { label: "Investment Guide", variant: "primary" },
];

const HOME_FEATURES = [
  "Serving UAE Clients",
  "Home & Business Experts",
  "Trusted Property Guides",
];

const PRESETS = {
  home: {
    title: "Explore Your Dream Property in UAE",
    description:
      "Your trusted UAE real estate firm offering expert guidance for property buying, selling, and investment.",
    fields: [
      { key: "transaction", placeholder: "Rent", options: ["Rent", "Buy"] },
      { key: "location", placeholder: "Location", options: LOCATIONS },
      {
        key: "type",
        placeholder: "Property Type",
        options: ["Apartment", "Villa", "Penthouse", "Townhouse"],
      },
      { key: "price", placeholder: "Price Range", options: SALE_PRICES },
    ],
    features: HOME_FEATURES,
  },
  buy: {
    title: "Build Your Future on the UAE's Prime Real Estate",
    description:
      "Discover, compare, and secure premium UAE properties that support your lifestyle and long-term investment goals.",
    propertyTypes: ["Apartment", "Villa", "Penthouse", "Townhouse"],
    priceOptions: SALE_PRICES,
  },
  rent: {
    title: "Step into Luxury Rental Properties in UAE",
    description:
      "Curated collection of the world's most prestigious properties. Experience unparalleled luxury and timeless elegance.",
    propertyTypes: ["Apartment", "Villa", "Townhouse", "Penthouse"],
    priceOptions: RENT_PRICES,
  },
  sell: {
    title: "Your Dream Luxury Home Awaits in UAE",
    description:
      "Curated collection of the world's most prestigious properties. Experience unparalleled luxury and timeless elegance.",
    propertyTypes: [
      "Apartments",
      "Villas",
      "Townhouses",
      "Commercial spaces",
      "Penthouses",
    ],
    priceOptions: SALE_PRICES,
  },
  offplan: {
    title: "Off Plan Properties in UAE",
    description:
      "Off-plan properties in the UAE are real estate developments purchased directly from developers before construction is completed.",
    fields: [
      {
        key: "property-type",
        placeholder: "Property Type",
        options: ["Commercial", "Residential", "Default"],
      },
      {
        key: "property-status",
        placeholder: "Property Status",
        options: ["Ready", "Off plan", "Development phase"],
      },
      {
        key: "sales-status",
        placeholder: "Sales Status",
        options: ["Available property", "Prelaunch", "Sold out property"],
      },
      {
        key: "developer",
        placeholder: "Developer",
        options: ["Emaar", "Damac", "Sobha", "Azizi", "Nakheel"],
      },
      { key: "location", placeholder: "Location", options: LOCATIONS },
    ],
  },
  developers: {
    title: "Navigate the UAE's Real Estate Architects",
    description: "Explore trusted property developers and premier investments.",
    fields: [
      {
        key: "name",
        placeholder: "Developer Name",
        options: ["Emaar", "Damac", "Nakheel", "Sobha", "wasl", "Omniyat"],
      },
      {
        key: "region",
        placeholder: "Region",
        options: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"],
      },
      {
        key: "budget",
        placeholder: "Budget",
        options: ["0 - 1M", "1M - 5M", "5M - 10M", "10M+"],
      },
    ],
  },
};

function buildDefaultFields(propertyTypes, priceOptions) {
  return [
    { key: "type", placeholder: "Property Type", options: propertyTypes },
    { key: "location", placeholder: "Location", options: LOCATIONS },
    { key: "price", placeholder: "Price Range", options: priceOptions },
  ];
}

function HeroFilters({ prefix, fields }) {
  return (
    <div className="relative z-50 flex w-full max-w-6xl flex-col gap-3 lg:flex-row lg:items-center">
      <div className="grid w-full grid-cols-1 overflow-visible rounded-xl border border-white/25 bg-white/15 backdrop-blur-md sm:grid-cols-2 lg:flex lg:min-h-14 lg:items-stretch">
        <DropdownGroup>
          {fields.map((field) => (
            <Dropdown
              key={field.key}
              id={`${prefix}-${field.key}`}
              options={field.options}
              placeholder={field.placeholder}
              className="w-full border-b border-white/20 last:border-b-0 sm:[&:nth-child(odd)]:border-r sm:[&:nth-last-child(-n+2)]:border-b-0 lg:min-h-14 lg:min-w-[150px] lg:flex-1 lg:border-r lg:border-b-0 lg:last:border-r-0 xl:min-w-[180px]"
            />
          ))}
        </DropdownGroup>
      </div>

      <Button
        type="button"
        variant="primary"
        aria-label="Search properties"
        className="w-full gap-2 py-3 text-xs lg:hidden"
      >
        Search
        <Search className="h-4 w-4" strokeWidth={2.5} />
      </Button>

      <button
        type="button"
        aria-label="Search properties"
        className="hidden size-14 shrink-0 items-center justify-center rounded-full text-[#d6a85e] transition hover:scale-105 lg:flex"
      >
        <Search className="h-8 w-8" strokeWidth={2.25} />
      </button>
    </div>
  );
}

function TrustSignals({ signals }) {
  if (!signals.length) return null;

  return (
    <div className="grid w-full max-w-3xl grid-cols-1 gap-3 min-[480px]:grid-cols-3 sm:gap-6">
      {signals.map(({ icon, lines }) => (
        <div key={lines.join("-")} className="flex items-center justify-center gap-2">
          <Image
            src={icon}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 shrink-0 object-contain"
          />
          <p className="text-left text-xs font-semibold leading-5 text-[#f5f5f5] sm:text-sm">
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function PropertyHero({
  variant = "buy",
  title,
  description,
  filterPrefix,
  propertyTypes,
  priceOptions,
  fields,
  actions,
  trustSignals,
}) {
  const preset = PRESETS[variant] || PRESETS.buy;
  const resolvedPropertyTypes =
    propertyTypes || preset.propertyTypes || PRESETS.buy.propertyTypes;
  const resolvedPriceOptions =
    priceOptions || preset.priceOptions || SALE_PRICES;
  const resolvedFields =
    fields ||
    preset.fields ||
    buildDefaultFields(resolvedPropertyTypes, resolvedPriceOptions);
  const resolvedActions =
    actions?.length || preset.actions?.length
      ? actions || preset.actions
      : DEFAULT_ACTIONS;
  const resolvedTrustSignals =
    trustSignals?.length || preset.trustSignals?.length
      ? trustSignals || preset.trustSignals
      : STANDARD_TRUST_SIGNALS;

  return (
    <section className="relative isolate z-20 w-full overflow-x-clip">
      <HeroBackgroundCarousel overlayClassName="bg-black/60">
        <div className="relative flex min-h-svh w-full flex-col items-center justify-center gap-5 px-4 pt-28 pb-10 text-center sm:gap-7 sm:px-6 sm:pt-32 lg:gap-8 lg:px-10">
          <h1 className="text-gold-gradient max-w-[1120px] text-[clamp(2.25rem,7vw,5.125rem)] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            {title || preset.title}
          </h1>

          {preset.features?.length ? (
            <div className="flex max-w-4xl flex-wrap items-center justify-center gap-3 sm:gap-5">
              {preset.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CircleCheck className="h-5 w-5 shrink-0 text-[#ba8a44]" />
                  <p className="text-xs sm:text-sm lg:text-base">{feature}</p>
                </div>
              ))}
            </div>
          ) : null}

          <p className="max-w-[860px] text-sm leading-relaxed text-[#f5f5f5] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] sm:text-base md:text-lg lg:text-xl">
            {description || preset.description}
          </p>

          <HeroFilters
            prefix={filterPrefix || variant}
            fields={resolvedFields}
          />

          {resolvedActions.length ? (
            <div className="flex w-full max-w-[570px] flex-col gap-3 sm:flex-row sm:justify-center sm:gap-5">
              {resolvedActions.map((action) => (
                <Button
                  key={action.label}
                  variant={action.variant}
                  className="h-14 w-full rounded-xl text-xs tracking-[1.3px] sm:flex-1 sm:text-sm"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          ) : null}

          <TrustSignals signals={resolvedTrustSignals} />
          <HeroCarouselDots />
        </div>
      </HeroBackgroundCarousel>
    </section>
  );
}
