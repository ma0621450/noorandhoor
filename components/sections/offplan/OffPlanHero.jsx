"use client";

import Button from "@/components/ui/Button";
import HeroBackgroundCarousel, {
  HeroCarouselDots,
} from "@/components/ui/HeroBackgroundCarousel";
import OffPlanFilterBar from "@/components/sections/offplan/OffPlanFilterBar";
import OffPlanTrustSignals from "@/components/sections/offplan/OffPlanTrustSignals";

export default function OffPlanHero() {
  return (
    <section className="relative isolate z-20 h-svh min-h-[695px] w-full overflow-hidden">
      <HeroBackgroundCarousel overlayClassName="bg-black/60">
        <div className="absolute inset-0 flex h-full flex-col items-center justify-center gap-6 px-4 pt-24 pb-8 text-center sm:gap-[38px] sm:px-8 lg:px-20">
          <h1 className="text-gold-gradient max-w-[1121px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Off Plan Properties in UAE
          </h1>

          <p className="max-w-[860px] text-sm font-light leading-[1.38] text-[#f5f5f5] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] sm:text-base md:text-lg lg:text-2xl lg:leading-[33px]">
            Off-plan properties in the UAE are real estate developments purchased
            directly from developers before construction is completed.
          </p>

          <OffPlanFilterBar />

          <div className="flex w-full max-w-[570px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-[38px]">
            <Button
              variant="outline"
              className="text-gold-gradient h-[58px] w-full min-w-0 rounded-xl border-[#eec876] text-xs tracking-[1.3px] backdrop-blur-[6px] sm:w-[266px] sm:text-sm"
            >
              Book Free Consultation
            </Button>
            <Button
              variant="primary"
              className="h-14 w-full min-w-0 rounded-xl text-xs tracking-[1.3px] sm:w-[266px] sm:text-sm"
            >
              Investment Guide
            </Button>
          </div>

          <OffPlanTrustSignals />

          <HeroCarouselDots />
        </div>
      </HeroBackgroundCarousel>
    </section>
  );
}
