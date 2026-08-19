import { cx } from "@/lib/admin/utils";

const FIELD =
  "w-full rounded-xl border border-white/10 bg-[#171717] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40";

function FieldShell({ id, label, hint, error, children }) {
  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={id} className="block text-xs font-medium uppercase tracking-[1.4px] text-white/60">
          {label}
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
  className = "",
  ...props
}) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <input id={id} className={cx(FIELD, className)} {...props} />
    </FieldShell>
  );
}

export function TextArea({
  id,
  label,
  hint,
  error,
  rows = 6,
  className = "",
  ...props
}) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <textarea id={id} rows={rows} className={cx(FIELD, "resize-y", className)} {...props} />
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  hint,
  error,
  options,
  placeholder,
  className = "",
  ...props
}) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <select id={id} className={cx(FIELD, className)} {...props}>
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => {
          const value = typeof option === "string" ? option : option.value;
          const optionLabel = typeof option === "string" ? option : option.label;
          return (
            <option key={value} value={value}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    </FieldShell>
  );
}

export function CheckboxField({ id, label, checked, onChange }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-3 text-sm text-white/80">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 rounded border-white/20 bg-[#171717] text-[#ba8a44] accent-[#ba8a44]"
      />
      {label}
    </label>
  );
}
