import Button from "@/components/ui/Button";
import CommunityCard from "@/components/ui/CommunityCard";
import villasImage from "@/public/images/buy/villas.png";
import apartmentsImage from "@/public/images/buy/apartments.png";
import otherPropertiesImage from "@/public/images/buy/otherproperties.png";
import penthouseImage from "@/public/images/buy/penthouse.png";

const COMMUNITIES = [
  {
    id: 1,
    image: villasImage,
    title: "Palm Jumeirah",
    subtitle: "Beach Community",
    description: "Luxury waterfront Villas, Apartments, Resorts",
  },
  {
    id: 2,
    image: apartmentsImage,
    title: "Downtown",
    subtitle: "City Center",
    description: "Burj Khalifa, Dubai Mall, Dubai Opera",
  },
  {
    id: 3,
    image: otherPropertiesImage,
    title: "Dubai Islands",
    subtitle: "Waterfront",
    description: "Diverse Development, Hotels, Residential",
  }
];

export default function PopularCommunities() {
  return (
    <section className="section-container">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-gold-gradient">Popular Communities</h2>

        <Button variant="secondary" className="w-full shrink-0 sm:w-auto">
          View More
        </Button>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-10">
        {COMMUNITIES.map((community) => (
          <CommunityCard key={community.id} {...community} />
        ))}
      </div>
    </section>
  );
}
