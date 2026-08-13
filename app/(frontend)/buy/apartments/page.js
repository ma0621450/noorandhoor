import CategoryListingPage from "@/components/sections/buy-category/CategoryListingPage";
import { getCategory } from "@/components/sections/buy-category/categoryConfig";

const category = getCategory("apartments");

export const metadata = {
  title: category.metaTitle,
  description: category.metaDescription,
};

export default function BuyApartmentsPage() {
  return <CategoryListingPage categoryKey="apartments" />;
}
