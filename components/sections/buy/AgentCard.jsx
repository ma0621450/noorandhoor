import Image from "next/image";
import { Star } from "lucide-react";
import agentImage from "@/public/images/buy/andrew-smith.png";
import facebookIcon from "@/public/images/buy/social/facebook.svg";
import emailIcon from "@/public/images/buy/social/email.svg";
import whatsappIcon from "@/public/images/buy/social/whatsapp.svg";

const SOCIAL = [
  { label: "Facebook", href: "#", icon: facebookIcon, className: "bg-[#155dfc]" },
  {
    label: "Email",
    href: "mailto:admin@noorandhoorproperties.com",
    icon: emailIcon,
    className: "bg-[#e7000b]",
  },
  { label: "WhatsApp", href: "#", icon: whatsappIcon, className: "bg-[#00a63e]" },
];

export default function AgentCard() {
  return (
    <aside className="flex w-full max-w-[352px] flex-col items-center justify-center rounded-2xl bg-[#111] p-8 shadow-xl">
      <div className="relative size-32 overflow-hidden rounded-full border-4 border-white shadow-lg">
        <Image
          src={agentImage}
          alt="Andrew Smith"
          fill
          sizes="128px"
          className="object-cover object-top"
        />
      </div>

      <p className="mt-6 text-sm uppercase tracking-[0.7px] text-[#f5f5f5]">
        Your Assigned
      </p>
      <h3 className="mt-2 text-2xl font-medium text-[#f5f5f5]">Senior Agent</h3>
      <p className="mt-1 text-xl font-medium text-white">Andrew Smith</p>

      <p className="mt-6 text-center text-sm leading-5 text-[#f5f5f5]">
        Experienced real estate professional with 10+ years in luxury properties
      </p>

      <div className="mt-4 flex items-center gap-2 text-sm text-[#f5f5f5]">
        <Star className="h-4 w-4 fill-[#ba8a44] text-[#ba8a44]" />
        <span>4.9</span>
        <span className="text-[#6a7282]">|</span>
        <span>250+ Deals Closed</span>
      </div>

      <div className="mt-6 w-full border-t border-[#364153] pt-6">
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
