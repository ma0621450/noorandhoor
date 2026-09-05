"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { formValues, submitEnquiry } from "@/lib/enquiry-client";
import { validateSellMatching } from "@/lib/enquiry-validation";

const FIELD_CLASS =
  "w-full rounded-[11px] bg-[#111] px-5 py-3 text-[11px] font-semibold text-[#f5f5f5] placeholder:text-[#f5f5f5]/70 outline-none transition focus:ring-1 focus:ring-[#ba8a44] sm:text-sm";

const LABEL_CLASS =
  "mb-3 block text-left text-sm font-semibold capitalize text-[#f5f5f5]";

const ERROR_CLASS = "mt-1.5 text-left text-xs font-medium text-red-400";

export default function SellPropertyMatching() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = formValues(form);
    const validation = validateSellMatching(values);

    if (!validation.ok) {
      setFieldErrors(validation.errors);
      setStatus("idle");
      setError("");
      return;
    }

    setFieldErrors({});
    setStatus("submitting");
    setError("");

    try {
      const details = [
        "Intent: Submit for buyer review",
        values.brief && `Property brief: ${values.brief}`,
        values.asking && `Asking range: ${values.asking}`,
        values.timeline && `Timeline: ${values.timeline}`,
        values.occupancy && `Occupancy: ${values.occupancy}`,
      ]
        .filter(Boolean)
        .join("\n");

      await submitEnquiry({
        name: values.name,
        email: values.email,
        phone: values.phone,
        service: "Sell / submit for buyer review",
        details,
        botcheck: values.botcheck,
        source: "sell-matching",
      });
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Could not send your enquiry. Please try again.");
    }
  }

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
            onSubmit={handleSubmit}
            noValidate
          >
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
              style={{ display: "none" }}
            />

            <div>
              <label htmlFor="sell-brief" className={LABEL_CLASS}>
                Property Brief
              </label>
              <textarea
                id="sell-brief"
                name="brief"
                rows={5}
                required
                placeholder="Describe the property (type, location, size, condition, occupancy, and any seller constraints)"
                className={`${FIELD_CLASS} min-h-[160px] resize-none capitalize-none`}
              />
              {fieldErrors.brief ? (
                <p className={ERROR_CLASS}>{fieldErrors.brief}</p>
              ) : null}
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <div className="flex flex-col gap-5">
                <div>
                  <label htmlFor="sell-asking" className={LABEL_CLASS}>
                    Asking Range (optional)
                  </label>
                  <input
                    id="sell-asking"
                    name="asking"
                    type="text"
                    placeholder="e.g PKR 8-10 Crore"
                    className={FIELD_CLASS}
                  />
                </div>
                <div>
                  <label htmlFor="sell-timeline" className={LABEL_CLASS}>
                    Desired Timeline
                  </label>
                  <Select
                    id="sell-timeline"
                    name="timeline"
                    required
                    defaultValue=""
                    className={`${FIELD_CLASS} h-[41px] cursor-pointer`}
                  >
                    <option value="" disabled>
                      Select Timeline
                    </option>
                    <option value="ASAP">ASAP</option>
                    <option value="1–3 Months">1–3 Months</option>
                    <option value="3–6 Months">3–6 Months</option>
                    <option value="6+ Months">6+ Months</option>
                  </Select>
                  {fieldErrors.timeline ? (
                    <p className={ERROR_CLASS}>{fieldErrors.timeline}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="sell-occupancy" className={LABEL_CLASS}>
                    Occupancy Status
                  </label>
                  <Select
                    id="sell-occupancy"
                    name="occupancy"
                    required
                    defaultValue=""
                    className={`${FIELD_CLASS} h-[41px] cursor-pointer`}
                  >
                    <option value="" disabled>
                      Select Occupancy
                    </option>
                    <option value="Vacant">Vacant</option>
                    <option value="Owner Occupied">Owner Occupied</option>
                    <option value="Tenanted">Tenanted</option>
                  </Select>
                  {fieldErrors.occupancy ? (
                    <p className={ERROR_CLASS}>{fieldErrors.occupancy}</p>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <label htmlFor="sell-name" className={LABEL_CLASS}>
                    Name
                  </label>
                  <input
                    id="sell-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Full Name"
                    className={FIELD_CLASS}
                  />
                  {fieldErrors.name ? (
                    <p className={ERROR_CLASS}>{fieldErrors.name}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="sell-email" className={LABEL_CLASS}>
                    Email
                  </label>
                  <input
                    id="sell-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    className={FIELD_CLASS}
                  />
                  {fieldErrors.email ? (
                    <p className={ERROR_CLASS}>{fieldErrors.email}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="sell-phone" className={LABEL_CLASS}>
                    Phone
                  </label>
                  <input
                    id="sell-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    placeholder="+971 50 000 0000"
                    className={FIELD_CLASS}
                  />
                  {fieldErrors.phone ? (
                    <p className={ERROR_CLASS}>{fieldErrors.phone}</p>
                  ) : null}
                </div>
              </div>
            </div>

            {status === "success" && (
              <p className="text-center text-sm font-medium text-[#d6a85e]">
                Thank you. We received your enquiry and will be in touch shortly.
              </p>
            )}
            {status === "error" && error && (
              <p className="text-center text-sm font-medium text-red-400">
                {error}
              </p>
            )}

            <div className="mt-2 flex w-full justify-center">
              <Button
                type="submit"
                disabled={status === "submitting"}
                className="h-14 w-full rounded-xl px-4 text-xs tracking-[1.3px] sm:w-auto sm:min-w-[280px] sm:px-10 sm:text-sm"
              >
                {status === "submitting"
                  ? "Sending..."
                  : "Submit for Buyer Review"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
