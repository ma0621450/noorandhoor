import Button from "@/components/ui/Button";
import { Select } from "@/components/ui/CaretDown";

const INPUT_CLASS =
  "h-[38px] w-full cursor-pointer rounded border border-[#d1d5dc] bg-transparent px-4 text-sm text-[#f5f5f5] placeholder:text-[#f5f5f5]/50 outline-none transition focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40";

export default function PreApprovalForm() {
  return (
    <form className="w-full max-w-[357px] rounded-[10px] bg-[#0e1112] p-6 shadow-[0_10px_15px_rgba(0,0,0,0.1)]">
      <h3 className="text-gold-gradient text-lg font-medium">Pre-approval form</h3>
      <p className="mt-2 text-sm text-[#f5f5f5]">
        We offer accurate and trusted services
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <Select className={INPUT_CLASS} defaultValue="" aria-label="Loan type">
          <option value="" disabled>
            Select option
          </option>
          <option>Residential Mortgage</option>
          <option>Investment Loan</option>
        </Select>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#f5f5f5]">Pre-approved Credits</span>
          <input type="text" placeholder="Credit Status" className={INPUT_CLASS} />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#f5f5f5]">Borrower Name</span>
          <input
            type="text"
            placeholder="Estimated Monthly Payment"
            className={INPUT_CLASS}
          />
        </label>

        <Button
          type="submit"
          className="mt-2 h-auto min-h-12 w-full !rounded-xl px-2 py-2.5 text-center text-xs font-medium leading-tight !normal-case !tracking-normal whitespace-normal sm:text-sm"
        >
          Verify Mortgage Pre-Approval Status
        </Button>
      </div>
    </form>
  );
}
