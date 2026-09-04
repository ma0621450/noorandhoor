"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { formValues, submitEnquiry } from "@/lib/enquiry-client";
import { validateContactBasics } from "@/lib/enquiry-validation";

const GROUPS = [
  {
    key: "looking",
    label: "I am looking to:",
    options: ["Invest for High ROI", "Acquire a Luxury Residence"],
  },
  {
    key: "insights",
    label: "Preferred Insights:",
    options: ["Market Evaluation", "Developer Review"],
  },
  {
    key: "contactPref",
    label: "Contact:",
    options: ["Schedule a Video Call", "Request Documentation"],
  },
];

const FIELD_CLASS =
  "h-11 w-full rounded-[10px] border border-[#E9C349]/40 bg-[#111] px-4 text-sm text-[#f5f5f5] placeholder:text-[#f5f5f5]/50 outline-none transition focus:border-[#E9C349] focus:ring-1 focus:ring-[#E9C349]/30";

function Pill({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-auto min-h-[34px] max-w-full rounded border px-3 py-1.5 text-left text-[11px] font-medium leading-tight tracking-[0.48px] text-[#F5F5F5] sm:px-4 sm:text-xs ${
        selected ? "border-[#E9C349] bg-[#E9C349]/10" : "border-[#E9C349]/40"
      }`}
    >
      {label}
    </button>
  );
}

export default function DevelopersLeadForm() {
  const [selected, setSelected] = useState({
    looking: GROUPS[0].options[0],
    insights: GROUPS[1].options[0],
    contactPref: GROUPS[2].options[0],
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = formValues(form);
    const validation = validateContactBasics({
      ...values,
      details: [
        `Looking to: ${selected.looking}`,
        `Preferred insights: ${selected.insights}`,
        `Contact preference: ${selected.contactPref}`,
      ].join("\n"),
    });

    if (!validation.ok) {
      setFieldErrors(validation.errors);
      setStatus("error");
      setError(validation.message);
      return;
    }

    setFieldErrors({});
    setStatus("submitting");
    setError("");

    try {
      await submitEnquiry({
        name: values.name,
        email: values.email,
        phone: values.phone,
        service: selected.looking,
        details: [
          `Looking to: ${selected.looking}`,
          `Preferred insights: ${selected.insights}`,
          `Contact preference: ${selected.contactPref}`,
        ].join("\n"),
        botcheck: values.botcheck,
        source: "developers-lead",
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
        <div className="rounded-[20px] bg-[#252525] px-4 py-[60px] sm:px-6">
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <h2 className="text-gold-gradient">Lead Generation</h2>
            <div className="section-divider" />
          </div>

          <form
            className="mx-auto flex w-full max-w-[576px] flex-col gap-5 rounded-2xl bg-[#1A1A1A] p-4 sm:p-8"
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

            {GROUPS.map((group) => (
              <div
                key={group.key}
                className="flex flex-col gap-3 sm:flex-row sm:items-start"
              >
                <p className="w-full shrink-0 text-sm font-medium text-[#E9C349] sm:w-[176px] sm:text-right">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.options.map((option) => (
                    <Pill
                      key={option}
                      label={option}
                      selected={selected[group.key] === option}
                      onClick={() =>
                        setSelected((current) => ({
                          ...current,
                          [group.key]: option,
                        }))
                      }
                    />
                  ))}
                </div>
              </div>
            ))}

            <div className="grid gap-3 sm:grid-cols-1">
              <div>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Full name"
                  className={FIELD_CLASS}
                />
                {fieldErrors.name ? (
                  <p className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>
                ) : null}
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  className={FIELD_CLASS}
                />
                {fieldErrors.email ? (
                  <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
                ) : null}
              </div>
              <div>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  placeholder="Phone number"
                  className={FIELD_CLASS}
                />
                {fieldErrors.phone ? (
                  <p className="mt-1 text-xs text-red-400">{fieldErrors.phone}</p>
                ) : null}
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

            <Button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 h-11 w-full rounded-[10px] text-sm tracking-[1.68px]"
            >
              {status === "submitting"
                ? "Sending..."
                : "Submit Inquiry for Consultation"}
            </Button>
            <p className="text-center text-xs text-[#F5F5F5]">
              Certified Local Property Advisor 100% Secured
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
