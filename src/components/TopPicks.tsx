"use client"

import { useState } from "react"
import Link from "next/link"
import type { Product } from "@/lib/types"
import { getTopByIntent } from "@/lib/ranking"

function getScore(p: Product) { return Math.round(p.scores.overall) }
function getBrand(p: Product) { return p.brand || "Smartphone" }
function getName(p: Product) { return p.name || "Flagship phone" }
function getSlug(p: Product) { return `/products/${p.slug}` }
function getImage(p: Product) { return p.image || null }

function getPrice(p: Product) {
  if (p.price > 0) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(p.price)
  }
  return "Price N/A"
}

function getScoreLabel(score: number) {
  if (!(score > 0 && Number.isFinite(score))) return "N/A"
  if (score >= 90) return "Excellent"
  if (score >= 80) return "Great"
  if (score >= 70) return "Good"
  return "Fair"
}

function scoreTone(score: number) {
  if (!(score > 0 && Number.isFinite(score))) return { ring: "from-zinc-400 via-slate-400 to-zinc-500", text: "text-zinc-400", glow: "bg-zinc-400/20", label: "N/A" }
  if (score >= 90) return { ring: "from-emerald-400 via-cyan-400 to-emerald-500", text: "text-emerald-300", glow: "bg-emerald-400/20", label: "Excellent" }
  if (score >= 80) return { ring: "from-yellow-300 via-amber-400 to-yellow-500", text: "text-amber-300", glow: "bg-amber-400/20", label: "Great" }
  return { ring: "from-blue-400 via-sky-400 to-blue-500", text: "text-blue-300", glow: "bg-blue-400/20", label: "Good" }
}

function medalFor(rank: number) {
  if (rank === 0) return { name: "GOLD PICK", accent: "text-yellow-300", border: "border-yellow-400/70" }
  if (rank === 1) return { name: "SILVER PICK", accent: "text-blue-200", border: "border-blue-300/60" }
  return { name: "BRONZE PICK", accent: "text-orange-300", border: "border-orange-400/60" }
}

function bestFor(rank: number) {
  if (rank === 0) return "Best balanced flagship"
  if (rank === 1) return "Top camera and performance"
  return "Best value performance"
}

function getSignals(product: Product) {
  return [
    { label: "Performance", value: Math.round(product.scores.overall), color: "bg-cyan-400", desc: "Smooth daily use and flagship-level speed." },
    { label: "Camera", value: Math.round(product.scores.camera), color: "bg-purple-400", desc: "Photo/video strength compared with other top picks." },
    { label: "Battery", value: Math.round(product.scores.battery), color: "bg-emerald-400", desc: "Estimated endurance confidence from product signals." },
    { label: "Display", value: Math.round(product.scores.display), color: "bg-blue-400", desc: "Screen quality expectation for media and gaming." },
    { label: "Value", value: Math.round(product.scores.value), color: "bg-amber-400", desc: "Price-to-score balance for smarter buying." },
    { label: "Software", value: Math.round(Math.max(0, product.scores.overall - 3)), color: "bg-indigo-400", desc: "Update experience and ecosystem confidence." },
  ]
}

function PhoneMockup({ rank, score, imageUrl, productName }: { rank: number; score: number; imageUrl?: string | null; productName: string }) {
  const tone = scoreTone(score)

  if (imageUrl) {
    return (
      <div className="relative flex h-[175px] items-center justify-center">
        <div className={`absolute h-24 w-24 rounded-full blur-3xl ${tone.glow}`} />
        <div className="absolute bottom-6 h-6 w-32 rounded-full border border-cyan-300/20 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.20)]" />
        <img src={imageUrl} alt={productName} className="relative z-10 h-[160px] w-auto object-contain drop-shadow-[0_20px_24px_rgba(0,0,0,0.50)]" />
      </div>
    )
  }

  const themes = [
    { phone: "from-zinc-800 via-zinc-950 to-black", screen: "from-blue-500/10 via-cyan-300/30 to-blue-900/20" },
    { phone: "from-zinc-700 via-neutral-950 to-black", screen: "from-white/20 via-zinc-400/30 to-black/40" },
    { phone: "from-teal-900 via-slate-950 to-black", screen: "from-emerald-300/20 via-teal-500/25 to-black/40" },
  ]
  const theme = themes[rank] || themes[0]

  return (
    <div className="relative flex h-[175px] items-center justify-center">
      <div className={`absolute h-28 w-28 rounded-full blur-3xl ${tone.glow}`} />
      <div className="absolute bottom-5 h-6 w-32 rounded-full border border-purple-300/25 bg-purple-500/10 shadow-[0_0_32px_rgba(168,85,247,0.30)]" />
      <div className="absolute bottom-7 h-3 w-24 rounded-full border border-cyan-300/20 bg-cyan-300/5" />
      <div className={`relative z-20 h-[145px] w-[78px] rounded-[15px] border border-white/20 bg-gradient-to-br ${theme.phone} shadow-[0_22px_30px_rgba(0,0,0,0.55)]`}>
        <div className={`absolute inset-[4px] overflow-hidden rounded-[11px] bg-gradient-to-br ${theme.screen}`}>
          <div className="absolute -right-6 top-7 h-16 w-8 rotate-[22deg] rounded-full bg-white/20 blur-xl" />
          <div className="absolute bottom-0 left-0 h-14 w-full bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="absolute left-1/2 top-[6px] h-[5px] w-[24px] -translate-x-1/2 rounded-full bg-black/50" />
      </div>
    </div>
  )
}

