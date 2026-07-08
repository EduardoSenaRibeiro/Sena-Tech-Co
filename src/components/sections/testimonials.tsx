import { Quote, Star } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionLabel } from "@/components/ui/section-label";
import { SpotlightCard } from "@/components/ui/spotlight-card";

type Stat = {
  value: string;
  label: string;
};

// TODO(cliente): substitua pelos números reais assim que houver histórico
// consolidado de projetos. Mantidos conservadores/plausíveis por enquanto.
const stats: Stat[] = [
  { value: "20+", label: "Projetos entregues" },
  { value: "3+", label: "Anos de experiência" },
  { value: "6", label: "Stacks dominadas" },
  { value: "100%", label: "Dedicação por projeto" },
];

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

// TODO(cliente): substitua por depoimentos reais de clientes assim que
// estiverem disponíveis. Nomes, cargos e empresas abaixo são fictícios.
const testimonials: Testimonial[] = [
  {
    quote:
      "A Sena Tech entendeu exatamente o que a gente precisava e entregou um sistema muito além do esperado. Comunicação clara do início ao fim.",
    name: "Mariana Alves",
    role: "Fundadora — e-commerce (exemplo)",
    initials: "MA",
  },
  {
    quote:
      "Processo transparente, prazos cumpridos e um código que nossa equipe interna conseguiu dar continuidade sem dor de cabeça.",
    name: "Rafael Costa",
    role: "CTO — empresa de logística (exemplo)",
    initials: "RC",
  },
  {
    quote:
      "Nosso site ficou rápido, bonito e passou a converter muito mais visitantes em clientes já no primeiro mês no ar.",
    name: "Juliana Prado",
    role: "Marketing — clínica (exemplo)",
    initials: "JP",
  },
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 px-6 relative overflow-hidden">
      <div
        className="absolute right-0 top-0 w-[350px] h-[350px] opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(124,58,237,0.8) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <SectionLabel>Depoimentos</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Resultados que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              geram confiança
            </span>
          </h2>
          <p className="mt-4 text-[#8888a4] max-w-xl mx-auto text-lg">
            O que clientes dizem sobre trabalhar com a Sena Tech & Co.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/8 bg-[#131318] p-6 text-center hover:border-violet-500/25 transition-colors duration-300"
              >
                <p className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs md:text-sm text-[#8888a4]">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <SpotlightCard className="h-full rounded-2xl">
                <div
                  className="relative rounded-2xl p-7 h-full flex flex-col border border-white/8 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(124,58,237,0.15)]"
                  style={{ background: "rgba(10,10,14,1)" }}
                >
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

                  <Quote className="w-8 h-8 text-violet-500/30 mb-4" aria-hidden="true" />

                  <div className="flex gap-1 mb-4" aria-label="Avaliação de 5 de 5 estrelas">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 text-violet-400 fill-violet-400" aria-hidden="true" />
                    ))}
                  </div>

                  <p className="text-[#c4c4d4] leading-relaxed text-sm flex-1">&ldquo;{t.quote}&rdquo;</p>

                  <div className="mt-6 flex items-center gap-3 pt-6 border-t border-white/8">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-[#8888a4]">{t.role}</p>
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
