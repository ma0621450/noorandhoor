import OffPlanListingPage from "@/components/sections/offplan/OffPlanListingPage";
import { getOffPlanCategory } from "@/components/sections/offplan/offplanCategoryConfig";

const category = getOffPlanCategory("apartments");

export const metadata = {
  title: category.metaTitle,
  description: category.metaDescription,
};

export default function OffPlanApartmentsPage({ searchParams }) {
  return <OffPlanListingPage categoryKey="apartments" searchParams={searchParams} />;
}
