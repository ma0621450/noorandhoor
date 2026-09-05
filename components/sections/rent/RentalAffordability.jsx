import RentalCostEstimator from "@/components/sections/rent/RentalCostEstimator";
import RentalEligibilityForm from "@/components/sections/rent/RentalEligibilityForm";

export default function RentalAffordability() {
  return (
    <section className="section-full py-12 sm:py-14 lg:py-16">
      <div className="section-inner">
        <div className="w-full rounded-[20px] bg-[#252525] px-4 py-12 sm:px-8 lg:px-16 lg:py-16">
          <h2 className="text-gold-gradient text-center">
            Rental Affordability Calculator
          </h2>

          <div className="mx-auto mt-10 grid w-full max-w-[920px] grid-cols-1 items-stretch gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-10">
            <div className="flex h-full min-h-0 w-full">
              <RentalCostEstimator />
            </div>
            <div className="flex h-full min-h-0 w-full">
              <RentalEligibilityForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
