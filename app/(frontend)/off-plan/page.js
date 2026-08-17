import PropertyHero from "@/components/common/PropertyHero";
import OffPlanFeatured from "@/components/sections/offplan/OffPlanFeatured";
import PropertyJourneyCta from "@/components/sections/property/PropertyJourneyCta";

export const metadata = {
  title: "Off Plan Properties in UAE | Noor and Hoor",
  description:
    "Off-plan properties in the UAE are real estate developments purchased directly from developers before construction is completed.",
};

export default function OffPlanPage() {
  return (
    <>
      <PropertyHero variant="offplan" />
      <OffPlanFeatured />
      <PropertyJourneyCta variant="offplan" />
    </>
  );
}
