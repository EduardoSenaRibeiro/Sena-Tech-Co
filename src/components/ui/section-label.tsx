export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
      style={{
        background: "rgba(124,58,237,0.12)",
        border: "1px solid rgba(124,58,237,0.25)",
        color: "#c084fc",
        fontFamily: "var(--font-geist-mono)",
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" aria-hidden="true" />
      {children}
    </span>
  );
}
