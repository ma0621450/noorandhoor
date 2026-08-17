import PropertyHero from "@/components/common/PropertyHero";
import PropertyGrid from "@/components/sections/property/PropertyGrid";
import PropertyJourneyCta from "@/components/sections/property/PropertyJourneyCta";
import {
  getSellCategory,
  HOMES_PER_PAGE,
  TOTAL_PAGES,
} from "@/components/sections/sell-properties/sellCategoryConfig";

export default function SellCategoryListingPage({ categoryKey }) {
  const category = getSellCategory(categoryKey);

  return (
    <>
      <PropertyHero
        variant="sell"
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
      <PropertyJourneyCta variant="sell" />
    </>
  );
}
