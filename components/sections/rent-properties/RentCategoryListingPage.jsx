import PropertyHero from "@/components/common/PropertyHero";
import PropertyGrid from "@/components/sections/property/PropertyGrid";
import PropertyJourneyCta from "@/components/sections/property/PropertyJourneyCta";
import {
  getRentCategory,
  HOMES_PER_PAGE,
  TOTAL_PAGES,
} from "@/components/sections/rent-properties/rentCategoryConfig";

export default function RentCategoryListingPage({ categoryKey }) {
  const category = getRentCategory(categoryKey);

  return (
    <>
      <PropertyHero
        variant="rent"
        title={category.heroTitle}
        description={category.heroDescription}
        filterPrefix={category.filterPrefix}
        propertyTypes={category.propertyTypes}
      />
      <PropertyGrid
        category={category}
        homesPerPage={HOMES_PER_PAGE}
        totalPages={TOTAL_PAGES}
      />
      <PropertyJourneyCta variant="rent" />
    </>
  );
}
