# System design audit — Chefgaa website

Audited against `.cursor/rules/system-design.mdc`. Scope is this repo only: a Vite + React marketing site (`package.json`) deployed as static files on Netlify (`netlify.toml`, `README.md`), plus one Supabase table written by the demo form.

The standard says a static marketing site mostly needs CDN, caching, security, and monitoring. Load balancing, message queues, and horizontal app scaling do not apply until there is a long-running service. Those sections say so instead of inventing work.

`.cursor/rules/deploy.mdc` stays as-is. It does not conflict with the new rule: deploy is the release path (build, commit, push to `main`, Netlify); this rule is the design checklist. Both are `alwaysApply: true`.

## Top gaps

1. **High — open anonymous writes.** `demo_requests` allows any anon insert (`with check (true)`), with no length checks, rate limit, or captcha. That is the only abuse path.
2. **High — no security headers.** `netlify.toml` sets the build and the SPA redirect only. No CSP, HSTS, `X-Content-Type-Options`, or frame policy.
3. **High — static media the pages depend on is not in the repo.** Routes reference PNGs and GLBs; `public/` only contains `favicon.svg`. No explicit cache headers for hashed assets vs HTML.
4. **Medium — no monitoring and no CI.** No error tracker, uptime check, or Core Web Vitals. No tests and no GitHub Actions workflow.
5. **Medium — the contact page calls Supabase directly** with browser-only validation and no timeout (`src/pages/Contact.tsx`).

---

## 1. System architecture

**Applies in part.** There is no backend with controllers, services, and a data layer. The app is a client-side SPA.

**In place**

- Routes live in `src/App.tsx`; pages in `src/pages/`; shared UI in `src/components/`.
- The only remote client is `src/lib/supabase.ts`. URL and anon key come from `import.meta.env`, documented in `.env.example`, and ignored via `.gitignore`.
- No secrets are hardcoded. The anon key is a public browser key, which is correct only while RLS stays tight.

**Gaps**

- `src/pages/Contact.tsx` inserts into `demo_requests` from the page. There is no service boundary.
- Validation is a local email regex, not a schema library, and it is not shared with the database.
- `site_content` is defined in `supabase/migrations/001_init.sql` and described in `README.md`, but nothing in `src/` reads it.
- There is no public HTTP API to version.

**Fixes**

- **Medium.** Move the insert into a small function next to `src/lib/supabase.ts` and validate with one schema (for example zod) before the call.
- **Low.** Use `site_content` or remove the unused table in a later migration.
- **Not now.** API versioning and a stateless server tier. Add them only if a real API appears.

## 2. Load balancing

**Does not apply.** Netlify serves the built `dist/` directory. There is no Node process, session, or in-process state to drain on SIGTERM.

**In place**

- `netlify.toml` publishes `dist` and rewrites `/*` to `/index.html` (SPA fallback).
- Form state stays in React (`useState` in `Contact.tsx`). Refreshing loses an unsent draft, which is fine for this form.

**Gaps**

- No `/health` or `/ready`. Nothing in this repo would answer them.
- No proxy-header or sticky-session handling, because there is no app server.

**Fixes**

- **Low.** When a serverless function is added, give it `/health` and `/ready`, handle SIGTERM, and avoid sticky sessions. Do not add those endpoints to the static site now.

## 3. Caching

**Applies at the HTTP layer.** There is no Redis and no shared server cache. Do not add one for a brochure site.

**In place**

- Vite fingerprints JS and CSS on `npm run build` (`vite.config.ts` uses the Vite defaults).
- The hero image is eager with `fetchPriority="high"` (`src/components/HomeHero.tsx`). Several other images use `loading="lazy"`.
- No user-specific responses are cached. The demo form is a POST from the browser.

**Gaps**

- `netlify.toml` does not set `Cache-Control`. Hashed files under `/assets/` should be immutable for a year; `index.html` should be short-lived so deploys are not stuck behind a cached shell.
- Fonts load from Google in `index.html` (`fonts.googleapis.com` / `fonts.gstatic.com`). Cache and availability sit on a third party, and the stylesheet blocks first paint.
- No app-level ETag logic. Netlify can do conditional requests for static files; nothing in the repo configures it.

**Fixes**

