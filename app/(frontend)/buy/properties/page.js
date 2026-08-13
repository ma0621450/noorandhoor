import CategoryListingPage from "@/components/sections/buy-category/CategoryListingPage";
import { getCategory } from "@/components/sections/buy-category/categoryConfig";

const category = getCategory("properties");

export const metadata = {
  title: category.metaTitle,
  description: category.metaDescription,
};

export default function BuyPropertiesPage() {
  return <CategoryListingPage categoryKey="properties" />;
}
