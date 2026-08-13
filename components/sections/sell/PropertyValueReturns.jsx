import SellerProceedsCalculator from "@/components/sections/sell/SellerProceedsCalculator";
import PropertyValuationRequest from "@/components/sections/sell/PropertyValuationRequest";

export default function PropertyValueReturns() {
  return (
    <section className="section-full py-12 sm:py-14 lg:py-16">
      <div className="section-inner">
        <div className="w-full rounded-[20px] bg-[#252525] px-4 py-12 sm:px-8 lg:px-16 lg:py-16">
          <h2 className="text-gold-gradient text-center">
            Property Value &amp; Seller Returns
          </h2>

          <div className="mx-auto mt-10 flex max-w-[876px] flex-col items-center justify-center gap-8 lg:mt-12 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <SellerProceedsCalculator />
            <PropertyValuationRequest />
          </div>
        </div>
      </div>
    </section>
  );
}
