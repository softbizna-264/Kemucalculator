import { cn } from "../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "operator" | "scientific" | "action" | "equals";
}

export function CalcButton({
  className,
  variant = "default",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "flex items-center justify-center rounded-2xl text-lg font-medium transition-all duration-200 active:scale-95 touch-manipulation";

  const variants = {
    default: "bg-slate-800 text-slate-100 hover:bg-slate-700",
    operator: "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30",
    scientific: "bg-slate-900 text-slate-400 hover:bg-slate-800 text-sm",
    action: "bg-red-500/20 text-red-400 hover:bg-red-500/30",
    equals: "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
