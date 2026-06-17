import Button from "@/components/ui/Button";
import PropertyCard from "@/components/ui/PropertyCard";
import propertyImage from "@/public/images/landingpage/propertyImg.png";

const NEW_PROPERTIES = [
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

export default function NewProperties() {
  return (
    <section className="section-container py-12 sm:py-16">
      <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex min-w-0 flex-col gap-4">
          <h3 className="section-sub-heading">New Properties</h3>
          <h2 className="text-gold-gradient max-w-[640px]">
            Recently Added Properties
          </h2>
        </div>

        <Button
          variant="secondary"
          className="w-full shrink-0 sm:w-auto lg:self-end"
        >
          View All New Properties
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-4">
        {NEW_PROPERTIES.map((property) => (
          <PropertyCard key={property.id} property={property} badge="New" />
        ))}
      </div>
    </section>
  );
}
