import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// Página única (single-page): apenas a home é listada. As âncoras (#servicos,
// #sobre, etc.) são fragmentos da mesma URL e não geram entradas próprias.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
