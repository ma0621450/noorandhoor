"use client";

import MatchMakingForm from "@/components/sections/buy/MatchMakingForm";

export default function MatchMaking({
  eyebrow = "Match Making",
  title = "Discover Properties That Match Your Vision",
  description = "Share your requirements, and we'll connect you with carefully selected UAE properties that fit your lifestyle and budget.",
  detailsPlaceholder = "Details",
  submitLabel = "Submit Enquiry",
}) {
  return (
    <section id="enquiry" className="section-full py-12 sm:py-14 lg:py-16">
      <div className="section-inner">
        <div className="w-full rounded-3xl bg-[rgba(67,67,67,0.4)] px-5 py-10 sm:px-10 sm:py-12 lg:py-14">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
            <h3 className="section-sub-heading">{eyebrow}</h3>
            <h2 className="text-gold-gradient">{title}</h2>
            <div className="section-divider" />
            <p className="max-w-4xl text-sm font-medium leading-[26px] text-[#f5f5f5] sm:text-base">
              {description}
            </p>
          </div>

          <div className="relative mx-auto mt-8 max-w-5xl">
            <MatchMakingForm
              detailsPlaceholder={detailsPlaceholder}
              submitLabel={submitLabel}
              source="match-making"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
