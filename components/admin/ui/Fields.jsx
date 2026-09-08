"use client";

import { Calendar, Info } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { cx } from "@/lib/admin/utils";

const FIELD =
  "w-full rounded-xl border border-white/10 bg-[#171717] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40";

function todayISO() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function FieldTooltip({ text }) {
  if (!text) return null;
  return (
    <span className="group/tooltip relative inline-flex shrink-0">
      <button
        type="button"
        className="inline-flex text-white/35 transition hover:text-[#eec876] focus-visible:text-[#eec876] focus-visible:outline-none"
        aria-label={text}
        title={text}
      >
        <Info className="h-3.5 w-3.5" strokeWidth={2} />
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-20 w-56 -translate-x-1/2 rounded-lg border border-white/10 bg-[#1c1c1c] px-3 py-2 text-left text-[11px] font-normal normal-case tracking-normal text-white/75 opacity-0 shadow-lg transition group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100"
      >
        {text}
      </span>
    </span>
  );
}

function FieldShell({ id, label, hint, error, tooltip, children }) {
  return (
    <div className="space-y-1.5">
      {label ? (
        <label
          htmlFor={id}
          className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[1.4px] text-white/60"
        >
          <span>{label}</span>
          <FieldTooltip text={tooltip} />
        </label>
      ) : null}
      {children}
      {error ? <p className="text-xs text-red-300">{error}</p> : null}
      {hint && !error ? <p className="text-xs text-white/40">{hint}</p> : null}
    </div>
  );
}

export function TextField({
  id,
  label,
  hint,
  error,
  tooltip,
  className = "",
  ...props
}) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} tooltip={tooltip}>
      <input id={id} className={cx(FIELD, className)} {...props} />
    </FieldShell>
  );
}

export function DateField({
  id,
  label,
  hint,
  error,
  tooltip,
  className = "",
  disablePast = false,
  min,
  ...props
}) {
  const minDate = min ?? (disablePast ? todayISO() : undefined);

  function openPicker(event) {
    const input = event.currentTarget
      .closest("[data-date-field]")
      ?.querySelector('input[type="date"]');
    if (!input) return;
    if (typeof input.showPicker === "function") {
      try {
        input.showPicker();
      } catch {
        input.focus();
      }
    } else {
      input.focus();
    }
  }

  return (
    <FieldShell id={id} label={label} hint={hint} error={error} tooltip={tooltip}>
      <div data-date-field className="relative">
        <input
          id={id}
          type="date"
          min={minDate}
          className={cx(
            FIELD,
            "pr-11 [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0",
            className,
          )}
          {...props}
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label="Open calendar"
          onClick={openPicker}
          className="absolute right-3 top-1/2 z-[1] -translate-y-1/2 text-[#eec876] transition hover:text-white"
        >
          <Calendar className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </div>
    </FieldShell>
  );
}

export function TextArea({
  id,
  label,
  hint,
  error,
  tooltip,
  rows = 6,
  className = "",
  ...props
}) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} tooltip={tooltip}>
      <textarea
        id={id}
        rows={rows}
        className={cx(FIELD, "resize-y", className)}
        {...props}
      />
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  hint,
  error,
  tooltip,
  options,
  placeholder,
  className = "",
  ...props
}) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} tooltip={tooltip}>
      <Select
        id={id}
        options={options}
        placeholder={placeholder}
        className={cx(FIELD, className)}
        {...props}
      />
    </FieldShell>
  );
}

export function CheckboxField({
  id,
  label,
  checked,
  onChange,
  description,
  tooltip,
  disabled = false,
}) {
  return (
    <div className={`space-y-1.5 ${disabled ? "opacity-55" : ""}`}>
      <label
        htmlFor={id}
        className={`flex items-start gap-3 text-sm text-white/80 ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-0.5 size-4 shrink-0 rounded border-white/20 bg-[#171717] text-[#ba8a44] accent-[#ba8a44] disabled:cursor-not-allowed"
        />
        <span className="min-w-0">
          <span className="flex items-center gap-1.5 font-medium text-white/90">
            {label}
            <FieldTooltip text={tooltip} />
          </span>
          {description ? (
            <span className="mt-1 block text-xs leading-5 text-white/45">
              {description}
            </span>
          ) : null}
        </span>
      </label>
    </div>
  );
}
