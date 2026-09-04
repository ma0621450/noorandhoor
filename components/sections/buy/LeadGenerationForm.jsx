"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import Button from "@/components/ui/Button";
import LeadFormFields from "@/components/sections/buy/LeadFormFields";
import AgentCard from "@/components/sections/buy/AgentCard";
import { formValues, submitEnquiry } from "@/lib/enquiry-client";
import { validateLeadFields } from "@/lib/enquiry-validation";

export default function LeadGenerationForm() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = formValues(form);
    const validation = validateLeadFields(values);

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
        values.interest && `Interest: ${values.interest}`,
        values.propertyType && `Property type: ${values.propertyType}`,
        values.accounts && `Accounts: ${values.accounts}`,
        values.owner && `Owner: ${values.owner}`,
        values.assignee && `Assign to: ${values.assignee}`,
        values.request && `Request: ${values.request}`,
      ]
        .filter(Boolean)
        .join("\n");

      await submitEnquiry({
        name: values.fullName,
        email: values.email,
        phone: values.phone,
        company: values.company,
        service: values.interest || values.request || "Lead generation",
        details: details || "Lead generation enquiry",
        botcheck: values.botcheck,
        source: "lead-generation",
      });
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Could not send your enquiry. Please try again.");
    }
  }

  return (
    <section className="section-full py-12 sm:py-14 lg:py-16">
      <div className="section-inner">
        <div className="w-full rounded-[20px] bg-[#252525] px-4 py-12 sm:px-6 lg:px-8 lg:py-[60px]">
          <div className="mb-10 text-center lg:mb-12">
            <h2 className="text-gold-gradient">Start Your Property Journey</h2>
            <p className="mx-auto mt-4 max-w-[672px] text-base text-[#f5f5f5]">
              Fill out the form and our senior agent will contact you within 24
              hours
            </p>
          </div>

          <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:justify-between">
            <form
              className="w-full min-w-0 max-w-[736px] rounded-2xl border border-[#d4af37] bg-[#111] p-4 shadow-xl sm:p-8"
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

              <div className="mb-8 flex min-w-0 items-start gap-3 sm:items-center">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-r from-[#bc8741] to-[#d6a85e] sm:size-12">
                  <Building2 className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                </div>
                <h3 className="min-w-0 text-lg font-medium text-[#f5f5f5] sm:text-xl md:text-2xl">
                  Lead Generation Form
                </h3>
              </div>

              <LeadFormFields errors={fieldErrors} />

              {status === "success" && (
                <p className="mt-4 text-center text-sm font-medium text-[#d6a85e]">
                  Thank you. We received your enquiry and will be in touch
                  shortly.
                </p>
              )}
              {status === "error" && error && (
                <p className="mt-4 text-center text-sm font-medium text-red-400">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={status === "submitting"}
                className="mt-6 h-[60px] w-full rounded-[14px] text-base font-semibold normal-case tracking-normal sm:text-lg"
              >
                {status === "submitting" ? "Sending..." : "Convert & Submit"}
              </Button>
            </form>

            <AgentCard />
          </div>
        </div>
      </div>
    </section>
  );
}
