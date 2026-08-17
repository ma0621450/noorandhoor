import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import salesIcon from "@/public/svgs/financial-profit.svg";
import managementIcon from "@/public/svgs/management.svg";
import advisoryIcon from "@/public/svgs/advisor.svg";

const SERVICES = [
  {
    icon: salesIcon,
    title: "Property Sales",
    description:
      "Buy or sell prime properties effortlessly. We connect you with top-tier buyers and premium homes that match your exact lifestyle and financial goals.",
  },
  {
    icon: managementIcon,
    title: "Property Management",
    description:
      "Leave the hard work to us. From finding reliable tenants to handling maintenance, we maximize your rental income while keeping your property in perfect shape.",
  },
  {
    icon: advisoryIcon,
    title: "Investment Advisory",
    description:
      "Grow your wealth with smart choices. Get data-backed advice on high-ROI projects, off-plan deals, and market trends to secure your financial future.",
  },
];

export default function Services() {
  return (
    <section className="section-container">
      <div className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full max-w-[540px] flex-col items-start gap-5">
          <div className="flex w-full flex-col items-start gap-4">
            <h3 className="section-sub-heading">Our Services</h3>
            <h2 className="text-gold-gradient max-w-[540px]">
              Expert Real Estate Services Built Around You
            </h2>
            <div className="h-px w-16 [background:var(--gold-gradient)]" />
          </div>

          <p className="max-w-[500px] text-base font-medium leading-[26px] text-[#F5F5F5]">
            Find your perfect space without the stress. We filter the finest
            properties based on your budget, preferred locations, and must-have
            amenities, giving you complete market insights and trusted guidance
            at every step.
          </p>

          <Link href="/about-us" className="inline-flex">
            <Button
              variant="secondary"
              className="h-[58px] w-[194px] px-10 py-4 text-[13px] tracking-[1.3px] backdrop-blur-[6px]"
            >
              Learn more
            </Button>
          </Link>
        </div>

        <div className="grid w-full max-w-[640px] grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="flex w-full flex-col items-start gap-5"
            >
              <div className="flex size-[76px] items-center justify-center rounded-[8px] border border-[#BC8741] bg-[#111]">
                <Image
                  src={service.icon}
                  alt=""
                  width={41}
                  height={41}
                  className="size-[41px] object-contain"
                />
              </div>
              <h3 className="text-[13px] font-medium leading-[17px] text-[#F5F5F5]">
                {service.title}
              </h3>
              <p className="text-base font-light leading-[26px] text-[#F5F5F5]">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
