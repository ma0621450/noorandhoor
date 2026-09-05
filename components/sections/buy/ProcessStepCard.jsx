import Image from "next/image";
import cardFrame from "@/public/images/buy/process/card-frame.svg";
import cardInner from "@/public/images/buy/process/card-inner.svg";

export default function ProcessStepCard({ step, title, description, icon }) {
  return (
    <article className="group relative mx-auto aspect-[176/237] w-full max-w-[176px] cursor-pointer transition-transform duration-200 hover:-translate-y-1">
      {/* Gold frame with right arrow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[89.5%]">
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
      <div className="pointer-events-none absolute bottom-[4.2%] left-[5.7%] h-[81%] w-[81.25%]">
        <Image
          src={cardInner}
          alt=""
          fill
          sizes="143px"
          className="object-fill"
          unoptimized
        />
      </div>

      {/* Content — fixed icon row so zoom does not shift placement */}
      <div className="absolute bottom-[4.2%] left-[5.7%] z-10 grid h-[81%] w-[81.25%] grid-rows-[auto_minmax(0,1fr)_2.25rem] gap-1 px-2.5 pb-2.5 pt-8 text-center">
        <h3 className="text-[11px] font-bold leading-tight text-black">
          {title}
        </h3>
        <p className="overflow-hidden text-[9px] leading-[1.35] text-black/80">
          {description}
        </p>
        <div className="flex items-center justify-center self-end">
          <Image
            src={icon}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 object-contain object-center"
          />
        </div>
      </div>

      {/* Step badge — fixed size, not vw-based */}
      <div className="absolute left-1/2 top-0 z-20 flex size-[58px] -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-white bg-black shadow-md">
        <span className="font-[family-name:var(--font-heading)] text-[22px] font-bold leading-none text-white">
          {step}
        </span>
      </div>
    </article>
  );
}
