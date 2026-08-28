import OffPlanCategoryDetailPage from "@/components/sections/offplan/OffPlanCategoryDetailPage";
import { getOffPlanCategory } from "@/components/sections/offplan/offplanCategoryConfig";
import { generateListingItemMetadata } from "@/lib/seo";

const category = getOffPlanCategory("villas");

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  return generateListingItemMetadata({ params, category });
}

export default async function OffPlanVillaDetailPage({ params }) {
  return <OffPlanCategoryDetailPage categoryKey="villas" params={params} />;
}
