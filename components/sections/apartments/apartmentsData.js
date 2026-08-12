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

const BASE = [
  {
    images: [apartmentsImage, carousel1, propertyImg],
    title: "Spacious Apartment",
    location: "Ajman, United Arab Emirates",
    featured: true,
  },
  {
    images: [carousel2, apartmentsImage, luxuryHome],
    title: "Downtown Apartment",
    location: "Ajman, United Arab Emirates",
    featured: false,
  },
  {
    images: [carousel3, penthouseImage, otherPropertiesImage],
    title: "Two-Bedroom With Sauna",
    location: "Ajman, United Arab Emirates",
    featured: true,
  },
  {
    images: [villasImage, carousel4, luxuryHome],
    title: "Two-Bedroom With Storage",
    location: "Ajman, United Arab Emirates",
    featured: false,
  },
  {
    images: [townhousesImage, apartmentsImage, carousel1],
    title: "Two-Bedroom With Storage",
    location: "Ajman, United Arab Emirates",
    featured: false,
  },
  {
    images: [penthouseImage, carousel2, propertyImg],
    title: "Two-Bedroom With Storage",
    location: "Ajman, United Arab Emirates",
    featured: false,
  },
  {
    images: [otherPropertiesImage, carousel3, luxuryHome],
    title: "Two-Bedroom With Storage",
    location: "Sharjah, United Arab Emirates",
    featured: true,
  },
  {
    images: [luxuryHome, apartmentsImage, carousel4],
    title: "Two-Bedroom With Storage",
    location: "Sharjah, United Arab Emirates",
    featured: true,
  },
];

const SLUGS = [
  "spacious-apartment-with-parking",
  "downtown-apartment",
  "two-bedroom-with-sauna",
  "triplex-apartment",
];

export const APARTMENT_HOMES = Array.from({ length: 24 }, (_, i) => {
  const base = BASE[i % BASE.length];
  return {
    id: i + 1,
    images: base.images,
    title: base.title,
    location: base.location,
    features: { bedroom: 6, bathroom: 2, area: 2900 },
    price: 45000000,
    featured: base.featured,
    slug: SLUGS[i % SLUGS.length],
  };
});

export const HOMES_PER_PAGE = 8;
export const TOTAL_PAGES = 3;
