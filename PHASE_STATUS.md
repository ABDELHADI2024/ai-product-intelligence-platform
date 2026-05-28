# Phase Status

> Project: AI Product Intelligence Platform  
> Scope: Smartphones and foldable smartphones (v1)  
> Stack: Next.js 16 + Tailwind CSS v4 + Supabase  
> Last updated: 2026-05-25

---

## Current Active Phase

### Phase 18-M0 — Embedding Provider Strategy Update

**Goal:** Update project documentation to reflect the CTO/user decision that OpenAI embeddings are no longer approved for Witflag. No app code changes.

**Entry criteria:**
- [x] OpenAI previously approved as default embedding provider
- [x] CTO decision to block OpenAI and prefer Gemini
- [x] Build passes with 0 errors, 314 routes

**Exit criteria:**
- [x] OpenAI removed as required/approved embedding provider across all docs
- [x] Gemini documented as preferred future lab provider
- [x] If Gemini fails, embeddings pause instead of falling back to OpenAI
- [x] Deploy env vars updated (no OPENAI_API_KEY required)
- [x] No app code changed
- [x] Build verified — 0 errors, 0 warnings, 314 routes

---

## Completed Phases

| Phase | Description | Status |
|---|---|---|---|---|
| 1 | Fresh Next.js MVP base | ✅ Complete |
| 2 | Supabase + fallback data layer | ✅ Complete |
| 3 | /products listing page | ✅ Complete |
| 4 | /compare page | ✅ Complete |
| 5 | /products/[slug] detail pages | ✅ Complete |
| 6 | Basic search/filter | ✅ Complete |
| 7 | SEO foundation | ✅ Complete |
| 8 | Documentation | ✅ Complete |
| 8.5 | Real Supabase validation | ✅ Complete |
| 9A | Internal intelligence API | ✅ Complete |
| 9B | Smart Search UI | ✅ Complete |
| 9C | Assistant UI | ✅ Complete |
| 9D | Assistant cleanup | ✅ Complete |
| 10 | Homepage design | ✅ Complete |
| 10.6 | HOMEPAGE_REFERENCE_SPEC.md | ✅ Complete |
| 10.7 | Homepage spec audit | ✅ Complete |
| 10.7.5 | Reference-based homepage alignment | ✅ Complete |
| 10.9 | Pixel-close homepage UI correction | ✅ Complete |
| 10.9-A | Ultra-pro Top Picks correction | ✅ Complete |
| 10.9-B | Ultra-premium Top Picks refinement | ✅ Complete |
| 10.9-C | Premium tall showcase Top Picks | ✅ Complete |
| 10.9-D | Interactive Top Picks module | ✅ Complete |
| 10.9-E | Hero featured card integration | ✅ Complete |
| 10.9-F | Old repo reference audit | ✅ Complete |
| 10.8 | UI image match review | ✅ Complete |
| 10.8-B | Spec sync after approval | ✅ Complete |
| 11-A | Category Foundation Audit | ✅ Complete |
| 11-B | Category Foundation Cleanup | ✅ Complete |
| 11-C | Dedicated category pages | ✅ Complete |
| 11-D | Category Pages QA + Doc Sync | ✅ Complete |
| 11-E | Navigation + Mobile Verification | ✅ Complete |
| 12-A | Ranking Engine Audit | ✅ Complete |
| 12-B | Weighted Ranking Utility | ✅ Complete |
| 12-C | Wire ranking into category pages | ✅ Complete |
| 12-D | Wire ranking into compare page | ✅ Complete |
| 12-E | Wire ranking into TopPicks | ✅ Complete |
| 12-F | Wire ranking into smart-search / assistant | ✅ Complete |
| 13-B1 | Supabase normalization | ✅ Complete |
| 13-B2 | ProductCard image display | ✅ Complete |
| 13-B3 | Price label consistency | ✅ Complete |
| 13-B4 | Score fallback labels | ✅ Complete |
| 13-B5 | Overall score guard | ✅ Complete |
| 14-A | SEO / Route / Metadata Audit | ✅ Complete |
| 14-B | SEO Foundation Fixes | ✅ Complete |
| 14-C | Product Detail SEO Enhancement | ✅ Complete |
| 15-A | Launch Cleanup Audit | ✅ Complete |
| 15-B | Launch Cleanup Implementation | ✅ Complete |
| 15-C | UI Sophistication Audit | ✅ Complete |
| 15-D | UI Polish Before Deploy | ✅ Complete |
| 15-G | Final Local Product/Data/UI Polish Before Deploy | ✅ Complete |
| 15-G1 | Final Tiny Cleanup (TopPicks Score Guard) | ✅ Complete |
| 18-M0 | Embedding Provider Strategy Update | ✅ Complete |
| 18-D | Server-Only OpenAI Embedding Utility | ✅ Complete — 🚫 Deprecated (OpenAI blocked) |
| 18-E | Protected Product Embedding Endpoint | ✅ Complete — 🚫 Deprecated (requires Gemini swap) |
| 18-F1 | Protect Embedding Endpoint Before Deploy | ✅ Complete — 🚫 Deprecated (admin secret preserved) |
| 18-F3 | Static Embedding Endpoint Safety Verification | ✅ Complete — 🚫 Deprecated (safety rules preserved) |
| 17-A | AI Data Cleaning Audit | ✅ Complete |
| 17-B | Data Cleaning Utilities & Product Document Builder | ✅ Complete |
| 17-C | AI Data Enrichment Utilities | ✅ Complete |
| 17-D | AI Enrichment Persistence / Supabase Schema Plan | ✅ Complete |
| 17-E | Local Batch Enrichment Generator | ✅ Complete |
| 17-F | Supabase Enrichment Schema SQL Draft | ✅ Complete |
| 18-A | RAG Architecture & Embedding Provider Decision | ✅ Complete |
| 18-B | SQL Finalization + Product Document Chunker | ✅ Complete |
| 18-C | Embedding Implementation Safety Gate | ✅ Complete |
|    |    |    |
   
