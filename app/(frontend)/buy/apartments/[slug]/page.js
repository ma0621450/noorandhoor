import CategoryDetailPage from "@/components/sections/buy-category/CategoryDetailPage";
import { getCategory } from "@/components/sections/buy-category/categoryConfig";
import { PROPERTY_DETAIL } from "@/components/sections/detail/detailData";

const category = getCategory("apartments");

export function generateStaticParams() {
  return [...new Set(category.homes.map((home) => home.slug))].map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }) {
  return {
    title: `${PROPERTY_DETAIL.title} | Noor and Hoor`,
    description: PROPERTY_DETAIL.about[0],
  };
}

export default async function BuyApartmentDetailPage({ params }) {
  return <CategoryDetailPage categoryKey="apartments" params={params} />;
}
