import OffPlanListingPage from "@/components/sections/offplan/OffPlanListingPage";
import { getOffPlanCategory } from "@/components/sections/offplan/offplanCategoryConfig";

const category = getOffPlanCategory("guide");

export const metadata = {
  title: category.metaTitle,
  description: category.metaDescription,
};

export default function OffPlanGuidePage({ searchParams }) {
  return <OffPlanListingPage categoryKey="guide" searchParams={searchParams} />;
}
