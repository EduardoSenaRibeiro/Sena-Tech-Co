import { NextResponse } from "next/server";

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

  // TODO(cliente): plugue aqui um provedor real de e-mail/CRM, por exemplo:
  //   - Resend (https://resend.com) com RESEND_API_KEY em variável de ambiente
  //   - Formspree / EmailJS
  //   - Webhook para um CRM (HubSpot, RD Station, etc.)
  // Por enquanto, a submissão só é registrada no log do servidor (sem PII).
  console.info("[contact] novo lead recebido", {
    service,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