function ScoreBadge({ score, size = "sm" }: { score: number; size?: "sm" | "md" | "lg" }) {
  const valid = score > 0 && Number.isFinite(score)
  const tone = scoreTone(valid ? score : 0)
  const inner = size === "lg" ? "h-14 w-14" : size === "sm" ? "h-9 w-9" : "h-11 w-11"
  const text = size === "lg" ? "text-xl" : size === "sm" ? "text-sm" : "text-base"
  const glow = size === "lg" ? "shadow-[0_0_28px_rgba(52,211,153,0.28)]" : "shadow-[0_0_18px_rgba(52,211,153,0.20)]"

  return (
    <div className={`rounded-full bg-gradient-to-br ${tone.ring} p-[3px] ${glow}`}>
      <div className={`flex ${inner} items-center justify-center rounded-full bg-slate-950 font-extrabold text-white ${text}`}>
        {valid ? score : "N/A"}
      </div>
    </div>
  )
}

function TopPickCard({ product, rank, isSelected, onSelect }: { product: Product; rank: number; isSelected: boolean; onSelect: () => void }) {
  const score = getScore(product)
  const medal = medalFor(rank)
  const brand = getBrand(product)
  const name = getName(product)
  const price = getPrice(product)
  const tone = scoreTone(score)
  const imageUrl = getImage(product)

  const activeClasses = isSelected
    ? `${medal.border} shadow-[0_0_32px_rgba(34,211,238,0.16)] -translate-y-1`
    : "border-white/[0.08] opacity-75 hover:opacity-95"

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={onSelect}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(); } }}
      className={`group relative h-[360px] overflow-hidden rounded-[22px] border bg-slate-950/60 p-5 backdrop-blur-2xl transition-all duration-300 cursor-pointer ${activeClasses}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent opacity-60" />
      <div className={`absolute -right-12 top-12 h-32 w-32 rounded-full blur-3xl ${tone.glow}`} />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Rank badge */}
      <div className={`absolute left-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-extrabold shadow-lg ${
        rank === 0 ? "bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-700 text-white border-yellow-200/30" :
        rank === 1 ? "bg-gradient-to-br from-sky-300 via-blue-500 to-slate-700 text-white border-blue-200/30" :
        "bg-gradient-to-br from-orange-300 via-orange-600 to-amber-900 text-white border-orange-200/30"
      }`}>
        {rank + 1}
      </div>

      {/* Medal label */}
      <div className={`absolute right-4 top-4 z-30 rounded-full border px-3 py-1 text-[10px] font-extrabold tracking-wide ${
        rank === 0 ? "border-yellow-400/30 bg-yellow-400/15 text-yellow-300" :
        rank === 1 ? "border-blue-300/30 bg-blue-300/15 text-blue-200" :
        "border-orange-400/30 bg-orange-400/15 text-orange-300"
      }`}>
        {medal.name}
      </div>

      {/* Phone mockup */}
      <div className="mt-10">
        <PhoneMockup rank={rank} score={score} imageUrl={imageUrl} productName={`${brand} ${name}`} />
      </div>

      {/* Bottom content */}
      <div className="relative z-20 mt-2">
        <p className="text-xs font-medium text-cyan-300">{brand}</p>
        <h3 className="mt-0.5 line-clamp-1 text-base font-bold leading-tight text-white">{name}</h3>
        <p className="mt-0.5 text-xs text-zinc-400">{bestFor(rank)}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-base font-extrabold text-white">{price}</p>
          <ScoreBadge score={score} size="sm" />
        </div>
        <Link
          href={getSlug(product)}
          onClick={(e) => e.stopPropagation()}
          className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-cyan-400 transition-colors hover:text-cyan-300"
        >
          View details &rarr;
        </Link>
      </div>
    </div>
  )
}

function CardAnatomyPanel({ product, rank }: { product: Product; rank: number }) {
  const score = getScore(product)
  const brand = getBrand(product)
  const name = getName(product)
  const price = getPrice(product)
  const priceNum = product.price
  const label = getScoreLabel(score)
  const medalLabel = rank === 0 ? "Gold" : rank === 1 ? "Silver" : "Bronze"

  const buyerCaution = priceNum > 1000
    ? "Premium price — compare value before buying."
    : priceNum <= 0
      ? "Price N/A — verify current retailer pricing."
      : "Check local price and storage variant before purchase."

  return (
    <div className="rounded-2xl border border-white/[0.10] bg-slate-950/55 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
      <h3 className="text-sm font-extrabold uppercase tracking-wide text-violet-300">Card anatomy</h3>
      <div className="mt-4 flex gap-4">
        <div className="hidden w-[140px] shrink-0 sm:block">
          <div className="relative overflow-hidden rounded-xl border border-white/[0.10] bg-slate-950/80 p-3">
            <div className={`absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold shadow-lg ${
              rank === 0 ? "bg-gradient-to-br from-yellow-300 to-amber-700 text-white" :
              rank === 1 ? "bg-gradient-to-br from-sky-300 to-slate-700 text-white" :
              "bg-gradient-to-br from-orange-300 to-amber-900 text-white"
            }`}>{rank + 1}</div>
            <div className="flex items-center justify-center pt-5">
              <div className="h-[72px] w-[40px] rounded-[8px] border border-white/15 bg-gradient-to-br from-zinc-700 to-black">
                <div className="mx-auto mt-[2px] h-[4px] w-[18px] rounded-full bg-black/50" />
              </div>
            </div>
            <p className="mt-1 text-[9px] text-cyan-300">{brand}</p>
            <p className="text-[10px] font-bold text-white leading-tight truncate">{name}</p>
            <p className="mt-1 text-[10px] font-bold text-white">{price}</p>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {[
            { label: "Pick", value: `${medalLabel} (Rank #${rank + 1})`, dot: rank === 0 ? "bg-yellow-300" : rank === 1 ? "bg-blue-200" : "bg-orange-300" },
            { label: "Global Score", value: `${score}/100 — ${label}`, dot: "bg-emerald-400" },
            { label: "Best for", value: bestFor(rank), dot: "bg-cyan-400" },
            { label: "Why it ranks here", value: rank === 0 ? "Highest combined score across key buying signals." : rank === 1 ? "Very strong flagship score with balanced trade-offs." : "High-scoring option with stronger value positioning.", dot: "bg-violet-400" },
            { label: "Buyer caution", value: buyerCaution, dot: "bg-amber-400" },
            { label: "Data status", value: "Live Supabase product data + fallback-safe ranking.", dot: "bg-blue-400" },
          ].map(({ label: l, value, dot }) => (
            <div key={l} className="flex items-start gap-2.5">
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dot}`} />
              <div>
                <p className="text-[11px] font-semibold text-white">{l}</p>
                <p className="text-[11px] leading-relaxed text-zinc-400">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ScoreColorPanel({ product }: { product: Product }) {
  const score = getScore(product)
  const tone = scoreTone(score)
  const label = getScoreLabel(score)
  const brand = getBrand(product)
  const name = getName(product)

  const valid = score > 0 && Number.isFinite(score)
  const interpretation = !valid
    ? "Score data currently unavailable for this product."
    : score >= 90
      ? "Top-tier recommendation with very strong buying confidence."
      : score >= 80
        ? "Strong recommendation with a few trade-offs to compare."
        : score >= 70
          ? "Good option, but compare alternatives before buying."
          : "Useful only for specific needs or budget constraints."

  const tiers = [
    { range: "90-100", label: "Excellent", color: "from-emerald-400 via-cyan-400 to-emerald-500", textColor: "text-emerald-300" },
    { range: "80-89", label: "Great", color: "from-yellow-300 via-amber-400 to-yellow-500", textColor: "text-amber-300" },
    { range: "70-79", label: "Good", color: "from-blue-400 via-sky-400 to-blue-500", textColor: "text-blue-300" },
  ]

  return (
    <div className="rounded-2xl border border-white/[0.10] bg-slate-950/55 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
      <h3 className="text-sm font-extrabold uppercase tracking-wide text-violet-300">Score color system</h3>
      <div className="mt-4 flex flex-col items-center text-center">
        <div className={`rounded-full bg-gradient-to-br ${tone.ring} p-[4px] shadow-[0_0_32px_rgba(52,211,153,0.25)]`}>
          <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-slate-950 text-[32px] font-extrabold text-white">
            {valid ? score : "N/A"}
          </div>
        </div>
        <p className={`mt-2 text-lg font-bold ${tone.text}`}>{label}</p>
        <p className="mt-0.5 text-xs text-zinc-400">{brand} {name}</p>
        <p className="mt-3 max-w-[280px] text-xs leading-relaxed text-zinc-400">{interpretation}</p>
      </div>

      <div className="mt-5 flex items-center justify-around gap-2 border-t border-white/[0.06] pt-4">
        {tiers.map(({ range, label: tLabel, color, textColor }) => (
          <div key={range} className="text-center">
            <div className={`mx-auto h-[6px] w-12 rounded-full bg-gradient-to-r ${color}`} />
            <p className={`mt-1.5 text-[10px] font-bold ${textColor}`}>{range}</p>
            <p className={`text-[10px] font-semibold ${textColor}`}>{tLabel}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function RankingSignalsPanel({ product }: { product: Product }) {
  const signals = getSignals(product)

  return (
    <div className="rounded-2xl border border-white/[0.10] bg-slate-950/55 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
      <h3 className="text-sm font-extrabold uppercase tracking-wide text-violet-300">AI ranking signals</h3>
      <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-400">
        Weighted consumer decision signals for this selected pick.
      </p>
      <div className="mt-4 space-y-3">
        {signals.map((s) => {
          const valid = s.value > 0 && Number.isFinite(s.value)
          return (
          <div key={s.label}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${s.color}`} />
                <span className="text-xs font-medium text-zinc-200">{s.label}</span>
              </div>
              <span className="text-xs font-bold text-white">{valid ? s.value : "N/A"}</span>
            </div>
            {valid ? (
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div className={`h-full rounded-full ${s.color} transition-all duration-500`} style={{ width: `${s.value}%` }} />
            </div>
            ) : (
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]" />
            )}
            <p className="mt-0.5 text-[10px] text-zinc-500">{s.desc}</p>
          </div>
          )
        })}
      </div>
      <p className="mt-4 text-[10px] leading-relaxed text-zinc-500">
        Updated from real product data and ranking signals.
      </p>
    </div>
  )
}

function SparkleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-cyan-300" fill="none">
      <path d="M12 2l1.9 5.1L19 9l-5.1 1.9L12 16l-1.9-5.1L5 9l5.1-1.9L12 2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export default function TopPicks({ products }: { products: Product[] }) {
  const picks = getTopByIntent(products, "best-overall", 3).map((r) => r.product)
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (picks.length === 0) return null

  const selected = picks[selectedIndex]

  return (
    <section className="mx-auto mt-6 w-full max-w-[1160px] px-4 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-[22px] font-bold text-white md:text-[26px]">Top picks for you</h2>
            <SparkleIcon />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.15)]">
              <span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_4px_rgba(34,211,238,0.6)]" />
              AI ranked live picks
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-400">Discover the highest scoring smartphones right now.</p>
        </div>
        <Link href="/products" className="hidden shrink-0 text-sm font-semibold text-blue-300 transition hover:text-cyan-200 sm:inline-flex">
          View all products &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {picks.map((product, index) => (
          <TopPickCard
            key={product.id}
            product={product}
            rank={index}
            isSelected={selectedIndex === index}
            onSelect={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <CardAnatomyPanel product={selected} rank={selectedIndex} />
        <ScoreColorPanel product={selected} />
        <RankingSignalsPanel product={selected} />
      </div>
    </section>
  )
}