---

## Pending Phases

| Phase | Description | Priority | Dependencies |
|---|---|---|---|---|
| 10.9-F (re-run) | Old repo reference audit (if old repo path is provided) | Low | Old repo access |
| 16 | Final Vercel deploy | Final | All above |
| 18-M1 | Gemini embedding lab evaluation | Medium | Phase 18-M0 |

---

## Build Status

| Check | Result |
|---|---|---|
| `npm run build` | ✅ 0 errors, 0 warnings, 314 routes |
| SQL applied | ❌ No — ready for manual execution |
| `npm run lint` | ✅ 0 errors, 6 warnings |
| TypeScript | ✅ Strict, no errors |
| Static pages | ✅ 311/311 generated |
| Supabase integration | ✅ Optional; works with or without env vars |
| Fallback data | ✅ 7 hardcoded v1 products (4 smartphones + 3 foldable) |
| Embedding utility | ✅ Created — 🚫 Deprecated (OpenAI path, must be rewritten for Gemini) |
| Embedding endpoint | ✅ Created — 🚫 Deprecated (requires provider swap to Gemini) |
| Admin secret guard | ✅ Preserved for future provider |
| Safety rules | ✅ Preserved for future provider |
| Embedding/RAG status | ⏸ Paused — awaiting Phase 18-M1 (Gemini lab evaluation) |

---

## Current v1 Scope

- **Smartphones and foldable smartphones only**
- No laptops, tablets, smartwatches, earbuds, AI devices, or other categories
- Any future category expansion requires explicit scoping in a new phase

## Deferred / Blocked Phases

| Phase | Reason | Status |
|---|---|---|
| 10.9-F (re-run) | Old repo not found at `_reference_old_repo`; provide correct path to re-run | ⏸ Blocked |

## Reminder

**Vercel deploy is the final phase (Phase 16).** Do not deploy before all preceding phases (11–15) are complete and approved.

---

## Key Architectural Decisions

1. **Supabase optionality** — All three data functions (`getTopProducts`, `getAllProducts`, `getProductBySlug`) silently fall back to hardcoded data if Supabase env vars are missing or the query fails.
2. **SSG for product detail** — 300+ product slugs are pre-rendered at build time via `generateStaticParams`.
3. **No external AI** — The intelligence API uses local string matching and scoring, not OpenAI or any external service.
4. **Tailwind CSS v4** — No custom CSS framework; all styling via Tailwind utility classes and a small set of custom CSS classes in globals.css (bg-grid, bg-stars, bg-glow-radial, animation keyframes).
5. **Price display** — `$0` is never shown; "Price N/A" is used when price is missing/zero.
6. **OpenAI embeddings not approved** — OpenAI embedding code exists but is deprecated. Gemini/Google AI Studio is the preferred future lab path. If Gemini fails, embeddings pause.

---

## Environment Variables

### Deploy (required for production)

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | No | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Supabase anonymous key |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical URL for SEO |
| `EMBEDDING_ADMIN_SECRET` | No* | Admin secret for embedding endpoint protection; checked via `x-witflag-admin-secret` header |
| `ENABLE_EMBEDDING_WRITES` | No | Must be `"false"` — writes permanently blocked for v1 |

\* Required in production to use the embedding endpoint.

### Future Gemini Lab Embedding (Phase 18-M1+)

| Variable | Purpose |
|---|---|
| `GEMINI_API_KEY` | Gemini API key for embedding generation (server-only) |
| `EMBEDDING_PROVIDER=gemini` | Provider selection |
| `EMBEDDING_DIMENSIONS=1536` | Embedding vector dimensions |
| `ENABLE_EMBEDDING_WRITES=false` | Writes blocked for lab testing |

### Deprecated — Not Approved

| Variable | Reason |
|---|---|
| `OPENAI_API_KEY` | ❌ OpenAI blocked per Phase 18-M0 |
| `EMBEDDING_MODEL` | ❌ Defaulted to `text-embedding-3-small` — replaced by Gemini |
| `EMBEDDING_BATCH_LIMIT` | ❌ Applies to old OpenAI provider; needs re-evaluation for Gemini |

---

## Route Map

| Route | Type | Status |
|---|---|---|---|---|
| `/` | Static | ✅ |
| `/smartphones` | Static | ✅ |
| `/foldable` | Static | ✅ |
| `/products` | Dynamic | ✅ |
| `/products/[slug]` | SSG (304+7) | ✅ |
| `/products/loading` | Loading | ✅ |
| `/compare` | Static | ✅ |
| `/smart-search` | Static | ✅ |
| `/assistant` | Static | ✅ |
| `/about` | Static | ✅ |
| `/guides` | Static | ✅ |
| `/not-found` | Static | ✅ |
| `/error` | Client | ✅ |
| `/robots.txt` | Static | ✅ |
| `/sitemap.xml` | Static | ✅ |
| `/api/intelligence/search` | Dynamic | ✅ |
| `/api/intelligence/product-profile` | Dynamic | ✅ |
| `/api/intelligence/enrichment-batch` | Dynamic | ✅ |
| `/api/intelligence/embed-products` | Dynamic (POST) | ✅ (admin secret guard, dry-run default, writes blocked) |
