import PopularCommunities from "@/components/sections/buy/PopularCommunities";
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
    <PopularCommunities
      title="Top Rental Communities"
      communities={COMMUNITIES}
      cardCtaLabel="View Rental Guide"
      href="/rent"
    />
  );
}
