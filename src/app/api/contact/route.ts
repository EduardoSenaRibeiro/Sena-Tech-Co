import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  service?: unknown;
  message?: unknown;
  company?: unknown; // honeypot field — humans never fill this in
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Serviços permitidos — devem casar com os <option value="..."> do formulário
// em src/components/sections/contact.tsx.
const ALLOWED_SERVICES = ["web", "saas", "custom", "other"] as const;

const SERVICE_LABELS: Record<(typeof ALLOWED_SERVICES)[number], string> = {
  web: "Web Design & Sites",
  saas: "Sistema SaaS",
  custom: "Solução Sob Medida",
  other: "Outro",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Limites de tamanho por campo (em caracteres).
const MAX_NAME = 100;
const MAX_EMAIL = 150;
const MAX_MESSAGE = 2000;

// Rate limiting básico, in-memory, por IP.
// ATENÇÃO: este contador vive no escopo do módulo, ou seja, é por instância e
// reseta a cada cold start / novo processo. Não é uma solução distribuída
// (várias instâncias serverless não compartilham este Map), mas é uma proteção
// razoável e sem dependências extras para um projeto deste porte. Para algo
// robusto, migrar para Redis/Upstash no futuro.
const RATE_LIMIT_MAX = 5; // requisições
const RATE_LIMIT_WINDOW_MS = 60_000; // por minuto

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientKey(request: Request): string {
  // A Vercel popula x-forwarded-for; o primeiro IP da lista é o cliente real.
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return "unknown";
}

function checkRateLimit(key: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now >= entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return {
      allowed: false,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  return { allowed: true, retryAfter: 0 };
}

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  const { allowed, retryAfter } = checkRateLimit(clientKey);
  if (!allowed) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente em instantes." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  // Honeypot: bots tend to fill every field, including hidden ones.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  // Rejeita valores que não sejam string (ex.: array/objeto no JSON).
  if (
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.message !== "string"
  ) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const name = body.name.trim();
  const email = body.email.trim();
  const service = typeof body.service === "string" ? body.service.trim() : "";
  const message = body.message.trim();

  if (!name || !email || !service || !message) {
    return NextResponse.json({ error: "Preencha todos os campos." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }
  if (!(ALLOWED_SERVICES as readonly string[]).includes(service)) {
    return NextResponse.json({ error: "Serviço inválido." }, { status: 400 });
  }
  if (name.length > MAX_NAME || email.length > MAX_EMAIL || message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "Mensagem muito longa." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    // Sem RESEND_API_KEY configurada (ex.: ambiente local sem .env.local):
    // não há como enviar e-mail, então ao menos registramos o lead no log
    // pra não perdê-lo. Configure a variável de ambiente para envio real.
    console.warn("[contact] RESEND_API_KEY não configurada — lead não enviado por e-mail", {
      name,
      email,
      service,
      message,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(resendApiKey);
    const serviceLabel = SERVICE_LABELS[service as (typeof ALLOWED_SERVICES)[number]];

    await resend.emails.send({
      from: "Sena Tech & Co. <onboarding@resend.dev>",
      to: siteConfig.contact.email,
      replyTo: email,
      subject: `Novo contato: ${name} — ${serviceLabel}`,
      html: `
        <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
        <p><strong>Serviço de interesse:</strong> ${escapeHtml(serviceLabel)}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    console.info("[contact] novo lead enviado por e-mail", {
      service,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    // Se o envio falhar, registramos os dados completos no log para não
    // perder o lead, mesmo que isso signifique logar PII neste caso pontual.
    console.error("[contact] falha ao enviar e-mail via Resend", err, {
      name,
      email,
      service,
      message,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json(
      { error: "Não foi possível enviar sua mensagem. Tente novamente ou fale pelo WhatsApp." },
      { status: 502 },
    );
  }
}
