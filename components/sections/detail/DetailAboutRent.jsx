import Image from "next/image";
import { Building2, Minus, Plus } from "lucide-react";
import mapBg from "@/public/images/detail/world-map.svg";

export default function DetailAboutRent({ property }) {
  const { about = [], description = [], features = [] } = property;

  return (
    <section className="w-full bg-[#111111]">
      <div className="mx-auto w-full max-w-[1280px] px-4 pt-12">
        <div className="flex w-full flex-col items-start gap-10 lg:flex-row lg:gap-8">
          <div className="flex w-full max-w-[714px] flex-1 flex-col">
            <h2 className="m-0 font-[family-name:var(--font-body)] text-[24px] font-semibold leading-8 text-[#F5F5F5]">
              About This Property
            </h2>
            {about.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="m-0 pt-4 font-[family-name:var(--font-body)] text-[16px] font-normal leading-[26px] text-[#D1D5DB]"
              >
                {paragraph}
              </p>
            ))}

            <h3 className="m-0 pt-6 font-[family-name:var(--font-body)] text-[20px] font-semibold leading-7 text-[#F5F5F5]">
              Property Description
            </h3>
            <ul className="m-0 flex list-none flex-col p-0 pt-3">
              {description.map((item, index) => (
                <li
                  key={item}
                  className={`flex items-start gap-2 ${index === 0 ? "" : "pt-2"}`}
                >
                  <span
                    className="mt-0.5 font-[family-name:var(--font-body)] text-[16px] leading-6 text-[#D6A85E]"
                    aria-hidden
                  >
                    •
                  </span>
                  <span className="font-[family-name:var(--font-body)] text-[16px] font-normal leading-6 text-[#D1D5DB]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="m-0 pt-6 font-[family-name:var(--font-body)] text-[20px] font-semibold leading-7 text-[#F5F5F5]">
              Features
            </h3>
            <div className="grid grid-cols-1 gap-x-3 gap-y-3 pt-3 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <span
                    className="size-2 shrink-0 rounded-full bg-[linear-gradient(90deg,#BC8741_0%,#C5924B_33.33%,#CD9D54_66.67%,#D6A85E_100%)]"
                    aria-hidden
                  />
                  <span className="font-[family-name:var(--font-body)] text-[16px] font-normal leading-6 text-[#D1D5DB]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full shrink-0 lg:w-[496px]">
            <div className="rounded-2xl p-6">
              <div className="relative h-[270px] w-full overflow-hidden rounded-[7px] border border-[#E5E7EB] bg-white shadow-[0px_6.75px_10.125px_-2.025px_rgba(0,0,0,0.1),0px_2.7px_4.05px_-2.7px_rgba(0,0,0,0.1)]">
                <Image
                  src={mapBg}
                  alt=""
                  fill
                  sizes="454px"
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute left-[11px] top-[11px] flex flex-col overflow-hidden rounded-[5px] bg-white shadow-md">
                  <button
                    type="button"
                    className="flex size-[27px] cursor-pointer items-center justify-center border-b border-[#D1D5DC] text-[13.5px] font-light text-[#364153]"
                    aria-label="Zoom in"
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    className="flex size-[27px] cursor-pointer items-center justify-center text-[13.5px] font-light text-[#364153]"
                    aria-label="Zoom out"
                  >
                    <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                </div>
                <div className="btn-gold absolute left-1/2 top-[103px] flex size-[32px] -translate-x-1/2 items-center justify-center rounded-full border-[2.7px] border-white shadow-md">
                  <Building2 className="h-4 w-4 text-white" strokeWidth={1.6} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
