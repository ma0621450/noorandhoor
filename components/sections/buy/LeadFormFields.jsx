import { Building2, Mail, Phone, User } from "lucide-react";

const INPUT =
  "h-[50px] w-full cursor-pointer rounded-[10px] border border-[#d1d5dc] bg-[#111] px-4 text-base text-[#f5f5f5] placeholder:text-[#f5f5f5]/50 outline-none transition focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40";
const INPUT_ICON =
  "h-[50px] w-full cursor-text rounded-[10px] border border-[#d1d5dc] bg-transparent py-3 pl-11 pr-4 text-base text-[#f5f5f5] placeholder:text-[#f5f5f5]/50 outline-none transition focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40";

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-[#f5f5f5]">{label}</span>
      {children}
    </label>
  );
}

function IconInput({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />
      <input {...props} className={INPUT_ICON} />
    </div>
  );
}

export default function LeadFormFields() {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
      <Field label="Property Interest">
        <select className={INPUT} defaultValue="" aria-label="Property Interest">
          <option value="" disabled>
            Select interest
          </option>
          <option>Buy</option>
          <option>Invest</option>
        </select>
      </Field>

      <Field label="Full Name">
        <IconInput icon={User} type="text" placeholder="Enter your name" />
      </Field>

      <Field label="Property Type(s)">
        <select className={INPUT} defaultValue="" aria-label="Property Type">
          <option value="" disabled>
            Select type
          </option>
          <option>Villa</option>
          <option>Apartment</option>
          <option>Penthouse</option>
        </select>
      </Field>

      <Field label="Email Address">
        <IconInput icon={Mail} type="email" placeholder="your.email@example.com" />
      </Field>

      <Field label="Phone Number">
        <IconInput icon={Phone} type="tel" placeholder="+1 (555) 000-0000" />
      </Field>

      <Field label="Accounts">
        <input type="text" placeholder="Account reference" className={INPUT} />
      </Field>

      <Field label="Company">
        <IconInput icon={Building2} type="text" placeholder="Company name (optional)" />
      </Field>

      <Field label="Owner">
        <input type="text" placeholder="Property owner" className={INPUT} />
      </Field>

      <Field label="Assign to Team Member">
        <select className={INPUT} defaultValue="" aria-label="Team Member">
          <option value="" disabled>
            Select member
          </option>
          <option>Andrew Smith</option>
        </select>
      </Field>

      <Field label="Custom Request">
        <select className={INPUT} defaultValue="" aria-label="Custom Request">
          <option value="" disabled>
            Select request
          </option>
          <option>Viewing</option>
          <option>Consultation</option>
        </select>
      </Field>
    </div>
  );
}
