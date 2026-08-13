import RentCategoryDetailPage from "@/components/sections/rent-properties/RentCategoryDetailPage";
import { getRentCategory } from "@/components/sections/rent-properties/rentCategoryConfig";
import { RENT_PROPERTY_DETAIL } from "@/components/sections/detail/detailData";

const category = getRentCategory("properties");

export function generateStaticParams() {
  return [...new Set(category.homes.map((home) => home.slug))].map((slug) => ({
    slug,
  }));
}

export function generateMetadata() {
  return {
    title: `${RENT_PROPERTY_DETAIL.title} | Noor and Hoor`,
    description: RENT_PROPERTY_DETAIL.about[0],
  };
}

export default async function RentPropertyDetailPage({ params }) {
  return <RentCategoryDetailPage categoryKey="properties" params={params} />;
}
