import Link from "next/link";
import Button from "@/components/ui/Button";
import PropertyCard from "@/components/ui/PropertyCard";
import apartmentsImage from "@/public/images/buy/apartments.png";
import villasImage from "@/public/images/buy/villas.png";
import penthouseImage from "@/public/images/buy/penthouse.png";
import otherPropertiesImage from "@/public/images/buy/otherproperties.png";
import townhousesImage from "@/public/images/buy/townhouses.png";
import luxuryHome from "@/public/images/landingpage/LuxuryHome.png";
import propertyImg from "@/public/images/landingpage/propertyImg.png";
import carousel1 from "@/public/images/landingpage/landingpagecarousel1.jpg";

const FEATURES = { bedroom: 6, bathroom: 2, area: 2900 };

const FEATURED_RENTALS = [
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
    <section className="section-container">
      <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex min-w-0 flex-col gap-4">
          <h3 className="section-sub-heading">Featured Properties</h3>
          <h2 className="text-gold-gradient max-w-[604px]">
            Featured Rentals in Dubai
          </h2>
        </div>

        <Link href="/rent/properties" className="w-full sm:w-auto">
          <Button
            variant="secondary"
            className="h-[58px] w-full shrink-0 rounded-xl sm:w-[234px] lg:self-end"
          >
            View Properties
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {FEATURED_RENTALS.map((property) => (
          <div key={property.id} className="w-full">
            <PropertyCard property={property} badge={property.badge} />
          </div>
        ))}
      </div>
    </section>
  );
}
