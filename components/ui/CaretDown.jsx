export default function CaretDown({ className = "", open = false }) {
  return (
    <svg
      viewBox="0 0 10 6"
      fill="currentColor"
      aria-hidden
      className={`h-[6px] w-[10px] shrink-0 transition-transform duration-300 ease-in-out ${
        open ? "rotate-180" : ""
      } ${className}`}
    >
      <path d="M5 6 0 0h10z" />
    </svg>
  );
}

export function Select({ className = "", caretClassName = "", ...props }) {
  return (
    <div className="relative">
      <select
        className={`appearance-none bg-none ${className} !pr-10`}
        {...props}
      />
      <CaretDown
        className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white ${caretClassName}`}
      />
    </div>
  );
}
