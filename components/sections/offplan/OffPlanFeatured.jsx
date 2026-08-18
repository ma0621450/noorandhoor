import FeaturedPropertySection from "@/components/sections/property/FeaturedPropertySection";
import { OFF_PLAN_PROPERTIES } from "@/components/sections/offplan/offPlanProperties";

const OFF_PLAN_SLUGS = [
  "palm-jumeirah-villa",
  "spacious-apartment",
  "downtown-apartment",
  "two-bedroom-with-sauna",
];

const FEATURED = OFF_PLAN_PROPERTIES.slice(0, 4).map((property, index) => ({
  ...property,
  href: `/off-plan/apartments/${OFF_PLAN_SLUGS[index]}`,
}));

export default function OffPlanFeatured() {
  return (
    <FeaturedPropertySection
      title="Explore Off-Plan Apartments and Homes in Dubai"
      href="/off-plan/apartments"
      properties={FEATURED}
      categoryLabel="Apartments"
    />
  );
}
