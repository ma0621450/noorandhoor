import Button from "@/components/ui/Button";
import Image from "next/image";
import listYourPropertyImage from "@/public/images/landingpage/LuxuryHome.png";

export default function ListYourProperty() {
  return (
    <section className="section-container">
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex w-full min-w-0 flex-col gap-4 lg:max-w-xl">
          <h3 className="section-sub-heading !tracking-[3.3px]">
            Valuation & Sales
          </h3>
          <h2 className="text-gold-gradient max-w-full uppercase lg:max-w-[480px]">
            Interested in Selling Your Home?
          </h2>
          <div className="h-[4px] w-25 bg-[#B3813D]" />
          <p className="text-md text-medium my-2 max-w-full lg:max-w-[430px] lg:my-4">
            Buy or sell your home with our agents. House prices, inspections,
            negotiations and other services are included in the house price.
          </p>
          <Button className="w-full sm:w-auto">List Your Property</Button>
        </div>

        <div className="w-full max-w-lg shrink-0 lg:max-w-none lg:w-auto">
          <Image
            src={listYourPropertyImage}
            alt="List Your Property"
            width={600}
            height={600}
            className="mx-auto h-auto w-full max-w-[600px] rounded-md border border-[#B3813D] lg:w-auto"
          />
        </div>
      </div>
    </section>
  );
}
