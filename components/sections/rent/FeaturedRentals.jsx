import FeaturedPropertySection from "@/components/sections/property/FeaturedPropertySection";
import apartmentsImage from "@/public/images/buy/apartments.png";
import villasImage from "@/public/images/buy/villas.png";
import penthouseImage from "@/public/images/buy/penthouse.png";
import otherPropertiesImage from "@/public/images/buy/otherproperties.png";
import townhousesImage from "@/public/images/buy/townhouses.png";
import luxuryHome from "@/public/images/landingpage/LuxuryHome.png";
import propertyImg from "@/public/images/landingpage/propertyImg.png";
import carousel1 from "@/public/images/landingpage/landingpagecarousel1.jpg";

const FEATURES = { bedroom: 6, bathroom: 2, area: 2900 };

export const FEATURED_RENTALS = [
  {
    id: 1,
    image: villasImage,
    title: "Palm Jumeirah Villa",
    location: "Dubai UAE",
    features: FEATURES,
    price: 45000000,
    featured: true,
    badge: "Featured",
    href: "/rent/houses/beachfront-villa-rent",
  },
  {
    id: 2,
    image: penthouseImage,
    title: "Saadiyat Island Penthouse",
    location: "Saadiyat Island Abu Dubai",
    features: FEATURES,
    price: 45000000,
    featured: true,
    badge: "Featured",
    href: "/rent/apartments/downtown-apartment-rent",
  },
  {
    id: 3,
    image: luxuryHome,
    title: "Aljada Luxury Mansion",
    location: "Aljada, Sharjah",
    features: FEATURES,
    price: 45000000,
    featured: true,
    badge: "Available now",
    href: "/rent/properties/spacious-apartment-with-parking",
  },
  {
    id: 4,
    image: otherPropertiesImage,
    title: "Al Zorah Beachfront Villa",
    location: "Al Zorah, Ajman",
    features: FEATURES,
    price: 45000000,
    featured: true,
    badge: "Featured",
    href: "/rent/houses/garden-villa-rent",
  },
  {
    id: 5,
    image: apartmentsImage,
    title: "Palm Jumeirah Villa",
    location: "Dubai UAE",
    features: FEATURES,
    price: 45000000,
    featured: true,
    badge: "Available now",
    href: "/rent/dubai/palm-jumeirah-villa",
  },
  {
    id: 6,
    image: townhousesImage,
    title: "Saadiyat Island Penthouse",
    location: "Saadiyat Island Abu Dubai",
    features: FEATURES,
    price: 45000000,
    featured: true,
    badge: "Featured",
    href: "/rent/apartments/triplex-apartment-rent",
  },
  {
    id: 7,
    image: propertyImg,
    title: "Aljada Luxury Mansion",
    location: "Aljada, Sharjah",
    features: FEATURES,
    price: 45000000,
    featured: true,
    badge: "Available now",
    href: "/rent/properties/downtown-apartment",
  },
  {
    id: 8,
    image: carousel1,
    title: "Al Zorah Beachfront Villa",
    location: "Al Zorah, Ajman",
    features: FEATURES,
    price: 45000000,
    featured: true,
    badge: "Featured",
    href: "/rent/houses/luxury-villa-rent",
  },
];

export default function FeaturedRentals() {
  return (
    <FeaturedPropertySection
      title="Featured Rentals in Dubai"
      href="/rent/properties"
      properties={FEATURED_RENTALS.slice(0, 4)}
    />
  );
}
