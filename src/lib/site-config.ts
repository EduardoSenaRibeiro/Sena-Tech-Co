/**
 * Configuração central do site — Sena Tech & Co.
 *
 * TODO(cliente): troque os valores marcados com "SUBSTITUA" pelos dados reais
 * da empresa. Esse é o único arquivo que precisa ser editado para atualizar
 * contatos, redes sociais, endereço e URL de produção em todo o site.
 */

const WHATSAPP_NUMBER = "5583991341125"; // DDI+DDD+número, só dígitos

export const siteConfig = {
  name: "Sena Tech & Co.",
  shortName: "Sena Tech",
  tagline: "Construímos o motor digital do seu negócio.",
  description:
    "Da landing page ao sistema SaaS completo — a Sena Tech & Co. entrega sites rápidos, plataformas escaláveis e softwares sob medida que transformam ideia em resultado real.",
  url: "https://sena-tech-co.vercel.app",
  locale: "pt_BR",

  contact: {
    email: "sena.tech.co1@gmail.com",
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappLink: `https://wa.me/${WHATSAPP_NUMBER}`,
    whatsappLinkWithMessage: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Olá, quero solicitar um orçamento!"
    )}`,
  },

  social: [
    // SUBSTITUA pelos perfis reais (ou remova o item se não existir)
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "Instagram", href: "https://instagram.com/" },
  ],

  nav: [
    { label: "Início", href: "#inicio" },
    { label: "Serviços", href: "#servicos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Portfólio", href: "#portfolio" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "FAQ", href: "#faq" },
    { label: "Contato", href: "#contato" },
  ],

  founder: {
    name: "Luiz Eduardo",
    role: "Fundador — desenvolvedor e estudante de Sistemas de Informação",
  },
} as const;

export type SiteConfig = typeof siteConfig;
