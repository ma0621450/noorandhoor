import apartmentsImage from "@/public/images/buy/apartments.png";
import villasImage from "@/public/images/buy/villas.png";
import penthouseImage from "@/public/images/buy/penthouse.png";
import otherPropertiesImage from "@/public/images/buy/otherproperties.png";
import townhousesImage from "@/public/images/buy/townhouses.png";
import luxuryHome from "@/public/images/landingpage/LuxuryHome.png";
import propertyImg from "@/public/images/landingpage/propertyImg.png";
import carousel1 from "@/public/images/landingpage/landingpagecarousel1.jpg";
import carousel2 from "@/public/images/landingpage/landingpagecarousel2.jpg";
import carousel3 from "@/public/images/landingpage/landingpagecarousel3.jpg";
import carousel4 from "@/public/images/landingpage/landingpagecarousel4.jpg";
import starIcon from "@/public/images/buy/hero/star.svg";
import securityIcon from "@/public/images/buy/hero/security.png";
import googleLogo from "@/public/svgs/googlelogo.svg";
import { CONTACT_FORM_HREF } from "@/components/sections/contact/contactData";

export const HOMES_PER_PAGE = 9;
export const TOTAL_PAGES = 3;

const TRUST_ICONS = [starIcon, securityIcon, googleLogo];

function trustSignals(items) {
  return items.map((lines, index) => ({
    icon: TRUST_ICONS[index % TRUST_ICONS.length],
    lines,
  }));
}

function heroActions(labels) {
  return labels.map((label, index) => ({
    label,
    variant: index === 0 ? "primary" : "outline",
    href: CONTACT_FORM_HREF,
  }));
}

const LOCATIONS = [
  "Ajman, United Arab Emirates",
  "Dubai, United Arab Emirates",
  "Sharjah, United Arab Emirates",
  "Abu Dhabi, United Arab Emirates",
];

const DEFAULT_PROPERTY_TYPES = [
  "Apartments",
  "Villas",
  "Townhouses",
  "Commercial spaces",
  "Penthouses",
];

const SHARED_SETS = [
  [apartmentsImage, carousel1, propertyImg],
  [carousel2, apartmentsImage, luxuryHome],
  [carousel3, penthouseImage, otherPropertiesImage],
  [villasImage, carousel4, luxuryHome],
  [townhousesImage, apartmentsImage, carousel1],
  [penthouseImage, carousel2, propertyImg],
  [otherPropertiesImage, carousel3, luxuryHome],
  [luxuryHome, apartmentsImage, carousel4],
];

function buildHomes({ titles, imageSets, slugs, locations }) {
  return Array.from({ length: 24 }, (_, i) => {
    const title = titles[i % titles.length];
    return {
      id: i + 1,
      title,
      location: locations[i % locations.length],
      featured: i % 3 === 0,
      slug: slugs[i % slugs.length],
      images: imageSets[i % imageSets.length],
      features: { bedroom: 6, bathroom: 2, area: 2900 },
      price: 45000000,
    };
  });
}

const APARTMENT_TITLES = [
  "Palm Jumeirah Villa",
  "Spacious Apartment",
  "Downtown Apartment",
  "Two-Bedroom With Sauna",
  "Triplex Apartment",
  "Two-Bedroom With Storage",
  "Loft Conversion Apartment",
  "Luxury Apartment With Pool",
  "New Construction Apartment",
];

const APARTMENT_SLUGS = [
  "palm-jumeirah-villa",
  "spacious-apartment",
  "downtown-apartment",
  "two-bedroom-with-sauna",
  "triplex-apartment",
  "two-bedroom-with-storage",
  "loft-conversion-apartment",
  "luxury-apartment-with-pool",
  "new-construction-apartment",
];

