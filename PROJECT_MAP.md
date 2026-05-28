# PROJECT MAP — ProductIntel MVP

## [TECH_STACK]

| Component | Version |
|---|---|
| Next.js | 16.2.6 |
| React | 19.2.4 |
| TypeScript | ^5 |
| Tailwind CSS | ^4 |
| Supabase | ^2.106.1 |

## [CURRENT ROUTES]

| Route | Type | Description |
|---|---|---|---|---|
| `/` | Static | Homepage — hero with "AI smartphone intelligence" badge, platform metrics, featured product, start-by-your-need guide cards, top picks, comparison preview, CTA |
| `/smartphones` | Static | Dedicated smartphone category listing with AI-powered scoring |
| `/foldable` | Static | Dedicated foldable smartphone category listing |
| `/products` | Dynamic | Product listing — search by `?q=`, filter by `?category=` |
| `/products/[slug]` | SSG | Product detail — scores, specs, pros/cons, recommendation summary |
| `/products` (loading) | Loading | Skeleton grid with card placeholders during page load |
| `/compare` | Static | Side-by-side comparison of top 3 products by overall score |
| `/smart-search` | Static | Natural language search via internal intelligence API |
| `/assistant` | Static | Conversational product recommendation assistant |
| `/about` | Static | About Witflag ProductIntel platform |
| `/guides` | Static | Buying guides placeholder (coming soon) |
| `/not-found` | Static | Branded 404 page with nav links to home, products, smartphones, foldable |
| `/error` | Client | Branded error page with "Try again" reset button and "Back to Home" link |
| `/robots.txt` | Static | Allows all crawlers, disallows /api/, points to sitemap |
| `/sitemap.xml` | Static | 13+311 entries — all routes + all product slugs |
| `/api/intelligence/product-profile` | Dynamic | Enriched product profile with summaries, quality score, and RAG-ready document |
| `/api/intelligence/enrichment-batch` | Dynamic | Batch enrichment of all products — intelligence rows + document rows (read-only) |
| `/api/intelligence/embed-products` | Dynamic (POST) | ⚠️ **Deprecated** — Protected embedding endpoint using OpenAI. Requires Gemini provider swap before use. Admin secret guard preserved. |

## [SYSTEM_FLOW]

```
Homepage
  ├── Hero → Browse Products → /products
  ├── Hero → Compare Devices → /compare
  ├── Hero Search → /smart-search
  ├── Platform Metrics (live count from DB)
  ├── Featured Product → /products/[slug] (top product)
  ├── Start by Your Need (4 guide cards) → /smart-search, /products
  ├── Top Picks → 3 interactive ProductCards → /products/[slug]
  ├── Comparison Preview → /compare
  └── CTA → /products

/smartphones
  ├── getAllProducts() → filter by category "smartphones"
  └── rankByIntent("best-overall") → ProductCard → /products/[slug]

/foldable
  ├── getAllProducts() → filter by category "foldable"
  └── rankByIntent("best-foldable") → ProductCard → /products/[slug]

/products
  ├── Search (`?q=`) → server-side filter by name, brand, category, description
  ├── Category chips (`?category=`) → server-side filter
  ├── Combined: `?q=iphone&category=smartphones`
  └── ProductCard (brand, name, image, description, score bars, price) → /products/[slug]

/products/[slug]
  ├── Breadcrumb → Home > Products > Name
  ├── Hero → name, brand, category, price (or "Price N/A"), overall score ring
  ├── generateMetadata → canonical URL, OG image (if valid), Twitter card, dynamic title + description
  ├── Score breakdown → bars for gaming/camera/battery/display/value
  ├── Pros & Cons
  ├── Key Specifications
  ├── Recommendation summary
  └── CTA → Back to Products, Compare Products

/compare
  └── getAllProducts() → getTopByIntent("best-overall", 3) → 3 columns with score bars, best-for tag, description

/smart-search
  ├── Premium hero section (bg-grid, gradient overlay, blur accents, badge, h1)
  └── Search input → GET /api/intelligence/search?q=... → parseIntent → rankByIntent → ranked results with scores, reason, price

/assistant
  ├── Premium hero section (bg-grid, gradient overlay, blur accents, badge, h1)
  └── Chat interface → GET /api/intelligence/search?q=... → top 3 recommendations per message

  Product Intelligence Utilities (Phase 17-B + 17-C + 17-E + 18-B + 18-D + 18-E)
  ├── src/lib/product-document.ts → buildProductDocument(product) → clean plain text for RAG
  ├── src/lib/data-quality.ts → evaluateProductDataQuality(product) → completeness score + missing fields
  ├── src/lib/score-summaries.ts → buildScoreSummaries(product) → per-dimension explanations
  ├── src/lib/product-enrichment.ts → buildProductEnrichmentProfile(product) → product_summary, buying_verdict, best_for, not_best_for, strengths, weaknesses, ai_tags, use_cases, buyer_persona, data_quality
  ├── src/lib/product-chunker.ts → chunkProductDocument(text, product) → ProductDocumentChunk[] with metadata
  ├── src/lib/enrichment-batch.ts → buildBatchEnrichment(products) → intelligence_rows + document_rows (with chunks) for all products
  ├── src/lib/embedding.ts → generateEmbedding(text) / generateBatchEmbeddings(texts[]) → number[] / number[][] (server-only, cost-budgeted, no writes)
  ├── /api/intelligence/product-profile?slug=... → combines all above → enriched product profile
  ├── /api/intelligence/enrichment-batch?limit=... → batch enrichment of all products (read-only)
  └── /api/intelligence/embed-products (POST) → protected embedding endpoint, dry-run by default, writes blocked

  Future RAG (⏸ Paused — OpenAI blocked, awaiting Gemini lab evaluation in Phase 18-M1)
  ├── supabase/product-intelligence-schema.sql — SQL draft with product_documents table + VECTOR(1536)
  ├── Embedding: src/lib/embedding.ts — ⚠️ **Deprecated** (OpenAI text-embedding-3-small, 1536d). Must be rewritten for Gemini before use.
  ├── Chunking: 1 chunk per product (v1), optional spec-boundary splitting (v2)
  ├── Storage: product_documents table with metadata JSONB + ivfflat index (SQL not applied)
  ├── Protected endpoint: POST /api/intelligence/embed-products — ⚠️ **Deprecated** (requires Gemini provider swap)
  ├── Future APIs: /rag-search, /ai-answer
  └── Security: 10 safeguard rules (no client-side keys, batch limits, cost budget, dry-run required) — preserved for future provider

 SEO
  ├── layout.tsx → metadataBase, title template, OG, Twitter
  ├── robots.ts → Allow all, sitemap link
  ├── sitemap.ts → Dynamic URLs with priorities + changeFrequency
  ├── page.tsx → WebSite + SearchAction JSON-LD
  └── /products/[slug] → Product JSON-LD with brand, category, offer
```

