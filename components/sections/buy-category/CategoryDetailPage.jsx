import DetailHeader from "@/components/sections/detail/DetailHeader";
import DetailGallery from "@/components/sections/detail/DetailGallery";
import DetailAbout from "@/components/sections/detail/DetailAbout";
import DetailFeatures from "@/components/sections/detail/DetailFeatures";
import DetailRelated from "@/components/sections/detail/DetailRelated";
import DetailFAQs from "@/components/sections/detail/DetailFAQs";
import DetailAgentContact from "@/components/sections/detail/DetailAgentContact";
import BuyGetStarted from "@/components/sections/buy/BuyGetStarted";
import { PROPERTY_DETAIL } from "@/components/sections/detail/detailData";
import { getCategory } from "@/components/sections/buy-category/categoryConfig";

export default async function CategoryDetailPage({ categoryKey, params }) {
  const { slug } = await params;
  const category = getCategory(categoryKey);
  const home = category.homes.find((item) => item.slug === slug) || category.homes[0];

  const property = {
    ...PROPERTY_DETAIL,
    slug,
    title: home.title,
    location: home.location,
    price: home.price,
    gallery: home.images,
  };

  return (
    <div className="relative w-full overflow-x-clip bg-[#111111] text-white">
      <DetailHeader
        property={property}
        breadcrumbLabel={category.breadcrumb}
        breadcrumbHref={category.path}
        breadcrumbCurrent="Home"
      />
      <DetailGallery images={property.gallery} />
      <DetailAbout property={property} />
      <DetailFeatures />
      <DetailRelated basePath={category.path} />
      <DetailFAQs />
      <DetailAgentContact agent={property.agent} />
      <BuyGetStarted />
    </div>
  );
}
