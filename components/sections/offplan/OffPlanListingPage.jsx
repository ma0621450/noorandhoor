import OffPlanHero from "@/components/sections/offplan/OffPlanHero";
import OffPlanHomes from "@/components/sections/offplan/OffPlanHomes";
import OffPlanGetStarted from "@/components/sections/offplan/OffPlanGetStarted";

export default function OffPlanListingPage({ categoryKey }) {
  return (
    <div className="w-full overflow-x-clip bg-[#111111]">
      <OffPlanHero />
      <OffPlanHomes categoryKey={categoryKey} />
      <OffPlanGetStarted />
    </div>
  );
}
