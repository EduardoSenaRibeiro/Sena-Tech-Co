import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
