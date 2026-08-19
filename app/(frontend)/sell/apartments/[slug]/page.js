import PropertyDetailPage from "@/components/sections/property/PropertyDetailPage";
import { getSellCategory } from "@/components/sections/sell-properties/sellCategoryConfig";
import { generateListingItemMetadata } from "@/lib/seo";

const category = getSellCategory("apartments");

export function generateStaticParams() {
  return [...new Set(category.homes.map((home) => home.slug))].map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  return generateListingItemMetadata({ params, category });
}

export default async function SellApartmentDetailPage({ params }) {
  return <PropertyDetailPage market="sell" categoryKey="apartments" params={params} />;
}
