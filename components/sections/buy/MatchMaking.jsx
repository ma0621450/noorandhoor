import Button from "@/components/ui/Button";

const FIELD_CLASS =
  "w-full resize-none rounded-xl border border-white/10 bg-[#0a0a0a] px-5 py-4 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#ba8a44]/50";

export default function MatchMaking() {
  return (
    <section className="section-container">
      <div className="mx-auto rounded-2xl bg-[#1a1a1a] px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        <div className="flex flex-col items-center gap-4 text-center">
          <h3 className="section-sub-heading">Match Making</h3>
          <h2 className="text-gold-gradient">Intelligent Match Making</h2>
          <div className="h-[3px] w-16 bg-[#B3813D]" />
          <p className="text-sm sm:text-base">
            Tell us your investment thesis or family dynamic, and our data engine
            will put the top 3 off-market matches in under 60 seconds.
          </p>
        </div>

        <form className="mt-10 flex flex-col gap-4">
          <textarea
            rows={5}
            placeholder="Tell Us Your Investment Thesis Or Family Dynamic"
            className={FIELD_CLASS}
          />

          <div className="grid gap-4 lg:grid-cols-2">
            <textarea
              rows={4}
              placeholder="Message"
              className={`${FIELD_CLASS} min-h-[220px] lg:min-h-0`}
            />

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                className={FIELD_CLASS}
              />
              <input
                type="text"
                placeholder="Email/Phone/Address"
                className={FIELD_CLASS}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <Button type="submit" className="w-full max-w-md sm:w-auto sm:px-10 text-xs sm:text-sm">
              Generate Matches
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
