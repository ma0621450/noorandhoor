import { ChevronLeft, ChevronRight } from "lucide-react";

function PageLink({ href, label, active, disabled, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      aria-disabled={disabled || undefined}
      className={`flex size-10 items-center justify-center rounded-full border text-sm font-medium transition ${
        active
          ? "border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37]"
          : "border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10"
      } ${disabled ? "pointer-events-none opacity-40" : ""}`}
    >
      {children}
    </a>
  );
}

export default function Pagination({
  currentPage,
  totalPages,
  hrefForPage,
  label = "Pagination",
}) {
  if (totalPages < 1) return null;

  return (
    <nav
      aria-label={label}
      className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:mt-12 sm:justify-end"
    >
      <PageLink
        href={hrefForPage(Math.max(currentPage - 1, 1))}
        label="Previous page"
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
      </PageLink>
      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1;
        return (
          <PageLink
            key={pageNumber}
            href={hrefForPage(pageNumber)}
            label={`Go to page ${pageNumber}`}
            active={pageNumber === currentPage}
          >
            {pageNumber}
          </PageLink>
        );
      })}
      <PageLink
        href={hrefForPage(Math.min(currentPage + 1, totalPages))}
        label="Next page"
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
      </PageLink>
    </nav>
  );
}
