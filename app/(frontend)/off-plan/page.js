import OffPlanHero from "@/components/sections/offplan/OffPlanHero";
import OffPlanFeatured from "@/components/sections/offplan/OffPlanFeatured";
import OffPlanGetStarted from "@/components/sections/offplan/OffPlanGetStarted";

export const metadata = {
  title: "Off Plan Properties in UAE | Noor and Hoor",
  description:
    "Off-plan properties in the UAE are real estate developments purchased directly from developers before construction is completed.",
};

export default function OffPlanPage() {
  return (
    <div className="w-full overflow-x-clip bg-[#111111]">
      <OffPlanHero />
      <OffPlanFeatured />
      <OffPlanGetStarted />
    </div>
  );
}
