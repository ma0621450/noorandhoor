import PageHero from "@/components/sections/PageHero";
import PropertyCategories from "@/components/sections/buy/PropertyCategories";
import FeaturedBuyProperties from "@/components/sections/buy/FeaturedBuyProperties";
import MatchMaking from "@/components/sections/buy/MatchMaking";
import InvestmentMatrix from "@/components/sections/buy/InvestmentMatrix";
import PopularCommunities from "@/components/sections/buy/PopularCommunities";

export const metadata = {
  title: "Buy Properties | Noor and Hoor",
  description:
    "Invest in your dream home in the UAE with Noor and Hoor Properties.",
};

export default function BuyPage() {
  return (
    <div>
      <PageHero
        title="Invest in Your Dream Home in the UAE"
        description="Curated collection of the world's most prestigious properties. Experience unparalleled luxury and timeless elegance."
      />
      <PropertyCategories />
      <FeaturedBuyProperties />
      <MatchMaking />
      <InvestmentMatrix />
      <PopularCommunities />
    </div>
  );
}
