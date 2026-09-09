import PropertyHero from "@/components/common/PropertyHero";
import PropertyCategories from "@/components/sections/property/PropertyCategories";
import OffPlanFeatured from "@/components/sections/offplan/OffPlanFeatured";
import PropertyJourneyCta from "@/components/sections/property/PropertyJourneyCta";

export const metadata = {
  title: "Off Plan Properties in UAE | Noor and Hoor",
  description:
    "Buy directly from trusted developers, secure flexible payment plans, and invest in tomorrow's most popular locations before they're built.",
};

export default function OffPlanPage() {
  return (
    <>
      <PropertyHero variant="offplan" />
      <PropertyCategories market="off-plan" />
      <OffPlanFeatured />
      <PropertyJourneyCta variant="offplan" secondaryExternal/>
    </>
  );
}
