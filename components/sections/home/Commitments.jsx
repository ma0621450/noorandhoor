import Image from "next/image";
import svg1 from "@/public/svgs/exclusive.svg";
import svg2 from "@/public/svgs/experts.svg";
import svg3 from "@/public/svgs/personalization.svg";

const COMMITMENTS = [
  {
    icon: svg1,
    title: "Deep Market Knowledge",
    description:
      "We know Dubai's real estate market inside out and track daily prices to find the best properties for your budget.",
  },
  {
    icon: svg2,
    title: "Complete Property Care",
    description:
      "From the first call to getting your keys, we handle all developer deals, paperwork, and legal documentation for you.",
  },
  {
    icon: svg3,
    title: "Honest Advisory First",
    description:
      "Built on clear fees and transparent talk, we focus on finding premium investments that match your long term goals.",
  },
];

export default function Commitments() {
  return (
    <section className="section-container">
      <div className="flex flex-col items-center gap-6 px-2 text-center sm:gap-8">
        <h2 className="text-gold-gradient max-w-full">
          Our Core Commitments to You
        </h2>
        <div className="h-[4px] w-25 bg-[#B3813D]" />
        <p className="text-md max-w-full font-medium sm:max-w-[800px]">
          With years of experience and deep market insights, we help you find
          properties perfectly aligned with your lifestyle and investment goals.
        </p>

        <div className="grid w-full grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          {COMMITMENTS.map((commitment) => (
            <div
              key={commitment.title}
              className="mx-auto flex w-full max-w-[300px] flex-col gap-4 rounded-xl border border-[#BC8741] border-b-4 bg-[#1A1A1A] p-6 sm:max-w-none"
            >
              <Image
                src={commitment.icon}
                alt={commitment.title}
                width={50}
                height={50}
              />
              <h3 className="text-sm font-medium">{commitment.title}</h3>
              <p className="text-sm font-light">{commitment.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
