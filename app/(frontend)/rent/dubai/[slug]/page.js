import PropertyDetailPage from "@/components/sections/property/PropertyDetailPage";
import { getRentCategory } from "@/components/sections/rent-properties/rentCategoryConfig";
import { generateListingItemMetadata } from "@/lib/seo";

const category = getRentCategory("dubai");

export function generateStaticParams() {
  return [...new Set(category.homes.map((home) => home.slug))].map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  return generateListingItemMetadata({ params, category });
}

export default async function RentDubaiDetailPage({ params }) {
  return <PropertyDetailPage market="rent" categoryKey="dubai" params={params} />;
}
