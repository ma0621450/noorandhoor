import Image from "next/image";
import Button from "@/components/ui/Button";
import getStartedBg from "@/public/images/buy/get-started-bg.png";

export default function OffPlanGetStarted({
  heading = "Off-Plan Properties: Your Future Home, Ready to Choose Today",
}) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={getStartedBg}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority={false}
        />
        <div className="absolute inset-0 bg-[rgba(37,37,37,0.8)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[463px] w-full max-w-[1280px] flex-col items-center justify-center gap-5 px-4 py-16 text-center sm:px-6">
        <p className="text-xs font-normal uppercase tracking-[2.2px] text-white">
          Get Started today
        </p>

        <h2 className="text-gold-gradient !font-accent max-w-[1008px] text-[clamp(1.5rem,4vw,2.25rem)] leading-10">
          {heading}
        </h2>

        <p className="max-w-[768px] text-base leading-6 text-[#f5f5f5] sm:text-lg sm:leading-7">
          Whether you are looking for a weekend retreat or a long-term rental, we
          can help you find your ideal property.
        </p>

        <div className="mt-1 flex w-full flex-col items-stretch justify-center gap-5 sm:w-auto sm:flex-row sm:items-center">
          <Button
            type="button"
            className="h-[58px] w-full rounded-xl px-10 text-sm tracking-normal sm:w-[254px]"
          >
            Schedule Viewing
          </Button>
          <Button
            type="button"
            className="h-[58px] w-full rounded-xl px-10 text-sm tracking-normal sm:w-[224px]"
          >
            Contact Agent
          </Button>
        </div>
      </div>
    </section>
  );
}
