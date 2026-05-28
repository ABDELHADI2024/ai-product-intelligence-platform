# Homepage Reference UI Specification

> **Target:** Premium AI-powered product intelligence platform  
> **Stack:** Next.js 16 + Tailwind CSS v4 + Supabase  
> **Style:** Dark SaaS, glassmorphism, cyan/purple accents  
> **Version:** Phase 10.8-B — Approved spec (post-screenshot review sync)

---

## 1. Visual Mood

Premium, authoritative, futuristic. Dark observatory / mission control feel. Glass, glow, precision.

---

## 2. Color System

### Background
- Page: layered radial + linear gradients:
  ```
  radial-gradient(circle at 18% 10%, rgba(6,182,212,0.10), transparent 28%),
  radial-gradient(circle at 78% 12%, rgba(124,58,237,0.16), transparent 30%),
  linear-gradient(180deg, #020617 0%, #02040a 45%, #030712 100%)
  ```
- Card base: `rgba(15, 23, 42, 0.58)` = Tailwind `bg-slate-950/55`
- Card hover: brighter border, subtle glow shadow

### Accents
- Cyan-400 (`#22d3ee`): score rings >=90, link text, icon accents
- Cyan-500 (`#06b6d4`): glow elements, gradient partners
- Purple-500 (`#8b5cf6`): featured card glow, background accent
- Blue-400 (`#60a5fa`): score rings 80–89, brand badges
- Blue-500 (`#3b82f6`): logo gradient partner

### Text
- Primary: `#fafafa` (white)
- Secondary: `#a1a1aa` (zinc-400), `#d4d4d8/90` (zinc-300/90)
- Muted: `#71717a` (zinc-500)
- Dim: `#52525b` (zinc-600)

### Glass
- `rgba(15, 23, 42, 0.58)` glass panels
- `1px solid rgba(148, 163, 184, 0.14)` borders
- `backdrop-filter: blur(22px)`
- Box shadow: `0 18px 60px rgba(0,0,0,0.35)`, `inset 0 1px 0 rgba(255,255,255,0.05)`

---

## 3. Header — Exact Spec

### Container
- `max-w-[1160px] mx-auto mt-3`
- `h-14 sm:h-[56px]`
- `px-6`
- `rounded-[16px]`
- `bg-slate-950/60 border border-white/[0.10] backdrop-blur-2xl`
- `flex items-center justify-between`

### Logo
- Gradient icon: `bg-gradient-to-br from-blue-500 to-purple-600`, `size-8`, `rounded-lg`
- Text: "WITFLAG", `text-base font-bold uppercase tracking-tight`
- Gap: `gap-[10px]`

### Nav
- 4 links: Products (`/products`), Compare (`/compare`), Guides (`/smart-search`), About (`/about`)
- `hidden md:flex`, `gap-[34px]`
- `text-[13px] font-semibold text-white/90`
- No route creation — uses existing safe routes

### Search
- `hidden sm:flex`
- `h-[34px] w-[280px]`
- `rounded-full border border-white/[0.08] bg-white/[0.06]`
- Search icon, input with placeholder "Search smartphones...", ⌘K chip
- ⌘K chip: `rounded-md bg-white/[0.08] px-2 text-[11px] text-zinc-500`
- Enter navigates to `/products?q=...`

### Right icon button
- `size-[34px] rounded-full border border-white/[0.10]`
- Settings/cog icon
- `hover:bg-white/5 hover:text-white`

### Mobile
- Hamburger: `md:hidden`, `size-[34px] rounded-full`
- Dropdown: `border-t border-white/10 bg-black`

---

## 4. Hero — Exact Spec

### Container
- `max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8`
- `pt-7 sm:pt-8`
- Grid: `grid items-center gap-10 lg:grid-cols-[0.86fr_1.14fr]`

### Badge
- "AI smartphone intelligence" with sparkle icon
- `h-8 rounded-full border px-4 text-sm`
- Cyan-400 text on cyan-500/10 bg with cyan-500/20 border (always, no conditional)

### Headline
```
AI-powered
smartphone
intelligence
```
- `text-[54px] md:text-[60px] lg:text-[64px]`
- `font-extrabold leading-[0.96] tracking-tight`
- "intelligence": `bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent`

### Subtitle
- `max-w-[430px] text-[15px] leading-6 text-zinc-300/90`
- "We score, rank, and compare smartphones using real product data — so you can buy with confidence."

