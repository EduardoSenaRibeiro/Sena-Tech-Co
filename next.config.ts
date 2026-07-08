import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove o header X-Powered-By: Next.js (não expõe o stack).
  poweredByHeader: false,
  images: {
    // TODO(cliente): quando trocar as fotos de portfólio pelas reais,
    // ajuste (ou remova) esse remotePattern conforme a origem das imagens.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Headers de segurança aplicados a todas as rotas.
  // Obs.: Content-Security-Policy foi deixado de fora de propósito — o projeto
  // usa estilos inline extensivamente (Tailwind v4 + style={{...}}) e um CSP
  // mal calibrado quebraria a renderização. Fica para uma etapa futura.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
