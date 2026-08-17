import PropertyHero from "@/components/common/PropertyHero";
import OffPlanHomes from "@/components/sections/offplan/OffPlanHomes";
import PropertyJourneyCta from "@/components/sections/property/PropertyJourneyCta";
import { getOffPlanCategory } from "@/components/sections/offplan/offplanCategoryConfig";

export default function OffPlanListingPage({ categoryKey }) {
  const category = getOffPlanCategory(categoryKey);

  return (
    <>
      <PropertyHero
        variant="offplan"
        title={`Off Plan ${category.heading} in UAE`}
        description={category.metaDescription}
      />
      <OffPlanHomes categoryKey={categoryKey} />
      <PropertyJourneyCta variant="offplan" />
    </>
  );
}
