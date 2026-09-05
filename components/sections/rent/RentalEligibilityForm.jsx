"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import FieldError from "@/components/ui/FieldError";
import { Select } from "@/components/ui/Select";
import { formValues, submitEnquiry } from "@/lib/enquiry-client";
import { FILTER_LOCATION_OPTIONS } from "@/lib/listingFilters";

const INPUT_CLASS =
  "h-[38px] w-full rounded border border-[#d1d5dc] bg-transparent px-4 text-sm text-[#f5f5f5] placeholder:text-[#f5f5f5]/50 outline-none transition focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEligibility(values) {
  const errors = {};
  if (!String(values.propertyType || "").trim()) {
    errors.propertyType = "Select a property type.";
  }
  if (!String(values.name || "").trim() || String(values.name).trim().length < 2) {
    errors.name = "Enter your full name.";
  }
  if (!EMAIL_RE.test(String(values.email || "").trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (String(values.phone || "").replace(/\D/g, "").length < 8) {
    errors.phone = "Enter a valid phone number.";
  }
  return errors;
}

export default function RentalEligibilityForm() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");

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
    const errors = validateEligibility(values);

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
      await submitEnquiry({
        name: values.name,
        email: values.email,
        phone: values.phone,
        service: "Rental eligibility check",
        details: [
          `Property type: ${values.propertyType}`,
          values.income && `Monthly income: ${values.income}`,
          values.employment && `Employment: ${values.employment}`,
          values.location && `Preferred location: ${values.location}`,
          values.budget && `Budget range: ${values.budget}`,
        ]
          .filter(Boolean)
          .join("\n"),
        botcheck: values.botcheck,
        source: "rent-eligibility",
      });
      form.reset();
      setPropertyType("");
      setLocation("");
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
        Rental Eligibility Check
      </h3>
      <p className="mt-2 text-sm text-[#f5f5f5]">
        Check rental affordability and get property recommendations.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#f5f5f5]">Property Type</span>
          <Select
            name="propertyType"
            className={INPUT_CLASS}
            value={propertyType}
            placeholder="Select option"
            options={["Apartment", "Villa", "Townhouse", "Penthouse", "Studio"]}
            aria-label="Property type"
            onChange={(event) => {
              setPropertyType(event.target.value);
              clearError("propertyType");
            }}
          />
          <FieldError message={fieldErrors.propertyType} />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#f5f5f5]">Monthly Income</span>
          <input
            name="income"
            type="text"
            placeholder="e.g. AED 15,000"
            className={INPUT_CLASS}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#f5f5f5]">Employment Status</span>
          <input
            name="employment"
            type="text"
            placeholder="Salaried / Self-employed"
            className={INPUT_CLASS}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#f5f5f5]">Preferred Location</span>
          <Select
            name="location"
            className={INPUT_CLASS}
            value={location}
            placeholder="Neighborhood or city"
            options={FILTER_LOCATION_OPTIONS}
            aria-label="Preferred location"
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#f5f5f5]">Budget Range</span>
          <input
            name="budget"
            type="text"
            placeholder="e.g. AED 8,000 - 15,000"
            className={INPUT_CLASS}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#f5f5f5]">Full Name</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your name"
            className={`${INPUT_CLASS} ${fieldErrors.name ? "border-red-400" : ""}`}
            onChange={() => clearError("name")}
          />
          <FieldError message={fieldErrors.name} />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#f5f5f5]">Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className={`${INPUT_CLASS} ${fieldErrors.email ? "border-red-400" : ""}`}
            onChange={() => clearError("email")}
          />
          <FieldError message={fieldErrors.email} />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#f5f5f5]">Phone</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder="+971 50 000 0000"
            className={`${INPUT_CLASS} ${fieldErrors.phone ? "border-red-400" : ""}`}
            onChange={() => clearError("phone")}
          />
          <FieldError message={fieldErrors.phone} />
        </label>
      </div>

      <div className="mt-auto flex flex-col gap-4 pt-6">
        {status === "success" ? (
          <p className="text-center text-sm font-medium text-[#d6a85e]">
            Thank you. We received your request and will be in touch shortly.
          </p>
        ) : null}
        {status === "error" && error ? (
          <p className="text-center text-sm font-medium text-red-400">{error}</p>
        ) : null}

        <Button
          type="submit"
          disabled={status === "submitting"}
          className="h-12 w-full !rounded-xl text-sm font-medium tracking-[1.2px]"
        >
          {status === "submitting" ? "Sending..." : "Check Rental Eligibility"}
        </Button>
      </div>
    </form>
  );
}
