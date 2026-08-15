import ProcessStepCard from "@/components/sections/buy/ProcessStepCard";
import { BUYING_STEPS } from "@/components/sections/buy/buyingProcessData";

export default function SellingProcess() {
  return (
    <section className="section-full pt-12 sm:pt-14 lg:pt-16">
      <div className="w-full rounded-t-[20px] bg-[#252525] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-[1119px]">
          <div className="mx-auto flex flex-col items-center gap-5 text-center">
            <h2 className="text-gold-gradient">
              Selling Process (Step-By-Step)
            </h2>
            <div className="section-divider" />
            <p className="max-w-[1018px] text-sm font-medium leading-[26px] text-[#f5f5f5] sm:text-base">
              A clear, step-by-step approach designed to make your selling
              journey simple, transparent, and hassle-free from start to finish.
            </p>
          </div>

          <div className="mx-auto mt-9 grid max-w-[1119px] grid-cols-1 gap-y-10 min-[380px]:grid-cols-2 min-[380px]:gap-x-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-x-2 lg:gap-y-12">
            {BUYING_STEPS.map((item) => (
              <ProcessStepCard key={item.step} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
