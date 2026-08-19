import PropertyDetailPage from "@/components/sections/property/PropertyDetailPage";
import { getSellCategory } from "@/components/sections/sell-properties/sellCategoryConfig";
import { generateListingItemMetadata } from "@/lib/seo";

const category = getSellCategory("properties");

export function generateStaticParams() {
  return [...new Set(category.homes.map((home) => home.slug))].map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  return generateListingItemMetadata({ params, category });
}

export default async function SellPropertyDetailPage({ params }) {
  return <PropertyDetailPage market="sell" categoryKey="properties" params={params} />;
}
