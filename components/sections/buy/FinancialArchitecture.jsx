import OpticianSummaryCard from "@/components/sections/buy/OpticianSummaryCard";
import PreApprovalForm from "@/components/sections/buy/PreApprovalForm";

export default function FinancialArchitecture() {
  return (
    <section className="section-full py-12 sm:py-14 lg:py-16">
      <div className="section-inner">
        <div className="w-full rounded-[20px] bg-[#252525] px-4 py-12 sm:px-8 lg:px-16 lg:py-16">
          <h2 className="text-gold-gradient text-center">Financial Architecture</h2>

          <div className="mx-auto mt-10 flex max-w-[876px] flex-col items-center justify-center gap-8 lg:mt-12 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <OpticianSummaryCard />
            <PreApprovalForm />
          </div>
        </div>
      </div>
    </section>
  );
}
