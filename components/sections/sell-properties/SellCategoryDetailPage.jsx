import DetailHeader from "@/components/sections/detail/DetailHeader";
import DetailGallery from "@/components/sections/detail/DetailGallery";
import DetailAboutRent from "@/components/sections/detail/DetailAboutRent";
import DetailRelated from "@/components/sections/detail/DetailRelated";
import DetailFAQs from "@/components/sections/detail/DetailFAQs";
import DetailAgentContactRent from "@/components/sections/detail/DetailAgentContactRent";
import RentDetailGetStarted from "@/components/sections/detail/RentDetailGetStarted";
import {
  RENT_PROPERTY_DETAIL,
  RELATED_PROPERTIES,
} from "@/components/sections/detail/detailData";
import { getSellCategory } from "@/components/sections/sell-properties/sellCategoryConfig";

export default async function SellCategoryDetailPage({ categoryKey, params }) {
  const { slug } = await params;
  const category = getSellCategory(categoryKey);
  const home =
    category.homes.find((item) => item.slug === slug) || category.homes[0];

  const property = {
    ...RENT_PROPERTY_DETAIL,
    slug,
    title: home.title,
    location: home.location,
    price: home.price ?? 85000000,
    gallery:
      home.images?.length >= 5
        ? home.images
        : [...(home.images || []), ...RENT_PROPERTY_DETAIL.gallery].slice(0, 5),
  };

  return (
    <div className="relative w-full overflow-x-clip bg-[#111111] text-white">
      <DetailHeader
        property={property}
        breadcrumbLabel="Selling Property"
        breadcrumbHref={category.path}
        breadcrumbCurrent={category.heading}
        priceLabel="Price"
      />
      <DetailGallery images={property.gallery} />
      <DetailAboutRent property={property} />
      <DetailRelated
        basePath={category.path}
        eyebrow="Related Properties"
        heading="Explore Similar Sell Properties"
        properties={RELATED_PROPERTIES}
      />
      <DetailFAQs />
      <DetailAgentContactRent agent={property.agent} />
      <RentDetailGetStarted />
    </div>
  );
}
