import Image from "next/image";
import { FileText, Building2, Minus, Plus } from "lucide-react";
import mapBg from "@/public/images/detail/world-map.svg";

export default function DetailAbout({ property }) {
  const { about, documents } = property;

  return (
    <section className="w-full bg-[#111111]">
      <div className="mx-auto w-full max-w-[1280px] px-4 my-10">
        <div className="flex flex-col pt-12">
          {/* About + map row: gap 32 */}
          <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-8">
            <div className="flex w-full max-w-[736px] flex-1 flex-col">
              <h2 className="detail-section-title m-0 text-[18px] font-medium leading-[27px] text-[#F5F5F5]">
                About This Property
              </h2>
              {about.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 28)}
                  className="m-0 pt-4 font-[family-name:var(--font-body)] text-[16px] font-normal leading-[26px] text-[#F5F5F5]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Map: 453.6×270, radius 6.75, white card */}
            <div className="relative h-[270px] w-full shrink-0 overflow-hidden rounded-[7px] border border-[#E5E7EB] bg-white shadow-[0px_6.75px_10.125px_-2.025px_rgba(0,0,0,0.1),0px_2.7px_4.05px_-2.7px_rgba(0,0,0,0.1)] lg:w-[454px]">
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

          {/* Space below About+map before Documents (Figma ~ documents at 363 after map row) */}
          <div className="mt-16 flex max-w-[735px] flex-col gap-4 sm:mt-20">
            <h3 className="detail-section-title m-0 text-[18px] font-medium leading-[27px] text-[#F5F5F5]">
              Property Documents
            </h3>
            <ul className="flex flex-col gap-3">
              {documents.map((doc) => (
                <li
                  key={doc.name}
                  className="flex items-start gap-2 leading-[26px]"
                >
                  <FileText
                    className="mt-0.5 h-6 w-6 shrink-0 text-[#BA8A44]"
                    strokeWidth={1.4}
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-1 font-[family-name:var(--font-body)] text-[16px] font-normal leading-[26px] sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <span className="break-words text-[#F5F5F5]">{doc.name}</span>
                    <span
                      className={`shrink-0 text-sm sm:text-base ${
                        doc.available ? "text-[#F5F5F5]" : "text-[#5D5D5D]"
                      }`}
                    >
                      {doc.available ? "AVAILABLE" : "NOT AVAILABLE"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
