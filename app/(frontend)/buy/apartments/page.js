import ApartmentsHero from "@/components/sections/apartments/ApartmentsHero";
import ApartmentHomes from "@/components/sections/apartments/ApartmentHomes";
import BuyGetStarted from "@/components/sections/buy/BuyGetStarted";

export const metadata = {
  title: "Buy Apartments | Noor and Hoor",
  description:
    "Discover luxury apartments in the UAE. Curated collection of the world's most prestigious properties.",
};

export default function BuyApartmentsPage() {
  return (
    <div className="w-full overflow-x-clip">
      <ApartmentsHero />
      <ApartmentHomes />
      <BuyGetStarted />
    </div>
  );
}
