"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import CaretDown from "@/components/ui/CaretDown";

const DropdownContext = createContext(null);

export function DropdownGroup({ children }) {
  const [openId, setOpenId] = useState(null);

  return (
    <DropdownContext.Provider value={{ openId, setOpenId }}>
      {children}
    </DropdownContext.Provider>
  );
}

export default function Dropdown({
  id,
  options = [],
  placeholder = "Select",
  value,
  onChange,
  className = "",
  compact = false,
}) {
  const context = useContext(DropdownContext);
  const rootRef = useRef(null);
  const [internal, setInternal] = useState(placeholder);
  const selected = value === undefined ? internal : value || placeholder;
  const isOpen = context ? context.openId === id : false;

  const toggle = () => {
    if (!context) return;
    context.setOpenId(isOpen ? null : id);
  };

  const close = () => {
    if (!context) return;
    context.setOpenId(null);
  };

  const select = (item) => {
    if (value === undefined) setInternal(item);
    onChange?.(item);
    close();
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) close();
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className={`relative min-w-0 ${className}`}>
      <button
        type="button"
        onClick={toggle}
        className="relative z-[1] flex h-full w-full min-h-11 cursor-pointer items-center justify-between gap-2 px-3 py-2 text-left text-sm text-white sm:gap-4 sm:px-4 lg:min-h-14"
      >
        <span className="truncate">{selected}</span>
        <CaretDown open={isOpen} className="text-white" />
      </button>

      {isOpen ? (
        <div
          className={`absolute left-0 right-0 top-[calc(100%+10px)] z-[60] max-h-60 w-full min-w-0 overflow-y-auto overscroll-contain border border-[#ba8a44]/55 bg-[#141414] shadow-[0_16px_40px_rgba(0,0,0,0.55)] ${
            compact
              ? "flex flex-col gap-3 rounded-lg p-5"
              : "rounded-xl p-2"
          }`}
        >
          {options.map((item) => {
            const active = selected === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => select(item)}
                className={`flex w-full cursor-pointer items-center text-left text-[#f5f5f5] transition-colors ${
                  compact
                    ? `rounded px-2 py-0.5 text-xs font-normal ${
                        active
                          ? "bg-[#ba8a44]/25 text-[#eec876]"
                          : "hover:bg-[#ba8a44]/20 hover:text-white"
                      }`
                    : `rounded-lg px-3 py-2.5 text-sm font-medium ${
                        active
                          ? "bg-[#ba8a44]/25 text-[#eec876]"
                          : "hover:bg-[#ba8a44]/20 hover:text-white"
                      }`
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
