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

const TRUST_ICONS = [starIcon, securityIcon, googleLogo];

function trustSignals(items) {
  return items.map((lines, index) => ({
    icon: TRUST_ICONS[index % TRUST_ICONS.length],
    lines,
  }));
}

export const HOMES_PER_PAGE = 8;
export const TOTAL_PAGES = 3;

const LOCATIONS = [
  "Ajman, United Arab Emirates",
  "Dubai, United Arab Emirates",
  "Sharjah, United Arab Emirates",
  "Abu Dhabi, United Arab Emirates",
];

const DUBAI_LOCATIONS = [
  "Dubai Marina, Dubai",
  "Downtown Dubai, Dubai",
  "Palm Jumeirah, Dubai",
  "Business Bay, Dubai",
  "JBR, Dubai",
  "Jumeirah Village Circle, Dubai",
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
      price: 120000,
    };
  });
}

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

export const RENT_CATEGORIES = {
  properties: {
    key: "properties",
    path: "/rent/properties",
    eyebrow: "Properties Rent",
    heading: "Properties",
    heroTitle: "Find A Rental That Feels Like Home In The UAE",
    heroDescription:
      "Looking for a place to call home without the long-term commitment? Explore verified rental apartments across the UAE, chosen to match your lifestyle, budget, and location needs.",
    metaTitle: "Properties Rent | Noor and Hoor",
    metaDescription:
      "Looking for a place to call home without the long-term commitment? Explore verified rental apartments across the UAE, chosen to match your lifestyle, budget, and location needs.",
    ctaHeading: "Ready to Find a Rental Property You'll Actually Love?",
    ctaDescription:
      "Let us help you secure the perfect rental property quickly, easily, and with complete peace of mind.",
    trustSignals: trustSignals([
      ["5,000+", "Active Rental Listings"],
      ["72 Hours", "Average Move-In Time"],
      ["95%", "Tenant Renewal Rate"],
    ]),
    filterPrefix: "prop-rent",
    propertyTypes: ["Apartments", "Offices", "Duplex", "Retail units", "Studios"],
    homes: buildHomes({
      titles: [
        "Spacious Apartment With Parking",
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
        "spacious-apartment-with-parking",
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
  apartments: {
    key: "apartments",
    path: "/rent/apartments",
    eyebrow: "Apartment Rent",
    heading: "Apartments",
    heroTitle: "Rent An Apartment That Truly Fits Your Lifestyle",
    heroDescription:
      "Searching for a fully equipped apartment without the hassle of ownership? Browse ready-to-move apartments matched to your budget and needs.",
    metaTitle: "Apartment Rent | Noor and Hoor",
    metaDescription:
      "Searching for a fully equipped apartment without the hassle of ownership? Browse ready-to-move apartments matched to your budget and needs.",
    ctaHeading: "Ready to Rent an Apartment That Feels Like Home?",
    ctaDescription:
      "Explore verified apartments across the UAE and move in faster than you thought possible.",
    trustSignals: trustSignals([
      ["3,200+", "Apartments Available For Rent"],
      ["48 Hours", "Average Booking Confirmation"],
      ["92%", "Tenant Satisfaction Rate"],
    ]),
    filterPrefix: "apt-rent",
    propertyTypes: ["Studio", "1 Bedroom", "2 Bedroom", "3 Bedroom", "Penthouse"],
    homes: buildHomes({
      titles: [
        "Spacious Apartment With Parking",
        "Downtown Apartment",
        "Marina Apartment",
        "Triplex Apartment",
        "Studio With Balcony",
        "Loft Conversion Apartment",
        "Luxury Apartment With Pool",
        "New Construction Apartment",
      ],
      imageSets: SHARED_SETS,
      slugs: [
        "spacious-apartment-with-parking",
        "downtown-apartment-rent",
        "marina-apartment-rent",
        "triplex-apartment-rent",
        "studio-with-balcony",
        "loft-conversion-rent",
        "luxury-apartment-pool-rent",
        "new-construction-rent",
      ],
      locations: LOCATIONS,
    }),
  },
  houses: {
    key: "houses",
    path: "/rent/houses",
    eyebrow: "House Rent",
    heading: "Houses",
    heroTitle: "Rent A House That Truly Feels Like Yours",
    heroDescription:
      "Need more space, a private entrance, or a garden for the kids? Discover rental houses across the UAE, matched to your family size, budget, and preferred neighborhood.",
    metaTitle: "House Rent | Noor and Hoor",
    metaDescription:
      "Need more space, a private entrance, or a garden for the kids? Discover rental houses across the UAE, matched to your family size, budget, and preferred neighborhood.",
    ctaHeading: "Ready to Rent a House That Fits Your Family?",
    ctaDescription:
      "Let us help you find the right house, in the right neighborhood, without the usual hassle.",
    trustSignals: trustSignals([
      ["3,000+", "Houses Available For Rent"],
      ["48 Hours", "Fastest Move-In Time"],
      ["92%", "Tenant Satisfaction Rate"],
    ]),
    filterPrefix: "house-rent",
    propertyTypes: ["Villa", "Townhouse", "Independent House", "Garden House"],
    homes: buildHomes({
      titles: [
        "Luxury Villa",
        "Family House With Garden",
        "Independent House",
        "Townhouse With Pool",
        "Beachfront Villa",
        "Corner House",
        "Modern Family Home",
        "Garden Villa",
      ],
      imageSets: [
        [villasImage, carousel1, propertyImg],
        [carousel2, villasImage, luxuryHome],
        [carousel3, townhousesImage, otherPropertiesImage],
        [townhousesImage, carousel4, luxuryHome],
        [luxuryHome, villasImage, carousel1],
        [otherPropertiesImage, carousel2, propertyImg],
        [villasImage, carousel3, luxuryHome],
        [townhousesImage, villasImage, carousel4],
      ],
      slugs: [
        "luxury-villa-rent",
        "family-house-with-garden",
        "independent-house-rent",
        "townhouse-with-pool",
        "beachfront-villa-rent",
        "corner-house-rent",
        "modern-family-home",
        "garden-villa-rent",
      ],
      locations: LOCATIONS,
    }),
  },
  dubai: {
    key: "dubai",
    path: "/rent/dubai",
    eyebrow: "Renting in Dubai",
    heading: "Dubai Rentals",
    heroTitle: "Your Complete Guide To Renting In Dubai",
    heroDescription:
      "New to the city or switching neighborhoods? Explore rental options across Dubai's top communities, matched to your budget, work location, and daily lifestyle.",
    metaTitle: "Renting in Dubai | Noor and Hoor",
    metaDescription:
      "New to the city or switching neighborhoods? Explore rental options across Dubai's top communities, matched to your budget, work location, and daily lifestyle.",
    ctaHeading: "Ready to Start Renting in Dubai?",
    ctaDescription:
      "Let us guide you to the right home, in the right community, the right way.",
    trustSignals: trustSignals([
      ["8,000+", "Rentals Listed In Dubai"],
      ["RERA", "Certified Rental Process"],
      ["90%", "Renewed Tenancy Contracts"],
    ]),
    filterPrefix: "dubai-rent",
    propertyTypes: ["Apartment", "Villa", "Townhouse", "Penthouse", "Studio"],
    homes: buildHomes({
      titles: [
        "Marina View Apartment",
        "Downtown Dubai Apartment",
        "Palm Jumeirah Villa",
        "Business Bay Apartment",
        "JBR Beach Apartment",
        "JVC Family Home",
        "Dubai Hills Villa",
        "City Walk Apartment",
      ],
      imageSets: SHARED_SETS,
      slugs: [
        "marina-view-apartment",
        "downtown-dubai-apartment",
        "palm-jumeirah-villa",
        "business-bay-apartment",
        "jbr-beach-apartment",
        "jvc-family-home",
        "dubai-hills-villa",
        "city-walk-apartment",
      ],
      locations: DUBAI_LOCATIONS,
    }),
  },
};

export function getRentCategory(key) {
  return RENT_CATEGORIES[key];
}
