import FeaturedPropertySection from "@/components/sections/property/FeaturedPropertySection";
import apartmentsImage from "@/public/images/buy/apartments.png";
import villasImage from "@/public/images/buy/villas.png";
import penthouseImage from "@/public/images/buy/penthouse.png";
import otherPropertiesImage from "@/public/images/buy/otherproperties.png";

export const FEATURED_SELL_PROPERTIES = [
  {
    id: 1,
    image: penthouseImage,
    title: "Saadiyat Island Penthouse",
    location: "Saadiyat Island Abu Dubai",
    features: { bedroom: 6, bathroom: 2, area: 2900 },
    price: 45000000,
    featured: true,
    href: "/sell/apartments/spacious-apartment",
  },
  {
    id: 2,
    image: apartmentsImage,
    title: "Saadiyat Island Penthouse",
    location: "Saadiyat Island Abu Dubai",
    features: { bedroom: 6, bathroom: 2, area: 2900 },
    price: 45000000,
    featured: true,
    href: "/sell/apartments/downtown-apartment",
  },
  {
    id: 3,
    image: villasImage,
    title: "Aljada Luxury Mansion",
    location: "Aljada, Sharjah",
    features: { bedroom: 6, bathroom: 2, area: 2900 },
    price: 45000000,
    featured: true,
    href: "/sell/properties/palm-jumeirah-villa",
  },
  {
    id: 4,
    image: otherPropertiesImage,
    title: "Al Zorah Beachfront Villa",
    location: "Al Zorah, Ajman",
    features: { bedroom: 6, bathroom: 2, area: 2900 },
    price: 45000000,
    featured: true,
    href: "/sell/properties/luxury-apartment-with-pool",
  },
];

export default function FeaturedSellProperties() {
  return (
    <FeaturedPropertySection
      title="Featured Sell Property"
      href="/sell/properties"
      properties={FEATURED_SELL_PROPERTIES}
    />
  );
}
