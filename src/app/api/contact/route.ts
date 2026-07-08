import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
  company?: string; // honeypot field — humans never fill this in
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
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

  const name = body.name?.trim();
  const email = body.email?.trim();
  const service = body.service?.trim();
  const message = body.message?.trim();

  if (!name || !email || !service || !message) {
    return NextResponse.json({ error: "Preencha todos os campos." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }

  // TODO(cliente): plugue aqui um provedor real de e-mail/CRM, por exemplo:
  //   - Resend (https://resend.com) com RESEND_API_KEY em variável de ambiente
  //   - Formspree / EmailJS
  //   - Webhook para um CRM (HubSpot, RD Station, etc.)
  // Por enquanto, a submissão só é registrada no log do servidor.
  console.info("[contact] novo lead:", { name, email, service, message });

  return NextResponse.json({ ok: true });
}
