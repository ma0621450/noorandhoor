import Image from "next/image";
import { CircleCheck } from "lucide-react";
import starIcon from "@/public/images/buy/hero/star.svg";
import securityIcon from "@/public/images/buy/hero/security.png";
import googleLogo from "@/public/svgs/googlelogo.svg";
import Button from "@/components/ui/Button";
import HeroFilters from "@/components/common/HeroFilters";
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
      "Discover, compare, and secure premium UAE properties that support your lifestyle and long term investment goals.",
    propertyTypes: ["Apartment", "Villa", "Penthouse", "Townhouse"],
    priceOptions: SALE_PRICES,
    trustSignals: [
      { icon: starIcon, lines: ["1000+", "Premium Properties"] },
      { icon: securityIcon, lines: ["Trusted Developer", "Network"] },
      { icon: googleLogo, lines: ["Smart Investment", "Opportunities"] },
    ],
  },
  rent: {
    title: "Your Trusted Partner for Renting Property in the UAE",
    description:
      "We connect you with verified landlords and quality rentals across the UAE, making renting simple and stress-free.",
    propertyTypes: ["Apartment", "Villa", "Townhouse", "Penthouse"],
    priceOptions: RENT_PRICES,
    trustSignals: [
      { icon: starIcon, lines: ["900+", "Verified Rental Properties"] },
      { icon: securityIcon, lines: ["Prime Locations", "Across the UAE"] },
      { icon: googleLogo, lines: ["Complete", "Rental Support"] },
    ],
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
  contact: {
    title: "Contact Us",
    description:
      "Get in touch with Noor and Hoor Properties. Speak with our team in Dubai about buying, selling, renting, or investing.",
    fields: [],
    actions: [
      { label: "Send a Message", variant: "primary" },
      { label: "Call Our Team", variant: "outline" },
    ],
  },
  about: {
    title: "About Us",
    description:
      "Noor & Hoor Properties connects clients with exceptional real estate opportunities across Dubai, with local knowledge and personal service.",
    fields: [],
  },
  blog: {
    title: "Blog & Latest News",
    description:
      "Market updates, investment guidance, and neighbourhood insight from the Noor & Hoor Properties team.",
    fields: [],
  },
};

function buildDefaultFields(propertyTypes, priceOptions) {
  return [
    { key: "type", placeholder: "Property Type", options: propertyTypes },
    { key: "location", placeholder: "Location", options: LOCATIONS },
    { key: "price", placeholder: "Price Range", options: priceOptions },
  ];
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
    (preset.propertyTypes
      ? buildDefaultFields(resolvedPropertyTypes, resolvedPriceOptions)
      : []);
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

          {resolvedFields.length > 0 ? (
            <HeroFilters
              prefix={filterPrefix || variant}
              fields={resolvedFields}
            />
          ) : null}

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
