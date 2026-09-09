"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import EnquiryModal from "@/components/layout/EnquiryModal";
import listYourPropertyImage from "@/public/images/landingpage/LuxuryHome.png";

export default function ListYourProperty() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    if (!enquiryOpen) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [enquiryOpen]);

  return (
    <section className="section-container">
      <div className="flex flex-col items-center gap-10 xl:flex-row xl:items-center xl:justify-between xl:gap-12">
        <div className="flex w-full min-w-0 flex-col gap-4 xl:max-w-xl">
          <h3 className="section-sub-heading !tracking-[3.3px]">
            Valuation & Sales
          </h3>
          <h2 className="text-gold-gradient max-w-full uppercase xl:max-w-[480px]">
            Ready to Sell Your Property with Confidence?
          </h2>
          <div className="h-[4px] w-25 bg-[#B3813D]" />
          <p className="text-md text-medium my-2 max-w-full xl:max-w-[430px] xl:my-4">
            Trust our specialists to showcase your property, attract qualified
            buyers, and finalize deals smoothly, maximizing value with complete
            peace of mind.
          </p>
          <Button
            type="button"
            className="w-full sm:w-auto md:w-fit"
            onClick={() => setEnquiryOpen(true)}
          >
            List Your Property
          </Button>
        </div>

        <div className="w-full max-w-lg shrink-0 xl:max-w-md">
          <Image
            src={listYourPropertyImage}
            alt="List Your Property"
            width={600}
            height={600}
            className="mx-auto h-auto w-full max-w-full rounded-md border border-[#B3813D]"
          />
        </div>
      </div>

      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </section>
  );
}
