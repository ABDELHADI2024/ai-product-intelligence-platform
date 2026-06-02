import Link from "next/link"
import TopPicks from "@/components/TopPicks"
import HeroInteractive from "@/components/HeroInteractive"
import { getTopProducts } from "@/lib/supabase"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Witflag",
  url: siteUrl,
  description:
    "AI-powered product intelligence platform for discovering, comparing, and choosing smartphones.",
  potentialAction: {
    "@context": "https://schema.org",
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/products?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
}

function getProductImage(product: unknown): string | null {
  if (!product || typeof product !== "object") return null
  const p = product as { image_url?: string | null; product_image?: string | null; main_image?: string | null; image?: string | null }
  const image = p.image_url || p.product_image || p.main_image || p.image || null
  if (!image || typeof image !== "string") return null
  const t = image.trim()
  if (!t || t === "null" || t === "undefined" || t === "$0") return null
  return t
}

function safePrice(price: unknown): string {
  if (price === null || price === undefined) return "Price N/A"
  if (typeof price === "string") {
    const t = price.trim()
    if (!t || t === "$0" || t === "0") return "Price N/A"
    const p = Number(t.replace(/[$,]/g, ""))
    if (!Number.isFinite(p) || p <= 0) return "Price N/A"
    return `$${Math.round(p).toLocaleString("en-US")}`
  }
  if (typeof price === "number") {
    if (!Number.isFinite(price) || price <= 0) return "Price N/A"
    return `$${Math.round(price).toLocaleString("en-US")}`
  }
  return "Price N/A"
}

