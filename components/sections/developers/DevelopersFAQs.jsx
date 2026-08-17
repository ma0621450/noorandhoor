import Image from "next/image";
import { FaqAccordion } from "@/components/common/FaqSection";
import {
  DEVELOPER_FAQS,
  FAQ_RESOURCES,
} from "@/components/sections/developers/developersData";

export default function DevelopersFAQs() {
  return (
    <section className="section-container">
      <div className="mb-10 flex flex-col items-center gap-4 text-center">
        <p className="section-sub-heading">Frequently Ask Questions</p>
        <h2 className="text-gold-gradient">FAQs</h2>
        <div className="section-divider" />
        <p className="max-w-[864px] text-lg text-white sm:text-xl">
          Doing solid-time analysis for semantic investments
        </p>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
        {FAQ_RESOURCES.map((resource) => (
          <article
            key={resource.title}
            className="relative h-[215px] overflow-hidden rounded-xl"
          >
            <Image
              src={resource.image}
              alt={resource.title}
              fill
              sizes="346px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-black/60" />
            <p className="absolute bottom-6 left-4 right-4 text-lg font-semibold leading-[23px] text-[#E9C349]">
              {resource.title}
            </p>
          </article>
        ))}
      </div>

      <FaqAccordion items={DEVELOPER_FAQS} />
    </section>
  );
}
