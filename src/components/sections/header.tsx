"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Menu, MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { GradientButton } from "@/components/ui/gradient-button";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    firstMenuLinkRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-3 bg-[#0c0c10]/90 backdrop-blur-xl border-b border-white/5" : "py-5"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2.5 group">
          <Image
            src="/images/logo-mark.png"
            alt=""
            width={32}
            height={32}
            priority
            className="w-8 h-8 object-contain drop-shadow-[0_0_16px_rgba(124,58,237,0.5)]"
          />
          <span className="text-lg font-bold text-white tracking-tight font-[family-name:var(--font-outfit)]">
            {siteConfig.shortName}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
              & Co.
            </span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {siteConfig.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-3 text-sm text-[#8888a4] hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <GradientButton href={siteConfig.contact.whatsappLink} size="sm" className="hidden md:inline-flex">
          <MessageCircle className="w-4 h-4" />
          Fale Conosco
        </GradientButton>

        <button
          ref={menuButtonRef}
          onClick={() => setOpen(!open)}
          className="md:hidden min-w-11 min-h-11 flex items-center justify-center rounded-lg text-[#8888a4] hover:text-white hover:bg-white/5 transition-colors"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <motion.div
          id="mobile-nav"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-2 mx-4 rounded-2xl bg-[#131318] border border-white/8 overflow-hidden"
        >
          <nav className="p-4 flex flex-col gap-1">
            {siteConfig.nav.map((link, i) => (
              <a
                key={link.href}
                ref={i === 0 ? firstMenuLinkRef : undefined}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm text-[#c4c4d4] hover:text-white rounded-xl hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <GradientButton href={siteConfig.contact.whatsappLink} size="sm" className="mt-2 justify-center">
              <MessageCircle className="w-4 h-4" />
              Fale pelo WhatsApp
            </GradientButton>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
