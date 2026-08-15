"use client";

import Button from "@/components/ui/Button";

const FIELD_CLASS =
  "w-full rounded-[11px] bg-[#111] px-5 py-3 text-[11px] font-semibold text-[#f5f5f5] placeholder:text-[#f5f5f5]/70 outline-none transition focus:ring-1 focus:ring-[#ba8a44] sm:text-sm";

const LABEL_CLASS =
  "mb-3 block text-left text-sm font-semibold capitalize text-[#f5f5f5]";

export default function SellPropertyMatching() {
  return (
    <section className="section-full py-12 sm:py-14 lg:py-16">
      <div className="section-inner">
        <div className="w-full rounded-3xl bg-[rgba(67,67,67,0.4)] px-5 py-10 sm:px-10 sm:py-12 lg:px-[40px] lg:py-14">
          <div className="mx-auto flex max-w-[1099px] flex-col items-center gap-4 text-center">
            <h3 className="section-sub-heading">Sell Property</h3>
            <h2 className="text-gold-gradient max-w-[1086px]">
              Intelligent Property Matching
            </h2>
            <div className="section-divider" />
            <p className="max-w-[1097px] text-sm font-medium leading-[26px] text-[#f5f5f5] sm:text-base">
              Tell us about your property, timeline, and goals, and our buyer
              network will surface the top off-market matches in under 60
              seconds.
            </p>
          </div>

          <form
            className="mx-auto mt-8 flex max-w-[1099px] flex-col gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label htmlFor="sell-brief" className={LABEL_CLASS}>
                Property Brief
              </label>
              <textarea
                id="sell-brief"
                rows={5}
                placeholder="Describe the property (type, location, size, condition, occupancy, and any seller constraints)"
                className={`${FIELD_CLASS} min-h-[160px] resize-none capitalize-none`}
              />
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <div className="flex flex-col gap-5">
                <div>
                  <label htmlFor="sell-asking" className={LABEL_CLASS}>
                    Asking Range (optional)
                  </label>
                  <input
                    id="sell-asking"
                    type="text"
                    placeholder="e.g PKR 8-10 Crore"
                    className={FIELD_CLASS}
                  />
                </div>
                <div>
                  <label htmlFor="sell-timeline" className={LABEL_CLASS}>
                    Desired Timeline
                  </label>
                  <select
                    id="sell-timeline"
                    defaultValue=""
                    className={`${FIELD_CLASS} h-[41px] cursor-pointer appearance-none`}
                  >
                    <option value="" disabled>
                      Select Timeline
                    </option>
                    <option>ASAP</option>
                    <option>1–3 Months</option>
                    <option>3–6 Months</option>
                    <option>6+ Months</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="sell-occupancy" className={LABEL_CLASS}>
                    Occupancy Status
                  </label>
                  <select
                    id="sell-occupancy"
                    defaultValue=""
                    className={`${FIELD_CLASS} h-[41px] cursor-pointer appearance-none`}
                  >
                    <option value="" disabled>
                      Select Occupancy
                    </option>
                    <option>Vacant</option>
                    <option>Owner Occupied</option>
                    <option>Tenanted</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <label htmlFor="sell-name" className={LABEL_CLASS}>
                    Name
                  </label>
                  <input
                    id="sell-name"
                    type="text"
                    placeholder="Full Name"
                    className={FIELD_CLASS}
                  />
                </div>
                <div>
                  <label htmlFor="sell-contact" className={LABEL_CLASS}>
                    Email / Phone / Address
                  </label>
                  <input
                    id="sell-contact"
                    type="text"
                    placeholder="you@example.com / +92 xxx xxxxxxxx / City"
                    className={FIELD_CLASS}
                  />
                </div>
              </div>
            </div>

            <div className="mt-2 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
              <Button
                type="submit"
                className="h-14 w-full rounded-xl px-4 text-xs tracking-[1.3px] sm:w-auto sm:min-w-[266px] sm:px-10 sm:text-sm"
              >
                Generate Buyer Matches
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="h-[58px] w-full rounded-xl px-4 text-xs tracking-[1.3px] sm:w-auto sm:min-w-[328px] sm:px-10 sm:text-sm"
              >
                Request Confidential Review
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
