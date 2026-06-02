import type { Metadata } from "next"
import Link from "next/link"
import { getAllProducts } from "@/lib/supabase"
import type { Product } from "@/lib/types"
import { categoryLabels } from "@/lib/categories"
import { getTopByIntent } from "@/lib/ranking"

export const metadata: Metadata = {
  title: "Compare Phones — Witflag",
  description:
    "Side-by-side comparison of top-scoring smartphones and foldable phones. Compare by camera, battery, gaming, and value to find the best phone for you.",
  openGraph: {
    title: "Compare Phones — Witflag",
    description:
      "Decision-first phone comparison. See which phone wins for your use case.",
  },
}

function specValue(specs: Record<string, string> | undefined, ...keys: string[]): string | null {
  if (!specs) return null
  for (const key of keys) {
    const v = specs[key]
    if (v && v.trim()) return v.trim()
  }
  return null
}

function getBestFor(product: Product): { label: string; score: number } {
  const entries = [
    { label: "Gaming", score: product.scores.gaming },
    { label: "Camera", score: product.scores.camera },
    { label: "Battery", score: product.scores.battery },
    { label: "Display", score: product.scores.display },
    { label: "Value", score: product.scores.value },
  ].filter((e) => e.score > 0)
  if (entries.length === 0) return { label: "General", score: 0 }
  return entries.reduce((best, curr) => (curr.score > best.score ? curr : best))
}

function gaugeColor(value: number): string {
  if (value >= 90) return "bg-amber-400"
  if (value >= 80) return "bg-rose-400"
  if (value >= 70) return "bg-indigo-400"
  return "bg-zinc-500"
}

function Gauge({ label, value }: { label: string; value: number }) {
  const valid = value > 0 && Number.isFinite(value)
  return (
    <div className="flex items-center gap-3">
      <span className="w-14 text-[11px] font-medium text-zinc-500">{label}</span>
      <div className="flex-1">
        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
          {valid && (
            <div
              className={`h-full rounded-full transition-all ${gaugeColor(value)}`}
              style={{ width: `${value}%` }}
            />
          )}
        </div>
      </div>
      <span className="w-6 text-right text-xs font-semibold tabular-nums text-zinc-300">
        {valid ? value : "—"}
      </span>
    </div>
  )
}

function formatPrice(p: Product): string {
  if (p.stockStatus === "coming_soon") return "Coming soon"
  if (p.price > 0) {
    return p.currency === "MAD"
      ? `${p.price.toLocaleString()} MAD`
      : `$${p.price.toLocaleString()}`
  }
  return "Price N/A"
}

function DashboardCard({ product }: { product: Product }) {
  const best = getBestFor(product)
  const scores = product.scores
  const specs = product.specs
  const chip = specValue(specs, "Chip", "Chipset")
  const display = specValue(specs, "Display", "Screen Size", "Screen Type")
  const camera = specValue(specs, "Camera", "Rear Camera")
  const ram = specValue(specs, "RAM")
  const storage = specValue(specs, "Storage")
  const hasImage = product.image && product.image !== "/images/placeholder.svg" && !product.image.includes("placeholder")

  const bestDescriptions: Record<string, string> = {
    Gaming: "High-performance gaming & multitasking",
    Camera: "Photography & content creation",
    Battery: "All-day battery & productivity",
    Display: "Media consumption & creative work",
    Value: "Best price-to-performance ratio",
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-5 transition-all duration-300 hover:border-white/15 hover:shadow-[0_0_40px_rgba(6,182,212,0.04)]"
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400">{product.brand}</span>
          <h2 className="mt-0.5 text-base font-bold text-white transition-colors group-hover:text-cyan-200">{product.name}</h2>
        </div>
        <div className="text-right">
          <div className="text-xs text-zinc-600">{categoryLabels[product.category] ?? product.category}</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px] text-zinc-600">Best for</span>
            <span className="text-xs font-semibold text-white">{best.label}</span>
          </div>
        </div>
      </div>

      {/* ── Metrics Row (image + price + score) ── */}
      <div className="mt-4 flex gap-4">
        {/* Image panel */}
        <div className="flex h-28 w-24 shrink-0 items-center justify-center rounded-xl bg-white/[0.02] border border-white/[0.04]">
          {hasImage ? (
            <img src={product.image} alt={product.name} className="max-h-24 w-auto object-contain" />
          ) : (
            <span className="text-xl text-zinc-700">📱</span>
          )}
        </div>

        {/* Key metrics */}
        <div className="flex flex-1 flex-col justify-center gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-zinc-500">Price</span>
            <span className="text-sm font-bold text-white">
              {formatPrice(product)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-zinc-500">Overall Score</span>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-white">
                {scores.overall > 0 && Number.isFinite(scores.overall) ? scores.overall : "—"}
              </span>
              <span className={`text-[10px] font-medium ${
                scores.overall >= 90 ? "text-amber-400" : scores.overall >= 80 ? "text-rose-400" : "text-zinc-500"
              }`}>
                {scores.overall >= 90 ? "Excellent" : scores.overall >= 80 ? "Great" : scores.overall >= 70 ? "Good" : ""}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-zinc-500">Best Score</span>
            <span className="text-xs font-medium text-white">{best.label} ({best.score})</span>
          </div>
        </div>
      </div>

      {/* ── Score Gauges ── */}
      <div className="mt-4 space-y-1.5 rounded-xl bg-white/[0.02] px-3.5 py-3 border border-white/[0.03]">
        <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">Performance Gauges</div>
        <Gauge label="Gaming" value={scores.gaming} />
        <Gauge label="Camera" value={scores.camera} />
        <Gauge label="Battery" value={scores.battery} />
        <Gauge label="Display" value={scores.display} />
        <Gauge label="Value" value={scores.value} />
      </div>

      {/* ── Spec Tags ── */}
      {(chip || display || camera || ram || storage) && (
        <div className="mt-3">
          <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">Key Specs</div>
          <div className="flex flex-wrap gap-1.5">
            {chip && <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.04] px-2 py-1 text-[10px] text-zinc-400 border border-white/[0.04]">⚡ {chip}</span>}
            {display && <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.04] px-2 py-1 text-[10px] text-zinc-400 border border-white/[0.04]">📱 {display}</span>}
            {camera && <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.04] px-2 py-1 text-[10px] text-zinc-400 border border-white/[0.04]">📷 {camera}</span>}
            {ram && storage
              ? <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.04] px-2 py-1 text-[10px] text-zinc-400 border border-white/[0.04]">💾 {ram} / {storage}</span>
              : ram
              ? <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.04] px-2 py-1 text-[10px] text-zinc-400 border border-white/[0.04]">💾 {ram}</span>
              : storage
              ? <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.04] px-2 py-1 text-[10px] text-zinc-400 border border-white/[0.04]">💾 {storage}</span>
              : null}
          </div>
        </div>
      )}

      {/* ── AI Insight ── */}
      <div className="mt-3 rounded-lg bg-white/[0.02] px-3 py-2 border border-white/[0.03]">
        <div className="flex items-start gap-2">
          <svg className="mt-0.5 size-3 shrink-0 text-cyan-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
          </svg>
          <p className="text-[11px] leading-relaxed text-zinc-500">
            <span className="font-medium text-zinc-400">AI insight: </span>
            {best.label === "Gaming"
              ? `Top gaming performer with ${chip || "a powerful chip"} and ${scores.display}+ display score.`
              : best.label === "Camera"
              ? `Leading camera system with ${scores.camera}/100 — excels in photo and video.`
              : best.label === "Battery"
              ? `Best battery endurance at ${scores.battery}/100 — lasts all day.`
              : best.label === "Display"
              ? `Stunning ${display || "display"} with ${scores.display}/100 — great for media.`
              : best.label === "Value"
              ? `Best value at ${product.price > 0 ? (product.currency === "MAD" ? `${product.price.toLocaleString()} MAD` : `$${product.price.toLocaleString()}`) : "—"} with strong overall scores.`
              : `Balanced performer with solid scores across all dimensions.`}
          </p>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="mt-3 flex items-center justify-between border-t border-white/[0.04] pt-3">
        <span className="text-[10px] text-zinc-600">{bestDescriptions[best.label] || "Balanced all-around performer"}</span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100">
          View details
          <svg className="size-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

