import OffPlanCategoryDetailPage from "@/components/sections/offplan/OffPlanCategoryDetailPage";
import { getOffPlanCategory } from "@/components/sections/offplan/offplanCategoryConfig";

const category = getOffPlanCategory("guide");

export function generateStaticParams() {
  return [...new Set(category.homes.map((home) => home.slug))].map((slug) => ({
    slug,
  }));
}

export function generateMetadata() {
  return {
    title: `${category.homes[0].title} | Noor and Hoor`,
    description: category.metaDescription,
  };
}

export default async function OffPlanGuideDetailPage({ params }) {
  return <OffPlanCategoryDetailPage categoryKey="guide" params={params} />;
}
