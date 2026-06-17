import Button from "@/components/ui/Button";
import RealEstateDeveloperCard from "@/components/ui/RealEstateDeveloperCard";
import carousel1 from "@/public/images/landingpage/landingpagecarousel1.jpg";
import carousel2 from "@/public/images/landingpage/landingpagecarousel2.jpg";
import carousel3 from "@/public/images/landingpage/landingpagecarousel3.jpg";
import carousel4 from "@/public/images/landingpage/landingpagecarousel4.jpg";
import propertyImage from "@/public/images/landingpage/propertyImg.png";

const REAL_ESTATE_DEVELOPERS = [
  {
    id: 1,
    image: carousel1,
    name: "Azizi Developments",
    handover: "Q4 2028",
    description:
      "Since 2007, Azizi Developments has been at the forefront of Dubai's real estate growth, delivering more than 45,000 homes in premier locations like MBR City, Palm Jumeirah, Sheikh Zayed Road, and more. Backed by a strong commitment to quality and customer satisfaction, Azizi continues to shape Dubai's skyline.",
  },
  {
    id: 2,
    image: carousel2,
    name: "Binghatti",
    handover: "Q1 2030",
    description:
      "Binghatti is a prominent Dubai-based developer founded in 2008 by renowned Emirati entrepreneur Dr. Hussain Sajwani's vision in real estate. Binghatti is recognized for its distinctive architectural identity and innovative residential communities across Dubai's most sought-after districts.",
  },
  {
    id: 3,
    image: carousel3,
    name: "Damac Properties",
    handover: "Q1 2029",
    description:
      "Founded in 2002, DAMAC Properties is one of the Middle East's most acclaimed luxury real estate developers. Renowned for its world-class residences and branded partnerships with Versace, Fendi, and Cavalli, DAMAC has delivered iconic projects across Dubai and beyond.",
  },
  {
    id: 4,
    image: carousel4,
    name: "Ellington Properties",
    handover: "Q4 2028",
    description:
      "Ellington Properties, founded in 2014, is a boutique real estate developer based in Dubai. Renowned for its design-first philosophy, Ellington creates artfully crafted homes in sought-after communities, blending contemporary aesthetics with functional living spaces.",
  },
  {
    id: 5,
    image: propertyImage,
    name: "Emaar Properties",
    handover: "Q4 2029",
    description:
      "Established in 1997, Emaar Properties is among the world's most valuable and admired real estate developers. Best known for iconic landmarks like the Burj Khalifa, Dubai Mall, and Downtown Dubai, Emaar has shaped the modern identity of the UAE's property landscape.",
  },
  {
    id: 6,
    image: carousel1,
    name: "Sobha Realty",
    handover: "Q1 2029",
    description:
      "Sobha Realty, the global brand of Sobha Group, is a leading Indian-origin developer with a strong presence in Dubai. Known for its backward integration model and uncompromising quality standards, Sobha delivers premium residences with meticulous attention to detail.",
  },
];

export default function RealEstateDevelopers() {
  return (
    <section className="section-container">
      <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:gap-8 lg:mb-16 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="flex min-w-0 flex-col gap-4">
          <h3 className="section-sub-heading">Real Estate Developers</h3>
          <h2 className="text-gold-gradient max-w-[600px]">
            Real Estate with Prominent Developers
          </h2>
        </div>

        <Button
          variant="secondary"
          className="w-full shrink-0 sm:w-auto lg:self-start"
        >
          View More
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
        {REAL_ESTATE_DEVELOPERS.map((developer) => (
          <RealEstateDeveloperCard key={developer.id} developer={developer} />
        ))}
      </div>
    </section>
  );
}
