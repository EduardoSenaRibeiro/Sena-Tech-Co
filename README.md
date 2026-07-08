# Sena Tech & Co. — Landing Page

Landing page institucional da Sena Tech & Co., construída com [Next.js](https://nextjs.org) (App Router), React, TypeScript e Tailwind CSS.

Site em produção: **https://sena-tech-co.vercel.app**

## Como rodar localmente

Instale as dependências e suba o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado. A página é atualizada automaticamente conforme você edita os arquivos em `src/`.

## Variáveis de ambiente

O formulário de contato (`/api/contact`) envia e-mail através do [Resend](https://resend.com). Copie o arquivo de exemplo e preencha com sua chave:

```bash
cp .env.local.example .env.local
```

| Variável          | Descrição                                                                 |
| ----------------- | -------------------------------------------------------------------------- |
| `RESEND_API_KEY`  | Chave de API do Resend, usada para enviar os e-mails de contato/orçamento. |

Sem essa variável configurada, o formulário continua funcionando, mas o lead é apenas registrado no log do servidor em vez de enviado por e-mail (útil para desenvolvimento local sem depender do Resend).

Na Vercel, a mesma variável já está configurada em **Project Settings → Environment Variables** para os ambientes de Produção e Preview.

## Estrutura do projeto

- `src/app/` — páginas e rotas (App Router), incluindo a API de contato (`api/contact`), favicon, imagem de OpenGraph, sitemap e a página de Política de Privacidade (`/privacidade`).
- `src/components/sections/` — as seções da landing page (Header, Hero, Serviços, Sobre, Portfólio, Depoimentos, FAQ, Contato, Footer).
- `src/components/ui/` — componentes reutilizáveis de interface.
- `src/lib/site-config.ts` — configuração central do site (nome, contato, redes sociais, navegação). É o principal arquivo a editar para atualizar dados da empresa.
- `public/images/` — imagens estáticas do site, incluindo a pasta `portfolio/` reservada para as fotos reais dos projetos.

## Deploy

O projeto está conectado ao GitHub e hospedado na [Vercel](https://vercel.com) — todo push para a branch `master` gera automaticamente um novo deploy em produção.

Para aprender mais sobre o Next.js, consulte a [documentação oficial](https://nextjs.org/docs).
