"use client";

import { useState } from "react";
import { Phone, UserRound } from "lucide-react";
import { formValues, submitEnquiry } from "@/lib/enquiry-client";
import { validateContactBasics } from "@/lib/enquiry-validation";
import { CONTACT_INFO } from "@/components/sections/contact/contactData";
import FieldError from "@/components/ui/FieldError";

const FIELD_CLASS =
  "w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#c59d5f]";

export default function DetailAgentContact() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = formValues(form);
    const validation = validateContactBasics(values);

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
      await submitEnquiry({
        name: values.name,
        email: values.email,
        phone: values.phone,
        details: values.message || values.details,
        service: "Property enquiry",
        source: "property-detail-contact",
        botcheck: values.botcheck,
      });
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Could not send your message. Please try again.");
    }
  }

  return (
    <section className="w-full bg-[#111111] py-10 sm:py-14">
      <div className="mx-auto w-full max-w-[1280px] px-4">
        <p className="text-xs font-normal uppercase tracking-[2.2px] text-[#c59d5f]">
          Contact Our Agent
        </p>
        <h2 className="detail-heading mt-3 max-w-[900px] text-left font-[family-name:var(--font-heading)] text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold uppercase leading-[1.15] text-gold-gradient">
          Get Expert Guidance for Your Next Move
        </h2>
        <div className="section-divider mt-3 ml-0 mr-auto" />

        <div className="mt-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex size-[72px] items-center justify-center rounded-full bg-[#1a1a1a] text-[#c59d5f] sm:size-20">
              <UserRound className="h-8 w-8" strokeWidth={1.5} aria-hidden />
            </div>
            <div>
              <p className="text-sm text-white/55">Contact Our Team</p>
              <p className="text-lg font-semibold text-white sm:text-xl">
                Noor &amp; Hoor Properties
              </p>
            </div>
          </div>

          <a
            href={CONTACT_INFO.phoneHref}
            aria-label="Call Noor and Hoor"
            className="flex size-14 cursor-pointer items-center justify-center rounded-full bg-[#00d600] text-white shadow-lg transition hover:brightness-110"
          >
            <Phone className="h-6 w-6" fill="currentColor" strokeWidth={0} />
          </a>
        </div>

        <form
          className="relative mt-8 w-full rounded-xl border border-white/20 p-4 sm:p-5"
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

          <div className="grid items-start gap-3 sm:grid-cols-3">
            <div>
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                placeholder="Your Name"
                className={FIELD_CLASS}
                onChange={() =>
                  setFieldErrors((current) => {
                    if (!current.name) return current;
                    const next = { ...current };
                    delete next.name;
                    return next;
                  })
                }
              />
              <FieldError message={fieldErrors.name} />
            </div>
            <div>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder="Email Address"
                className={FIELD_CLASS}
                onChange={() =>
                  setFieldErrors((current) => {
                    if (!current.email) return current;
                    const next = { ...current };
                    delete next.email;
                    return next;
                  })
                }
              />
              <FieldError message={fieldErrors.email} />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                required
                placeholder="Phone Number"
                className={FIELD_CLASS}
                onChange={() =>
                  setFieldErrors((current) => {
                    if (!current.phone) return current;
                    const next = { ...current };
                    delete next.phone;
                    return next;
                  })
                }
              />
              <FieldError message={fieldErrors.phone} />
            </div>
          </div>

          <div className="mt-3">
            <textarea
              name="message"
              rows={5}
              required
              placeholder="write your Message"
              className="w-full resize-none bg-transparent text-sm text-white outline-none placeholder:text-white/40"
              onChange={() =>
                setFieldErrors((current) => {
                  if (!current.details) return current;
                  const next = { ...current };
                  delete next.details;
                  return next;
                })
              }
            />
            <FieldError message={fieldErrors.details} />
          </div>

          {status === "success" ? (
            <p className="mt-3 text-sm font-medium text-[#d6a85e]">
              Thank you. We received your message and will be in touch shortly.
            </p>
          ) : null}
          {status === "error" && error ? (
            <p className="mt-3 text-sm font-medium text-red-400">{error}</p>
          ) : null}

          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="cursor-pointer rounded-lg bg-[#c59d5f] px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#d6a85e] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
