# 🃏 Blackjack App

Bem-vindo ao **Blackjack App**, um jogo interativo de cartas desenvolvido com **Next.js**, **TypeScript** e **TailwindCSS**.  
O objetivo é simples: chegar o mais próximo de **21 pontos** sem ultrapassar — mas cuidado, o Dealer também quer ganhar! 😎

---

## 🚀 Tecnologias Utilizadas

- ⚛️ **Next.js** (App Router)
- 💅 **TailwindCSS**
- 💻 **TypeScript**
- 🎴 **Deck of Cards API**
- 🧠 **React Hooks** (`useState`, `useEffect`)
- 🔐 **LocalStorage** (para simulação de login)

---

## 🧩 Funcionalidades

- **Login Simulado** — utiliza variáveis de ambiente (`.env.local`) para autenticação.  
- **Criação Automática de Baralho** — via [Deck of Cards API](https://deckofcardsapi.com/).  
- **Distribuição de Cartas** — jogador e dealer recebem cartas automaticamente.  
- **Cálculo de Pontuação** — com regras reais do Blackjack:
  - Cartas “J”, “Q”, “K” valem 10 pontos.
  - Ás pode valer 1 ou 11 pontos.
- **Ações do Jogador**:
  - 🃏 `Pedir Carta` — compra uma nova carta.
  - ✋ `Parar` — mantém a pontuação atual.
  - 🔄 `Nova Rodada` — reinicia o jogo.
  - 🚪 `Logout` — encerra a sessão e volta à tela de login.
- **Interface Responsiva** e **tema dark estilizado** com TailwindCSS.

---

## 📁 Estrutura do Projeto

```bash
blackjack-app/
├── app/
│   ├── blackjack/          # Página principal do jogo
│   ├── login/              # Tela de login
│   ├── globals.css         # Estilos globais (Tailwind + custom CSS)
│   └── layout.tsx          # Layout base
├── public/                 # Imagens e ícones
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md






This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
