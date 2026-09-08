import BuyingProcess from "@/components/sections/buy/BuyingProcess";
import { SELLING_STEPS } from "@/components/sections/sell/sellingProcessData";

export default function SellingProcess() {
  return (
    <BuyingProcess
      title="Our Property Selling Process"
      description="From property valuation to final handover, we manage every stage with a clear, transparent approach designed to make selling simple and stress free."
      steps={SELLING_STEPS}
    />
  );
}
