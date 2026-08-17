import Image from "next/image";
import logo from "@/public/svgs/logo.svg";

export default function About() {
  return (
    <section className="section-container">
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full max-w-[540px] flex-col items-start gap-5">
          <div className="flex w-full flex-col items-start gap-4">
            <h3 className="section-sub-heading">About Us</h3>
            <h2 className="text-gold-gradient max-w-[540px]">
              About Noor & Hoor Properties
            </h2>
            <div className="h-px w-16 [background:var(--gold-gradient)]" />
          </div>

          <p className="max-w-[500px] text-base font-medium leading-[26px] text-[#F5F5F5]">
            Noor & Hoor Properties is a UAE real estate brokerage offering
            residential, commercial, and off-plan investment solutions across
            Dubai, Abu Dhabi, Sharjah & Ajman. We deliver guidance, market
            insight, and end-to-end support for buyers, sellers, and investors,
            ensuring that property decisions have long term value.
          </p>
        </div>

        <div className="flex w-full max-w-[437px] shrink-0 items-center justify-center lg:justify-end">
          <Image
            src={logo}
            alt="Noor & Hoor Properties"
            width={437}
            height={290}
            className="h-auto w-full max-w-[437px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
