import CategoryDetailPage from "@/components/sections/buy-category/CategoryDetailPage";
import { getCategory } from "@/components/sections/buy-category/categoryConfig";

const category = getCategory("penthouses");

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

export default async function BuyPenthouseDetailPage({ params }) {
  return <CategoryDetailPage categoryKey="penthouses" params={params} />;
}
