import PropertyDetailPage from "@/components/sections/property/PropertyDetailPage";
import { getSellCategory } from "@/components/sections/sell-properties/sellCategoryConfig";
import { RENT_PROPERTY_DETAIL } from "@/components/sections/detail/detailData";

const category = getSellCategory("noor-hoor");

export function generateStaticParams() {
  return [...new Set(category.homes.map((home) => home.slug))].map((slug) => ({
    slug,
  }));
}

export function generateMetadata() {
  return {
    title: `${RENT_PROPERTY_DETAIL.title} | Sell | Noor and Hoor`,
    description: RENT_PROPERTY_DETAIL.about[0],
  };
}

export default async function SellNoorHoorDetailPage({ params }) {
  return <PropertyDetailPage market="sell" categoryKey="noor-hoor" params={params} />;
}
