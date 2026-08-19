import PropertyDetailPage from "@/components/sections/property/PropertyDetailPage";
import { getSellCategory } from "@/components/sections/sell-properties/sellCategoryConfig";
import { generateListingItemMetadata } from "@/lib/seo";

const category = getSellCategory("noor-hoor");

export function generateStaticParams() {
  return [...new Set(category.homes.map((home) => home.slug))].map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  return generateListingItemMetadata({ params, category });
}

export default async function SellNoorHoorDetailPage({ params }) {
  return <PropertyDetailPage market="sell" categoryKey="noor-hoor" params={params} />;
}
