import Image from "next/image";
import { Star } from "lucide-react";
import agentImage from "@/public/images/landingpage/team2.png";
import facebookIcon from "@/public/images/buy/social/facebook.svg";
import emailIcon from "@/public/images/buy/social/email.svg";
import whatsappIcon from "@/public/images/buy/social/whatsapp.svg";
import { CONTACT_INFO } from "@/components/sections/contact/contactData";

const SOCIAL = [
  { label: "Facebook", href: "#", icon: facebookIcon, className: "bg-[#155dfc]" },
  {
    label: "Email",
    href: CONTACT_INFO.emailHref,
    icon: emailIcon,
    className: "bg-[#e7000b]",
  },
  {
    label: "WhatsApp",
    href: CONTACT_INFO.whatsappHref,
    icon: whatsappIcon,
    className: "bg-[#00a63e]",
  },
];

export default function AgentCard() {
  return (
    <aside className="flex h-full w-full max-w-[352px] shrink-0 flex-col items-center justify-between rounded-2xl bg-[#111] p-8 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] lg:max-w-none">
      <div className="flex w-full flex-col items-center">
        <div className="relative size-32 overflow-hidden rounded-full border-4 border-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]">
          <Image
            src={agentImage}
            alt="Shakeeb Ahmed Khan"
            fill
            sizes="128px"
            className="object-cover object-top"
            priority
          />
        </div>

        <p className="mt-6 text-sm uppercase tracking-[0.7px] text-[#f5f5f5]">
          Your Assigned
        </p>
        <h3 className="mt-2 text-2xl font-medium text-[#f5f5f5]">
          Real Estate Manager
        </h3>
        <p className="mt-1 text-xl font-medium text-white">Shakeeb Ahmed Khan</p>

        <p className="mt-6 text-center text-sm leading-5 text-[#f5f5f5]">
          7+ years of Dubai real estate experience, helping clients buy, sell,
          lease, and invest in residential properties.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-[#f5f5f5]">
          <span className="inline-flex items-center gap-1">
            <Star className="h-4 w-4 fill-[#ba8a44] text-[#ba8a44]" />
            Market Insights
          </span>
          <span className="text-[#6a7282]">|</span>
          <span>Client Focused Service</span>
        </div>
      </div>

      <div className="mt-8 w-full border-t border-[#364153] pt-6">
        <p className="text-center text-sm text-[#f5f5f5]">Connect with me</p>
        <div className="mt-4 flex items-center justify-center gap-4">
          {SOCIAL.map(({ label, href, icon, className }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className={`relative flex size-12 items-center justify-center rounded-full ${className}`}
            >
              <Image src={icon} alt="" width={20} height={20} className="size-5" />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
