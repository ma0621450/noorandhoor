import PropertyDetailShell from "@/components/sections/detail/PropertyDetailShell";
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
  const home = category.homes.find((item) => item.slug === slug);
  const source = home || category.homes[0];

  const fallbackProperty = {
    ...RENT_PROPERTY_DETAIL,
    slug,
    title: home?.title || RENT_PROPERTY_DETAIL.title,
    location: home?.location || RENT_PROPERTY_DETAIL.location,
    price: home?.price ?? RENT_PROPERTY_DETAIL.price,
    gallery:
      source.images?.length >= 5
        ? source.images
        : [...(source.images || []), ...RENT_PROPERTY_DETAIL.gallery].slice(0, 5),
  };

  return (
    <PropertyDetailShell
      variant={market}
      slug={slug}
      market={market}
      fallbackProperty={fallbackProperty}
      hasMockHome={Boolean(home)}
      related={RELATED_PROPERTIES}
      relatedHeading={config.relatedHeading}
      header={{
        breadcrumbLabel: config.breadcrumbLabel(category),
        breadcrumbHref: category.path,
        breadcrumbCurrent: category.heading,
        priceLabel: config.priceLabel,
      }}
    />
  );
}
