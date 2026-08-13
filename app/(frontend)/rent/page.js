import RentHero from "@/components/sections/rent/RentHero";
import FeaturedRentals from "@/components/sections/rent/FeaturedRentals";
import PrimeLocations from "@/components/sections/rent/PrimeLocations";
import RentalMatrix from "@/components/sections/rent/RentalMatrix";
import RentalMatchMaking from "@/components/sections/rent/RentalMatchMaking";
import TopRentalCommunities from "@/components/sections/rent/TopRentalCommunities";
import RentalAffordability from "@/components/sections/rent/RentalAffordability";
import RentingProcess from "@/components/sections/rent/RentingProcess";
import MarketInsights from "@/components/sections/buy/MarketInsights";
import RentTestimonials from "@/components/sections/rent/RentTestimonials";
import RentFAQs from "@/components/sections/rent/RentFAQs";
import TrustedDeveloperPartners from "@/components/sections/buy/TrustedDeveloperPartners";
import LeadGenerationForm from "@/components/sections/buy/LeadGenerationForm";
import RentGetStarted from "@/components/sections/rent/RentGetStarted";

export const metadata = {
  title: "Rent Properties | Noor and Hoor",
  description:
    "Step into luxury rental properties in the UAE with Noor and Hoor Properties.",
};

export default function RentPage() {
  return (
    <div className="w-full overflow-x-clip bg-[#111111]">
      <RentHero />
      <FeaturedRentals />
      <PrimeLocations />
      <RentalMatrix />
      <RentalMatchMaking />
      <TopRentalCommunities />
      <RentalAffordability />
      <RentingProcess />
      <MarketInsights />
      <RentTestimonials />
      <RentFAQs />
      <TrustedDeveloperPartners />
      <LeadGenerationForm />
      <RentGetStarted />
    </div>
  );
}
