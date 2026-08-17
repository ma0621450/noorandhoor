import PropertyHero from "@/components/common/PropertyHero";
import FeaturedSellProperties from "@/components/sections/sell/FeaturedSellProperties";
import SellPropertyMatching from "@/components/sections/sell/SellPropertyMatching";
import SellingProcess from "@/components/sections/sell/SellingProcess";
import SellerInsights from "@/components/sections/sell/SellerInsights";
import PopularCommunities from "@/components/sections/buy/PopularCommunities";
import PropertyValueReturns from "@/components/sections/sell/PropertyValueReturns";
import TestimonialSection from "@/components/common/TestimonialSection";
import FaqSection from "@/components/common/FaqSection";
import TrustedDeveloperPartners from "@/components/sections/buy/TrustedDeveloperPartners";
import LeadGenerationForm from "@/components/sections/buy/LeadGenerationForm";
import PropertyJourneyCta from "@/components/sections/property/PropertyJourneyCta";

export const metadata = {
  title: "Sell Properties | Noor and Hoor",
  description:
    "Sell your UAE property with Noor and Hoor — expert valuation, buyer matching, and end-to-end selling support.",
};

export default function SellPage() {
  return (
    <>
      <PropertyHero variant="sell" />
      <FeaturedSellProperties />
      <SellPropertyMatching />
      <SellingProcess />
      <SellerInsights />
      <PopularCommunities />
      <PropertyValueReturns />
      <TestimonialSection variant="sell" />
      <FaqSection variant="sell" />
      <TrustedDeveloperPartners />
      <LeadGenerationForm />
      <PropertyJourneyCta variant="sell" />
    </>
  );
}
