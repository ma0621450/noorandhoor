import PropertiesRentHero from "@/components/sections/rent-properties/PropertiesRentHero";
import PropertiesRentHomes from "@/components/sections/rent-properties/PropertiesRentHomes";
import BuyGetStarted from "@/components/sections/buy/BuyGetStarted";
import { getRentCategory } from "@/components/sections/rent-properties/rentCategoryConfig";

export default function RentCategoryListingPage({ categoryKey }) {
  const category = getRentCategory(categoryKey);

  return (
    <div className="w-full overflow-x-clip bg-[#111111]">
      <PropertiesRentHero
        title={category.heroTitle}
        description={category.heroDescription}
        filterPrefix={category.filterPrefix}
        propertyTypes={category.propertyTypes}
      />
      <PropertiesRentHomes categoryKey={categoryKey} />
      <BuyGetStarted />
    </div>
  );
}
