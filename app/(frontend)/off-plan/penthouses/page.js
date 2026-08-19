import OffPlanListingPage from "@/components/sections/offplan/OffPlanListingPage";
import { getOffPlanCategory } from "@/components/sections/offplan/offplanCategoryConfig";

const category = getOffPlanCategory("penthouses");

export const metadata = {
  title: category.metaTitle,
  description: category.metaDescription,
};

export default function OffPlanPenthousesPage({ searchParams }) {
  return <OffPlanListingPage categoryKey="penthouses" searchParams={searchParams} />;
}
