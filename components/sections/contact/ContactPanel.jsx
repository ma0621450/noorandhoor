import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import ContactForm from "@/components/sections/contact/ContactForm";
import { CONTACT_INFO } from "@/components/sections/contact/contactData";
import getStartedBg from "@/public/images/buy/get-started-bg.png";

function InfoCard({ href, icon: Icon, label, value }) {
  return (
    <a
      href={href}
      className="flex min-h-[150px] min-w-0 flex-1 flex-col items-center justify-center gap-2 rounded-xl bg-[#111111] px-6 py-6 text-center transition hover:bg-[#161616]"
    >
      <span className="flex size-10 items-center justify-center">
        <Icon className="h-[18px] w-[18px] text-[#E9C349]" strokeWidth={1.5} />
      </span>
      <span className="text-xs font-semibold uppercase tracking-[2.4px] text-[#E9C349]">
        {label}
      </span>
      <span className="break-all text-sm font-medium text-[#f5f5f5] sm:text-base">
        {value}
      </span>
    </a>
  );
}

export default function ContactPanel() {
  return (
    <div className="relative flex w-full flex-col overflow-hidden rounded-3xl border-t border-[rgba(201,168,76,0.14)] px-4 py-10 sm:px-6 lg:px-6 lg:py-20">
      <div className="absolute inset-0">
        <Image
          src={getStartedBg}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 755px"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[rgba(17,17,17,0.72)] backdrop-blur-[12px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[681px] flex-col items-center gap-10">
        <div className="flex w-full flex-col items-center gap-6 text-center">
          <h2 className="text-gold-gradient !font-body text-2xl !font-normal uppercase !leading-[2] tracking-normal">
            Contact Info
          </h2>
          <p className="max-w-[681px] text-[11px] font-medium leading-4 text-[#9E9070] sm:text-xs">
            {CONTACT_INFO.intro}
          </p>

          <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <InfoCard
              href={CONTACT_INFO.phoneHref}
              icon={Phone}
              label="Call Us"
              value={CONTACT_INFO.phone}
            />
            <InfoCard
              href={CONTACT_INFO.emailHref}
              icon={Mail}
              label="Email Us"
              value={CONTACT_INFO.email}
            />
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
