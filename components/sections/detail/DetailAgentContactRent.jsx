"use client";

import { useState } from "react";
import { UserRound } from "lucide-react";
import { formValues, submitEnquiry } from "@/lib/enquiry-client";
import { validateContactBasics } from "@/lib/enquiry-validation";

const FIELD_CLASS =
  "h-[62px] w-full rounded-[12px] border border-[#2A2A2A] bg-[#0A0A0A] px-5 font-[family-name:var(--font-body)] text-[18px] text-[#F5F5F5] outline-none placeholder:text-[#F5F5F5]/50 focus:border-[#BC8741] sm:text-[20px]";

export default function DetailAgentContactRent() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

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
      setStatus("error");
      setError(validation.message);
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
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-[#111] text-[#BC8741]">
              <UserRound className="h-9 w-9" strokeWidth={1.5} aria-hidden />
            </div>
            <div>
              <h3 className="m-0 font-[family-name:var(--font-body)] text-[22px] font-semibold uppercase leading-9 text-[#F5F5F5] sm:text-[25px]">
                Get Expert Guidance for Your Next Move
              </h3>
              <p className="m-0 pt-1 font-[family-name:var(--font-body)] text-[18px] font-normal leading-[30px] text-[#D1D5DB] sm:text-[20px]">
                Contact our team and we will get back to you shortly
              </p>
            </div>
          </div>

          <form
            className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2"
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
              />
              {fieldErrors.name ? (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>
              ) : null}
            </div>
            <div>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder="Email Address"
                className={FIELD_CLASS}
              />
              {fieldErrors.email ? (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
              ) : null}
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                required
                placeholder="Phone Number"
                className={FIELD_CLASS}
              />
              {fieldErrors.phone ? (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.phone}</p>
              ) : null}
            </div>
            <input
              type="text"
              name="moveInDate"
              placeholder="Preferred Move-in Date"
              className={FIELD_CLASS}
            />
            <div className="sm:col-span-2">
              <textarea
                name="message"
                rows={4}
                required
                placeholder="Message"
                className="min-h-[152px] w-full resize-none rounded-[12px] border border-[#2A2A2A] bg-[#0A0A0A] px-5 py-4 font-[family-name:var(--font-body)] text-[18px] text-[#F5F5F5] outline-none placeholder:text-[#F5F5F5]/50 focus:border-[#BC8741] sm:text-[20px]"
              />
              {fieldErrors.details ? (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.details}</p>
              ) : null}
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
