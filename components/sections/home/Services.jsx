import Button from "@/components/ui/Button";
import svg1 from "@/public/svgs/financial-profit.svg";
import svg2 from "@/public/svgs/management.svg";
import svg3 from "@/public/svgs/advisor.svg";
import Image from "next/image";

const SERVICES = [
  {
    title: "Property Sales",
    description:
      "Buy or sell prime properties effortlessly. We connect you with top-tier buyers and premium homes that match your exact lifestyle and financial goals.",
    icon: svg1,
  },
  {
    title: "Property Management",
    description:
      "Leave the hard work to us. From finding reliable tenants to handling maintenance, we maximize your rental income while keeping your property in perfect shape.",
    icon: svg2,
  },
  {
    title: "Property Search",
    description:
      "Grow your wealth with smart choices. Get data-backed advice on high-ROI projects, off-plan deals, and market trends to secure your financial future.",
    icon: svg3,
  },
];

export default function Services() {
  return (
    <section className="section-container py-12 sm:py-16">
      <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between xl:gap-16">
        <div className="flex min-w-0 flex-col gap-4 xl:max-w-[445px] xl:shrink-0">
          <h3 className="section-sub-heading">Our Services</h3>
          <h2 className="text-gold-gradient my-2 max-w-full sm:my-4">
            Expert Real Estate Services Built Around You
          </h2>
          <div className="h-1 w-18 bg-[#ba8a44]" />
          <p className="text-md text-medium my-2 max-w-full sm:my-4 xl:max-w-[395px]">
            Find your perfect space without the stress. We filter the finest
            properties based on your budget, preferred locations, and must-have
            amenities, giving you complete market insights and trusted guidance
            at every step.
          </p>
          <Button variant="secondary" className="w-full sm:w-auto">
            Learn More
          </Button>
        </div>

        <div className="grid w-full min-w-0 grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-8 xl:flex-1">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="flex flex-col items-start gap-4 sm:gap-6"
            >
              <div className="rounded-sm border border-[#ba8a44] p-4">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={service.icon.width}
                  height={service.icon.height}
                  className="h-10 w-10"
                />
              </div>
              <h3 className="text-base font-medium">{service.title}</h3>
              <p className="text-md text-light max-w-full lg:max-w-[180px]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
