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
  },
  {
    id: 4,
    image: penthouseImage,
    title: "Jumeirah Golf Estates",
    subtitle: "Waterfront",
    description: "Premium Golf Two Championship Courses, Earth Villas",
  },
];

export default function PopularCommunities() {
  return (
    <section className="section-container">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-gold-gradient">Popular Communities</h2>

        <Button
          variant="secondary"
          className="h-[58px] w-full shrink-0 rounded-md sm:w-[234px]"
        >
          View More
        </Button>
      </div>

      <div className="mt-10 flex gap-10 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {COMMUNITIES.map((community) => (
          <CommunityCard key={community.id} {...community} width={346} />
        ))}
      </div>
    </section>
  );
}
