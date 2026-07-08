import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoMark = readFileSync(join(process.cwd(), "public/images/logo-mark.png"));
  const logoMarkSrc = `data:image/png;base64,${logoMark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          background:
            "radial-gradient(ellipse 900px 550px at 50% 30%, rgba(124,58,237,0.35), transparent 70%), #0c0c10",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 120,
            height: 120,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoMarkSrc} width={120} height={120} alt="" />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 800,
            color: "#f0f0f4",
            letterSpacing: -1,
          }}
        >
          Sena Tech & Co.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#8888a4",
            maxWidth: 820,
            textAlign: "center",
          }}
        >
          Construímos o motor digital do seu negócio.
        </div>
      </div>
    ),
    { ...size }
  );
}
