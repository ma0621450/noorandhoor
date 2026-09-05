"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { formValues, submitEnquiry } from "@/lib/enquiry-client";

const INPUT_CLASS =
  "h-[38px] w-full rounded border border-[#d1d5dc] bg-transparent px-4 text-sm text-[#f5f5f5] placeholder:text-[#f5f5f5]/50 outline-none transition focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PropertyValuationRequest() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = formValues(form);
    const errors = {};

    if (!String(values.address || "").trim()) {
      errors.address = "Enter the property address.";
    }
    if (!String(values.contact || "").trim()) {
      errors.contact = "Enter your contact details.";
    } else if (
      !EMAIL_RE.test(values.contact) &&
      String(values.contact).replace(/\D/g, "").length < 8
    ) {
      errors.contact = "Enter a valid email or phone number.";
    }

    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      setStatus("idle");
      setError("");
      return;
    }

    setFieldErrors({});
    setStatus("submitting");
    setError("");

    try {
      const contact = String(values.contact).trim();
      const isEmail = EMAIL_RE.test(contact);

      await submitEnquiry({
        name: values.name || "Seller valuation request",
        email: isEmail ? contact : "noreply@noorandhoor.com",
        phone: isEmail ? "" : contact,
        service: "Property valuation request",
        details: [
          values.address && `Address: ${values.address}`,
          values.propertyType && `Property type: ${values.propertyType}`,
          values.bedrooms && `Bedrooms: ${values.bedrooms}`,
          `Contact: ${contact}`,
        ]
          .filter(Boolean)
          .join("\n"),
        botcheck: values.botcheck,
        source: "sell-valuation",
      });
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Could not send your request. Please try again.");
    }
  }

  return (
    <form
      className="flex h-full w-full flex-col rounded-[10px] bg-[#0e1112] p-6 shadow-[0_10px_15px_rgba(0,0,0,0.1)]"
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

      <h3 className="text-gold-gradient text-lg font-medium">
        Property Valuation Request
      </h3>
      <p className="mt-2 text-sm text-[#f5f5f5]">
        Get a professional assessment based on trends and buyer demand.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#f5f5f5]">
            Property Address
          </span>
          <input
            name="address"
            type="text"
            className={`${INPUT_CLASS} ${fieldErrors.address ? "border-red-400" : ""}`}
            onChange={() =>
              setFieldErrors((current) => {
                const next = { ...current };
                delete next.address;
                return next;
              })
            }
          />
          {fieldErrors.address ? (
            <span className="text-xs text-red-400">{fieldErrors.address}</span>
          ) : null}
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#f5f5f5]">Property Type</span>
          <input name="propertyType" type="text" className={INPUT_CLASS} />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#f5f5f5]">
            Number of Bedrooms
          </span>
          <input name="bedrooms" type="text" className={INPUT_CLASS} />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#f5f5f5]">
            Contact Information
          </span>
          <input
            name="contact"
            type="text"
            placeholder="Email or phone"
            className={`${INPUT_CLASS} ${fieldErrors.contact ? "border-red-400" : ""}`}
            onChange={() =>
              setFieldErrors((current) => {
                const next = { ...current };
                delete next.contact;
                return next;
              })
            }
          />
          {fieldErrors.contact ? (
            <span className="text-xs text-red-400">{fieldErrors.contact}</span>
          ) : null}
        </label>
      </div>

      <div className="mt-auto flex flex-col gap-4 pt-6">
        {status === "success" ? (
          <p className="text-center text-sm font-medium text-[#d6a85e]">
            Thank you. We received your valuation request.
          </p>
        ) : null}
        {status === "error" && error ? (
          <p className="text-center text-sm font-medium text-red-400">{error}</p>
        ) : null}

        <Button
          type="submit"
          disabled={status === "submitting"}
          className="h-12 w-full !rounded-xl px-2 text-center text-sm font-medium tracking-[1.2px]"
        >
          {status === "submitting" ? "Sending..." : "Request Property Valuation"}
        </Button>
      </div>
    </form>
  );
}