const priorityChips = [
  { label: "Camera", query: "best+camera+phone", icon: "📷" },
  { label: "Battery", query: "best+battery+phone", icon: "🔋" },
  { label: "Gaming", query: "best+gaming+phone", icon: "🎮" },
  { label: "Value", query: "best+value+phone", icon: "💰" },
  { label: "Business", query: "best+business+phone", icon: "💼" },
  { label: "Travel", query: "phone+for+travel", icon: "✈️" },
  { label: "Compact", query: "compact+smartphone", icon: "📱" },
  { label: "Foldable", query: "best+foldable+phone", icon: "🔄" },
]

export default async function ComparePage() {
  const allProducts = await getAllProducts()
  const topThree = getTopByIntent(allProducts, "best-overall", 3).map((r) => r.product)

  return (
    <div className="flex flex-col">
      {/* ── Header ── */}
      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-zinc-500">
              <span className="size-1 rounded-full bg-cyan-400" />
              Decision Comparison
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Compare Phones
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              See which phone wins for your use case — by camera, battery, gaming, value, and more.
            </p>
          </div>
        </div>
      </section>

      {/* ── Priority Chips ── */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs font-medium text-zinc-500">Choose your priority</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {priorityChips.map((chip) => (
            <Link
              key={chip.label}
              href={`/smart-search?q=${chip.query}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-zinc-400 transition-all hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              <span>{chip.icon}</span>
              {chip.label}
            </Link>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-white/[0.04] bg-white/[0.01] px-4 py-3">
          <p className="text-xs text-zinc-500">
            Witflag highlights the better choice by use case, not only by raw specs. Select a priority above to see AI-ranked recommendations.
          </p>
        </div>
      </section>

      {/* ── Dashboard Grid ── */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {topThree.length > 0 ? (
          <>
            <div className="grid gap-4 md:grid-cols-3">
              {topThree.map((product) => (
                <DashboardCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/products"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 text-sm font-medium text-white transition-all hover:bg-white/10"
              >
                Browse All Products
                <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-white/[0.06] px-6 py-16 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <svg className="size-7 text-zinc-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </div>
            <p className="mt-4 text-base font-medium text-zinc-400">No products to compare</p>
            <p className="mt-1 text-sm text-zinc-600">Select two or more phones to get a decision-first comparison. Browse products or use Smart Search to find phones.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/products"
                className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 transition-all hover:opacity-90"
              >
                Browse Products
              </Link>
              <Link
                href="/smart-search"
                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-zinc-400 transition-all hover:border-white/20 hover:text-white"
              >
                Smart Search
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {[
                { label: "Best camera comparison", query: "best+camera+phone" },
                { label: "Best battery vs gaming", query: "best+battery+phone" },
                { label: "Flagship vs value", query: "best+value+flagship" },
              ].map((ex) => (
                <Link
                  key={ex.label}
                  href={`/smart-search?q=${ex.query}`}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-500 transition-all hover:border-cyan-500/30 hover:text-cyan-300"
                >
                  {ex.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
