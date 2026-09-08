import Image from "next/image";
import exclusiveIcon from "@/public/svgs/exclusive.svg";
import expertsIcon from "@/public/svgs/experts.svg";
import analyticIcon from "@/public/svgs/analytic.svg";
import personalizationIcon from "@/public/svgs/personalization.svg";

const REASONS = [
  {
    icon: exclusiveIcon,
    title: "Deep Market Expertise",
    highlight: "Trusted Local Knowledge",
  },
  {
    icon: expertsIcon,
    title: "Design That Stands Out",
    highlight: "Award Winning Builds",
  },
  {
    icon: analyticIcon,
    title: "Consistent Growth Track Record",
    highlight: "Reliable Returns",
  },
  {
    icon: personalizationIcon,
    title: "Fully Planned Communities",
    highlight: "Strong Value Appreciation",
  },
];

export default function DevelopersWhyChoose() {
  return (
    <section className="section-container">
      <div className="mb-10 flex flex-col items-center gap-4 text-center">
        <h2 className="text-gold-gradient">What Sets Our Top Developers Apart</h2>
        <div className="section-divider" />
      </div>

      <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {REASONS.map((reason) => (
          <article
            key={reason.title}
            className="flex flex-col items-center gap-[15px] rounded-[10px] bg-[#111111] p-5 text-center"
          >
            <Image
              src={reason.icon}
              alt=""
              width={90}
              height={90}
              className="h-[90px] w-[90px] object-contain"
            />
            <p className="text-xl font-medium leading-5 text-[#F5F5F5]">
              {reason.title}
            </p>
            <p className="text-xl font-medium leading-5 text-[#E9C349]">
              {reason.highlight}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
