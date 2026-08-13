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
    eyebrow: "Properties rent",
    heading: "Apartments",
    heroTitle: "Step into Luxury Rental Properties in UAE",
    heroDescription:
      "Curated collection of the world's most prestigious properties. Experience unparalleled luxury and timeless elegance.",
    metaTitle: "Properties Rent | Noor and Hoor",
    metaDescription:
      "Step into luxury rental properties in the UAE. Browse curated apartments for rent with Noor and Hoor Properties.",
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
    eyebrow: "Apartment rent",
    heading: "Apartments",
    heroTitle: "Find Your Perfect Apartment Rental in UAE",
    heroDescription:
      "Browse premium apartments for rent across Dubai, Abu Dhabi, Sharjah, and Ajman with Noor and Hoor Properties.",
    metaTitle: "Apartment Rent | Noor and Hoor",
    metaDescription:
      "Rent luxury apartments in the UAE. Curated residential rentals with premium finishes and prime locations.",
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
    eyebrow: "House rent",
    heading: "Houses",
    heroTitle: "Luxury Houses for Rent Across the UAE",
    heroDescription:
      "Spacious family homes, villas, and townhouses available for rent in the UAE's most desirable communities.",
    metaTitle: "House Rent | Noor and Hoor",
    metaDescription:
      "Rent luxury houses and villas in the UAE. Family homes with private gardens, pools, and premium amenities.",
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
    heroTitle: "Renting in Dubai Made Simple",
    heroDescription:
      "Discover premium rental properties across Dubai Marina, Downtown, Palm Jumeirah, and more with expert local guidance.",
    metaTitle: "Renting in Dubai | Noor and Hoor",
    metaDescription:
      "Find the best properties for rent in Dubai. Apartments, villas, and homes in Dubai's top communities.",
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
