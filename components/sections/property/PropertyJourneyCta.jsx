import Image from "next/image";
import Button from "@/components/ui/Button";
import { CONTACT_FORM_HREF } from "@/components/sections/contact/contactData";
import getStartedBg from "@/public/images/buy/get-started-bg.png";

const CTA_PRESETS = {
  buy: {
    heading: "Ready to Make the UAE Your Next Address?",
    description:
      "Your dream property is just one conversation away. Let's make it happen today.",
    primaryLabel: "Contact Us Now",
    primaryHref: "/contact",
    secondaryLabel: "Explore Exclusive Offers",
    secondaryHref: "/off-plan",
  },
  rent: {
    heading: "Still Searching for the Perfect Rental?",
    description:
      "Let us match you with a home that fits your budget and lifestyle, starting today.",
    primaryLabel: "Get a Free Consultation",
    primaryHref: "/contact",
    secondaryLabel: "See Owner Guide",
    secondaryHref: "/rent",
  },
  sell: {
    heading: "Turn Your UAE Property Into Your Next Smart Move",
    description:
      "A trusted network of serious buyers, expert pricing insight, and a seamless process from listing to sale.",
    primaryLabel: "Book Free Consultation",
    primaryHref: CONTACT_FORM_HREF,
    secondaryLabel: "List Your Property",
    secondaryHref: CONTACT_FORM_HREF,
  },
  developers: {
    heading: "Still Not Sure Which Developer Is Right For You?",
    description:
      "Let our team match you with a trusted developer based on your budget, goals, and preferred location.",
    primaryLabel: "Book Free Consultation",
    primaryHref: CONTACT_FORM_HREF,
    secondaryLabel: "Talk to a Specialist",
    secondaryHref: "/contact",
  },
  offplan: {
    heading: "Thinking About Buying Off-Plan In Dubai?",
    description:
      "Explore new developments, flexible payment plans, and early stage pricing before these projects reach the open market.",
    primaryLabel: "Schedule Viewing",
    primaryHref: CONTACT_FORM_HREF,
    secondaryLabel: "Contact Agent",
    secondaryHref: "/contact",
  },
  detail: {
    heading: "Ready to Start Your Holiday Property Journey?",
    description:
      "Whether you are looking for a weekend retreat or a long-term rental, we can help you find your ideal property.",
    primaryLabel: "Schedule Viewing",
    primaryHref: CONTACT_FORM_HREF,
    secondaryLabel: "Contact Agent",
    secondaryHref: "/contact",
  },
};

export default function PropertyJourneyCta({
  variant = "buy",
  heading,
  description,
  primaryLabel,
  secondaryLabel,
  primaryHref,
  secondaryHref,
}) {
  const preset = CTA_PRESETS[variant] || CTA_PRESETS.buy;

  return (
    <section className="relative w-full overflow-hidden">
      <Image
        src={getStartedBg}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[rgba(37,37,37,0.8)]" />

      <div className="relative z-10 mx-auto flex min-h-[462px] w-full max-w-[1280px] flex-col items-center justify-center gap-5 px-4 py-16 text-center sm:px-6">
        <div className="flex flex-col items-center gap-3">
          <div className="h-px w-10 bg-white/80" />
          <p className="text-xs font-normal uppercase tracking-[2.2px] text-white">
            Get Started Today
          </p>
        </div>

        <h2 className="text-gold-gradient max-w-[900px] text-[clamp(1.75rem,4vw,2.875rem)] leading-[1.2]">
          {heading || preset.heading}
        </h2>

        <p className="max-w-[768px] text-base leading-7 text-[#f5f5f5] sm:text-lg">
          {description || preset.description}
        </p>

        <div className="mt-1 flex w-full flex-col items-stretch justify-center gap-5 sm:w-auto sm:flex-row sm:items-center">
          <Button
            href={primaryHref || preset.primaryHref || CONTACT_FORM_HREF}
            className="h-[58px] w-full rounded-xl px-10 text-sm tracking-[1.3px] sm:w-auto"
          >
            {primaryLabel || preset.primaryLabel}
          </Button>
          <Button
            href={secondaryHref || preset.secondaryHref || CONTACT_FORM_HREF}
            variant="secondary"
            className="h-[58px] w-full rounded-xl px-10 text-sm tracking-[1.3px] sm:w-auto"
          >
            {secondaryLabel || preset.secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
