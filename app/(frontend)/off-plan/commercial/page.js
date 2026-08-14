import OffPlanListingPage from "@/components/sections/offplan/OffPlanListingPage";
import { getOffPlanCategory } from "@/components/sections/offplan/offplanCategoryConfig";

const category = getOffPlanCategory("commercial");

export const metadata = {
  title: category.metaTitle,
  description: category.metaDescription,
};

export default function OffPlanCommercialPage() {
  return <OffPlanListingPage categoryKey="commercial" />;
}
