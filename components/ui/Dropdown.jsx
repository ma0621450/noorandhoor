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

export default function Dropdown({ id, options = [], placeholder = "Select", className = "" }) {
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
        onClick={toggle}
        className="flex w-full cursor-pointer items-center justify-between gap-8 px-4 py-2 text-white"
      >
        {selected}
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-[#141414]/95 backdrop-blur-md border border-white/10 rounded-md overflow-hidden z-50">
          {options.map((item) => (
            <div
              key={item}
              onClick={() => {
                setSelected(item);
                close();
              }}
              className="px-4 py-2 text-white hover:bg-[#ba8a44]/20 cursor-pointer transition"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
