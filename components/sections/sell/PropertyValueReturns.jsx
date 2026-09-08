import SellerProceedsCalculator from "@/components/sections/sell/SellerProceedsCalculator";
import PropertyValuationRequest from "@/components/sections/sell/PropertyValuationRequest";

export default function PropertyValueReturns() {
  return (
    <section className="section-full py-12 sm:py-14 lg:py-16">
      <div className="section-inner">
        <div className="w-full rounded-[20px] bg-[#252525] px-4 py-12 sm:px-8 lg:px-16 lg:py-16">
          <h2 className="text-gold-gradient text-center">
            Not Sure What Your Property Is Worth?
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-7 text-[#f5f5f5] sm:text-base">
            Get a free valuation and expert guidance from a team that knows the
            Dubai market inside out.
          </p>

          <div className="mx-auto mt-10 grid w-full max-w-[920px] grid-cols-1 items-stretch gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-10">
            <div className="flex h-full min-h-0 w-full">
              <SellerProceedsCalculator />
            </div>
            <div className="flex h-full min-h-0 w-full">
              <PropertyValuationRequest />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
