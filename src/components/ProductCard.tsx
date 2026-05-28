"use client"

import Link from "next/link"
import type { Product } from "@/lib/types"

function ScoreRing({ score }: { score: number }) {
  const valid = score > 0 && Number.isFinite(score)
  const color =
    score >= 90 ? "stroke-emerald-400" :
    score >= 80 ? "stroke-amber-400" :
    score >= 70 ? "stroke-blue-400" :
    "stroke-zinc-500"

  const circumference = 2 * Math.PI * 18
  const offset = valid ? circumference - (score / 100) * circumference : 0

  return (
    <div className="relative flex size-11 items-center justify-center">
      {valid ? (
      <svg className="absolute inset-0 size-11 -rotate-90" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
        <circle
          cx="22" cy="22" r="18"
          fill="none"
          className={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      ) : (
        <div className="absolute inset-0 size-11 rounded-full bg-white/[0.03]" />
      )}
      <span className="text-xs font-bold text-white">{valid ? score : "N/A"}</span>
    </div>
  )
}

function getBestLabel(scores: Product["scores"]): string {
  const entries = [
    { label: "Gaming", score: scores.gaming },
    { label: "Camera", score: scores.camera },
    { label: "Battery", score: scores.battery },
    { label: "Display", score: scores.display },
    { label: "Value", score: scores.value },
  ].filter((e) => e.score > 0 && Number.isFinite(e.score))
  if (entries.length === 0) return "Everyday use"
  return entries.reduce((best, curr) => (curr.score > best.score ? curr : best)).label
}

function getWhyLabel(overall: number, price: number): string {
  if (overall >= 90) return "Premium flagship score"
  if (overall >= 80 && price > 0 && price < 500) return "Great price-value balance"
  if (overall >= 80) return "Strong overall score"
  if (overall >= 70 && price > 0 && price < 400) return "Good value option"
  if (overall >= 70) return "Solid mid-range performer"
  return "Needs more market data"
}

function getWatchLabel(price: number): string | null {
  if (price <= 0) return "Price data limited"
  if (price > 1000) return "Premium price tier"
  if (price > 700) return "Higher price range"
  return null
}

const bestForLabels: Record<string, string> = {
  Gaming: "High-performance gaming & multitasking",
  Camera: "Photography & content creation",
  Battery: "All-day battery life",
  Display: "Media consumption & creative work",
  Value: "Best price-to-performance ratio",
}

export default function ProductCard({ product }: { product: Product }) {
  const bestLabel = getBestLabel(product.scores)
  const whyLabel = getWhyLabel(product.scores.overall, product.price)
  const watchLabel = getWatchLabel(product.price)

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 transition-all duration-300 hover:border-white/20 hover:from-white/[0.1] hover:to-white/[0.04] hover:shadow-xl hover:shadow-blue-500/5"
    >
      {product.scores.overall >= 95 && (
        <div className="absolute right-0 top-0">
          <div className="origin-bottom-right -translate-y-1 translate-x-1 -rotate-45 bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-0.5 text-[10px] font-bold tracking-wider text-black shadow-lg">
            TOP PICK
          </div>
        </div>
      )}

      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-400">
              {product.brand}
            </span>
            <span className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-zinc-500">
              {product.category}
            </span>
          </div>
            <h3 className="mt-2 text-[15px] font-semibold leading-tight text-white transition-colors group-hover:text-cyan-300">
              {product.name}
            </h3>
        </div>
        <ScoreRing score={product.scores.overall} />
      </div>

      <div className="relative mb-3 overflow-hidden rounded-xl bg-white/5">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-[3/2] w-full object-cover"
          onError={(e) => {
            const target = e.currentTarget
            if (target.src !== "/images/placeholder.svg") {
              target.src = "/images/placeholder.svg"
            }
          }}
        />
      </div>

      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-zinc-500">
        {product.description}
      </p>

      <div className="mb-4 grid grid-cols-2 gap-x-4 gap-y-1.5">
        {([
          { label: "Gaming", value: product.scores.gaming },
          { label: "Camera", value: product.scores.camera },
          { label: "Battery", value: product.scores.battery },
          { label: "Display", value: product.scores.display },
          { label: "Value", value: product.scores.value },
        ] as { label: string; value: number }[]).map((s) => {
          const valid = s.value > 0 && Number.isFinite(s.value)
          return (
          <div key={s.label} className="flex items-center justify-between text-xs">
            <span className="text-zinc-600">{s.label}</span>
            <div className="flex items-center gap-1.5">
              {valid ? (
                <>
                <div className="h-1 w-12 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full transition-all ${
                      s.value >= 90 ? "bg-emerald-400" :
                      s.value >= 80 ? "bg-amber-400" :
                      s.value >= 70 ? "bg-blue-400" :
                      "bg-zinc-500"
                    }`}
                    style={{ width: `${s.value}%` }}
                  />
                </div>
                <span className="w-5 text-right font-medium text-zinc-400">{s.value}</span>
                </>
              ) : (
                <span className="w-[4.5rem] text-right text-[11px] text-zinc-600">N/A</span>
              )}
            </div>
          </div>
          )
        })}
      </div>

      {/* Intelligence micro-copy */}
      <div className="mb-3 space-y-1.5">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-medium text-zinc-600">Best for</span>
          <span className="rounded-md bg-cyan-500/10 px-1.5 py-0.5 text-[10px] font-medium text-cyan-300">
            {bestLabel}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-medium text-zinc-600">Why shown</span>
          <span className="text-[10px] text-zinc-400">{whyLabel}</span>
        </div>
        {watchLabel && (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-medium text-zinc-600">Note</span>
            <span className="text-[10px] text-amber-400/80">{watchLabel}</span>
          </div>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-4">
        {product.price > 0 ? (
          <span className="text-lg font-bold text-white">
            ${product.price.toLocaleString()}
          </span>
        ) : (
          <span className="text-sm text-zinc-600">Price N/A</span>
        )}
        <span className="flex items-center gap-1 text-xs font-medium text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100">
          View Details
          <svg className="size-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
