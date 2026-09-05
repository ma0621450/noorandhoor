import { FileText } from "lucide-react";
import PropertyLocationMap from "@/components/common/PropertyLocationMap";

export default function DetailAbout({ property }) {
  const { about = [], documents = [], description = [], map, location = "" } =
    property;

  return (
    <section className="w-full bg-[#111111]">
      <div className="mx-auto my-10 w-full max-w-[1280px] px-4">
        <div className="flex flex-col pt-12">
          <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-8">
            <div className="flex w-full max-w-[736px] flex-1 flex-col">
              <h2 className="detail-section-title m-0 text-[18px] font-medium leading-[27px] text-[#F5F5F5]">
                About This Property
              </h2>
              {about.map((paragraph, index) => (
                <p
                  key={`about-${index}`}
                  className="m-0 pt-4 font-[family-name:var(--font-body)] text-[16px] font-normal leading-[26px] text-[#F5F5F5]"
                >
                  {paragraph}
                </p>
              ))}
              {description.length ? (
                <ul className="m-0 flex list-none flex-col p-0 pt-4">
                  {description.map((item, index) => (
                    <li
                      key={`desc-${index}`}
                      className="flex items-start gap-2 pt-2"
                    >
                      <span
                        className="mt-0.5 font-[family-name:var(--font-body)] text-[16px] leading-6 text-[#D6A85E]"
                        aria-hidden
                      >
                        •
                      </span>
                      <span className="font-[family-name:var(--font-body)] text-[16px] font-normal leading-6 text-[#F5F5F5]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <PropertyLocationMap
              map={map}
              location={location}
              className="relative h-[270px] w-full shrink-0 overflow-hidden rounded-[7px] border border-[#E5E7EB] bg-white shadow-[0px_6.75px_10.125px_-2.025px_rgba(0,0,0,0.1),0px_2.7px_4.05px_-2.7px_rgba(0,0,0,0.1)] lg:w-[454px]"
            />
          </div>

          {documents.length ? (
            <div className="mt-16 flex max-w-[735px] flex-col gap-4 sm:mt-20">
              <h3 className="detail-section-title m-0 text-[18px] font-medium leading-[27px] text-[#F5F5F5]">
                Property Documents
              </h3>
              <ul className="flex flex-col gap-3">
                {documents.map((doc, index) => (
                  <li
                    key={`doc-${index}-${doc.name}`}
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
          ) : null}
        </div>
      </div>
    </section>
  );
}
