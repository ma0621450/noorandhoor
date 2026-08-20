"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { formValues, submitEnquiry } from "@/lib/enquiry-client";

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

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    setStatus("submitting");
    setError("");

    try {
      await submitEnquiry({ ...formValues(form), source });
      form.reset();
      setStatus("success");
      onSuccess?.();
    } catch (err) {
      setStatus("error");
      setError(err.message || "Could not send your enquiry. Please try again.");
    }
  }

  return (
    <form className="relative flex w-full flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        style={{ display: "none" }}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          autoComplete="name"
          required
          className={`${FIELD_CLASS} h-12 py-2`}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          required
          className={`${FIELD_CLASS} h-12 py-2`}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          autoComplete="tel"
          required
          className={`${FIELD_CLASS} h-12 py-2`}
        />
      </div>

      <textarea
        name="details"
        rows={compact ? 4 : 5}
        placeholder={detailsPlaceholder}
        required
        className={`${FIELD_CLASS} ${compact ? "min-h-[120px]" : "min-h-[160px]"}`}
      />

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
