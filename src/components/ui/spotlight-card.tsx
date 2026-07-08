"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setSpotlight((s) => ({ ...s, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden", className)}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          transition: "opacity 0.2s ease",
          opacity: spotlight.opacity,
          mixBlendMode: "screen",
          background: `radial-gradient(180px circle at ${spotlight.x}px ${spotlight.y}px, rgba(167,139,250,0.32), rgba(124,58,237,0.15) 45%, transparent 75%)`,
        }}
      />
    </div>
  );
}