### Metrics Strip
- `h-12 rounded-xl border border-white/[0.08] bg-slate-950/55`
- `flex`, 4 cells with `border-l border-white/[0.07]` dividers
- Values: `{productCount}+` Products, "6" Decision signals, "Data-ready" Updates, "Real" Product data
- Number: `text-sm font-bold text-cyan-400`
- Label: `text-[11px] text-zinc-400`

### CTA Row
- `mt-4 flex flex-wrap gap-3`
- Primary: `h-[42px] rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 px-6 text-sm font-semibold text-white shadow-[0_0_28px_rgba(34,211,238,0.35)]`
- Secondary: `h-[42px] rounded-lg border border-white/[0.10] bg-white/[0.04] px-6 text-sm font-semibold text-white`

---

## 5. Featured Product Card — Phase 10.9-E Exact Spec

### Card Container
- Inline style: `linear-gradient(135deg, #0f1a2e 0%, #0d1625 40%, #0a1020 100%)`
- `rounded-[26px] p-7 sm:p-8`
- `min-height: 330px`
- Border: `1px solid rgba(148,163,184,0.14)`
- Shadow: `0 24px 80px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.06)`
- Hover: `0_24px_80px_rgba(0,0,0,0.42), 0_0_0_1px_rgba(34,211,238,0.16)`

### Top Shimmer Line
- `absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-purple-500/40`

### Layout
- `flex gap-6`
- Left: text column (FEATURED badge, brand, name, stars, description, price, View Details)
- Right: phone visual + score ring (hidden on mobile: `hidden sm:block w-[210px]`)

### Left Text Column
- FEATURED badge: `rounded-full border border-white/[0.08] bg-white/[0.08] px-3 py-1 text-[11px] uppercase tracking-wider`
- Brand: `text-sm text-cyan-400`
- Name: `text-[25px] font-bold leading-[1.08]`
- Stars: 5 amber star SVGs + "4.8"
- Description: `max-w-[250px] text-[13px] leading-5 text-zinc-300/80 line-clamp-2`
- Price: `safePrice()` helper — formats USD or shows "Price N/A" (never shows $0)
- View Details button: `h-[38px] rounded-lg border border-white/[0.10] bg-white/[0.06] px-4 text-sm`

### Phone Visual (Right)
- When real image URL available (checked via `getProductImage` helper):
  - Image `h-[185px] object-contain` with drop-shadow
  - Purple glowing oval pedestal (outer: 180px blur, inner: 130px)
- When no image (CSS phone mockup fallback):
  - Purple glowing pedestal (same as real image)
  - Phone front: `h-[175px] w-[94px] rounded-[18px]` dark gradient body, screen glow gradient, notch
  - Phone back: same position, 3 camera circles (2 small + 1 large)
- **Score ring**: bottom-right, `absolute bottom-2 right-0 flex items-center gap-2`, ScoreRingBig (62px) + "Global Score" + rating text

### Helper Functions (local to page.tsx)

#### `getProductImage(product)`
- Checks `image_url`, `product_image`, `main_image`, `image` (in order)
- Returns URL string or `null`

#### `safePrice(price)`
- Handles `null`, `undefined`, `0`, `"$0"`, empty string, NaN
- Returns formatted USD string (e.g. `"$1,299"`) or `false`

### Featured Product Selection
- Uses `topProducts[0]` from existing data fetching
- No time-based auto-rotation in Phase 10.9-E

---

## 6. Feature Strip — Exact Spec

### Container
- `max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8`
- `mt-6 rounded-[20px] border border-white/[0.10] bg-slate-950/55 px-6 py-5 backdrop-blur-2xl`

### Grid Layout
- `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6`
- Each item: centered, `flex flex-col items-center text-center`
- Separators: `h-10 w-px bg-white/[0.08]` between items on desktop, hidden on mobile

### Items
| Icon | Label | Description | Color |
|------|-------|-------------|-------|
| ⚡ | Score-based intelligence | AI-powered multi-metric scoring | cyan-400 |
| 🔍 | Smart search | Natural language product queries | blue-400 |
| ↔️ | Product comparison | Side-by-side spec breakdown | cyan-400 |
| 📊 | Data-ready updates | Real product database | amber-400 |
| 🛡️ | Trusted insights | Objective data-driven rankings | rose-400 |
| 🌍 | International-ready platform | Global product coverage | violet-400 |

- Icon: `text-[28px]`
- Title: `text-sm font-semibold text-white`
- Description: `mt-0.5 max-w-[130px] text-xs leading-5 text-zinc-400`

---

## 7. Start-by-Your-Need Cards — Exact Spec

### Container
- `max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8`
- `mt-3 sm:mt-4`

