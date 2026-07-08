"use client";

import { motion } from "motion/react";
import { ArrowRight, Code2, Cpu, Database, Globe, LayoutDashboard, Layers, type LucideIcon } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { GradientButton } from "@/components/ui/gradient-button";
import { SectionLabel } from "@/components/ui/section-label";
import { FadeIn } from "@/components/ui/fade-in";

const techStack: { icon: LucideIcon; label: string }[] = [
  { icon: Cpu, label: "JavaScript / TypeScript" },
  { icon: Database, label: "Python" },
  { icon: Layers, label: "Java & Spring Boot" },
  { icon: LayoutDashboard, label: "React / Next.js" },
  { icon: Code2, label: "Node.js" },
  { icon: Globe, label: "Figma Prototyping" },
];

export function About() {
  return (
    <section id="sobre" className="py-24 px-6 relative overflow-hidden">
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[600px] opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(124,58,237,0.8) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <FadeIn>
          <SectionLabel>Sobre a Empresa</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Tecnologia com{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              propósito
            </span>{" "}
            e precisão.
          </h2>
          <p className="mt-5 text-[#8888a4] leading-relaxed">
            Fundada por <span className="text-white font-semibold">{siteConfig.founder.name}</span> —
            desenvolvedor e estudante de Sistemas de Informação — a{" "}
            <span className="text-violet-400 font-semibold">{siteConfig.name}</span> nasceu da crença de que
            software bem construído transforma negócios.
          </p>
          <p className="mt-4 text-[#8888a4] leading-relaxed">
            Nossa especialidade está na <span className="text-white">arquitetura de software</span> e na
            prototipação avançada no Figma — antes de escrever uma linha de código, garantimos que a solução
            está certa. Trabalhamos com tecnologias consolidadas e escolhidas para cada desafio, não por
            modismo.
          </p>
          <p className="mt-4 text-[#8888a4] leading-relaxed">
            Cada projeto é tratado como uma parceria: entendemos o negócio, pensamos na escalabilidade e
            entregamos código que você pode se orgulhar de manter.
          </p>

          <div className="mt-8">
            <GradientButton href={siteConfig.contact.whatsappLink} size="md">
              Conversar com o time
              <ArrowRight className="w-4 h-4" />
            </GradientButton>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="grid grid-cols-2 gap-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.label}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-center gap-3 p-4 rounded-xl border border-white/8 bg-[#131318] hover:border-violet-500/25 hover:bg-[#16161e] transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600/20 to-purple-600/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <tech.icon className="w-4 h-4 text-violet-400" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <span className="text-sm font-medium text-[#c4c4d4] group-hover:text-white transition-colors">
                  {tech.label}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
