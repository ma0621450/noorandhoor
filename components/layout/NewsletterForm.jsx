"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { submitEnquiry } from "@/lib/enquiry-client";

export default function NewsletterForm() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") || "").trim();

    setStatus("submitting");
    setError("");

    try {
      await submitEnquiry({ email, source: "newsletter" });
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Could not subscribe. Please try again.");
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="flex flex-col gap-3 min-[440px]:flex-row">
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          aria-label="Email address"
          disabled={status === "submitting"}
          className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-[#ba8a44] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#bc8741] to-[#d6a85e] px-6 py-3 text-sm font-semibold uppercase tracking-[1.3px] text-white transition-all duration-200 hover:from-[#d6a85e] hover:to-[#eec876] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending" : "Subscribe"}
          <Send className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
      {status === "success" ? (
        <p className="text-sm text-[#eec876]">
          You&apos;re subscribed. We&apos;ll be in touch with new listings and
          market updates.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-400">{error}</p>
      ) : null}
    </form>
  );
}
