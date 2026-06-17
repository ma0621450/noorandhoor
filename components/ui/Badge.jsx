import React from "react";

const Badge = ({ children, variant = "gold" }) => {
  const styles = {
    gold: "bg-[#ba8a44] text-white",
    dark: "bg-white/10 text-black",
    outline: "border border-[#ba8a44] text-[#ba8a44] bg-transparent",
  };

  return (
    <div className={`inline-flex items-center rounded-lg px-4 py-1.5 text-xs font-semibold uppercase tracking-wide ${styles[variant]}`}>
      {children}
    </div>
  );
};

export default Badge;