function ScoreRingSmall({ score }: { score: number }) {
  const valid = score > 0 && Number.isFinite(score)
  const color = score >= 90 ? "stroke-emerald-400" : score >= 80 ? "stroke-cyan-400" : score >= 70 ? "stroke-blue-400" : "stroke-zinc-500"
  const r = 14
  const c = 2 * Math.PI * r
  return (
    <div className="relative flex size-8 items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2.5" />
        {valid && <circle cx="16" cy="16" r={r} fill="none" className={color} strokeWidth="2.5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (score / 100) * c} style={{ transition: "stroke-dashoffset 0.6s ease" }} />}
      </svg>
      <span className="text-[10px] font-bold text-white">{valid ? score : "—"}</span>
    </div>
  )
}

export default async function Home() {
  const topProducts = await getTopProducts(6)
  const featuredList = topProducts.slice(0, 4)

  const featuredData = featuredList.map((p) => ({
    imageUrl: getProductImage(p),
    score: p.scores?.overall ?? 85,
    price: safePrice(p.price),
    href: p.slug ? `/products/${p.slug}` : "/products",
    brand: p.brand ?? "Smartphone",
    name: p.name ?? "Flagship phone",
    scores: p.scores,
  }))

  const compareProducts = topProducts.slice(0, 3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div
        className="flex flex-col items-center"
        style={{
          background: `
            radial-gradient(circle at 18% 10%, rgba(6,182,212,0.10), transparent 28%),
            radial-gradient(circle at 78% 12%, rgba(124,58,237,0.16), transparent 30%),
            linear-gradient(180deg, #020617 0%, #02040a 45%, #030712 100%)
          `,
        }}
      >
        {/* ── Hero ── */}
        <section className="w-full max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <HeroInteractive featured={featuredData} />
        </section>

        {/* ── Top Picks ── */}
        <TopPicks products={topProducts} />

        {/* ── Browse by Use Case ── */}
        <section className="w-full max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <div className="mb-6 mt-6">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-[22px] font-bold text-white">
                  Choose by what matters
                </h2>
                <p className="text-sm text-zinc-400">
                  Find phones that match your real-life needs
                </p>
              </div>
              <Link
                href="/smart-search"
                className="text-sm text-cyan-400 transition-colors hover:text-cyan-300"
              >
                All Use Cases &rarr;
              </Link>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { title: "Camera", emoji: "📷", desc: "Top photography performers", gradient: "from-cyan-500/20 to-blue-500/20", glow: "bg-cyan-500/15", href: "/smart-search?q=best+camera+phone" },
                { title: "Battery", emoji: "🔋", desc: "All-day endurance leaders", gradient: "from-emerald-500/20 to-cyan-500/20", glow: "bg-emerald-500/15", href: "/smart-search?q=best+battery+phone" },
                { title: "Gaming", emoji: "🎮", desc: "High-performance gaming", gradient: "from-purple-500/20 to-pink-500/20", glow: "bg-purple-500/15", href: "/smart-search?q=best+gaming+phone" },
                { title: "Value", emoji: "💰", desc: "Best bang for your buck", gradient: "from-amber-500/20 to-orange-500/20", glow: "bg-amber-500/15", href: "/smart-search?q=best+value+phone" },
              ].map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group relative flex h-[140px] items-center overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-950/55 p-5 transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(6,182,212,0.06)]"
                >
                  <div className={`absolute right-0 top-0 h-full w-[45%] ${card.glow} opacity-40 transition-opacity group-hover:opacity-60`}>
                    <div className="absolute bottom-3 right-3 flex items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2">
                      <span className="text-xl opacity-80">{card.emoji}</span>
                    </div>
                  </div>
                  <div className="relative z-10 flex flex-col gap-1.5">
                    <div className={`flex size-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient}`}>
                      <span className="text-lg">{card.emoji}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white transition-colors group-hover:text-cyan-300">
                      Best {card.title}
                    </h3>
                    <p className="text-xs text-zinc-500">{card.desc}</p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-400 opacity-0 transition-all group-hover:opacity-100">
                      Explore
                      <svg className="size-2.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quick Compare ── */}
        <section className="w-full max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <div className="mb-6 mt-6">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-[22px] font-bold text-white">
                  Quick Compare
                </h2>
                <p className="mt-1 max-w-lg text-sm text-zinc-400">
                  Compare phones by real-life priorities — camera, battery, gaming, value, and long-term fit.
                </p>
              </div>
              <Link
                href="/compare"
                className="hidden text-sm text-cyan-400 transition-colors hover:text-cyan-300 sm:inline"
              >
                Full Comparison &rarr;
              </Link>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: "🏆",
                  title: "Use-Case Winners",
                  desc: "Each phone ranked by best-fit use case — see which one wins for gaming, camera, or all-day battery.",
                  gradient: "from-cyan-500/20 to-blue-500/20",
                },
                {
                  icon: "💰",
                  title: "Price & Value Clarity",
                  desc: "See exactly what you pay and what you get. No fluff tiers — real prices, real value per score point.",
                  gradient: "from-emerald-500/20 to-cyan-500/20",
                },
                {
                  icon: "⚠️",
                  title: "Risk Notes",
                  desc: "Weak spots flagged upfront — low battery scores, missing features, or dated hardware that affects long-term use.",
                  gradient: "from-amber-500/20 to-orange-500/20",
                },
                {
                  icon: "📋",
                  title: "Plain-English Verdicts",
                  desc: "No spec sheet dumps. Get a clear, human-readable take on whether the phone is worth your money.",
                  gradient: "from-purple-500/20 to-pink-500/20",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="flex flex-col gap-2.5 rounded-2xl border border-white/[0.08] bg-slate-950/55 p-5 transition-all duration-300 hover:border-white/20"
                >
                  <div className={`flex size-9 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient}`}>
                    <span className="text-base">{card.icon}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{card.title}</h3>
                  <p className="text-[13px] leading-relaxed text-zinc-400">{card.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-cyan-500/3 via-blue-500/3 to-transparent px-5 py-4 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-medium text-cyan-400">
                  <span className="size-1.5 rounded-full bg-cyan-400" />
                  Top Contenders
                </span>
                <Link
                  href="/compare"
                  className="text-xs font-medium text-cyan-400 transition-colors hover:text-cyan-300 sm:hidden"
                >
                  Full Comparison &rarr;
                </Link>
              </div>

              <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
                {compareProducts.map((product) => {
                  const hasImage = product.image && product.image !== "/images/placeholder.svg" && !product.image.includes("placeholder")
                  const bestEntry = [
                    { label: "Gaming", score: product.scores.gaming },
                    { label: "Camera", score: product.scores.camera },
                    { label: "Battery", score: product.scores.battery },
                    { label: "Display", score: product.scores.display },
                    { label: "Value", score: product.scores.value },
                  ].filter((e) => e.score > 0).reduce((best, curr) => curr.score > best.score ? curr : best, { label: "Overall", score: 0 })

                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="group flex shrink-0 items-center gap-4 rounded-xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-4 transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_24px_rgba(6,182,212,0.06)]"
                    >
                      {hasImage ? (
                        <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 to-slate-900">
                          <img src={product.image} alt={product.name} className="max-h-12 w-auto object-contain" />
                        </div>
                      ) : (
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-950 to-slate-900 border border-white/[0.04]">
                          <span className="text-xl">📱</span>
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-medium text-cyan-400">{product.brand}</span>
                          <span className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-zinc-500">{bestEntry.label}</span>
                        </div>
                        <p className="text-sm font-semibold text-white transition-colors group-hover:text-cyan-200">{product.name}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-xs font-bold text-white">
                            {product.stockStatus === "coming_soon" ? "Coming soon" : product.price > 0 ? (product.currency === "MAD" ? `${product.price.toLocaleString()} MAD` : `$${product.price.toLocaleString()}`) : "—"}
                          </span>
                          <div className="flex items-center gap-1">
                            <ScoreRingSmall score={product.scores.overall} />
                            <span className="text-[10px] text-zinc-500">{product.scores.overall}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="w-full max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8 mt-2 rounded-2xl border border-white/[0.06] bg-gradient-to-r from-cyan-500/8 to-blue-500/8 px-6 py-7 text-center backdrop-blur-xl sm:px-12 sm:py-8">
            <h2 className="text-lg font-bold text-white sm:text-xl">
              Ready to make a smarter phone decision?
            </h2>
            <p className="mx-auto mt-1.5 max-w-md text-sm text-zinc-400">
              Use Witflag to turn specs, prices, and scores into a clear buying choice.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/smart-search"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 px-6 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:from-cyan-500 hover:to-blue-600"
              >
                Start Smart Search
                <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
              <Link
                href="/compare"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-white/[0.10] bg-white/[0.04] px-6 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Compare Phones
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
