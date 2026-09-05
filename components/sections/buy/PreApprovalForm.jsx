"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { submitEnquiry } from "@/lib/enquiry-client";

const INPUT_CLASS =
  "h-11 w-full rounded-lg border border-[#d1d5dc]/70 bg-transparent px-4 text-sm text-[#f5f5f5] placeholder:text-[#f5f5f5]/50 outline-none transition focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_FORM = {
  loanType: "",
  creditStatus: "",
  name: "",
  email: "",
  phone: "",
};

const CREDIT_OPTIONS = [
  { value: "", label: "Select credit status", disabled: true },
  { value: "Excellent", label: "Excellent" },
  { value: "Good", label: "Good" },
  { value: "Fair", label: "Fair" },
  { value: "Need guidance", label: "Need guidance" },
];

const LOAN_OPTIONS = [
  { value: "", label: "Select loan type", disabled: true },
  { value: "Residential Mortgage", label: "Residential Mortgage" },
  { value: "Investment Loan", label: "Investment Loan" },
];

function validateForm(values) {
  const errors = {};
  if (!values.loanType) errors.loanType = "Select a loan type.";
  if (!values.creditStatus) errors.creditStatus = "Select your credit status.";
  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = "Enter the borrower full name.";
  }
  if (!values.email.trim() || !EMAIL_RE.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.phone.trim() || values.phone.replace(/\D/g, "").length < 8) {
    errors.phone = "Enter a valid phone number.";
  }
  return errors;
}

export default function PreApprovalForm({ estimatedPayment = "" }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
    if (status === "error") {
      setStatus("idle");
      setSubmitError("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const errors = validateForm(form);

    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      setStatus("idle");
      setSubmitError("");
      return;
    }

    setFieldErrors({});
    setStatus("submitting");
    setSubmitError("");

    try {
      await submitEnquiry({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        service: form.loanType,
        details: [
          `Loan type: ${form.loanType}`,
          `Credit status: ${form.creditStatus}`,
          estimatedPayment
            ? `Estimated monthly payment: ${estimatedPayment}`
            : null,
        ]
          .filter(Boolean)
          .join("\n"),
        source: "mortgage-preapproval",
      });
      setForm(EMPTY_FORM);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setSubmitError(
        err.message || "Could not send your request. Please try again.",
      );
    }
  }

  return (
    <form
      className="flex h-full w-full flex-col rounded-[10px] bg-[#0e1112] p-5 shadow-[0_10px_15px_rgba(0,0,0,0.1)] sm:p-6"
      onSubmit={handleSubmit}
      noValidate
    >
      <h3 className="text-gold-gradient text-lg font-medium">
        Pre-approval form
      </h3>
      <p className="mt-2 text-sm text-[#f5f5f5]/70">
        Share your details and we will verify mortgage pre-approval options.
      </p>

      {estimatedPayment ? (
        <p className="mt-4 rounded-lg border border-[#ba8a44]/35 bg-[#ba8a44]/10 px-3 py-2.5 text-xs font-medium text-[#eec876]">
          Linked estimate: {estimatedPayment} / month
        </p>
      ) : null}

      <div className="mt-5 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-[#f5f5f5]">Loan type</span>
          <Select
            className={INPUT_CLASS}
            value={form.loanType}
            onChange={(event) => updateField("loanType", event.target.value)}
            options={LOAN_OPTIONS}
            aria-label="Loan type"
          />
          {fieldErrors.loanType ? (
            <span className="text-xs text-red-400">{fieldErrors.loanType}</span>
          ) : null}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-[#f5f5f5]">
            Credit status
          </span>
          <Select
            className={INPUT_CLASS}
            value={form.creditStatus}
            onChange={(event) =>
              updateField("creditStatus", event.target.value)
            }
            options={CREDIT_OPTIONS}
            aria-label="Credit status"
          />
          {fieldErrors.creditStatus ? (
            <span className="text-xs text-red-400">
              {fieldErrors.creditStatus}
            </span>
          ) : null}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-[#f5f5f5]">
            Borrower name
          </span>
          <input
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Enter borrower full name"
            className={INPUT_CLASS}
          />
          {fieldErrors.name ? (
            <span className="text-xs text-red-400">{fieldErrors.name}</span>
          ) : null}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-[#f5f5f5]">Email</span>
          <input
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="you@example.com"
            className={INPUT_CLASS}
          />
          {fieldErrors.email ? (
            <span className="text-xs text-red-400">{fieldErrors.email}</span>
          ) : null}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-[#f5f5f5]">Phone</span>
          <input
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="+971 50 000 0000"
            className={INPUT_CLASS}
          />
          {fieldErrors.phone ? (
            <span className="text-xs text-red-400">{fieldErrors.phone}</span>
          ) : null}
        </label>
      </div>

      {status === "success" ? (
        <p className="mt-4 text-center text-sm font-medium text-[#d6a85e]">
          Thank you. We received your pre-approval request and will contact you
          shortly.
        </p>
      ) : null}

      {status === "error" && submitError ? (
        <p className="mt-4 text-center text-sm font-medium text-red-400">
          {submitError}
        </p>
      ) : null}

      <div className="mt-auto pt-5">
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="h-12 w-full !rounded-xl text-sm font-semibold tracking-[1.2px]"
        >
          {status === "submitting" ? "Sending..." : "Request Pre-Approval"}
        </Button>
      </div>
    </form>
  );
}
