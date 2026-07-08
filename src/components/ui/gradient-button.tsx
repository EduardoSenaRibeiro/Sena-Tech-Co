import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "px-5 py-3 text-sm",
  md: "px-7 py-3.5 text-base",
  lg: "px-9 py-4 text-lg",
};

export function GradientButton({
  href,
  children,
  className = "",
  size = "md",
  external = true,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl font-semibold text-white transition-all duration-300",
        "bg-gradient-to-r from-violet-600 to-purple-500",
        "hover:from-violet-500 hover:to-purple-400",
        "shadow-[0_0_30px_rgba(124,58,237,0.35)] hover:shadow-[0_0_45px_rgba(124,58,237,0.55)]",
        "hover:-translate-y-0.5 active:translate-y-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c10]",
        sizeClasses[size],
        className
      )}
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      {children}
    </a>
  );
}
