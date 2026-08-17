import PropertyHero from "@/components/common/PropertyHero";
import CategoryHomes from "@/components/sections/buy-category/CategoryHomes";
import PropertyJourneyCta from "@/components/sections/property/PropertyJourneyCta";
import { getCategory } from "@/components/sections/buy-category/categoryConfig";

export default function CategoryListingPage({ categoryKey }) {
  const category = getCategory(categoryKey);

  return (
    <>
      <PropertyHero
        variant="buy"
        title={category.heroTitle}
        description={category.heroDescription}
        filterPrefix={category.filterPrefix}
        propertyTypes={category.propertyTypes}
      />
      <CategoryHomes categoryKey={categoryKey} />
      <PropertyJourneyCta variant="buy" />
    </>
  );
}
