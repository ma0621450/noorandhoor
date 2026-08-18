"use client";

import Button from "@/components/ui/Button";

const FIELD_CLASS =
  "w-full resize-none rounded-[11px] bg-[#111] px-5 py-3 text-sm font-semibold text-[#f5f5f5] placeholder:text-[#f5f5f5]/70 outline-none transition focus:ring-1 focus:ring-[#ba8a44] sm:py-[18px]";

export default function MatchMaking({
  eyebrow = "Match Making",
  title = "Discover Properties That Match Your Vision",
  description = "Share your requirements, and we'll connect you with carefully selected UAE properties that fit your lifestyle and budget.",
  briefPlaceholder = "Tell Us Your Investment Thesis Or Family Dynamic",
  messagePlaceholder = "Message",
  submitLabel = "Generate Matches",
}) {
  return (
    <section className="section-full py-12 sm:py-14 lg:py-16">
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

          <form
            className="mx-auto mt-8 flex max-w-5xl flex-col gap-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <textarea
              rows={5}
              placeholder={briefPlaceholder}
              className={`${FIELD_CLASS} min-h-[160px]`}
            />

            <div className="grid gap-4 lg:grid-cols-2">
              <textarea
                rows={4}
                placeholder={messagePlaceholder}
                className={`${FIELD_CLASS} min-h-[120px] lg:min-h-[92px]`}
              />

              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className={`${FIELD_CLASS} h-12 py-2`}
                />
                <input
                  type="text"
                  placeholder="Email/Phone/Address"
                  className={`${FIELD_CLASS} h-12 py-2`}
                />
              </div>
            </div>

            <div className="mt-2 flex justify-center">
              <Button
                type="submit"
                className="h-14 w-full max-w-[300px] rounded-xl text-xs tracking-[1.3px] sm:text-sm"
              >
                {submitLabel}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
