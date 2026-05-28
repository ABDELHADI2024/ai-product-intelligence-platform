# ProductIntel — AI Product Intelligence Platform MVP

AI-powered product discovery, comparison, and recommendations platform built with Next.js.

## Tech Stack

- **Next.js 16** — App Router, Server Components, SSG + Dynamic routes
- **React 19** — Server and Client Components
- **TypeScript** — Full type safety
- **Tailwind CSS v4** — Dark-first premium UI
- **Supabase** — Optional database integration

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Embedding Endpoint (Internal/Admin)

> **⚠️ OpenAI embeddings are not approved for Witflag.** The embedding endpoint exists but requires a provider swap to Gemini before use.

`POST /api/intelligence/embed-products` — Protected product embedding endpoint.

- **Dry-run by default** — set `dryRun: false` in the request body to generate embeddings
- **Writes blocked** — requires `ENABLE_EMBEDDING_WRITES=true` env var + manual SQL application
- **Cost guarded** — rejects requests exceeding $1/month budget
- **No automatic embedding** — never runs on build, page load, or automatic triggers
- **Auth required before production** — `EMBEDDING_ADMIN_SECRET` env var + `x-witflag-admin-secret` header

### Request Body

```json
{
  "dryRun": true,
  "limit": 10,
  "slugs": ["samsung-galaxy-s25-ultra"],
  "write": false
}
```

## Build

```bash
npm run build
npm run start
```

## Routes

| Route | Description |
|---|---|
| `/` | Homepage with hero, metrics, featured product, top picks, capabilities |
| `/products` | Browse + search/filter products |
| `/products/[slug]` | Product detail pages (SSG — 311 pre-rendered slugs) |
| `/smartphones` | Dedicated smartphone category listing with AI-powered scoring |
| `/foldable` | Dedicated foldable smartphone category listing |
| `/compare` | Side-by-side comparison of top 3 products |
| `/smart-search` | Natural language product search via intelligence API |
| `/assistant` | Conversational product recommendation assistant |
| `/about` | About the ProductIntel platform |
| `/guides` | Buying guides (coming soon) |
| `/robots.txt` | Robots directives |
| `/sitemap.xml` | XML sitemap (dynamic) |

## Environment Variables

All optional — the app works with fallback data without any config.

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
EMBEDDING_ADMIN_SECRET=your-admin-secret
ENABLE_EMBEDDING_WRITES=false
```

> OpenAI embeddings (`OPENAI_API_KEY`, `EMBEDDING_MODEL`) are **not approved** for Witflag. The existing embedding utility at `src/lib/embedding.ts` uses OpenAI — this code is deprecated and must be rewritten for Gemini before any embedding generation is resumed.

## Vercel Deployment

1. Connect your GitHub repository to Vercel.
2. Add the following environment variables in Vercel Project Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL` — Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Your Supabase anon key
   - `NEXT_PUBLIC_SITE_URL` — Your production domain (e.g. `https://productintel.vercel.app`)
   - `EMBEDDING_ADMIN_SECRET` — Admin secret for the protected embedding endpoint
   - `ENABLE_EMBEDDING_WRITES` — Set to `false`
3. Deploy. No build command or output directory changes needed.

No `OPENAI_API_KEY` is required. OpenAI embeddings are not approved for Witflag.

**Current v1 scope:** Smartphones and foldable smartphones only. No laptops, tablets, smartwatches, earbuds, or other categories.

## Project Structure

```
src/
  app/             — App Router pages and API routes
  components/      — Reusable UI components
  lib/             — Types, data layer, intelligence engine, fallback data
```

See `PROJECT_MAP.md` for full architecture documentation.
