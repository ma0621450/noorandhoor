"use client";

import {
  Children,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import CaretDown from "@/components/ui/CaretDown";

function optionsFromChildren(children) {
  return Children.toArray(children)
    .filter((child) => isValidElement(child) && child.type === "option")
    .map((child) => {
      const value =
        child.props.value !== undefined && child.props.value !== null
          ? String(child.props.value)
          : String(child.props.children ?? "");
      return {
        value,
        label: String(child.props.children ?? value),
        disabled: Boolean(child.props.disabled),
      };
    });
}

function normalizeOptions(options = []) {
  return options.map((option) => {
    if (typeof option === "string") {
      return { value: option, label: option, disabled: false };
    }
    return {
      value: String(option.value ?? ""),
      label: String(option.label ?? option.value ?? ""),
      disabled: Boolean(option.disabled),
    };
  });
}

function emitChange(onChange, name, next) {
  if (!onChange) return;
  onChange({
    target: { name: name || "", value: next },
    currentTarget: { name: name || "", value: next },
  });
}

export function Select({
  id,
  name,
  value,
  defaultValue = "",
  onChange,
  required = false,
  disabled = false,
  className = "",
  caretClassName = "",
  menuClassName = "",
  options: optionsProp,
  placeholder,
  children,
  "aria-label": ariaLabel,
  ...rest
}) {
  const reactId = useId();
  const listId = `${reactId}-listbox`;
  const rootRef = useRef(null);
  const isControlled = value !== undefined;

  const options = useMemo(() => {
    if (Array.isArray(optionsProp)) {
      const list = normalizeOptions(optionsProp);
      if (placeholder) {
        return [{ value: "", label: placeholder, disabled: false }, ...list];
      }
      return list;
    }
    return optionsFromChildren(children);
  }, [optionsProp, children, placeholder]);

  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(() =>
    String(isControlled ? value : defaultValue),
  );

  useEffect(() => {
    if (isControlled) setInternal(String(value));
  }, [isControlled, value]);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const current = isControlled ? String(value) : internal;
  const selected =
    options.find((option) => option.value === current) ||
    options.find((option) => !option.disabled) ||
    options[0];
  const displayLabel = selected?.label || placeholder || "Select";
  const isPlaceholder = !current || selected?.value === "";

  function choose(option) {
    if (option.disabled || disabled) return;
    if (!isControlled) setInternal(option.value);
    emitChange(onChange, name, option.value);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative" {...rest}>
      {name ? (
        <select
          id={id ? `${id}-native` : undefined}
          name={name}
          value={current}
          required={required}
          disabled={disabled}
          tabIndex={-1}
          aria-hidden="true"
          className="pointer-events-none absolute h-px w-px opacity-0"
          onChange={() => {}}
        >
          {options.map((option) => (
            <option key={`${option.value}-${option.label}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : null}

      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ariaLabel}
        aria-required={required || undefined}
        onClick={() => {
          if (!disabled) setOpen((prev) => !prev);
        }}
        className={`relative flex w-full items-center justify-between gap-3 text-left ${className} !pr-10`}
      >
        <span
          className={`min-w-0 truncate ${
            isPlaceholder ? "text-[#f5f5f5]/55" : "text-[#f5f5f5]"
          }`}
        >
          {displayLabel}
        </span>
        <CaretDown
          open={open}
          className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#f5f5f5] ${caretClassName}`}
        />
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={ariaLabel}
          className={`absolute left-0 right-0 z-50 mt-2 max-h-60 overflow-auto rounded-[10px] border border-[#ba8a44]/55 bg-[#141414] py-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.55)] ${menuClassName}`}
        >
          {options.map((option) => {
            const active = option.value === current;
            return (
              <li key={`${option.value}-${option.label}`} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  disabled={option.disabled}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    choose(option);
                  }}
                  className={`flex w-full items-center px-4 py-2.5 text-left text-sm transition-colors ${
                    option.disabled
                      ? "cursor-not-allowed text-[#f5f5f5]/35"
                      : active
                        ? "bg-[#ba8a44]/25 text-[#eec876]"
                        : "cursor-pointer text-[#f5f5f5] hover:bg-[#ba8a44]/20 hover:text-white"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export default Select;
