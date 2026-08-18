"use client";

import { Building2, Mail, Phone, User } from "lucide-react";
import Button from "@/components/ui/Button";
import { Select } from "@/components/ui/CaretDown";
import { SERVICE_OPTIONS } from "@/components/sections/contact/contactData";

const INPUT =
  "h-[46px] w-full rounded-[9px] border border-[#d1d5dc] bg-transparent py-3 pl-11 pr-4 text-[15px] text-[#f5f5f5] placeholder:text-[#f5f5f5]/50 outline-none transition focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40";
const SELECT =
  "h-[46px] w-full appearance-none rounded-[9px] border border-[#d1d5dc] bg-transparent px-4 pr-10 text-[15px] text-[#f5f5f5]/50 outline-none transition focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40 focus:text-[#f5f5f5]";
const TEXTAREA =
  "min-h-[169px] w-full resize-y rounded-[9px] border border-[#d1d5dc] bg-transparent px-4 py-3 text-[15px] text-[#f5f5f5] placeholder:text-[#f5f5f5]/50 outline-none transition focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40";

function Field({ label, children }) {
  return (
    <label className="flex w-full flex-col gap-2">
      <span className="text-[13px] font-medium text-[#f5f5f5]">{label}</span>
      {children}
    </label>
  );
}

function IconInput({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon
        className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#99A1AF]"
        strokeWidth={1.5}
      />
      <input {...props} className={INPUT} />
    </div>
  );
}

export default function ContactForm() {
  return (
    <form
      id="contact-form"
      className="w-full rounded-[15px] border border-[#D4AF37] p-6 shadow-xl sm:p-7"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
        <Field label="Full Name">
          <IconInput
            icon={User}
            type="text"
            name="fullName"
            placeholder="Enter your name"
            required
            autoComplete="name"
          />
        </Field>

        <Field label="Email Address">
          <IconInput
            icon={Mail}
            type="email"
            name="email"
            placeholder="your.email@example.com"
            required
            autoComplete="email"
          />
        </Field>

        <Field label="Company">
          <IconInput
            icon={Building2}
            type="text"
            name="company"
            placeholder="Company name (optional)"
            autoComplete="organization"
          />
        </Field>

        <Field label="Phone Number">
          <IconInput
            icon={Phone}
            type="tel"
            name="phone"
            placeholder="+1 (555) 000-0000"
            required
            autoComplete="tel"
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Service">
            <Select
              name="service"
              defaultValue=""
              required
              aria-label="Service"
              className={SELECT}
              caretClassName="text-[#D4AF37]"
            >
              <option value="" disabled>
                Select a service
              </option>
              {SERVICE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Project Brief">
            <textarea
              name="brief"
              placeholder="Describe your requirements."
              rows={6}
              className={TEXTAREA}
            />
          </Field>
        </div>
      </div>

      <Button
        type="submit"
        className="mt-8 h-14 w-full rounded-[13px] text-base font-semibold tracking-normal normal-case"
      >
        Submit
      </Button>
    </form>
  );
}
