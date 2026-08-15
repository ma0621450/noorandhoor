import Image from "next/image";
import { BUYER_GUIDES } from "@/components/sections/developers/developersData";

export default function DevelopersBuyerGuide() {
  return (
    <section className="section-container">
      <div className="mb-8 flex flex-col items-center gap-4 text-center">
        <h2 className="text-gold-gradient">Property Buyer Guide</h2>
        <div className="section-divider" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {BUYER_GUIDES.map((guide) => (
          <article key={guide.name} className="flex flex-col">
            <div className="overflow-hidden rounded-[15px] border border-[rgba(188,135,65,0.2)] bg-[#1A1A1A]">
              <div className="relative h-[166px] w-full">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  sizes="243px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
              </div>
              <div className="flex flex-col gap-3 p-3">
                <p className="min-h-[37px] text-sm font-medium leading-[18px] text-[#F5F5F5]">
                  {guide.title}
                </p>
                <button
                  type="button"
                  className="inline-flex h-[29px] w-[128px] items-center justify-center rounded border border-[#BC8741] text-[13px] font-semibold tracking-[0.8px] text-[#D6A85E] uppercase"
                >
                  View Detail
                </button>
              </div>
            </div>
            <div className="mt-3 flex flex-col items-start">
              <p className="text-sm font-bold tracking-[0.96px] text-white">
                {guide.name}
              </p>
              <p className="mt-0.5 text-xs text-[#F5F5F5]">{guide.location}</p>
              <button
                type="button"
                className="mt-2 text-xs font-semibold tracking-[0.96px] text-[#D6A85E] uppercase underline"
              >
                Learn More
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
