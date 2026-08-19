import RentCategoryListingPage from "@/components/sections/rent-properties/RentCategoryListingPage";
import { getRentCategory } from "@/components/sections/rent-properties/rentCategoryConfig";

const category = getRentCategory("dubai");

export const metadata = {
  title: category.metaTitle,
  description: category.metaDescription,
};

export default function RentingInDubaiPage({ searchParams }) {
  return <RentCategoryListingPage categoryKey="dubai" searchParams={searchParams} />;
}