- **High.** Add Netlify headers: `Cache-Control: public, max-age=31536000, immutable` for `/assets/*`, and a short max-age or `no-cache` for `/index.html`.
- **Medium.** Self-host the two font families, or at least keep `display=swap` (already on the Google URL) and measure the extra connection.
- **Low.** Leave ETags to Netlify unless a function starts returning dynamic JSON.

## 4. Database design

**Applies narrowly.** Two tables, one write path, no list API.

**In place**

- Schema is a migration: `supabase/migrations/001_init.sql` (not an ad-hoc production edit).
- `demo_requests`: uuid primary key, `created_at`, RLS on, anon may only `INSERT`.
- `site_content`: uuid primary key, `created_at`, `status` default `'active'`, anon may only `SELECT` rows with `status = 'active'`.
- The client uses the Supabase query builder (`src/pages/Contact.tsx`), not string-built SQL.

**Gaps**

- Insert policy is `with check (true)`. Name, email, and restaurant name are nullable text with no length or format checks, so the database will store empty or huge rows the UI would reject only if the UI runs.
- No indexes. `site_content` would filter on `status`, `page`, and `display_order` if it were used. `demo_requests` has no list query yet, so an index there is premature.
- No `updated_at`. Soft delete is unnecessary while rows are insert-only leads; a `status` column would matter once someone triages them in the database.
- No transactions (single-row insert). Pooling is Supabase’s, not this repo’s.
- No pagination because there is no list endpoint. `SELECT *` is not used in app code.

**Fixes**

- **High.** In a new migration, `NOT NULL` plus length limits on `name`, `email`, and `restaurant_name`, and a check constraint for a basic email shape. Keep anon limited to insert.
- **Medium.** If `site_content` stays, index `(status, page, display_order)` and add `updated_at`.
- **Low.** Cursor pagination only if an admin list API is added. Do not `SELECT *` unbounded.

## 5. Message queues

**Does not apply.** The form writes one row and returns. Nothing sends email, calls a webhook, or generates a file.

**In place**

- `handleSubmit` in `src/pages/Contact.tsx` awaits the insert and shows success or a generic error. The copy says a person will follow up; that work is outside this repo.

**Gaps**

- None that justify BullMQ, SQS, or a worker today. A queue would be extra infrastructure for a single insert.

**Fixes**

- **Low.** If a confirmation email or Slack ping is added later, fire it after the insert (database webhook or edge function), make the handler idempotent, and retry with backoff into a dead-letter path. Keep the browser response tied to the insert, not to the notification.
- **Not now.** Do not add a queue for the current form.

## 6. CDN

**Applies.** Netlify’s CDN is the delivery network (`README.md`).

**In place**

- Static publish from `dist` (`netlify.toml`). Netlify provides gzip/brotli and HTTP/2 for that site; the repo does not configure them.
- Hashed build assets (Vite).
- Lazy images in `src/components/pricing/PricingHardware.tsx`, `PricingFinalCTA.tsx`, and hardware UI. Logo sets width and height in `src/components/ChefgaaLogo.tsx`.
- Sketchfab iframes load only near the viewport (`src/components/hardware/ReceiptPrinterViewer.tsx`). 3D viewers are `React.lazy` in `src/components/hardware/HardwareUI.tsx` and `HardwareSections.tsx`.
- Home splits two heavy sections with `lazy()` in `src/pages/Home.tsx`.

**Gaps**

- Pages request files that are not in git: `/hero-product.png` (`src/components/HomeHero.tsx`), `/chefgaa-logo.png` (`src/components/ChefgaaLogo.tsx`), `/ecosystem/chefgaa-workstation.png` and `/ecosystem/pos-hardware.png`, and `/models/tv_screen.glb`, `mobile_stand.glb`, `pos_machine.glb`. `public/` contains only `favicon.svg`. Those URLs 404 unless something outside this repo uploads them.
- Product images are PNG with no WebP/AVIF and no `srcset`. The hero sets `sizes="100vw"` but only one `src`.
- Sketchfab and Google Fonts are extra origins, not assets on this CDN.
- No user uploads, so object storage is not needed.

**Fixes**

- **High.** Put the referenced PNG and GLB files in `public/` (or document a deploy step that publishes them) so the CDN has something to serve.
- **Medium.** Hero and workstation images: AVIF/WebP plus a couple of widths. Confirm Netlify compression on a production response.
- **Low.** Keep Sketchfab deferred. Prefer the local GLBs already referenced once those files exist.

