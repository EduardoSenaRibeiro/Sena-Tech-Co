"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CheckCircle, ChevronRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { GradientButton } from "@/components/ui/gradient-button";
import { SectionLabel } from "@/components/ui/section-label";

const trustIndicators = ["Entrega Ágil", "Código Limpo & Escalável", "Suporte Dedicado"];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(ellipse, rgba(124,58,237,0.6) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(ellipse, rgba(168,85,247,0.8) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-8"
        >
          <SectionLabel>Desenvolvimento de Software Premium</SectionLabel>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.07] tracking-tight mb-7"
        >
          Construímos o{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400">
            motor digital
          </span>
          <br />
          do seu negócio.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-[#8888a4] max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {siteConfig.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <GradientButton href={siteConfig.contact.whatsappLinkWithMessage} size="lg">
            <MessageCircle className="w-5 h-5" />
            Solicitar Orçamento
            <ArrowRight className="w-4 h-4 ml-1" />
          </GradientButton>

          <a
            href="#servicos"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-[#c4c4d4] hover:text-white border border-white/10 hover:border-white/20 transition-all duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            Ver Serviços
            <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-[#8888a4]"
        >
          {trustIndicators.map((label) => (
            <div key={label} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-violet-400" aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#servicos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[#8888a4] hover:text-white transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-lg"
        aria-label="Rolar até a seção de serviços"
      >
        <span className="text-[10px] uppercase tracking-widest font-[family-name:var(--font-geist-mono)]">
          Scroll
        </span>
        <span className="w-5 h-8 rounded-full border border-white/15 group-hover:border-violet-400/50 flex items-start justify-center p-1.5 transition-colors">
          <motion.span
            animate={shouldReduceMotion ? {} : { y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-violet-400"
          />
        </span>
      </motion.a>
    </section>
  );
}
