import CategoryListingPage from "@/components/sections/buy-category/CategoryListingPage";
import { getCategory } from "@/components/sections/buy-category/categoryConfig";

const category = getCategory("villas");

export const metadata = {
  title: category.metaTitle,
  description: category.metaDescription,
};

export default function BuyVillasPage() {
  return <CategoryListingPage categoryKey="villas" />;
}
