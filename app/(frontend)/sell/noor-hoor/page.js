import SellCategoryListingPage from "@/components/sections/sell-properties/SellCategoryListingPage";
import { getSellCategory } from "@/components/sections/sell-properties/sellCategoryConfig";

const category = getSellCategory("noor-hoor");

export const metadata = {
  title: category.metaTitle,
  description: category.metaDescription,
};

export default function NoorHoorPropertiesPage({ searchParams }) {
  return <SellCategoryListingPage categoryKey="noor-hoor" searchParams={searchParams} />;
}
