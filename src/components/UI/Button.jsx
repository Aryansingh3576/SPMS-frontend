export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base = "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-all focus:outline-none focus:ring-2";
  const variants = {
    primary:
      "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 focus:ring-green-500 shadow hover:shadow-md",
    secondary:
      "bg-white text-green-700 border border-green-200 hover:bg-green-50 focus:ring-green-300",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
  };
  const cls = `${base} ${variants[variant] || variants.primary} ${className}`;
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
