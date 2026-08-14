import DevelopersHero from "@/components/sections/developers/DevelopersHero";
import DevelopersChoice from "@/components/sections/developers/DevelopersChoice";
import DevelopersFeatured from "@/components/sections/developers/DevelopersFeatured";
import DevelopersComparison from "@/components/sections/developers/DevelopersComparison";
import DevelopersInvestment from "@/components/sections/developers/DevelopersInvestment";
import DevelopersBuyerGuide from "@/components/sections/developers/DevelopersBuyerGuide";
import DevelopersLeadForm from "@/components/sections/developers/DevelopersLeadForm";
import DevelopersWhyChoose from "@/components/sections/developers/DevelopersWhyChoose";
import DevelopersFAQs from "@/components/sections/developers/DevelopersFAQs";
import DevelopersGetStarted from "@/components/sections/developers/DevelopersGetStarted";

export const metadata = {
  title: "Developers | Noor and Hoor",
  description:
    "Explore trusted UAE property developers, compare portfolios, and invest in premier off-plan and luxury projects with Noor and Hoor.",
};

export default function DevelopersPage() {
  return (
    <div className="w-full overflow-x-clip bg-[#111111]">
      <DevelopersHero />
      <DevelopersChoice />
      <DevelopersFeatured />
      <DevelopersComparison />
      <DevelopersInvestment />
      <DevelopersBuyerGuide />
      <DevelopersLeadForm />
      <DevelopersWhyChoose />
      <DevelopersFAQs />
      <DevelopersGetStarted />
    </div>
  );
}
