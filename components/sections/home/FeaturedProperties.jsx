import Button from "@/components/ui/Button";
import PropertyCard from "@/components/ui/PropertyCard";
import propertyImage from "@/public/images/landingpage/propertyImg.png";
import { Building2, FileText, House, Key } from "lucide-react";

const FEATURED_PROPERTIES = [
  {
    id: 1,
    image: propertyImage,
    title: "Saadiyat Island Penthouse",
    location: "Aljada, Sharjah",
    features: { bedroom: 6, bathroom: 2, area: 2900 },
    price: 45000000,
    featured: true,
  },
  {
    id: 2,
    image: propertyImage,
    title: "Dubai Marina Apartment",
    location: "Dubai Marina, Dubai",
    features: { bedroom: 3, bathroom: 2, area: 1800 },
    price: 3200000,
    featured: true,
  },
  {
    id: 3,
    image: propertyImage,
    title: "Palm Jumeirah Villa",
    location: "Palm Jumeirah, Dubai",
    features: { bedroom: 5, bathroom: 4, area: 4200 },
    price: 18500000,
    featured: true,
  },
  {
    id: 4,
    image: propertyImage,
    title: "Dubai Marina Apartment",
    location: "Dubai Marina, Dubai",
    features: { bedroom: 3, bathroom: 2, area: 1800 },
    price: 3200000,
    featured: true,
  },
];

const FILTER_BUTTONS = [
  { label: "Buy", icon: House, variant: "primary" },
  { label: "Sell", icon: Building2, variant: "secondary" },
  { label: "Rent", icon: Key, variant: "secondary" },
  { label: "Off Plan", icon: FileText, variant: "secondary" },
];

const FeaturedProperties = () => {
  return (
    <section className="section-container py-12 sm:py-16">
      <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex w-full min-w-0 flex-col gap-4 lg:max-w-3xl">
          <h3 className="section-sub-heading">Featured Properties</h3>
          <h2 className="text-gold-gradient max-w-[800px]">
            Explore Properties or Homes in Dubai
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3 md:gap-4">
            {FILTER_BUTTONS.map(({ label, icon: Icon, variant }) => (
              <Button
                key={label}
                variant={variant}
                className="w-full px-3 text-xs sm:w-auto sm:px-4 sm:text-sm"
              >
                <Icon className="h-4 w-4 shrink-0 sm:h-[21px] sm:w-[21px]" />
                <span>{label}</span>
              </Button>
            ))}
          </div>
        </div>

        <Button
          variant="secondary"
          className="w-full shrink-0 sm:w-auto lg:self-end"
        >
          View All Properties
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-4">
        {FEATURED_PROPERTIES.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProperties;
