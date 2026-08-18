import Link from "next/link";
import Button from "@/components/ui/Button";
import CommunityCard from "@/components/ui/CommunityCard";
import villasImage from "@/public/images/buy/villas.png";
import apartmentsImage from "@/public/images/buy/apartments.png";
import otherPropertiesImage from "@/public/images/buy/otherproperties.png";
import penthouseImage from "@/public/images/buy/penthouse.png";

const DEFAULT_COMMUNITIES = [
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

export default function PopularCommunities({
  title = "Popular Communities",
  communities = DEFAULT_COMMUNITIES,
  ctaLabel = "View More",
  cardCtaLabel,
  href = "/buy",
}) {
  return (
    <section className="section-container">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-gold-gradient max-w-xl">{title}</h2>

        <Link href={href} className="w-full shrink-0 sm:w-auto">
          <Button variant="secondary" className="h-14 w-full sm:w-auto">
            {ctaLabel}
          </Button>
        </Link>
      </div>

      <div className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 sm:gap-8 lg:gap-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {communities.map((community) => (
          <div key={community.id} className="snap-start">
            <CommunityCard
              {...community}
              ctaLabel={cardCtaLabel || community.ctaLabel}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