export const SELL_CATEGORIES = {
  "noor-hoor": {
    key: "noor-hoor",
    path: "/sell/noor-hoor",
    eyebrow: "Noor & Hoor Properties",
    heading: "Apartments",
    heroTitle: "Sell Your Property With The Right Experts",
    heroDescription:
      "Maximize your property's value with expert market guidance, strategic marketing, and access to qualified buyers across the UAE.",
    metaTitle: "Noor & Hoor Properties | Sell",
    metaDescription:
      "Maximize your property's value with expert market guidance, strategic marketing, and access to qualified buyers across the UAE.",
    ctaHeading: "Not Sure How To Start Selling Your Property?",
    ctaDescription:
      "Whatever you're selling, our team is ready to guide you with the right strategy, honest pricing, and complete support from start to finish.",
    heroActions: heroActions([
      "List Your Property",
      "Request a Property Valuation",
    ]),
    trustSignals: trustSignals([
      ["500+", "Properties Sold"],
      ["100+", "Active Investor Connections"],
      ["50+", "UAE Communities Covered"],
    ]),
    propertyTypes: DEFAULT_PROPERTY_TYPES,
    filterPrefix: "sell-nh",
    homes: buildHomes({
      titles: APARTMENT_TITLES,
      imageSets: SHARED_SETS,
      slugs: APARTMENT_SLUGS,
      locations: LOCATIONS,
    }),
  },
  properties: {
    key: "properties",
    path: "/sell/properties",
    eyebrow: "Selling Properties",
    heading: "Apartments",
    heroTitle: "Turn Your Property Into A Successful Sale",
    heroDescription:
      "Your property deserves more than a listing. Put it in front of the right buyers, create stronger opportunities, and move toward a sale that delivers.",
    metaTitle: "Selling Properties | Noor and Hoor",
    metaDescription:
      "Your property deserves more than a listing. Put it in front of the right buyers, create stronger opportunities, and move toward a sale that delivers.",
    ctaHeading: "Thinking Of Putting Your Property On The Market?",
    ctaDescription:
      "Take the first step with a team that handles pricing, marketing, and negotiation, so you don't have to.",
    heroActions: heroActions(["Sell Your Property", "Get a Free Valuation"]),
    trustSignals: trustSignals([
      ["500+", "Properties Sold"],
      ["30+", "Prime UAE Locations"],
      ["4.9/5", "Seller Experience Rating"],
    ]),
    propertyTypes: DEFAULT_PROPERTY_TYPES,
    filterPrefix: "sell-prop",
    homes: buildHomes({
      titles: APARTMENT_TITLES,
      imageSets: SHARED_SETS,
      slugs: APARTMENT_SLUGS,
      locations: LOCATIONS,
    }),
  },
  apartments: {
    key: "apartments",
    path: "/sell/apartments",
    eyebrow: "Selling Apartment",
    heading: "Apartments",
    heroTitle: "Sell Your Apartment At Its True Value",
    heroDescription:
      "Showcase your apartment to the right buyers with expert pricing, targeted exposure, and a smooth selling experience from listing to closing.",
    metaTitle: "Selling Apartment | Noor and Hoor",
    metaDescription:
      "Showcase your apartment to the right buyers with expert pricing, targeted exposure, and a smooth selling experience from listing to closing.",
    ctaHeading: "Want The Best Price For Your Apartment?",
    ctaDescription:
      "From pricing to closing, our team helps you sell your apartment quickly and confidently, backed by real market insight.",
    heroActions: heroActions([
      "List Your Apartment",
      "Get Your Property Valued",
    ]),
    trustSignals: trustSignals([
      ["250+", "Apartments Sold"],
      ["18 Days", "Average Time to First Offer"],
      ["97%", "of Asking Price Achieved"],
    ]),
    propertyTypes: DEFAULT_PROPERTY_TYPES,
    filterPrefix: "sell-apt",
    homes: buildHomes({
      titles: [
        "Spacious Apartment",
        "Downtown Apartment",
        "Two-Bedroom With Sauna",
        "Triplex Apartment",
        "Two-Bedroom With Storage",
        "Loft Conversion Apartment",
        "Luxury Apartment With Pool",
        "New Construction Apartment",
      ],
      imageSets: SHARED_SETS,
      slugs: [
        "spacious-apartment",
        "downtown-apartment",
        "two-bedroom-with-sauna",
        "triplex-apartment",
        "two-bedroom-with-storage",
        "loft-conversion-apartment",
        "luxury-apartment-with-pool",
        "new-construction-apartment",
      ],
      locations: LOCATIONS,
    }),
  },
};

export function getSellCategory(key) {
  return SELL_CATEGORIES[key];
}
