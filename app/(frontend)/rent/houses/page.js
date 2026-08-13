import RentCategoryListingPage from "@/components/sections/rent-properties/RentCategoryListingPage";
import { getRentCategory } from "@/components/sections/rent-properties/rentCategoryConfig";

const category = getRentCategory("houses");

export const metadata = {
  title: category.metaTitle,
  description: category.metaDescription,
};

export default function HouseRentPage() {
  return <RentCategoryListingPage categoryKey="houses" />;
}
