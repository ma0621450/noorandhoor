import PropertyHero from "@/components/common/PropertyHero";
import PropertyGrid from "@/components/sections/property/PropertyGrid";
import PropertyJourneyCta from "@/components/sections/property/PropertyJourneyCta";
import {
  getCategory,
  HOMES_PER_PAGE as BUY_HOMES_PER_PAGE,
} from "@/components/sections/buy-category/categoryConfig";
import {
  getSellCategory,
  HOMES_PER_PAGE as SELL_HOMES_PER_PAGE,
} from "@/components/sections/sell-properties/sellCategoryConfig";
import {
  getRentCategory,
  HOMES_PER_PAGE as RENT_HOMES_PER_PAGE,
} from "@/components/sections/rent-properties/rentCategoryConfig";
import {
  getOffPlanCategory,
  HOMES_PER_PAGE as OFFPLAN_HOMES_PER_PAGE,
} from "@/components/sections/offplan/offplanCategoryConfig";

const MARKETS = {
  buy: {
    variant: "buy",
    adminMarket: "buy",
    getCategory,
    homesPerPage: BUY_HOMES_PER_PAGE,
  },
  sell: {
    variant: "sell",
    adminMarket: "sell",
    getCategory: getSellCategory,
    homesPerPage: SELL_HOMES_PER_PAGE,
  },
  rent: {
    variant: "rent",
    adminMarket: "rent",
    getCategory: getRentCategory,
    homesPerPage: RENT_HOMES_PER_PAGE,
  },
  offplan: {
    variant: "offplan",
    adminMarket: "off-plan",
    getCategory: getOffPlanCategory,
    homesPerPage: OFFPLAN_HOMES_PER_PAGE,
  },
};

export default function CategoryListingPage({
  categoryKey,
  market = "buy",
}) {
  const config = MARKETS[market] || MARKETS.buy;
  const category = config.getCategory(categoryKey);

  return (
    <>
      <PropertyHero
        variant={config.variant}
        title={category.heroTitle || `Off Plan ${category.heading} in UAE`}
        description={category.heroDescription || category.metaDescription}
        filterPrefix={category.filterPrefix}
        listingPath={category.path}
        trustSignals={category.trustSignals}
        actions={category.heroActions}
      />
      <PropertyGrid
        category={category}
        homesPerPage={config.homesPerPage}
        market={config.adminMarket}
      />
      <PropertyJourneyCta
        variant={config.variant}
        heading={category.ctaHeading}
        description={category.ctaDescription}
      />
    </>
  );
}