### Header
- `flex items-end justify-between`
- Title: `text-[22px] font-bold text-white` — "Find your perfect phone"
- Subtitle: `text-sm text-zinc-400`
- Right link: `text-sm text-blue-300` "All Categories →"

### Card Grid
- `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3`
- Cards: `h-[130px] rounded-2xl border border-white/[0.09] bg-slate-950/55 p-4`
- Hover: `hover:border-white/20`

### Card Layout
- Left: icon circle (size-[38px] rounded-full gradient), title, desc, "Explore" link
- Right: `absolute right-0 top-0 h-full w-[44%]` gradient glow area + device visual block

### Card Data
| Card | Emoji | Icon Gradient | Glow |
|------|-------|--------------|------|
| Camera | 📷 | `from-cyan-500/20 to-blue-500/20` | cyan-500/15 |
| Battery | 🔋 | `from-green-500/20 to-cyan-500/20` | green-500/15 |
| Gaming | 🎮 | `from-purple-500/20 to-pink-500/20` | purple-500/15 |
| Value | 💰 | `from-amber-500/20 to-orange-500/20` | amber-500/15 |

---

## 8. Top Picks — Interactive Gold/Silver/Bronze Module (Phase 10.9-D)

### Component Type
- `"use client"` — interactive component with `useState` for selected index

### Container
- `mx-auto mt-6 w-full max-w-[1160px] px-4 sm:px-6 lg:px-8`

### Header
- `flex items-end justify-between gap-4`
- Title: `text-[22px] font-bold md:text-[26px]` — "Top picks for you" with SparkleIcon + "AI ranked live picks" micro badge (cyan pill with glow shadow)
- Subtitle: "Discover the highest scoring smartphones right now."
- Right link: `text-sm font-semibold text-blue-300` — "View all products →"

### Card Grid (3 cards only)
- `grid grid-cols-1 gap-4 md:grid-cols-3`
- Each card: `h-[360px] rounded-[22px] border bg-slate-950/60 p-5 backdrop-blur-2xl cursor-pointer`
- Active state: gold/blue/orange border + glow shadow + `-translate-y-1`
- Inactive state: `border-white/[0.08] opacity-75 hover:opacity-95`
- `role="button" tabIndex={0} aria-pressed` with keyboard Enter/Space support

### Rank Badge (top-left, 36px)
- `absolute left-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-extrabold shadow-lg`
- Rank 1: gold gradient (yellow-300→yellow-500→amber-700)
- Rank 2: blue/silver gradient (sky-300→blue-500→slate-700)
- Rank 3: orange/bronze gradient (orange-300→orange-600→amber-900)

### Medal Label (top-right)
- `absolute right-4 top-4 z-30 rounded-full border px-3 py-1 text-[10px] font-extrabold tracking-wide`
- Gold: "GOLD PICK" — yellow border/bg/text
- Silver: "SILVER PICK" — blue border/bg/text
- Bronze: "BRONZE PICK" — orange border/bg/text

### Phone Visual (CSS-only, 175px container)
- Back glow: 112px blur-3xl at score-tone color
- Platform ring: bottom-5, 128px wide, purple glow shadow
- Second ring: bottom-7, 96px wide, cyan border
- Phone body: `h-[145px] w-[78px] rounded-[15px] border border-white/20` with per-rank gradient theme
  - Gold: dark zinc gradient
  - Silver: dark neutral gradient
  - Bronze: teal-slate gradient
- Screen: `absolute inset-[4px] rounded-[11px]` with per-rank glow gradient, reflection, bottom fade
- Notch: top-center, 5px tall, 24px wide

### Text Content (bottom)
- Brand: `text-xs font-medium text-cyan-300`
- Product name: `line-clamp-1 text-base font-bold leading-tight text-white`
- Consumer reason: `text-xs text-zinc-400` — "Best balanced flagship" / "Top camera and performance" / "Best value performance"
- Price: `text-base font-extrabold text-white` or "Price N/A"
- Score badge: 36px gradient ring (ScoreBadge sm size) at bottom-right of text row
- "View details →" link: `text-[11px] font-medium text-cyan-400` with `e.stopPropagation()` — navigates to `/products/[slug]`

### Dynamic Panels (3 panels, lg:grid-cols-3 gap-4)

**1. Card Anatomy Panel** (updates on click):
- Mini card preview (140px, hidden on mobile) + 6 insight rows with colored dots:
  - Pick: Gold/Silver/Bronze + rank number
  - Global Score: score/100 + label
  - Best for: consumer-friendly reason
  - Why it ranks here: based on rank (top score / balanced / value)
  - Buyer caution: depends on price (premium / unavailable / check variants)
  - Data status: "Live Supabase product data + fallback-safe ranking."

