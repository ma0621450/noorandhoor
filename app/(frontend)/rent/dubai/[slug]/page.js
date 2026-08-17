import PropertyDetailPage from "@/components/sections/property/PropertyDetailPage";
import { getRentCategory } from "@/components/sections/rent-properties/rentCategoryConfig";
import { RENT_PROPERTY_DETAIL } from "@/components/sections/detail/detailData";

const category = getRentCategory("dubai");

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

export default async function RentDubaiDetailPage({ params }) {
  return <PropertyDetailPage market="rent" categoryKey="dubai" params={params} />;
}
