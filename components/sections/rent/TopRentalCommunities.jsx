import Button from "@/components/ui/Button";
import CommunityCard from "@/components/ui/CommunityCard";
import apartmentsImage from "@/public/images/buy/apartments.png";
import villasImage from "@/public/images/buy/villas.png";
import otherPropertiesImage from "@/public/images/buy/otherproperties.png";
import penthouseImage from "@/public/images/buy/penthouse.png";

const COMMUNITIES = [
  {
    id: 1,
    image: apartmentsImage,
    title: "Business Bay",
    subtitle: "Business & Lifestyle Hub",
    description: "Luxury apartments by Downtown Dubai with canal views.",
    averageRent: "Average Rent AED 105,000 / Year",
  },
  {
    id: 2,
    image: villasImage,
    title: "Dubai Marina",
    subtitle: "Beach Community",
    description: "Luxury waterfront Villas, Apartments, Resorts",
    averageRent: "Average Rent AED 105,000 / Year",
  },
  {
    id: 3,
    image: otherPropertiesImage,
    title: "Dubai Islands",
    subtitle: "Waterfront",
    description: "Diverse Development, Hotels, Residential",
    averageRent: "Average Rent AED 105,000 / Year",
  },
  {
    id: 4,
    image: penthouseImage,
    title: "Downtown",
    subtitle: "City Center",
    description: "Burj Khalifa, Dubai Mall, Dubai Opera",
    averageRent: "Average Rent AED 105,000 / Year",
  },
];

export default function TopRentalCommunities() {
  return (
    <section className="section-container">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-gold-gradient max-w-[556px]">
          Top Rental Communities
        </h2>

        <Button
          variant="secondary"
          className="h-[58px] w-full shrink-0 rounded-xl sm:w-[264px]"
        >
          View More
        </Button>
      </div>

      <div className="mt-10 flex gap-10 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {COMMUNITIES.map((community) => (
          <CommunityCard
            key={community.id}
            {...community}
            ctaLabel="View Rental Guide"
            width={346}
          />
        ))}
      </div>
    </section>
  );
}
