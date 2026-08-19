import OffPlanCategoryDetailPage from "@/components/sections/offplan/OffPlanCategoryDetailPage";
import { getOffPlanCategory } from "@/components/sections/offplan/offplanCategoryConfig";
import { generateListingItemMetadata } from "@/lib/seo";

const category = getOffPlanCategory("guide");

export function generateStaticParams() {
  return [...new Set(category.homes.map((home) => home.slug))].map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  return generateListingItemMetadata({ params, category });
}

export default async function OffPlanGuideDetailPage({ params }) {
  return <OffPlanCategoryDetailPage categoryKey="guide" params={params} />;
}
