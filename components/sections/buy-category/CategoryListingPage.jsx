import CategoryHero from "@/components/sections/buy-category/CategoryHero";
import CategoryHomes from "@/components/sections/buy-category/CategoryHomes";
import BuyGetStarted from "@/components/sections/buy/BuyGetStarted";
import { getCategory } from "@/components/sections/buy-category/categoryConfig";

export default function CategoryListingPage({ categoryKey }) {
  const category = getCategory(categoryKey);

  return (
    <div className="w-full overflow-x-clip">
      <CategoryHero
        title={category.heroTitle}
        description={category.heroDescription}
        filterPrefix={category.filterPrefix}
        propertyTypes={category.propertyTypes}
      />
      <CategoryHomes categoryKey={categoryKey} />
      <BuyGetStarted />
    </div>
  );
}
