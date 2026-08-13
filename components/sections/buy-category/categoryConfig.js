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

const SHARED_IMAGES = [
  apartmentsImage,
  villasImage,
  penthouseImage,
  otherPropertiesImage,
  townhousesImage,
  luxuryHome,
  propertyImg,
  carousel1,
  carousel2,
  carousel3,
  carousel4,
];

function buildHomes({ titles, imageSets, slugs, locations }) {
  return Array.from({ length: 24 }, (_, i) => {
    const title = titles[i % titles.length];
    const images = imageSets[i % imageSets.length];
    const location = locations[i % locations.length];
    return {
      id: i + 1,
      images,
      title,
      location,
      features: { bedroom: 6, bathroom: 2, area: 2900 },
      price: 45000000,
      featured: i % 3 === 0,
      slug: slugs[i % slugs.length],
    };
  });
}

const UAE_LOCATIONS = [
  "Ajman, United Arab Emirates",
  "Dubai, United Arab Emirates",
  "Sharjah, United Arab Emirates",
  "Abu Dhabi, United Arab Emirates",
];

export const BUY_CATEGORIES = {
  apartments: {
    key: "apartments",
    path: "/buy/apartments",
    breadcrumb: "Buy apartments",
    heroTitle: "Discover Luxury Apartments in the UAE.",
    heroDescription:
      "Curated collection of the world's most prestigious properties. Experience unparalleled luxury and timeless elegance.",
    metaTitle: "Buy Apartments | Noor and Hoor",
    metaDescription:
      "Discover luxury apartments in the UAE. Curated collection of the world's most prestigious properties.",
    filterPrefix: "apt",
    propertyTypes: ["Home", "Studio", "Duplex", "Serviced", "Luxury Residences"],
    homes: buildHomes({
      titles: [
        "Spacious Apartment",
        "Downtown Apartment",
        "Two-Bedroom With Sauna",
        "Triplex Apartment",
      ],
      imageSets: [
        [apartmentsImage, carousel1, propertyImg],
        [carousel2, apartmentsImage, luxuryHome],
        [carousel3, penthouseImage, otherPropertiesImage],
        [villasImage, carousel4, luxuryHome],
        [townhousesImage, apartmentsImage, carousel1],
        [penthouseImage, carousel2, propertyImg],
        [otherPropertiesImage, carousel3, luxuryHome],
        [luxuryHome, apartmentsImage, carousel4],
      ],
      slugs: [
        "spacious-apartment-with-parking",
        "downtown-apartment",
        "two-bedroom-with-sauna",
        "triplex-apartment",
      ],
      locations: UAE_LOCATIONS,
    }),
  },
  townhouses: {
    key: "townhouses",
    path: "/buy/townhouses",
    breadcrumb: "Buy town houses",
    heroTitle: "Discover Luxury Townhouses in the UAE.",
    heroDescription:
      "Family-friendly townhouses with private outdoor space, modern finishes, and prime community locations.",
    metaTitle: "Buy Town Houses | Noor and Hoor",
    metaDescription:
      "Discover luxury townhouses in the UAE. Spacious family homes in the most desirable communities.",
    filterPrefix: "th",
    propertyTypes: ["Townhouse", "End Unit", "Corner", "Luxury Townhouse"],
    homes: buildHomes({
      titles: [
        "Spacious Townhouse",
        "Marina Townhouse",
        "Family Townhouse With Garden",
        "Corner Townhouse",
      ],
      imageSets: [
        [townhousesImage, carousel1, propertyImg],
        [carousel2, townhousesImage, luxuryHome],
        [carousel3, villasImage, otherPropertiesImage],
        [apartmentsImage, carousel4, luxuryHome],
        [townhousesImage, apartmentsImage, carousel1],
        [villasImage, carousel2, propertyImg],
        [otherPropertiesImage, carousel3, luxuryHome],
        [luxuryHome, townhousesImage, carousel4],
      ],
      slugs: [
        "spacious-townhouse-with-garden",
        "marina-townhouse",
        "family-townhouse-with-garden",
        "corner-townhouse",
      ],
      locations: UAE_LOCATIONS,
    }),
  },
  penthouses: {
    key: "penthouses",
    path: "/buy/penthouses",
    breadcrumb: "Penthouses",
    heroTitle: "Discover Luxury Penthouses in the UAE.",
    heroDescription:
      "Sky-high residences with panoramic views, private terraces, and unmatched exclusivity.",
    metaTitle: "Buy Penthouses | Noor and Hoor",
    metaDescription:
      "Discover luxury penthouses in the UAE. Exclusive top-floor residences with breathtaking views.",
    filterPrefix: "ph",
    propertyTypes: ["Penthouse", "Duplex Penthouse", "Sky Villa", "Luxury Penthouse"],
    homes: buildHomes({
      titles: [
        "Skyline Penthouse",
        "Duplex Penthouse",
        "Marina View Penthouse",
        "Terrace Penthouse",
      ],
      imageSets: [
        [penthouseImage, carousel1, propertyImg],
        [carousel2, penthouseImage, luxuryHome],
        [carousel3, apartmentsImage, otherPropertiesImage],
        [villasImage, carousel4, luxuryHome],
        [penthouseImage, apartmentsImage, carousel1],
        [townhousesImage, carousel2, propertyImg],
        [otherPropertiesImage, carousel3, luxuryHome],
        [luxuryHome, penthouseImage, carousel4],
      ],
      slugs: [
        "skyline-penthouse",
        "duplex-penthouse",
        "marina-view-penthouse",
        "terrace-penthouse",
      ],
      locations: UAE_LOCATIONS,
    }),
  },
  villas: {
    key: "villas",
    path: "/buy/villas",
    breadcrumb: "Residential villas",
    heroTitle: "Discover Residential Villas in the UAE.",
    heroDescription:
      "Private villas with generous living spaces, landscaped gardens, and refined architectural detail.",
    metaTitle: "Residential Villas | Noor and Hoor",
    metaDescription:
      "Discover residential villas in the UAE. Private luxury homes in exclusive communities.",
    filterPrefix: "villa",
    propertyTypes: ["Villa", "Independent Villa", "Garden Villa", "Luxury Villa"],
    homes: buildHomes({
      titles: [
        "Luxury Villa",
        "Garden Villa",
        "Independent Villa With Pool",
        "Family Villa",
      ],
      imageSets: [
        [villasImage, carousel1, propertyImg],
        [carousel2, villasImage, luxuryHome],
        [carousel3, townhousesImage, otherPropertiesImage],
        [apartmentsImage, carousel4, luxuryHome],
        [villasImage, apartmentsImage, carousel1],
        [penthouseImage, carousel2, propertyImg],
        [otherPropertiesImage, carousel3, luxuryHome],
        [luxuryHome, villasImage, carousel4],
      ],
      slugs: [
        "luxury-villa-with-pool",
        "garden-villa",
        "independent-villa-with-pool",
        "family-villa",
      ],
      locations: UAE_LOCATIONS,
    }),
  },
  properties: {
    key: "properties",
    path: "/buy/properties",
    breadcrumb: "Buy properties",
    heroTitle: "Discover Premium Properties in the UAE.",
    heroDescription:
      "A curated selection of apartments, villas, townhouses, and investment opportunities across the Emirates.",
    metaTitle: "Buy Properties | Noor and Hoor",
    metaDescription:
      "Browse premium properties for sale in the UAE. Apartments, villas, townhouses, and more.",
    filterPrefix: "prop",
    propertyTypes: ["Apartment", "Villa", "Townhouse", "Penthouse", "Commercial"],
    homes: buildHomes({
      titles: [
        "Premium Property",
        "Investment Property",
        "Waterfront Property",
        "City Property",
      ],
      imageSets: [
        [otherPropertiesImage, carousel1, propertyImg],
        [carousel2, apartmentsImage, luxuryHome],
        [carousel3, villasImage, otherPropertiesImage],
        [townhousesImage, carousel4, luxuryHome],
        [penthouseImage, apartmentsImage, carousel1],
        [villasImage, carousel2, propertyImg],
        [otherPropertiesImage, carousel3, luxuryHome],
        [luxuryHome, otherPropertiesImage, carousel4],
      ],
      slugs: [
        "premium-property",
        "investment-property",
        "waterfront-property",
        "city-property",
      ],
      locations: UAE_LOCATIONS,
    }),
  },
};

export const HOMES_PER_PAGE = 8;
export const TOTAL_PAGES = 3;

export function getCategory(key) {
  return BUY_CATEGORIES[key];
}

export { SHARED_IMAGES };
