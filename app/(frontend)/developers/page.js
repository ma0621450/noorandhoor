import PropertyHero from "@/components/common/PropertyHero";
import DevelopersChoice from "@/components/sections/developers/DevelopersChoice";
import DevelopersFeatured from "@/components/sections/developers/DevelopersFeatured";
import DevelopersComparison from "@/components/sections/developers/DevelopersComparison";
import DevelopersInvestment from "@/components/sections/developers/DevelopersInvestment";
import DevelopersBuyerGuide from "@/components/sections/developers/DevelopersBuyerGuide";
import DevelopersLeadForm from "@/components/sections/developers/DevelopersLeadForm";
import DevelopersWhyChoose from "@/components/sections/developers/DevelopersWhyChoose";
import DevelopersFAQs from "@/components/sections/developers/DevelopersFAQs";
import PropertyJourneyCta from "@/components/sections/property/PropertyJourneyCta";

export const metadata = {
  title: "Developers | Noor and Hoor",
  description:
    "Explore trusted UAE property developers, compare portfolios, and invest in premier off-plan and luxury projects with Noor and Hoor.",
};

export default function DevelopersPage() {
  return (
    <>
      <PropertyHero variant="developers" />
      <DevelopersChoice />
      <DevelopersFeatured />
      <DevelopersComparison />
      <DevelopersInvestment />
      <DevelopersBuyerGuide />
      <DevelopersLeadForm />
      <DevelopersWhyChoose />
      <DevelopersFAQs />
      <PropertyJourneyCta variant="buy" />
    </>
  );
}
