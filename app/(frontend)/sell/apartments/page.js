import SellCategoryListingPage from "@/components/sections/sell-properties/SellCategoryListingPage";
import { getSellCategory } from "@/components/sections/sell-properties/sellCategoryConfig";

const category = getSellCategory("apartments");

export const metadata = {
  title: category.metaTitle,
  description: category.metaDescription,
};

export default function SellingApartmentPage({ searchParams }) {
  return <SellCategoryListingPage categoryKey="apartments" searchParams={searchParams} />;
}
