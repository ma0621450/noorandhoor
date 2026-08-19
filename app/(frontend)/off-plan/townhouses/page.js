import OffPlanListingPage from "@/components/sections/offplan/OffPlanListingPage";
import { getOffPlanCategory } from "@/components/sections/offplan/offplanCategoryConfig";

const category = getOffPlanCategory("townhouses");

export const metadata = {
  title: category.metaTitle,
  description: category.metaDescription,
};

export default function OffPlanTownhousesPage({ searchParams }) {
  return <OffPlanListingPage categoryKey="townhouses" searchParams={searchParams} />;
}
