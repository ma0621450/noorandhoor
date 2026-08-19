import RentCategoryListingPage from "@/components/sections/rent-properties/RentCategoryListingPage";
import { getRentCategory } from "@/components/sections/rent-properties/rentCategoryConfig";

const category = getRentCategory("properties");

export const metadata = {
  title: category.metaTitle,
  description: category.metaDescription,
};

export default function PropertiesRentPage({ searchParams }) {
  return <RentCategoryListingPage categoryKey="properties" searchParams={searchParams} />;
}
