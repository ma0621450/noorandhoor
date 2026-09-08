"use client";

import { useState } from "react";
import Image from "next/image";
import FieldError from "@/components/ui/FieldError";
import { formValues, submitEnquiry } from "@/lib/enquiry-client";
import { validateContactBasics } from "@/lib/enquiry-validation";
import { CONTACT_INFO } from "@/components/sections/contact/contactData";
import shakeebImage from "@/public/images/landingpage/team2.png";

const FIELD_CLASS =
  "h-[62px] w-full rounded-[12px] border border-[#2A2A2A] bg-[#0A0A0A] px-5 font-[family-name:var(--font-body)] text-[18px] text-[#F5F5F5] outline-none placeholder:text-[#F5F5F5]/50 focus:border-[#BC8741] sm:text-[20px]";

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

export default function DetailAgentContactRent() {
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
    const validation = validateContactBasics({
      ...values,
      details:
        values.message ||
        [values.moveInDate && `Preferred move-in: ${values.moveInDate}`]
          .filter(Boolean)
          .join("\n") ||
        "Rental enquiry",
    });

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
        values.message,
        values.moveInDate && `Preferred move-in: ${values.moveInDate}`,
      ]
        .filter(Boolean)
        .join("\n");

      await submitEnquiry({
        name: values.name,
        email: values.email,
        phone: values.phone,
        details: details || "Rental enquiry",
        service: "Rent enquiry",
        source: "property-detail-rent-contact",
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
    <section className="w-full bg-[#111111] py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1120px] px-4">
        <div className="rounded-[20px] bg-[#1A1A1A] p-8 sm:p-10">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-start gap-5 sm:items-center">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-full border-2 border-[#BC8741]">
                <Image
                  src={shakeebImage}
                  alt="Shakeeb Ahmed Khan"
                  fill
                  sizes="80px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <h3 className="m-0 font-[family-name:var(--font-body)] text-[22px] font-semibold uppercase leading-9 text-[#F5F5F5] sm:text-[25px]">
                  Get Expert Guidance for Your Next Move
                </h3>
                <p className="m-0 pt-1 font-[family-name:var(--font-body)] text-[18px] font-normal leading-[30px] text-[#D1D5DB] sm:text-[20px]">
                  Contact Shakeeb Ahmed Khan and we will get back to you shortly
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
            className="mt-8 grid grid-cols-1 items-start gap-5 sm:grid-cols-2"
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
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                placeholder="Your Name"
                className={FIELD_CLASS}
                onChange={() => clearError("name")}
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
                onChange={() => clearError("email")}
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
                onChange={() => clearError("phone")}
              />
              <FieldError message={fieldErrors.phone} />
            </div>
            <div>
              <input
                type="text"
                name="moveInDate"
                placeholder="Preferred Move-in Date"
                className={FIELD_CLASS}
              />
              <FieldError />
            </div>
            <div className="sm:col-span-2">
              <textarea
                name="message"
                rows={4}
                required
                placeholder="Message"
                className="min-h-[152px] w-full resize-none rounded-[12px] border border-[#2A2A2A] bg-[#0A0A0A] px-5 py-4 font-[family-name:var(--font-body)] text-[18px] text-[#F5F5F5] outline-none placeholder:text-[#F5F5F5]/50 focus:border-[#BC8741] sm:text-[20px]"
                onChange={() => clearError("details")}
              />
              <FieldError message={fieldErrors.details} />
            </div>

            {status === "success" ? (
              <p className="text-center text-sm font-medium text-[#d6a85e] sm:col-span-2">
                Thank you. We received your message and will be in touch shortly.
              </p>
            ) : null}
            {status === "error" && error ? (
              <p className="text-center text-sm font-medium text-red-400 sm:col-span-2">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-gold col-span-1 flex h-[60px] w-full cursor-pointer items-center justify-center rounded-full font-[family-name:var(--font-body)] text-[18px] font-semibold leading-[30px] text-[#F5F5F5] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2 sm:text-[20px]"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