## 7. Scalability

**Mostly does not apply as an app-scaling problem.** Static files scale with Netlify. Expected load is marketing traffic. The first bottleneck is form abuse and JavaScript weight, not a database or a single server.

**In place**

- Stateless static hosting. No in-memory server session.
- Some code splitting for the home page and hardware viewers (see CDN section).
- Pages themselves are imported eagerly in `src/App.tsx`.

**Gaps**

- No rate limit and no body-size cap on `demo_requests`.
- The Supabase insert has no timeout (`src/pages/Contact.tsx`). A hung client waits on “Sending…”.
- The client ships Three.js, GSAP, Framer Motion, anime.js, and Lenis (`package.json`). That is the cost of the hardware and motion pages, not of the contact form.

**Fixes**

- **High.** Rate-limit or captcha the demo insert (Supabase rate limits, an edge function, or a captcha). This is the first thing that breaks under junk traffic.
- **Medium.** Abort the insert after a few seconds and show the existing error state. Lazy-load route pages in `src/App.tsx` so hardware/Three is not on the first-page graph.
- **Low.** Record a rough budget (for example, home route JS) when adding more animation libraries. Do not add a shared cache or queue to “scale” this site.

## 8. Reliability and security

**Applies.** Depth should match a public form on a static host, not a payments service.

**In place**

- Submit failures show a fixed message and do not render the Supabase error (`src/pages/Contact.tsx`).
- Client checks name, email, and restaurant name before insert.
- RLS: anon insert-only on leads, anon read of active content only (`001_init.sql`).
- Secrets stay out of git (`.gitignore`, `.env.example`). HTTPS is Netlify’s.
- `src/lib/supabase.ts` warns in the console when env vars are missing. It still constructs a client with empty strings, so a misconfigured production build fails at submit time rather than at build time.

**Gaps**

- No security headers in `netlify.toml` (CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, frame protection). Sketchfab iframes and Google Fonts need to be allowed explicitly if CSP is added.
- Anon insert policy does not constrain row contents. No captcha.
- No automated tests (`package.json` has `typecheck` and `build` only). No `.github/workflows`. Critical path is the demo insert.
- No documented restore for the Supabase project. Backups, if any, live in the Supabase dashboard, not in this repo.
- No `npm audit` script and no Dependabot config.
- No password storage and no auth cookies in this repo. Do not add them here.

**Fixes**

- **High.** Security headers in `netlify.toml`, including a CSP that allows only the font and Sketchfab origins actually used. Pair with the database checks in section 4 and a rate limit or captcha.
- **Medium.** GitHub Actions running `npm run typecheck` and `npm audit --audit-level=high`. A unit test for `validate` in `Contact.tsx` once it is extracted.
- **Low.** Note Supabase backup/PITR and who can restore it in `README.md`. Fail `vite build` when `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY` is missing, so a blank client is not deployed. Never put the service-role key in a `VITE_` variable.

## 9. Monitoring

**Applies in a light form.** There is no server to emit JSON logs or request ids.

**In place**

- Dev-only `console.warn` when Supabase env vars are missing (`src/lib/supabase.ts`).
- Netlify keeps deploy logs outside the repo. Nothing in the app reports errors or vitals.

**Gaps**

- No Sentry (or equivalent) on the form failure path.
- No uptime check on `https://chefgaapos.netlify.app/`.
- No Core Web Vitals. The likely LCP is `/hero-product.png`; INP risk is the hardware canvas and Sketchfab embeds.
- No metrics for insert failures. A broken anon key looks like a generic form error to the user and is invisible to the team.
- Structured logging and correlation ids do not apply until a function exists.

**Fixes**

- **High.** Uptime check on the marketing URL, and an error report when the demo insert returns an error (no PII in the event: no name, email, phone, or message).
- **Medium.** Send LCP, CLS, and INP (for example `web-vitals`) for `/` and `/hardware`.
- **Low.** Add JSON logs and a request id only inside a future function. Alerting on a queue depth does not apply.

## What not to build

Skip for this codebase until a backend exists: multi-instance services, `/health` and `/ready`, sticky-session design, Redis, job queues, connection pools, cursor pagination, and in-process graceful shutdown. The useful work is headers and cache rules, the media files the pages already reference, tighter rules and abuse controls on `demo_requests`, and basic uptime plus error reporting.
