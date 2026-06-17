const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-[#ba8a44] text-white hover:bg-[#ba8a44]/80",
    secondary:
      "border border-[#ba8a44] text-white bg-transparent hover:bg-[#ba8a44]/10",
  };

  return (
    <button
      className={`
    inline-flex items-center justify-center
    min-h-11
    px-4 sm:px-5 lg:px-6
    py-3 lg:py-4
    text-sm sm:text-base
    font-semibold
    rounded-md
    transition-colors
    gap-1
    cursor-pointer
    uppercase tracking-wider
    ${variants[variant]}
    ${className}
  `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;