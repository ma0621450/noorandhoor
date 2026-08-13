import SellHero from "@/components/sections/sell/SellHero";
import FeaturedSellProperties from "@/components/sections/sell/FeaturedSellProperties";
import SellPropertyMatching from "@/components/sections/sell/SellPropertyMatching";
import SellingProcess from "@/components/sections/sell/SellingProcess";
import SellerInsights from "@/components/sections/sell/SellerInsights";
import PopularCommunities from "@/components/sections/buy/PopularCommunities";
import PropertyValueReturns from "@/components/sections/sell/PropertyValueReturns";
import SellTestimonials from "@/components/sections/sell/SellTestimonials";
import SellFAQs from "@/components/sections/sell/SellFAQs";
import TrustedDeveloperPartners from "@/components/sections/buy/TrustedDeveloperPartners";
import LeadGenerationForm from "@/components/sections/buy/LeadGenerationForm";
import SellGetStarted from "@/components/sections/sell-properties/SellGetStarted";

export const metadata = {
  title: "Sell Properties | Noor and Hoor",
  description:
    "Sell your UAE property with Noor and Hoor — expert valuation, buyer matching, and end-to-end selling support.",
};

export default function SellPage() {
  return (
    <div className="w-full overflow-x-clip">
      <SellHero />
      <FeaturedSellProperties />
      <SellPropertyMatching />
      <SellingProcess />
      <SellerInsights />
      <PopularCommunities />
      <PropertyValueReturns />
      <SellTestimonials />
      <SellFAQs />
      <TrustedDeveloperPartners />
      <LeadGenerationForm />
      <SellGetStarted />
    </div>
  );
}
