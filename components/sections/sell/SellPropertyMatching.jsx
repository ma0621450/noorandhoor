"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import FieldError from "@/components/ui/FieldError";
import { Select } from "@/components/ui/Select";
import { formValues, submitEnquiry } from "@/lib/enquiry-client";
import { validateSellMatching } from "@/lib/enquiry-validation";

const CONTROL_CLASS =
  "box-border h-12 w-full rounded-[11px] bg-[#111] px-5 text-[11px] font-semibold leading-none text-[#f5f5f5] placeholder:text-[#f5f5f5]/70 outline-none transition focus:ring-1 focus:ring-[#ba8a44] sm:text-sm";

const LABEL_CLASS =
  "mb-2 block text-left text-sm font-semibold capitalize text-[#f5f5f5]";

function Field({ id, label, error, children }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </label>
      {children}
      <FieldError message={error} />
    </div>
  );
}

export default function SellPropertyMatching() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  function clearError(key) {
    setFieldErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

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

            <Field id="sell-brief" label="Property Brief" error={fieldErrors.brief}>
              <textarea
                id="sell-brief"
                name="brief"
                rows={5}
                required
                placeholder="Describe the property (type, location, size, condition, occupancy, and any seller constraints)"
                className={`${CONTROL_CLASS} h-auto min-h-[160px] resize-none py-3 leading-5 capitalize-none`}
                onChange={() => clearError("brief")}
              />
            </Field>

            <div className="grid grid-cols-1 gap-x-5 gap-y-4 lg:grid-cols-2">
              <Field id="sell-asking" label="Asking Range (optional)">
                <input
                  id="sell-asking"
                  name="asking"
                  type="text"
                  placeholder="e.g PKR 8-10 Crore"
                  className={CONTROL_CLASS}
                />
              </Field>

              <Field id="sell-name" label="Name" error={fieldErrors.name}>
                <input
                  id="sell-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Full Name"
                  className={CONTROL_CLASS}
                  onChange={() => clearError("name")}
                />
              </Field>

              <Field
                id="sell-timeline"
                label="Desired Timeline"
                error={fieldErrors.timeline}
              >
                <Select
                  id="sell-timeline"
                  name="timeline"
                  required
                  defaultValue=""
                  className={`${CONTROL_CLASS} cursor-pointer`}
                  onChange={() => clearError("timeline")}
                >
                  <option value="" disabled>
                    Select Timeline
                  </option>
                  <option value="ASAP">ASAP</option>
                  <option value="1–3 Months">1–3 Months</option>
                  <option value="3–6 Months">3–6 Months</option>
                  <option value="6+ Months">6+ Months</option>
                </Select>
              </Field>

              <Field id="sell-email" label="Email" error={fieldErrors.email}>
                <input
                  id="sell-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className={CONTROL_CLASS}
                  onChange={() => clearError("email")}
                />
              </Field>

              <Field
                id="sell-occupancy"
                label="Occupancy Status"
                error={fieldErrors.occupancy}
              >
                <Select
                  id="sell-occupancy"
                  name="occupancy"
                  required
                  defaultValue=""
                  className={`${CONTROL_CLASS} cursor-pointer`}
                  onChange={() => clearError("occupancy")}
                >
                  <option value="" disabled>
                    Select Occupancy
                  </option>
                  <option value="Vacant">Vacant</option>
                  <option value="Owner Occupied">Owner Occupied</option>
                  <option value="Tenanted">Tenanted</option>
                </Select>
              </Field>

              <Field id="sell-phone" label="Phone" error={fieldErrors.phone}>
                <input
                  id="sell-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  placeholder="+971 50 000 0000"
                  className={CONTROL_CLASS}
                  onChange={() => clearError("phone")}
                />
              </Field>
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
                  : "Get My Property Match"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
