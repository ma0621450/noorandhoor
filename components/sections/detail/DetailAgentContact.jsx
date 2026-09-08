"use client";

import { useState } from "react";
import Image from "next/image";
import { formValues, submitEnquiry } from "@/lib/enquiry-client";
import { validateContactBasics } from "@/lib/enquiry-validation";
import { CONTACT_INFO } from "@/components/sections/contact/contactData";
import FieldError from "@/components/ui/FieldError";
import shakeebImage from "@/public/images/landingpage/team2.png";

const FIELD_CLASS =
  "w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#c59d5f]";

function WhatsAppIcon({ className = "h-7 w-7" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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
            <div className="relative size-[72px] shrink-0 overflow-hidden rounded-full border-2 border-[#c59d5f] sm:size-20">
              <Image
                src={shakeebImage}
                alt="Shakeeb Ahmed Khan"
                fill
                sizes="80px"
                className="object-cover object-top"
              />
            </div>
            <div>
              <p className="text-sm text-white/55">Your Assigned Agent</p>
              <p className="text-lg font-semibold text-white sm:text-xl">
                Shakeeb Ahmed Khan
              </p>
            </div>
          </div>

          <a
            href={CONTACT_INFO.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Shakeeb Ahmed Khan"
            className="flex size-14 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:brightness-110"
          >
            <WhatsAppIcon />
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
