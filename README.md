# Chefgaa Website

The marketing website for **Chefgaa** — All-in-One POS & Online Ordering for Restaurants. Built as an Apple-style, light-theme design system with generous white space, alternating white/gray bands, and a single blue accent reserved for primary CTAs.

## Tech stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS v4** (design tokens defined via `@theme` in `src/styles/theme.css`)
- **Framer Motion** for subtle scroll/enter animations
- **React Router** for client-side routing
- **Supabase JS** client for the demo-request form
- **Netlify** deploy (GitHub auto-deploy) with SPA redirect

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase keys
npm run dev
```

Open the local URL printed by Vite.

## Environment variables

Create a `.env.local` file (never committed) based on `.env.example`:

```
VITE_SUPABASE_URL=your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Keys are read via `import.meta.env` and are never hardcoded in source.

## Scripts

| Command             | Description                            |
| ------------------- | -------------------------------------- |
| `npm run dev`       | Start the local dev server             |
| `npm run build`     | Type-check and build for production     |
| `npm run preview`   | Preview the production build locally    |
| `npm run typecheck` | Run the TypeScript type checker         |

## Supabase

The database schema lives in `supabase/migrations/001_init.sql`:

- **`demo_requests`** — stores submissions from the contact/demo form. RLS enabled; the `anon` role may only `INSERT`.
- **`site_content`** — optional CMS-style content table. RLS enabled; the `anon` role may only `SELECT` rows where `status = 'active'`.

Run the migration against your Supabase project (SQL editor or CLI).

## Pages

`/` · `/online-ordering` · `/customized-website` · `/table-reservation` · `/catering-services` · `/pricing` · `/about` · `/contact`

## Deployment

Deployment is handled by **Netlify via GitHub auto-deploy**. `netlify.toml` configures the build command, publish directory, and the SPA redirect (`/* → /index.html 200`). Do not run `netlify deploy` from this repo.
