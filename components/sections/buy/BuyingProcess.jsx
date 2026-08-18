import ProcessStepCard from "@/components/sections/buy/ProcessStepCard";
import { BUYING_STEPS } from "@/components/sections/buy/buyingProcessData";

export default function BuyingProcess({
  title = "Our Property Buying Process",
  description = "A clear, step-by-step approach designed to make your buying journey simple, transparent, and hassle-free from start to finish.",
  steps = BUYING_STEPS,
}) {
  return (
    <section className="section-full pt-12 sm:pt-14 lg:pt-16">
      <div className="w-full rounded-t-[20px] bg-[#252525] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
        <div className="section-inner">
          <div className="mx-auto flex flex-col items-center gap-5 text-center">
            <h2 className="text-gold-gradient">{title}</h2>
            <div className="section-divider" />
            <p className="max-w-4xl text-sm font-medium leading-[26px] text-[#f5f5f5] sm:text-base">
              {description}
            </p>
          </div>

          <div className="mx-auto mt-9 grid grid-cols-1 gap-8 min-[400px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-x-3">
            {steps.map((item) => (
              <ProcessStepCard key={item.step} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
