"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle, Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionLabel } from "@/components/ui/section-label";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/social-icons";

const socialIcons = { GitHub: GithubIcon, LinkedIn: LinkedinIcon, Instagram: InstagramIcon } as const;

// placeholder-[#8888a4] reaproveita o token muted-foreground do tema, que já
// atende ao contraste mínimo AA sobre o fundo do input (o cinza mais escuro
// usado antes, #5a5a74, ficava abaixo de 4.5:1).
const inputClass =
  "w-full px-4 py-3.5 rounded-xl text-white text-sm bg-[#1a1a24] border border-white/10 focus:border-violet-500/60 focus:outline-none focus:ring-2 focus:ring-violet-500/20 placeholder-[#8888a4] transition-all duration-200";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "", company: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      setForm({ name: "", email: "", service: "", message: "", company: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contato" className="py-24 px-6 relative overflow-hidden">
      <div
        className="absolute right-0 bottom-0 w-[400px] h-[400px] opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(168,85,247,0.8) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <FadeIn>
          <SectionLabel>Contato</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Vamos construir{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              algo incrível
            </span>{" "}
            juntos?
          </h2>
          <p className="mt-5 text-[#8888a4] leading-relaxed">
            Tem um projeto em mente? Quer transformar uma ideia em produto? Preencha o formulário ou fale
            direto pelo WhatsApp — respondemos rápido.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-3 text-[#c4c4d4] hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1a1a24] border border-white/10 flex items-center justify-center group-hover:border-violet-500/30 transition-colors">
                <Mail className="w-4 h-4 text-violet-400" aria-hidden="true" />
              </div>
              {siteConfig.contact.email}
            </a>
            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#c4c4d4] hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1a1a24] border border-white/10 flex items-center justify-center group-hover:border-violet-500/30 transition-colors">
                <MessageCircle className="w-4 h-4 text-violet-400" aria-hidden="true" />
              </div>
              WhatsApp
            </a>
          </div>

          <div className="mt-8">
            <p className="text-xs text-[#5a5a74] uppercase tracking-widest mb-4 font-[family-name:var(--font-geist-mono)]">
              Redes Sociais
            </p>
            <div className="flex gap-3">
              {siteConfig.social.map((social) => {
                const Icon = socialIcons[social.label as keyof typeof socialIcons];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-[#8888a4] hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-200"
                  >
                    {Icon ? <Icon className="w-4 h-4" /> : null}
                  </a>
                );
              })}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="rounded-2xl bg-[#131318] border border-white/8 p-8">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full gap-4 py-8 text-center"
                role="status"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.4)]">
                  <CheckCircle className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-white">Mensagem enviada!</h3>
                <p className="text-[#8888a4] text-sm">Em breve entraremos em contato.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Honeypot: escondido via CSS, ignorado por usuários reais */}
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] w-px h-px opacity-0"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-semibold text-[#8888a4] uppercase tracking-widest font-[family-name:var(--font-geist-mono)]"
                    >
                      Nome
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-semibold text-[#8888a4] uppercase tracking-widest font-[family-name:var(--font-geist-mono)]"
                    >
                      E-mail
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-service"
                    className="text-xs font-semibold text-[#8888a4] uppercase tracking-widest font-[family-name:var(--font-geist-mono)]"
                  >
                    Serviço de Interesse
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className={cn(inputClass, "appearance-none cursor-pointer")}
                    style={{ colorScheme: "dark" }}
                  >
                    <option value="" disabled>
                      Selecione um serviço...
                    </option>
                    <option value="web">Web Design & Sites</option>
                    <option value="saas">Sistema SaaS</option>
                    <option value="custom">Solução Sob Medida</option>
                    <option value="other">Outro</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-semibold text-[#8888a4] uppercase tracking-widest font-[family-name:var(--font-geist-mono)]"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Conte um pouco sobre seu projeto..."
                    required
                    rows={4}
                    className={cn(inputClass, "resize-none")}
                  />
                </div>

                {status === "error" && (
                  <p role="alert" className="text-sm text-red-400">
                    Não foi possível enviar sua mensagem. Tente novamente ou fale pelo WhatsApp.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 transition-all duration-300 shadow-[0_0_24px_rgba(124,58,237,0.3)] hover:shadow-[0_0_36px_rgba(124,58,237,0.5)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
                >
                  {status === "submitting" ? "Enviando..." : "Enviar mensagem"}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
