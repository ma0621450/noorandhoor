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