## [DATA_FLOW]

```
getTopProducts(limit=6)
  ├── Supabase client exists → fetch "products" → order by global_score → limit → normalize → return
  └── No Supabase / error → sort fallbackProducts by overall → slice(limit) → return

getAllProducts()
  ├── Supabase client exists → fetch "products" → order by global_score → normalize → return
  └── No Supabase / error → return fallbackProducts

getProductBySlug(slug)
  ├── Supabase client exists → fetch "products" where slug = slug → maybeSingle → normalize → return
  └── No Supabase / error → fallbackProducts.find(slug) → return or null
```

**Normalization** — `normalizeProduct()` maps Supabase `snake_case` columns to the `Product` interface. Image maps from 5 column names: `image`, `images`, `image_url`, `product_image`, `main_image`. Returns `null` for invalid rows.

**Fallback guarantee** — All three functions silently degrade to hardcoded data on:
- Missing env variables
- Network errors
- Empty result sets
- Any exception in the fetch path

## [COMPONENTS]

| Component | Location | Purpose |
|---|---|---|
| `Header` | `src/components/Header.tsx` | Sticky dark header with logo, "Live" badge, nav links (Home, Products, Compare, Smart Search, Assistant), search button (links to /products), AI sparkle button (links to /assistant), mobile hamburger |
| `Footer` | `src/components/Footer.tsx` | 4-column footer (Products, Compare, Resources, Company) with social icons, AI badge |
| `ProductCard` | `src/components/ProductCard.tsx` | Card with brand, name, score ring, product image (with fallback to placeholder), description, score bars (or "N/A" for missing/zero sub-scores), price (or "Price N/A"), "TOP PICK" ribbon for ≥95 |
| `TopPicks` | `src/components/TopPicks.tsx` | Section header + 6 ProductCards sorted by overall score |
| `BentoGrid` | `src/components/BentoGrid.tsx` | 6-card capabilities grid (AI Search, Smart Comparisons, Score Engine, Buying Guides, Price Intelligence, AI Assistant) |
| `SmartSearchClient` | `src/components/SmartSearchClient.tsx` | Search interface with example chips, result cards, score bars, price display |
| `ProductAssistantClient` | `src/components/ProductAssistantClient.tsx` | Chat-style assistant with greeting, example chips, top-3 recommendation cards, intent badges |

## [ENVIRONMENT]

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | No | Supabase project URL (app works without it) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Supabase anon key (app works without it) |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site URL for SEO metadata + sitemap; defaults to `http://localhost:3000` |
| `EMBEDDING_ADMIN_SECRET` | No* | Admin secret for embedding endpoint protection |
| `ENABLE_EMBEDDING_WRITES` | No | Must be `"false"` — writes permanently blocked for v1 |

\* Required in production to use the embedding endpoint.

