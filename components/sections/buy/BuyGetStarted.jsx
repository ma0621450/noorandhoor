import Image from "next/image";
import Button from "@/components/ui/Button";
import getStartedBg from "@/public/images/buy/get-started-bg.png";

export default function BuyGetStarted() {
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

      <div className="relative z-10 mx-auto flex min-h-[462px] w-full max-w-[1280px] flex-col items-center justify-center gap-5 px-4 py-16 text-center sm:px-6">
        <div className="flex flex-col items-center gap-3">
          <div className="h-px w-10 bg-white/80" />
          <p className="text-xs font-normal uppercase tracking-[2.2px] text-white">
            Get Started today
          </p>
        </div>

        <h2 className="text-gold-gradient max-w-[900px] text-[clamp(1.75rem,4vw,2.875rem)] leading-[40px]">
          Ready to Start Your Dubai
          <br />
          Property Journey?
        </h2>

        <p className="max-w-[768px] text-base leading-7 text-[#f5f5f5] sm:text-lg">
          Reach out and start your exclusive property journey with premium
          services and professional guidance tailored just for you.
        </p>

        <div className="mt-1 flex w-full flex-col items-stretch justify-center gap-5 sm:w-auto sm:flex-row sm:items-center">
          <Button
            type="button"
            className="h-[58px] w-full rounded-xl border border-[#bc8741] px-[41px] text-sm tracking-[1.3px] sm:w-auto"
          >
            Contact Us Now
          </Button>
          <Button
            type="button"
            className="h-[58px] w-full rounded-xl border border-[#bc8741] px-[41px] text-sm tracking-[1.3px] sm:w-auto"
          >
            Explore Exclusive Offers
          </Button>
        </div>
      </div>
    </section>
  );
}
