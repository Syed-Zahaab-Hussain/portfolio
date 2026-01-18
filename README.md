# Syed Zahaab Hussain Portfolio

A personal portfolio built with Next.js, React, TypeScript, Tailwind CSS, and Bun. It includes a single-page portfolio experience, optimized metadata, generated Open Graph image support, and a server-side contact form.

## Getting Started

Install dependencies:

```bash
bun install
```

Start the development server:

```bash
bun run dev
```

Open `http://localhost:3000`.

## Available Scripts

```bash
bun run dev
bun run build
bun run start
bun run lint
bun run typecheck
```

## Environment Variables

Create `.env.local` with the values needed for the contact form and production metadata:

```bash
GMAIL_USER="your-email@gmail.com"
GMAIL_APP_PASSWORD="your-gmail-app-password"
CONTACT_EMAIL="where-contact-messages-should-go@example.com"
NEXT_PUBLIC_SITE_URL="https://your-production-domain.com"
```

`NEXT_PUBLIC_SITE_URL` is used for canonical metadata, `robots.txt`, and `sitemap.xml`.

## Production Checks

Before deploying, run:

```bash
bun run typecheck
bun run build
```

The contact form includes server-side validation, basic rate limiting, length limits, a honeypot field, and HTML escaping for submitted content.
