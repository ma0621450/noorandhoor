import PropertyDetailShell from "@/components/sections/detail/PropertyDetailShell";
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

  return (
    <PropertyDetailShell
      variant={market}
      slug={slug}
      market={market}
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