**2. Score Color System Panel** (updates on click):
- Large 88px gradient score ring with glow shadow
- Score label: Excellent / Great / Good
- Product brand + name below
- Interpretation text (4 tiers based on score)
- 3-tier scale bar: 90-100 Excellent (emerald), 80-89 Great (amber), 70-79 Good (blue)

**3. AI Ranking Signals Panel** (updates on click):
- 6 signals with values derived from score + rank:
  - Performance = score, Camera = score + rankAdj, Battery = score - 2, Value = score + priceAdj, Display = score - 1, Software = score - 3
  - All values clampScore(60, 99) to prevent out-of-range values
- Each signal: colored dot, label, numeric value, progress bar (width: `${value}%`), consumer description
- Progress bar transitions: `transition-all duration-500`
- Signal colors: Performance (cyan), Camera (purple), Battery (emerald), Value (amber), Display (blue), Software (indigo)

### Interaction Model
- `selectedIndex` state, default 0 (Gold)
- Clicking a card calls `setSelectedIndex(index)` — updates all 3 panels instantly
- Non-selected cards maintain golden/blue/orange styling but at `opacity-75` with default border
- `aria-pressed` on active card for accessibility
- Link inside card uses `e.stopPropagation()` to prevent card's onClick from firing
- Data flow: `products.slice(0, 3)` → picks → selected = picks[selectedIndex] → panels

### Helper Functions
- `getScore(p)` → `Math.round(p.scores.overall)`
- `getBrand(p)` → `p.brand || "Smartphone"`
- `getName(p)` → `p.name || "Flagship phone"`
- `getSlug(p)` → `/products/${p.slug}`
- `getPrice(p)` → formatted currency or "Price N/A"
- `getImage(p)` → `p.image || null`
- `getScoreLabel(s)` → Excellent/Great/Good/Fair
- `clampScore(v, min=60, max=99)` → clamped integer
- `scoreTone(s)` → ring/text/glow/label config
- `medalFor(r)` → GOLD/SILVER/BRONZE config with colors
- `bestFor(r)` → consumer reason per rank
- `getSignals(p, r)` → 6 signal objects with derived values + descriptions

---

## 9. Lower Page Sections

Compact treatment:
- Comparison: compact row in glass panel, inline cards with score circles
- CTA: compact gradient glass row with single button
- Footer: single-line, max-w-[1160px], py-6, small text, inline links

No oversized sections. Page ends cleanly after CTA.

---

## 10. Spacing Guide

| Section | Top gap |
|---------|---------|
| Header margin | mt-3 |
| Hero top padding | pt-7 sm:pt-8 |
| Hero → Feature strip | mt-6 |
| Feature strip → Start by need | mt-3 sm:mt-4 |
| Start by need → Top picks | mt-6 |
| Top picks → Dynamic panels | mt-6 |
| Dynamic panels → Lower sections | mt-0 |
| Lower sections → Footer | mb-8 |

---

## 11. Helper CSS Classes (globals.css)

| Class | Definition |
|-------|-----------|
| `.glass-panel` | Background rgba(15,23,42,0.58), border rgba(148,163,184,0.14), blur(22px), shadow |
| `.hero-product-card` | Dual radial gradient, border, shadow, cyan inset glow |
| `.phone-platform` | Purple ring with glow shadow |

---

## 12. Implementation Checklist

- [x] Background: radial gradient system (cyan@18% + purple@78% + linear dark navy)
- [x] Header: WITFLAG logo, Products/Compare/Guides/About nav, rounded-full search, 34px settings button
- [x] Hero: 50/50 grid, badge, gradient headline, subtitle, metrics strip, stacked CTAs
- [x] Featured card: hero-product-card class, phone mockup (platform ring + front + back + cameras), score ring bottom-right
- [x] Feature strip: 6-col grid, emoji icons, labels, descriptions
- [x] Start by need: 4 compact cards, circular icons, right-side visual area
- [x] Top picks: Interactive 3-card Gold/Silver/Bronze module (360px tall, rounded-[22px]), click-to-select, medal labels, phone mockups (145×78px), View details links, accessibility
- [x] Dynamic panels: Card Anatomy + Score Color System + AI Ranking Signals (update on card click, progress bars with transitions, derived signal values)
- [x] Lower page: compact comparison row, compact CTA, minimal footer
- [x] Build: npm run build passes 0 errors, 307 routes
- [x] Phase 10.8 screenshot review approved — desktop (1440px), tablet (768px), mobile (375px)
- [x] Phase 10.8-B documentation sync — spec values aligned to approved implementation
