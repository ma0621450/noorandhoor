"use client";
import { createContext, useContext, useState } from "react";
import { ChevronDown } from "lucide-react";

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
  className = "",
}) {
  const context = useContext(DropdownContext);
  const [selected, setSelected] = useState(placeholder);

  const isOpen = context ? context.openId === id : false;

  const toggle = () => {
    if (!context) return;
    context.setOpenId(isOpen ? null : id);
  };

  const close = () => {
    if (!context) return;
    context.setOpenId(null);
  };

  return (
    <div className={`relative min-w-[160px] ${className}`}>
      <button
        type="button"
        onClick={toggle}
        className="flex w-full cursor-pointer items-center justify-between gap-8 px-4 py-2 text-white"
      >
        {selected}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 w-full min-w-[200px] rounded-xl bg-[#1a1a1a] p-2 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
          {options.map((item) => {
            const active = selected === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setSelected(item);
                  close();
                }}
                className={`flex w-full cursor-pointer items-center rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white transition-colors ${
                  active
                    ? "bg-gradient-to-r from-[#bc8741] to-[#d6a85e]"
                    : "hover:bg-[#7b613b]"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
