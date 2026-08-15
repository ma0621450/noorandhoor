import Link from "next/link";
import { Building2, Handshake, KeyRound } from "lucide-react";

export const metadata = {
  title: "About Us | Noor & Hoor Properties",
  description:
    "Learn about Noor & Hoor Properties, our approach, and our commitment to helping clients navigate Dubai real estate.",
};

const values = [
  {
    icon: Handshake,
    title: "Trusted Guidance",
    description:
      "Clear, honest advice that keeps your goals at the centre of every property decision.",
  },
  {
    icon: Building2,
    title: "Market Expertise",
    description:
      "Local knowledge across Dubai's established communities and leading off-plan developments.",
  },
  {
    icon: KeyRound,
    title: "Personal Service",
    description:
      "Dedicated support from your first conversation through viewings, negotiation, and handover.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#111] pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
      <section className="section-inner">
        <div className="mx-auto max-w-5xl">
          <header className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-light uppercase tracking-[3.6px] text-[#f5f5f5]">
              Our Company
            </p>
            <h1 className="text-gold-gradient mt-5 text-[clamp(2.5rem,5vw,4.5rem)]">
              About Us
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/75 sm:text-base">
              Noor &amp; Hoor Properties connects clients with exceptional real estate
              opportunities across Dubai. We combine local market knowledge with
              personal, dependable service.
            </p>
          </header>

          <div className="mt-12 grid gap-5 md:grid-cols-3 sm:mt-16">
            {values.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-white/10 bg-[#171717] p-7 transition-colors hover:border-[#ba8a44]/50"
              >
                <Icon className="h-8 w-8 text-[#ba8a44]" strokeWidth={1.4} />
                <h2 className="!font-accent mt-6 text-xl text-white">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/65">{description}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-10 border-y border-[#ba8a44]/30 py-12 md:grid-cols-2 md:gap-16 sm:mt-16 sm:py-16">
            <div>
              <h2 className="text-gold-gradient text-3xl sm:text-4xl">Our Mission</h2>
              <p className="mt-5 text-sm leading-7 text-white/75 sm:text-base">
                To make buying, selling, renting, and investing in Dubai property
                straightforward. We provide the insight and support clients need to
                move forward with confidence.
              </p>
            </div>
            <div>
              <h2 className="text-gold-gradient text-3xl sm:text-4xl">Our Approach</h2>
              <p className="mt-5 text-sm leading-7 text-white/75 sm:text-base">
                We listen first, recommend carefully, and stay involved throughout
                the journey. Every search is shaped around the client&apos;s priorities,
                timeline, and long-term ambitions.
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-2xl bg-[#171717] px-6 py-10 text-center sm:mt-16 sm:px-10">
            <h2 className="text-gold-gradient text-3xl sm:text-4xl">
              Start Your Property Journey
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70">
              Tell us what you are looking for and our team will help you take the
              next step.
            </p>
            <Link
              href="/contact"
              className="btn-gold mt-7 inline-flex rounded-lg px-7 py-3 text-sm font-semibold !text-white transition-opacity hover:opacity-85"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
