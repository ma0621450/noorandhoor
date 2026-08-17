import DetailHeader from "@/components/sections/detail/DetailHeader";
import DetailGallery from "@/components/sections/detail/DetailGallery";
import DetailAboutRent from "@/components/sections/detail/DetailAboutRent";
import DetailRelated from "@/components/sections/detail/DetailRelated";
import FaqSection from "@/components/common/FaqSection";
import DetailAgentContactRent from "@/components/sections/detail/DetailAgentContactRent";
import PropertyJourneyCta from "@/components/sections/property/PropertyJourneyCta";
import {
  RENT_PROPERTY_DETAIL,
  RELATED_PROPERTIES,
} from "@/components/sections/detail/detailData";
import { getRentCategory } from "@/components/sections/rent-properties/rentCategoryConfig";
import { getSellCategory } from "@/components/sections/sell-properties/sellCategoryConfig";

const MARKET_CONFIG = {
  rent: {
    getCategory: getRentCategory,
    breadcrumbLabel: (category) => category.eyebrow,
    priceLabel: "Monthly Rent",
    relatedHeading: "Explore Similar Rent Properties",
  },
  sell: {
    getCategory: getSellCategory,
    breadcrumbLabel: () => "Selling Property",
    priceLabel: "Price",
    relatedHeading: "Explore Similar Sell Properties",
  },
};

export default async function PropertyDetailPage({
  market,
  categoryKey,
  params,
}) {
  const config = MARKET_CONFIG[market];

  if (!config) {
    throw new Error(`Unsupported property market: ${market}`);
  }

  const { slug } = await params;
  const category = config.getCategory(categoryKey);
  const home =
    category.homes.find((item) => item.slug === slug) || category.homes[0];

  const property = {
    ...RENT_PROPERTY_DETAIL,
    slug,
    title: home.title,
    location: home.location,
    price: home.price ?? RENT_PROPERTY_DETAIL.price,
    gallery:
      home.images?.length >= 5
        ? home.images
        : [...(home.images || []), ...RENT_PROPERTY_DETAIL.gallery].slice(0, 5),
  };

  return (
    <div className="relative w-full overflow-x-clip bg-[#111111] text-white">
      <DetailHeader
        property={property}
        breadcrumbLabel={config.breadcrumbLabel(category)}
        breadcrumbHref={category.path}
        breadcrumbCurrent={category.heading}
        priceLabel={config.priceLabel}
      />
      <DetailGallery images={property.gallery} />
      <DetailAboutRent property={property} />
      <DetailRelated
        basePath={category.path}
        eyebrow="Related Properties"
        heading={config.relatedHeading}
        properties={RELATED_PROPERTIES}
      />
      <FaqSection variant="detail" />
      <DetailAgentContactRent agent={property.agent} />
      <PropertyJourneyCta variant="detail" />
    </div>
  );
}
