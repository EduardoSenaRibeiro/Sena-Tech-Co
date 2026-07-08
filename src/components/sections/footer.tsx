import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-white/6 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/logo-mark.png"
              alt=""
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
            />
            <span className="text-base font-bold text-white">
              {siteConfig.shortName}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                & Co.
              </span>
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {siteConfig.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#8888a4] hover:text-[#c4c4d4] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="text-xs text-[#8888a4] font-[family-name:var(--font-geist-mono)]">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
