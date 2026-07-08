"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionLabel } from "@/components/ui/section-label";

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "Qual é o prazo médio de entrega de um projeto?",
    answer:
      "Depende do escopo: uma landing page costuma ficar pronta em 1 a 2 semanas, enquanto sistemas SaaS ou soluções sob medida podem levar de 1 a 3 meses. Definimos um cronograma claro logo na proposta, com marcos de entrega intermediários para você acompanhar o progresso.",
  },
  {
    question: "Como funciona o processo de desenvolvimento?",
    answer:
      "Começamos entendendo o seu negócio e objetivos, depois prototipamos a interface no Figma para validar a experiência antes de escrever código. Só então partimos para o desenvolvimento, com entregas incrementais e pontos de alinhamento até o deploy em produção.",
  },
  {
    question: "Como funciona o orçamento e as formas de pagamento?",
    answer:
      "Cada projeto é orçado sob medida, de acordo com escopo, complexidade e prazo. Depois de entendermos sua necessidade em uma conversa inicial, enviamos uma proposta detalhada com valores e condições de pagamento, geralmente divididas em parcelas por marco de entrega.",
  },
  {
    question: "Quais tecnologias vocês utilizam?",
    answer:
      "Trabalhamos principalmente com JavaScript/TypeScript, React e Next.js no front-end, e Java (Spring Boot), Node.js e Python no back-end, com PostgreSQL e Docker na infraestrutura. A escolha da stack é sempre feita pensando no problema real, não por modismo.",
  },
  {
    question: "Vocês oferecem suporte e manutenção após a entrega?",
    answer:
      "Sim. Depois do lançamento, oferecemos períodos de suporte para ajustes e correções, além de planos de manutenção contínua para evoluções futuras, monitoramento e atualizações de segurança. Combinamos os detalhes de acordo com o tipo de projeto.",
  },
  {
    question: "Preciso já ter o design pronto para começar o projeto?",
    answer:
      "Não. Se você já tem um design ou protótipo no Figma, ótimo, podemos partir dele. Caso contrário, cuidamos da prototipação completa como parte do processo, criando a interface do zero em conjunto com você antes de iniciar o desenvolvimento.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="max-w-3xl mx-auto">
        <FadeIn className="text-center mb-16">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Perguntas{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
              frequentes
            </span>
          </h2>
          <p className="mt-4 text-[#8888a4] max-w-lg mx-auto text-lg">
            Tudo que você precisa saber antes de começar um projeto com a gente.
          </p>
        </FadeIn>

        <div className="flex flex-col gap-4">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <FadeIn key={item.question} delay={i * 0.06}>
                <div
                  className={cn(
                    "rounded-2xl border bg-[#131318] transition-colors duration-300 overflow-hidden",
                    isOpen ? "border-violet-500/30" : "border-white/8 hover:border-violet-500/20"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-inset"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                  >
                    <span className="text-base md:text-lg font-semibold text-white">{item.question}</span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-violet-400 flex-shrink-0 transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-[#8888a4] leading-relaxed">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.3} className="mt-10 text-center">
          <p className="text-[#8888a4]">
            Ainda tem dúvidas?{" "}
            <a
              href="#contato"
              className="text-violet-400 hover:text-violet-300 font-semibold underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-sm"
            >
              Fale com a gente
            </a>
            .
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
