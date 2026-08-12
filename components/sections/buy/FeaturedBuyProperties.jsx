import Button from "@/components/ui/Button";
import PropertyCard from "@/components/ui/PropertyCard";
import apartmentsImage from "@/public/images/buy/apartments.png";
import villasImage from "@/public/images/buy/villas.png";
import penthouseImage from "@/public/images/buy/penthouse.png";
import otherPropertiesImage from "@/public/images/buy/otherproperties.png";

const FEATURED_BUY_PROPERTIES = [
  {
    id: 1,
    image: penthouseImage,
    title: "Saadiyat Island Penthouse",
    location: "Saadiyat Island Abu Dubai",
    features: { bedroom: 6, bathroom: 2, area: 2900 },
    price: 45000000,
    featured: true,
  },
  {
    id: 2,
    image: apartmentsImage,
    title: "Saadiyat Island Penthouse",
    location: "Saadiyat Island Abu Dubai",
    features: { bedroom: 6, bathroom: 2, area: 2900 },
    price: 45000000,
    featured: true,
  },
  {
    id: 3,
    image: villasImage,
    title: "Aljada Luxury Mansion",
    location: "Aljada, Sharjah",
    features: { bedroom: 6, bathroom: 2, area: 2900 },
    price: 45000000,
    featured: true,
  },
  {
    id: 4,
    image: otherPropertiesImage,
    title: "Al Zorah Beachfront Villa",
    location: "Al Zorah, Ajman",
    features: { bedroom: 6, bathroom: 2, area: 2900 },
    price: 45000000,
    featured: true,
  },
];

export default function FeaturedBuyProperties() {
  return (
    <section className="section-container">
      <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex min-w-0 flex-col gap-4">
          <h3 className="section-sub-heading">Featured Properties</h3>
          <h2 className="text-gold-gradient max-w-[530px]">
            Featured Buy Property
          </h2>
        </div>

        <Button
          variant="secondary"
          className="h-[58px] w-full shrink-0 rounded-md sm:w-[234px] lg:self-end"
        >
          View Properties
        </Button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible xl:grid-cols-4 [&::-webkit-scrollbar]:hidden">
        {FEATURED_BUY_PROPERTIES.map((property) => (
          <div key={property.id} className="min-w-[257px] sm:min-w-0">
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
    </section>
  );
}
