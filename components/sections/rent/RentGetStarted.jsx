import Image from "next/image";
import Button from "@/components/ui/Button";
import getStartedBg from "@/public/images/buy/get-started-bg.png";

export default function RentGetStarted() {
  return (
    <section className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={getStartedBg}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority={false}
        />
        <div className="absolute inset-0 bg-[rgba(37,37,37,0.8)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[462px] w-full max-w-[1280px] flex-col items-center justify-center gap-5 px-4 py-16 text-center sm:px-6">
        <h2 className="text-gold-gradient max-w-[900px] text-[clamp(1.75rem,4vw,2.875rem)] leading-[40px]">
          List Your Property for Rent With Us
        </h2>

        <p className="max-w-[768px] text-base leading-7 text-[#f5f5f5] sm:text-lg">
          Optimize your asset, reach a premium audience, and enjoy a seamless
          rental process.
        </p>

        <div className="mt-1 flex w-full flex-col items-stretch justify-center gap-5 sm:w-auto sm:flex-row sm:items-center">
          <Button
            type="button"
            className="h-[58px] w-full rounded-xl px-10 text-sm tracking-[1.3px] sm:w-auto"
          >
            Get a Free Consultation
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="h-[58px] w-full rounded-xl px-10 text-sm tracking-[1.3px] sm:w-auto"
          >
            See Owner Guide
          </Button>
        </div>
      </div>
    </section>
  );
}
