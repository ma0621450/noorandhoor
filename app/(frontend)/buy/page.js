import PropertyHero from "@/components/common/PropertyHero";
import PropertyCategories from "@/components/sections/buy/PropertyCategories";
import FeaturedBuyProperties from "@/components/sections/buy/FeaturedBuyProperties";
import MatchMaking from "@/components/sections/buy/MatchMaking";
import InvestmentMatrix from "@/components/sections/buy/InvestmentMatrix";
import PopularCommunities from "@/components/sections/buy/PopularCommunities";
import FinancialArchitecture from "@/components/sections/buy/FinancialArchitecture";
import BuyingProcess from "@/components/sections/buy/BuyingProcess";
import MarketInsights from "@/components/sections/buy/MarketInsights";
import TestimonialSection from "@/components/common/TestimonialSection";
import FaqSection from "@/components/common/FaqSection";
import TrustedDeveloperPartners from "@/components/sections/buy/TrustedDeveloperPartners";
import LeadGenerationForm from "@/components/sections/buy/LeadGenerationForm";
import PropertyJourneyCta from "@/components/sections/property/PropertyJourneyCta";

export const metadata = {
  title: "Buy Properties | Noor and Hoor",
  description:
    "Discover, compare, and secure premium UAE properties that support your lifestyle and long term investment goals.",
};

export default function BuyPage() {
  return (
    <>
      <PropertyHero variant="buy" />
      <PropertyCategories />
      <FeaturedBuyProperties />
      <MatchMaking />
      <InvestmentMatrix />
      <PopularCommunities />
      <FinancialArchitecture />
      <BuyingProcess />
      <MarketInsights />
      <TestimonialSection variant="buy" />
      <FaqSection variant="buy" />
      <TrustedDeveloperPartners />
      <LeadGenerationForm />
      <PropertyJourneyCta variant="buy" />
    </>
  );
}
