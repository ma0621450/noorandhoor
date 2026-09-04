"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { formValues, submitEnquiry } from "@/lib/enquiry-client";
import { validateContactBasics } from "@/lib/enquiry-validation";

const FIELD_CLASS =
  "w-full resize-none rounded-[11px] bg-[#111] px-5 py-3 text-sm font-semibold text-[#f5f5f5] placeholder:text-[#f5f5f5]/70 outline-none transition focus:ring-1 focus:ring-[#ba8a44] sm:py-[18px]";

export default function MatchMakingForm({
  detailsPlaceholder = "Details",
  submitLabel = "Submit Enquiry",
  source = "match-making",
  compact = false,
  onSuccess,
}) {
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
      setStatus("error");
      setError(validation.message);
      return;
    }

    setFieldErrors({});
    setStatus("submitting");
    setError("");

    try {
      await submitEnquiry({ ...values, source });
      form.reset();
      setStatus("success");
      onSuccess?.();
    } catch (err) {
      setStatus("error");
      setError(err.message || "Could not send your enquiry. Please try again.");
    }
  }

  return (
    <form
      className="relative flex w-full flex-col gap-4"
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            autoComplete="name"
            required
            className={`${FIELD_CLASS} h-12 py-2`}
          />
          {fieldErrors.name ? (
            <p className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>
          ) : null}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            required
            className={`${FIELD_CLASS} h-12 py-2`}
          />
          {fieldErrors.email ? (
            <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
          ) : null}
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            autoComplete="tel"
            required
            className={`${FIELD_CLASS} h-12 py-2`}
          />
          {fieldErrors.phone ? (
            <p className="mt-1 text-xs text-red-400">{fieldErrors.phone}</p>
          ) : null}
        </div>
      </div>

      <div>
        <textarea
          name="details"
          rows={compact ? 4 : 5}
          placeholder={detailsPlaceholder}
          required
          className={`${FIELD_CLASS} ${compact ? "min-h-[120px]" : "min-h-[160px]"}`}
        />
        {fieldErrors.details ? (
          <p className="mt-1 text-xs text-red-400">{fieldErrors.details}</p>
        ) : null}
      </div>

      {status === "success" && (
        <p className="text-center text-sm font-medium text-[#d6a85e]">
          Thank you. We received your enquiry and will be in touch shortly.
        </p>
      )}
      {status === "error" && (
        <p className="text-center text-sm font-medium text-red-400">{error}</p>
      )}

      <div className="mt-2 flex justify-center">
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="h-14 w-full max-w-[300px] rounded-xl text-xs tracking-[1.3px] sm:text-sm"
        >
          {status === "submitting" ? "Sending..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
