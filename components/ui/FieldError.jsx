export default function FieldError({ message = "" }) {
  return (
    <p
      className={`mt-1.5 h-4 overflow-hidden text-xs leading-4 ${
        message ? "text-red-400" : "select-none text-transparent"
      }`}
      title={message || undefined}
      aria-hidden={!message}
      aria-live={message ? "polite" : undefined}
    >
      {message || "."}
    </p>
  );
}
