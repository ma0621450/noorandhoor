import icon1 from "@/public/svgs/qualifiedAgents.svg";
import icon2 from "@/public/svgs/excellentService.svg";
import icon3 from "@/public/svgs/customerCare.svg";
import Image from "next/image";

const FEATURES = [
  {
    title: "Seamless Deals",
    icon: icon1,
  },
  {
    title: "Expert Advisors",
    icon: icon2,
  },
  {
    title: "24/7 Support",
    icon: icon3,
  },
];

export default function Features() {
  return (
    <section className="section-container py-12 sm:py-16">
      <div className="mb-10 flex flex-col items-center gap-6 px-2 text-center sm:mb-12 sm:gap-8">
        <h3 className="section-sub-heading !tracking-[3.3px]">
          Buy • Rent • Sell
        </h3>
        <h2 className="text-gold-gradient max-w-full sm:max-w-[780px]">
          Your Trusted Real Estate Journey Starts Here
        </h2>
        <div className="h-[4px] w-25 bg-[#B3813D]" />
        <p className="text-md max-w-full font-medium sm:max-w-[780px]">
          Finding, renting, or selling a property doesn&apos;t have to be
          complicated. We remove the confusion from the process and match you
          with experts who make your real estate dreams a reality.
        </p>

        <div className="mt-4 grid w-full grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center justify-between gap-6 sm:gap-8"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#BC8741] p-2">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={feature.icon.width}
                  height={feature.icon.height}
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
              <h3 className="!font-accent text-lg font-medium sm:text-xl">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
