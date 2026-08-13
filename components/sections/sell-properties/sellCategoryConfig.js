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

export const HOMES_PER_PAGE = 8;
export const TOTAL_PAGES = 3;

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

const DEFAULT_HERO = {
  heroTitle: "Your Dream Luxury Home Awaits in UAE",
  heroDescription:
    "Curated collection of the world's most prestigious properties. Experience unparalleled luxury and timeless elegance.",
  propertyTypes: DEFAULT_PROPERTY_TYPES,
};

export const SELL_CATEGORIES = {
  "noor-hoor": {
    key: "noor-hoor",
    path: "/sell/noor-hoor",
    eyebrow: "Noor & Hoor Properties",
    heading: "Apartments",
    ...DEFAULT_HERO,
    metaTitle: "Noor & Hoor Properties | Sell",
    metaDescription:
      "Browse Noor & Hoor apartments and properties for sale across the UAE.",
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
    ...DEFAULT_HERO,
    metaTitle: "Selling Properties | Noor and Hoor",
    metaDescription:
      "Browse properties for sale in the UAE. Apartments, villas, and more with Noor and Hoor Properties.",
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
    ...DEFAULT_HERO,
    metaTitle: "Selling Apartment | Noor and Hoor",
    metaDescription:
      "List and browse apartments for sale in the UAE with Noor and Hoor Properties.",
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
