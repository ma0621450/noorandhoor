import CategoryDetailPage from "@/components/sections/buy-category/CategoryDetailPage";
import { getCategory } from "@/components/sections/buy-category/categoryConfig";
import { generateListingItemMetadata } from "@/lib/seo";

const category = getCategory("penthouses");

export function generateStaticParams() {
  return [...new Set(category.homes.map((home) => home.slug))].map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  return generateListingItemMetadata({ params, category });
}

export default async function BuyPenthouseDetailPage({ params }) {
  return <CategoryDetailPage categoryKey="penthouses" params={params} />;
}
