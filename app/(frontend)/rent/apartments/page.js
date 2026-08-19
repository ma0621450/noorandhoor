import RentCategoryListingPage from "@/components/sections/rent-properties/RentCategoryListingPage";
import { getRentCategory } from "@/components/sections/rent-properties/rentCategoryConfig";

const category = getRentCategory("apartments");

export const metadata = {
  title: category.metaTitle,
  description: category.metaDescription,
};

export default function ApartmentRentPage({ searchParams }) {
  return <RentCategoryListingPage categoryKey="apartments" searchParams={searchParams} />;
}