> **OpenAI not approved.** `OPENAI_API_KEY`, `EMBEDDING_MODEL`, `EMBEDDING_BATCH_LIMIT` are deprecated. See Phase 18-M0.

## [VERIFIABLE GOALS]

- [x] `npm run build` passes with zero errors, zero warnings
- [x] Homepage renders with hero, platform metrics, featured product, start-by-your-need, top picks, comparison preview, capabilities, CTA
- [x] `/products` supports search (`?q=`) and category filter (`?category=`) independently and combined
- [x] `/compare` renders top 3 products by overall score with score bars and best-for tag
- [x] Product detail pages generate at build time for all slugs (304 from Supabase / 7 from fallback)
- [x] Product detail pages have canonical URLs, OG images (when available), and Twitter card metadata
- [x] `/smartphones` renders dedicated smartphone listing with category filter
- [x] `/foldable` renders dedicated foldable smartphone listing
- [x] `/smart-search` works with natural language queries via internal intelligence API
- [x] `/assistant` provides conversational product recommendations
- [x] `/robots.txt` returns valid robots directives
- [x] `/sitemap.xml` returns dynamic URLs with priorities and change frequencies
- [x] SEO metadata: title template, OG, Twitter cards present on all pages
- [x] JSON-LD: WebSite + SearchAction on homepage, Product schema on detail pages
- [x] Responsive dark-first UI at mobile, tablet, desktop breakpoints
- [x] Supabase integration optional — full functionality with only fallback data
- [x] `not-found.tsx` renders branded 404 page with nav links to home/products/smartphones/foldable
- [x] `error.tsx` renders branded error page with "Try again" reset + "Back to Home" link
- [x] `products/loading.tsx` renders skeleton card grid with shimmer animation during page load
- [x] All secondary pages (smart-search, assistant, compare, loading) match the premium dark/glass homepage style
- [x] Assistant welcome message only mentions v1 scope (smartphones + foldable)

## [ORPHANS & PENDING]

| Item | Priority | Notes |
|---|---|---|---|---|
| Real product images | Medium | Placeholder SVGs still used; ProductCard now displays `product.image` — real images populate once Supabase provides them via `image_url`/`product_image`/`main_image` |
| `/categories` route | Low | Referenced in old nav but replaced by /smartphones and /foldable |
| OG images on product detail pages | Medium | Social sharing uses generic fallback; needs per-product OG images |
| Twitter card overrides per page | Low | All pages rely on layout.tsx defaults |
| Breadcrumb JSON-LD | Low | No structured data breadcrumb on product detail pages |
| Category JSON-LD | Low | No structured data on /smartphones or /foldable |
| 3 `<img>` lint warnings | Low | Pre-existing; using `next/image` requires Supabase URL config changes |
| Phase 17-D schema design | Done | `product_intelligence` and `product_documents` table schemas designed; no SQL created yet |
| Product data quality for AI enrichment | Medium | All 7 fallback products lack real images, AI summaries, buying verdicts; Phase 17-B created quality-scoring utility to identify gaps |
| Enrichment fields not persisted | Low | Phase 17-C enriches on every API call; Phase 17-D designed `product_intelligence` schema for persistence |
| No RAG infrastructure | Low | Phase 17-D designed `product_documents` schema; Phase 17-E built batch enrichment generator; full RAG blocked on embedding provider decision |
| Enrichment not persisted to Supabase | Low | Phase 17-F created SQL draft; next step is Phase 18 (RAG) |
| SQL draft not applied | Low | `supabase/product-intelligence-schema.sql` exists but is not migrated — requires pgvector approval |
| RAG chunker ready | Low | Phase 18-B created chunker + finalized SQL |
| Embedding safety gate | Done | Phase 18-C defined 10 safety rules, Phase 18-E scope (protected endpoint) |
| Embedding utility created | Done — 🚫 Deprecated | Phase 18-D created src/lib/embedding.ts — OpenAI path. Must be rewritten for Gemini. |
| Embedding endpoint created | Done — 🚫 Deprecated | Phase 18-E created POST /api/intelligence/embed-products — requires Gemini provider swap. |
| No Supabase write for embeddings | Low | Blocked in phase 18-E; requires SQL application + ENABLE_EMBEDDING_WRITES=true |
| Embeddings never generated | Low | Only generated on explicit POST with dryRun:false; never on build or page load |
| OpenAI not approved | Decision | Phase 18-M0: Gemini is preferred future lab provider. If Gemini fails, embeddings pause. |
| Non-functional compare search input | Resolved | Removed in Phase 15-D (was placeholder-only, no action) |
| Assistant welcome text out of scope | Resolved | Fixed in Phase 15-D — now mentions only smartphones + foldable |
| Loading skeleton no animation | Resolved | Added shimmer-sweep animation in Phase 15-D |
| Smart-search / assistant missing hero | Resolved | Premium hero sections added in Phase 15-D |
