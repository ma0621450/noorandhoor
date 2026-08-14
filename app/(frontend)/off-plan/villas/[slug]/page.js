import OffPlanCategoryDetailPage from "@/components/sections/offplan/OffPlanCategoryDetailPage";
import { getOffPlanCategory } from "@/components/sections/offplan/offplanCategoryConfig";

const category = getOffPlanCategory("villas");

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

export default async function OffPlanVillaDetailPage({ params }) {
  return <OffPlanCategoryDetailPage categoryKey="villas" params={params} />;
}
