import Image from "next/image";
import starIcon from "@/public/images/buy/hero/star.svg";
import securityIcon from "@/public/images/buy/hero/security.png";
import googleLogo from "@/public/svgs/googlelogo.svg";

const TRUST_SIGNALS = [
  { icon: starIcon, text: ["Rated 4.95 by", "Global investors"] },
  { icon: securityIcon, text: ["150+ Partners", "Registered"] },
  { icon: googleLogo, text: ["Over AED 120+", "transacted"] },
];

export default function OffPlanTrustSignals() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-[30px]">
      {TRUST_SIGNALS.map(({ icon, text }) => (
        <div key={text[0]} className="flex items-center gap-2">
          <Image
            src={icon}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
          <p className="max-w-[132px] text-left text-xs font-semibold leading-[26px] text-[#f5f5f5] sm:text-base">
            {text[0]}
            <br />
            {text[1]}
          </p>
        </div>
      ))}
    </div>
  );
}
