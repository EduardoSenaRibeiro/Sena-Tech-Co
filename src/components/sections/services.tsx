import { Code2, Globe, Layers, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionLabel } from "@/components/ui/section-label";
import { SpotlightCard } from "@/components/ui/spotlight-card";

type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  tags: string[];
  iconBg: string;
};

const services: Service[] = [
  {
    icon: Globe,
    title: "Web Design & Sites",
    desc: "Sites institucionais, landing pages e portfólios com performance máxima. Código limpo, carregamento rápido e design responsivo que converte visitantes em clientes.",
    tags: ["JavaScript", "Next.js", "React", "Figma", "SEO"],
    iconBg: "from-violet-600 to-violet-500",
  },
  {
    icon: Layers,
    title: "Sistemas SaaS",
    desc: "Plataformas multi-tenant, painéis administrativos e dashboards analíticos. Arquitetura sólida, autenticação segura e integrações com APIs de terceiros.",
    tags: ["JavaScript", "Spring Boot", "Node.js", "PostgreSQL", "Docker"],
    iconBg: "from-purple-600 to-fuchsia-500",
  },
  {
    icon: Code2,
    title: "Soluções Sob Medida",
    desc: "Back-end robusto, automações, integrações de dados e microsserviços. Do protótipo ao deploy em produção — entregamos a solução certa para o seu desafio único.",
    tags: ["Java", "Python", "APIs REST", "Cloud"],
    iconBg: "from-fuchsia-600 to-pink-500",
  },
];

export function Services() {
  return (
    <section id="servicos" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <SectionLabel>Serviços</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            O que a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
              Sena Tech
            </span>{" "}
            entrega
          </h2>
          <p className="mt-4 text-[#8888a4] max-w-xl mx-auto text-lg">
            Soluções digitais completas — do conceito ao código em produção.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <FadeIn key={svc.title} delay={i * 0.12}>
              <SpotlightCard className="h-full rounded-2xl">
                <div
                  className={cn(
                    "group relative rounded-2xl p-7 h-full flex flex-col gap-5 transition-all duration-300",
                    "border border-white/8 hover:border-violet-500/30",
                    "hover:shadow-[0_0_40px_rgba(124,58,237,0.15)] hover:-translate-y-1"
                  )}
                  style={{ background: "rgba(10,10,14,1)" }}
                >
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

                  <div className="relative">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center mb-5",
                        "bg-gradient-to-br shadow-lg",
                        svc.iconBg
                      )}
                    >
                      <svc.icon className="w-6 h-6 text-white" strokeWidth={1.8} aria-hidden="true" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">{svc.title}</h3>
                    <p className="text-[#8888a4] text-sm leading-relaxed mb-5">{svc.desc}</p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {svc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-xs font-medium text-[#c084fc] bg-violet-500/10 border border-violet-500/20 font-[family-name:var(--font-geist-mono)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
