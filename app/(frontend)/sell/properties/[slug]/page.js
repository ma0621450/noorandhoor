import SellCategoryDetailPage from "@/components/sections/sell-properties/SellCategoryDetailPage";
import { getSellCategory } from "@/components/sections/sell-properties/sellCategoryConfig";
import { RENT_PROPERTY_DETAIL } from "@/components/sections/detail/detailData";

const category = getSellCategory("properties");

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

export default async function SellPropertyDetailPage({ params }) {
  return <SellCategoryDetailPage categoryKey="properties" params={params} />;
}
