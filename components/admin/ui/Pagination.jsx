import { ChevronLeft, ChevronRight } from "lucide-react";
import { cx } from "@/lib/admin/utils";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <button
        type="button"
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="flex size-10 items-center justify-center rounded-full border border-[#d4af37] text-[#d4af37] transition hover:bg-[#d4af37]/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        const active = pageNumber === page;

        return (
          <button
            key={pageNumber}
            type="button"
            aria-current={active ? "page" : undefined}
            onClick={() => onPageChange(pageNumber)}
            className={cx(
              "flex size-10 items-center justify-center rounded-full border text-sm font-medium transition",
              active
                ? "border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37]"
                : "border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10",
            )}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        type="button"
        aria-label="Next page"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="flex size-10 items-center justify-center rounded-full border border-[#d4af37] text-[#d4af37] transition hover:bg-[#d4af37]/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
