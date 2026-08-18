import BuyingProcess from "@/components/sections/buy/BuyingProcess";
import { RENTING_STEPS } from "@/components/sections/rent/rentingProcessData";

export default function RentingProcess() {
  return (
    <BuyingProcess
      title="Our Property Renting Process"
      description="A simple, transparent journey from your first inquiry to signing your lease, designed to keep the entire renting process stress-free."
      steps={RENTING_STEPS}
    />
  );
}
