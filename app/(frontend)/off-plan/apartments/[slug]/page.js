import OffPlanCategoryDetailPage from "@/components/sections/offplan/OffPlanCategoryDetailPage";
import { getOffPlanCategory } from "@/components/sections/offplan/offplanCategoryConfig";
import { generateListingItemMetadata } from "@/lib/seo";

const category = getOffPlanCategory("apartments");

export function generateStaticParams() {
  return [...new Set(category.homes.map((home) => home.slug))].map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  return generateListingItemMetadata({ params, category });
}

export default async function OffPlanApartmentDetailPage({ params }) {
  return <OffPlanCategoryDetailPage categoryKey="apartments" params={params} />;
}
