import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Saiba como a Sena Tech & Co. coleta, usa e protege os dados pessoais enviados através do formulário de contato do site.",
};

// TODO(cliente): revise este texto com um advogado se o volume de leads
// crescer ou se os dados passarem a ser usados para outras finalidades
// (ex: marketing).

export default function PrivacidadePage() {
  const lastUpdated = new Date().toLocaleDateString("pt-BR");

  return (
    <main className="min-h-screen bg-[#0c0c10] text-[#f0f0f4]">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link
          href="/"
          className="text-sm text-violet-400 hover:text-violet-300 underline underline-offset-4 transition-colors"
        >
          Voltar para o início
        </Link>

        <h1 className="mt-8 text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Política de Privacidade
        </h1>

        <p className="mt-4 text-[#8888a4] leading-relaxed">
          Esta página explica, de forma simples e direta, como a Sena Tech &amp; Co. trata os dados
          pessoais que você compartilha conosco através do site.
        </p>

        <div className="mt-12 flex flex-col gap-10">
          <section>
            <h2 className="text-2xl font-bold text-white tracking-tight">1. Quem somos</h2>
            <p className="mt-3 text-[#8888a4] leading-relaxed">
              A Sena Tech &amp; Co. é a controladora dos dados pessoais tratados através deste site.
              Se tiver qualquer dúvida sobre esta política ou sobre seus dados, entre em contato pelo
              e-mail{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-violet-400 hover:text-violet-300 underline underline-offset-4 transition-colors"
              >
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white tracking-tight">2. Quais dados coletamos</h2>
            <p className="mt-3 text-[#8888a4] leading-relaxed">
              Coletamos apenas os dados que você nos envia voluntariamente através do formulário de
              contato do site: nome, e-mail, serviço de interesse selecionado e a mensagem que você
              escreve.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white tracking-tight">3. Para que usamos</h2>
            <p className="mt-3 text-[#8888a4] leading-relaxed">
              Usamos esses dados exclusivamente para responder ao seu pedido de contato ou orçamento e
              para avaliar uma eventual prestação de serviço.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white tracking-tight">4. Base legal</h2>
            <p className="mt-3 text-[#8888a4] leading-relaxed">
              Tratamos esses dados com base no art. 7º, V, da LGPD (execução de procedimentos
              preliminares relacionados a contrato do qual o titular seja parte), já que você nos
              procurou voluntariamente pedindo contato. Se um dia usarmos seus dados para outra
              finalidade (como envio de newsletter), pediremos seu consentimento específico antes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white tracking-tight">5. Por quanto tempo guardamos</h2>
            <p className="mt-3 text-[#8888a4] leading-relaxed">
              Guardamos seus dados por até 24 meses após o último contato, ou até você solicitar a
              exclusão, o que ocorrer primeiro.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white tracking-tight">6. Compartilhamento</h2>
            <p className="mt-3 text-[#8888a4] leading-relaxed">
              Não vendemos nem compartilhamos seus dados com terceiros. Se no futuro usarmos um
              provedor de e-mail ou CRM para gerenciar contatos, ele atuará apenas como operador dos
              dados, seguindo as mesmas finalidades descritas aqui.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white tracking-tight">7. Seus direitos</h2>
            <p className="mt-3 text-[#8888a4] leading-relaxed">
              Conforme o art. 18 da LGPD, você pode solicitar acesso, correção, eliminação ou
              informações sobre o uso dos seus dados a qualquer momento, escrevendo para o e-mail de
              contato acima.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white tracking-tight">8. Cookies</h2>
            <p className="mt-3 text-[#8888a4] leading-relaxed">
              Este site não utiliza cookies de rastreamento ou ferramentas de analytics de terceiros
              no momento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white tracking-tight">9. Alterações</h2>
            <p className="mt-3 text-[#8888a4] leading-relaxed">
              Esta política pode ser atualizada conforme o site e o negócio evoluem. A data da última
              atualização está logo abaixo.
            </p>
          </section>
        </div>

        <p className="mt-16 text-xs text-[#8888a4] font-[family-name:var(--font-geist-mono)]">
          Última atualização: {lastUpdated}
        </p>
      </div>
    </main>
  );
}
