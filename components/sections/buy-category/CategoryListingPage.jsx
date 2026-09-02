import PropertyHero from "@/components/common/PropertyHero";
import PropertyGrid from "@/components/sections/property/PropertyGrid";
import PropertyJourneyCta from "@/components/sections/property/PropertyJourneyCta";
import {
  getCategory,
  HOMES_PER_PAGE as BUY_HOMES_PER_PAGE,
  TOTAL_PAGES as BUY_TOTAL_PAGES,
} from "@/components/sections/buy-category/categoryConfig";
import {
  getSellCategory,
  HOMES_PER_PAGE as SELL_HOMES_PER_PAGE,
  TOTAL_PAGES as SELL_TOTAL_PAGES,
} from "@/components/sections/sell-properties/sellCategoryConfig";
import {
  getRentCategory,
  HOMES_PER_PAGE as RENT_HOMES_PER_PAGE,
  TOTAL_PAGES as RENT_TOTAL_PAGES,
} from "@/components/sections/rent-properties/rentCategoryConfig";
import {
  getOffPlanCategory,
  HOMES_PER_PAGE as OFFPLAN_HOMES_PER_PAGE,
  TOTAL_PAGES as OFFPLAN_TOTAL_PAGES,
} from "@/components/sections/offplan/offplanCategoryConfig";
import { getPageFromSearchParams } from "@/lib/seo";

const MARKETS = {
  buy: {
    variant: "buy",
    adminMarket: "buy",
    getCategory,
    homesPerPage: BUY_HOMES_PER_PAGE,
    totalPages: BUY_TOTAL_PAGES,
  },
  sell: {
    variant: "sell",
    adminMarket: "sell",
    getCategory: getSellCategory,
    homesPerPage: SELL_HOMES_PER_PAGE,
    totalPages: SELL_TOTAL_PAGES,
  },
  rent: {
    variant: "rent",
    adminMarket: "rent",
    getCategory: getRentCategory,
    homesPerPage: RENT_HOMES_PER_PAGE,
    totalPages: RENT_TOTAL_PAGES,
  },
  offplan: {
    variant: "offplan",
    adminMarket: "off-plan",
    getCategory: getOffPlanCategory,
    homesPerPage: OFFPLAN_HOMES_PER_PAGE,
    totalPages: OFFPLAN_TOTAL_PAGES,
  },
};

export default async function CategoryListingPage({
  categoryKey,
  market = "buy",
  searchParams,
}) {
  const config = MARKETS[market] || MARKETS.buy;
  const category = config.getCategory(categoryKey);
  const page = searchParams ? await getPageFromSearchParams(searchParams) : 1;

  return (
    <>
      <PropertyHero
        variant={config.variant}
        title={category.heroTitle || `Off Plan ${category.heading} in UAE`}
        description={category.heroDescription || category.metaDescription}
        filterPrefix={category.filterPrefix}
        listingPath={category.path}
        trustSignals={category.trustSignals}
      />
      <PropertyGrid
        category={category}
        homesPerPage={config.homesPerPage}
        totalPages={config.totalPages}
        page={page}
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
