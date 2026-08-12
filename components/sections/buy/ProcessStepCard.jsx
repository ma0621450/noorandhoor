import Image from "next/image";
import cardFrame from "@/public/images/buy/process/card-frame.svg";
import cardInner from "@/public/images/buy/process/card-inner.svg";

export default function ProcessStepCard({ step, title, description, icon }) {
  return (
    <article className="group relative mx-auto h-[237px] w-full max-w-[176px] cursor-pointer transition-transform duration-200 hover:-translate-y-1">
      {/* Gold frame with right arrow (Figma Union) */}
      <div className="absolute inset-x-0 bottom-0 h-[212px]">
        <Image
          src={cardFrame}
          alt=""
          fill
          sizes="176px"
          className="object-fill"
          unoptimized
        />
      </div>

      {/* White inner panel */}
      <div className="absolute bottom-[10px] left-[10px] h-[192px] w-[143px]">
        <Image
          src={cardInner}
          alt=""
          fill
          sizes="143px"
          className="object-fill"
          unoptimized
        />
      </div>

      {/* Content */}
      <div className="absolute bottom-[10px] left-[10px] z-10 flex h-[192px] w-[143px] flex-col items-center px-2.5 pb-3 pt-11 text-center">
        <h3 className="mb-1.5 min-h-[28px] text-[11px] font-bold leading-tight text-black">
          {title}
        </h3>
        <p className="mb-2 flex-1 text-[9px] leading-[1.35] text-black/80">
          {description}
        </p>
        <div className="relative mt-auto size-10 shrink-0 overflow-hidden">
          <Image src={icon} alt="" fill sizes="40px" className="object-contain" />
        </div>
      </div>

      {/* Step badge */}
      <div className="absolute left-1/2 top-0 z-20 flex size-[58px] -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-white bg-black shadow-md">
        <span className="font-[family-name:var(--font-heading)] text-[22px] font-bold leading-none text-white">
          {step}
        </span>
      </div>
    </article>
  );
}
