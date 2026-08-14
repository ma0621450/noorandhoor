import ContactAgentCard from "@/components/sections/contact/ContactAgentCard";
import ContactPanel from "@/components/sections/contact/ContactPanel";
import { CONTACT_AGENTS } from "@/components/sections/contact/contactData";

export default function ContactMain() {
  return (
    <section className="section-full pb-16 sm:pb-20 lg:pb-24">
      <div className="section-inner">
        <div className="flex flex-col items-stretch gap-10 lg:flex-row lg:items-start lg:gap-[80px] xl:gap-[130px]">
          <div className="flex w-full shrink-0 flex-col gap-6 lg:w-[min(100%,397px)]">
            {CONTACT_AGENTS.map((agent) => (
              <ContactAgentCard key={agent.id} agent={agent} />
            ))}
          </div>

          <div className="min-w-0 flex-1">
            <ContactPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
