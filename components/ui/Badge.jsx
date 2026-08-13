import React from "react";

const Badge = ({ children, variant = "gold" }) => {
  const styles = {
    gold: "bg-gradient-to-r from-[#BC8741] to-[#D6A85E] text-[#f5f5f5] shadow-sm",
    dark: "bg-white/10 text-black",
    outline: "border border-[#ba8a44] text-[#ba8a44] bg-transparent",
  };

  return (
    <div
      className={`inline-flex items-center rounded-md px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.96px] ${styles[variant]}`}
    >
      {children}
    </div>
  );
};

export default Badge;