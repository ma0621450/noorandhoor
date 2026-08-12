import BuyHero from "@/components/sections/buy/BuyHero";
import PropertyCategories from "@/components/sections/buy/PropertyCategories";
import FeaturedBuyProperties from "@/components/sections/buy/FeaturedBuyProperties";
import MatchMaking from "@/components/sections/buy/MatchMaking";
import InvestmentMatrix from "@/components/sections/buy/InvestmentMatrix";
import PopularCommunities from "@/components/sections/buy/PopularCommunities";
import FinancialArchitecture from "@/components/sections/buy/FinancialArchitecture";
import BuyingProcess from "@/components/sections/buy/BuyingProcess";
import MarketInsights from "@/components/sections/buy/MarketInsights";
import BuyTestimonials from "@/components/sections/buy/BuyTestimonials";
import BuyFAQs from "@/components/sections/buy/BuyFAQs";
import TrustedDeveloperPartners from "@/components/sections/buy/TrustedDeveloperPartners";
import LeadGenerationForm from "@/components/sections/buy/LeadGenerationForm";
import BuyGetStarted from "@/components/sections/buy/BuyGetStarted";

export const metadata = {
  title: "Buy Properties | Noor and Hoor",
  description:
    "Build your future on the UAE's prime real estate with Noor and Hoor Properties.",
};

export default function BuyPage() {
  return (
    <div className="w-full overflow-x-clip">
      <BuyHero />
      <PropertyCategories />
      <FeaturedBuyProperties />
      <MatchMaking />
      <InvestmentMatrix />
      <PopularCommunities />
      <FinancialArchitecture />
      <BuyingProcess />
      <MarketInsights />
      <BuyTestimonials />
      <BuyFAQs />
      <TrustedDeveloperPartners />
      <LeadGenerationForm />
      <BuyGetStarted />
    </div>
  );
}
