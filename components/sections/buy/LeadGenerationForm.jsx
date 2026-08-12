import { Building2 } from "lucide-react";
import Button from "@/components/ui/Button";
import LeadFormFields from "@/components/sections/buy/LeadFormFields";
import AgentCard from "@/components/sections/buy/AgentCard";

export default function LeadGenerationForm() {
  return (
    <section className="section-full py-12 sm:py-14 lg:py-16">
      <div className="section-inner">
        <div className="w-full rounded-[20px] bg-[#252525] px-4 py-12 sm:px-6 lg:px-8 lg:py-[60px]">
          <div className="mb-10 text-center lg:mb-12">
            <h2 className="text-gold-gradient">Start Your Property Journey</h2>
            <p className="mx-auto mt-4 max-w-[672px] text-base text-[#f5f5f5]">
              Fill out the form and our senior agent will contact you within 24 hours
            </p>
          </div>

          <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:justify-between">
            <form className="w-full max-w-[736px] rounded-2xl border border-[#d4af37] bg-[#111] p-6 shadow-xl sm:p-8">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-[14px] bg-gradient-to-r from-[#bc8741] to-[#d6a85e]">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-medium text-[#f5f5f5] sm:text-2xl">
                  Lead Generation Form
                </h3>
              </div>

              <LeadFormFields />

              <Button
                type="submit"
                className="mt-6 h-[60px] w-full rounded-[14px] text-base font-semibold normal-case tracking-normal sm:text-lg"
              >
                Convert &amp; Submit
              </Button>
            </form>

            <AgentCard />
          </div>
        </div>
      </div>
    </section>
  );
}
