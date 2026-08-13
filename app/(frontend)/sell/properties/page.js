import SellCategoryListingPage from "@/components/sections/sell-properties/SellCategoryListingPage";
import { getSellCategory } from "@/components/sections/sell-properties/sellCategoryConfig";

const category = getSellCategory("properties");

export const metadata = {
  title: category.metaTitle,
  description: category.metaDescription,
};

export default function SellingPropertiesPage() {
  return <SellCategoryListingPage categoryKey="properties" />;
}
