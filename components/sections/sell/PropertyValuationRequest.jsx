import Button from "@/components/ui/Button";

const INPUT_CLASS =
  "h-[38px] w-full rounded border border-[#d1d5dc] bg-transparent px-4 text-sm text-[#f5f5f5] placeholder:text-[#f5f5f5]/50 outline-none transition focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40";

export default function PropertyValuationRequest() {
  return (
    <form className="w-full max-w-[357px] rounded-[10px] bg-[#0e1112] p-6 shadow-[0_10px_15px_rgba(0,0,0,0.1)]">
      <h3 className="text-gold-gradient text-lg font-medium">
        Property Valuation Request
      </h3>
      <p className="mt-2 text-sm text-[#f5f5f5]">
        Get a professional assessment based on trends and buyer demand.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#f5f5f5]">
            Property Address
          </span>
          <input type="text" className={INPUT_CLASS} />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#f5f5f5]">Property Type</span>
          <input type="text" className={INPUT_CLASS} />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#f5f5f5]">
            Number of Bedrooms
          </span>
          <input type="text" className={INPUT_CLASS} />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#f5f5f5]">
            Contact Information
          </span>
          <input type="text" className={INPUT_CLASS} />
        </label>

        <Button
          type="submit"
          className="mt-2 h-12 w-full !rounded-xl px-1.5 text-center text-[13px] font-medium !normal-case !tracking-normal whitespace-nowrap sm:text-sm"
        >
          Request Property Valuation
        </Button>
      </div>
    </form>
  );
}
