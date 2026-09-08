"use client";

import { useState } from "react";
import { Building2, Mail, Phone, User } from "lucide-react";
import FieldError from "@/components/ui/FieldError";
import { Select } from "@/components/ui/Select";
import {
  MARKET_FILTER_OPTIONS,
  subcategoryOptionsForMarket,
} from "@/lib/listingFilters";

const INPUT =
  "h-[50px] w-full cursor-pointer rounded-[10px] border border-[#d1d5dc] bg-transparent px-4 text-base text-[#f5f5f5] outline-none transition focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40";
const INPUT_ICON =
  "h-[50px] w-full cursor-text rounded-[10px] border border-[#d1d5dc] bg-transparent py-3 pl-11 pr-4 text-base text-[#f5f5f5] placeholder:text-[#f5f5f5]/50 outline-none transition focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40";
const INPUT_ERROR = "border-red-400 focus:border-red-400 focus:ring-red-400/40";

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-[#f5f5f5]">{label}</span>
      {children}
      {error ? <FieldError message={error} /> : null}
    </div>
  );
}

function IconInput({ icon: Icon, className = "", ...props }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />
      <input {...props} className={`${INPUT_ICON} ${className}`} />
    </div>
  );
}

export default function LeadFormFields({ errors = {}, onClearError }) {
  const [interest, setInterest] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [request, setRequest] = useState("");
  const typeOptions = subcategoryOptionsForMarket(interest);

  const clear = (key) => onClearError?.(key);

  return (
    <div className="grid grid-cols-1 items-start gap-x-5 gap-y-3 sm:grid-cols-2">
      <Field label="Property Interest" error={errors.interest}>
        <Select
          name="interest"
          required
          value={interest}
          placeholder="Select interest"
          options={MARKET_FILTER_OPTIONS}
          className={`${INPUT} ${errors.interest ? INPUT_ERROR : ""}`}
          aria-label="Property Interest"
          onChange={(event) => {
            const next = event.target.value;
            setInterest(next);
            setPropertyType("");
            clear("interest");
            clear("propertyType");
          }}
        />
      </Field>

      <Field label="Full Name" error={errors.fullName}>
        <IconInput
          icon={User}
          name="fullName"
          type="text"
          autoComplete="name"
          placeholder="Enter your name"
          required
          className={errors.fullName ? INPUT_ERROR : ""}
          onChange={() => clear("fullName")}
        />
      </Field>

      <Field label="Property Type(s)" error={errors.propertyType}>
        <Select
          name="propertyType"
          required
          value={propertyType}
          placeholder={interest ? "Select type" : "Select interest first"}
          options={typeOptions}
          disabled={!interest || !typeOptions.length}
          className={`${INPUT} ${errors.propertyType ? INPUT_ERROR : ""}`}
          aria-label="Property Type"
          onChange={(event) => {
            setPropertyType(event.target.value);
            clear("propertyType");
          }}
        />
      </Field>

      <Field label="Email Address" error={errors.email}>
        <IconInput
          icon={Mail}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="your.email@example.com"
          required
          className={errors.email ? INPUT_ERROR : ""}
          onChange={() => clear("email")}
        />
      </Field>

      <Field label="Phone Number" error={errors.phone}>
        <IconInput
          icon={Phone}
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+971 50 000 0000"
          required
          className={errors.phone ? INPUT_ERROR : ""}
          onChange={() => clear("phone")}
        />
      </Field>

      <Field label="Accounts" error={errors.accounts}>
        <input
          name="accounts"
          type="text"
          placeholder="Account reference (optional)"
          className={INPUT}
        />
      </Field>

      <Field label="Company" error={errors.company}>
        <IconInput
          icon={Building2}
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Company name (optional)"
        />
      </Field>

      <Field label="Owner" error={errors.owner}>
        <input
          name="owner"
          type="text"
          placeholder="Property owner (optional)"
          className={INPUT}
        />
      </Field>

      <Field label="Custom Request" error={errors.request}>
        <Select
          name="request"
          required
          value={request}
          placeholder="Select request"
          options={["Viewing", "Consultation", "Valuation"]}
          className={`${INPUT} ${errors.request ? INPUT_ERROR : ""}`}
          aria-label="Custom Request"
          onChange={(event) => {
            setRequest(event.target.value);
            clear("request");
          }}
        />
      </Field>
    </div>
  );
}
