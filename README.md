# MixStack 🧃
**The modern auth starter template built with React Router v7, TailwindCSS, Drizzle ORM, and PostgreSQL.**

## 🧩 Stack

- **[React Router](https://reactrouter.com/)** – A complete routing library for React.
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS for building beautiful UIs fast.
- **[Drizzle ORM](https://orm.drizzle.team/)** – Type-safe SQL ORM for modern TypeScript projects.
- **[PostgreSQL](https://www.postgresql.org/)** – Powerful, open-source relational database.

## ✨ Features

- 🔐 Auth built-in (sign up, login, logout, sessions)
- 🌈 Fully styled with TailwindCSS
- 🔌 Drizzle ORM setup with migrations
- 🗃️ PostgreSQL schema with users & sessions
- 🧪 Typesafe from DB to UI
- 📦 Ready-to-deploy with environment configuration
- ⚡ Blazing fast dev experience with [Bun](https://bun.sh)
- 🛠️ Dev-friendly DX with linting, formatting, and hot reload

## 🚀 Getting Started

### 1. Clone the Repo

```bash
npx degit emmathedeveloper2/mixstack my-app
cd my-app
```

## Install dependencies

```bash
bun install
```

## Set Up Your Database
Create a .env file based on .env.example, Then run the migrations:

```bash
bun run db:push
```

## Project Structure

```bash
.
├── app/                # Remix app code
│   ├── .server/         # Route modules
│   ├── database/         # Schemas and database
│   └── routes/          # Helpers (auth, sessions, etc.)
├── drizzle.config.ts           # Drizzle config
├── public/             # Static assets
├── .env                # Environment variables
├── package.json        # Package json
├── vite.config.ts     # Vite configuration
└── tailwind.config.ts  # Tailwind config
```

## 🔐 Auth Overview
- Email/password auth

- Secure session handling

- Built with React Router loaders/actions

- Session cookies stored via httpOnly secure cookies

Built with 💛 by emmathedeveloper