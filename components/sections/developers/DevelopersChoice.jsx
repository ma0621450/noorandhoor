import Image from "next/image";
import Button from "@/components/ui/Button";
import { CATEGORY_PILLS } from "@/components/sections/developers/developersData";
import shakeebImage from "@/public/images/landingpage/team2.png";

export default function DevelopersChoice() {
  return (
    <section className="section-container">
      <div className="mb-10 flex flex-wrap items-center justify-center gap-5 sm:mb-12 sm:gap-[38px]">
        {CATEGORY_PILLS.map((label) => (
          <Button
            key={label}
            variant="outline"
            className="text-gold-gradient h-[58px] w-full max-w-[266px] rounded-[24px] border border-[#eec876] bg-transparent text-xs tracking-[1.3px] backdrop-blur-[6px] hover:bg-[#ba8a44]/10 sm:w-[266px] sm:text-sm"
          >
            {label}
          </Button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10 xl:gap-16">
        <div className="flex w-full min-w-0 max-w-[498px] flex-col items-start gap-4">
          <p className="text-xs font-normal uppercase tracking-[2.2px] text-white">
            Beyond Concrete
          </p>
          <h2 className="text-gold-gradient text-left text-[clamp(1.75rem,4vw,2.875rem)] leading-[1.3]">
            Why Our Developers Deserve Your Trust
          </h2>
          <div className="h-px w-12 bg-[#E9C349]" />
          <p className="text-base font-medium leading-[26px] text-[#F5F5F5]">
            We check every developer&apos;s history, build quality, and financial
            background before adding them to our platform. If they don&apos;t meet
            our standards, we don&apos;t list them. So every developer you see here
            is one we truly trust.
          </p>
        </div>

        <div className="w-full max-w-[436px] rounded-sm bg-gradient-to-br from-[#EEC876] to-[#B3813D] p-px">
          <div className="overflow-hidden rounded-sm border border-[rgba(233,195,73,0.15)] bg-[#1C1B1B] p-2">
            <div className="relative aspect-3/4 w-full overflow-hidden">
              <Image
                src={shakeebImage}
                alt="Shakeeb Ahmed Khan"
                fill
                sizes="436px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
