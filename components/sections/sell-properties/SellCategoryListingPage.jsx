import SellHero from "@/components/sections/sell/SellHero";
import SellingPropertiesHomes from "@/components/sections/sell-properties/SellingPropertiesHomes";
import SellGetStarted from "@/components/sections/sell-properties/SellGetStarted";
import { getSellCategory } from "@/components/sections/sell-properties/sellCategoryConfig";

export default function SellCategoryListingPage({ categoryKey }) {
  const category = getSellCategory(categoryKey);

  return (
    <div className="w-full overflow-x-clip bg-[#111111]">
      <SellHero
        title={category.heroTitle}
        description={category.heroDescription}
        filterPrefix={category.filterPrefix}
        propertyTypes={category.propertyTypes}
      />
      <SellingPropertiesHomes categoryKey={categoryKey} />
      <SellGetStarted />
    </div>
  );
}
