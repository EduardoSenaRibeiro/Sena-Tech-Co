import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionLabel } from "@/components/ui/section-label";

type PortfolioItem = {
  title: string;
  category: string;
  image: string;
};

// TODO(cliente): substitua pelos projetos reais (título, categoria e screenshot).
const portfolioItems: PortfolioItem[] = [
  {
    title: "Dashboard Financeiro",
    category: "Sistema SaaS",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format",
  },
  {
    title: "Plataforma de Gestão",
    category: "Software Sob Medida",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format",
  },
  {
    title: "Landing Page Corporativa",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop&auto=format",
  },
  {
    title: "App de Analytics",
    category: "Sistema SaaS",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop&auto=format",
  },
  {
    title: "E-commerce Premium",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&auto=format",
  },
  {
    title: "Sistema de Pedidos",
    category: "Software Sob Medida",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <SectionLabel>Portfólio</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Projetos que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              falam por si
            </span>
          </h2>
          <p className="mt-4 text-[#8888a4] max-w-lg mx-auto">
            Uma seleção de interfaces, sistemas e plataformas desenvolvidos com atenção aos detalhes.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.08}>
              <div className="group relative rounded-2xl overflow-hidden border border-white/8 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(124,58,237,0.15)] bg-[#131318]">
                <div className="relative h-48 overflow-hidden bg-[#1a1a24]">
                  <Image
                    src={item.image}
                    alt={`Screenshot do projeto: ${item.title}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131318] via-transparent opacity-70" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center gap-2 text-sm text-white font-medium">
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      Ver projeto
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <span className="text-xs font-medium text-violet-400 uppercase tracking-wider font-[family-name:var(--font-geist-mono)]">
                    {item.category}
                  </span>
                  <h3 className="mt-1 text-base font-semibold text-white">{item.title}</h3>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
