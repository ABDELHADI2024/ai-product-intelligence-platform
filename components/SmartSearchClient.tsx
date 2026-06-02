"use client"

import Link from "next/link"
import { useState, useEffect, use, type FormEvent } from "react"

interface SearchResult {
  name: string
  slug: string
  brand: string
  category: string
  price: number
  priceAvailable: boolean
  currency: string
  image_url: string
  scores: { overall: number; gaming: number; camera: number; battery: number; display: number; value: number }
  specs: Record<string, string>
  reason: string
  stockStatus?: string
}

function findSpec(specs: Record<string, string> | undefined, ...keys: string[]): string | null {
  if (!specs) return null
  for (const key of keys) {
    const v = specs[key]
    if (v && v.trim()) return v.trim()
  }
  return null
}

interface SearchResponse {
  query: string
  detectedIntent: {
    intent: string | null
    category: string | null
    maxPrice: number | null
  }
  count: number
  results: SearchResult[]
}

function ProductImage({ src, alt }: { src: string; alt: string }) {
  if (!src) {
    return (
      <div className="flex size-full items-center justify-center bg-gradient-to-br from-cyan-400/10 to-purple-600/10">
        <svg className="size-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
        </svg>
      </div>
    )
  }
  return <img src={src} alt={alt} className="size-full object-contain p-3" />
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

function MiniBar({ label, value, color }: { label: string; value: number; color: string }) {
  const valid = value > 0 && Number.isFinite(value)
  return (
    <div className="flex items-center gap-2">
      <span className="w-12 shrink-0 text-[11px] font-medium text-zinc-500">{label}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: valid ? `${value}%` : 0 }} />
      </div>
      <span className="w-5 shrink-0 text-right text-[11px] font-bold tabular-nums text-white/80">{valid ? value : "—"}</span>
    </div>
  )
}

const examples = [
  { label: "Best camera phone for travel", query: "best camera phone for travel under 900" },
  { label: "Best battery phone for long days", query: "best battery phone for travel" },
  { label: "Best gaming phone under budget", query: "best gaming phone under 700" },
  { label: "Best foldable value", query: "best value foldable phone" },
  { label: "Newest flagship phones", query: "newest flagship phone 2025" },
  { label: "Best phone for students", query: "best phone for students under 500" },
  { label: "Best phone for creators", query: "best camera phone for content creation" },
  { label: "Best value premium phone", query: "best value flagship phone" },
]

export default function SmartSearchClient({ searchParams: _searchParams }: { searchParams?: Promise<{ q?: string }> | { q?: string } }) {
  const params = _searchParams && typeof _searchParams === "object" && "then" in _searchParams ? use(_searchParams) : _searchParams
  const initialQuery = params?.q ?? ""

  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<SearchResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    if (initialQuery && !hasSearched) {
      doSearch(initialQuery)
    }
  }, [])

  async function doSearch(q: string) {
    if (!q.trim()) return
    setQuery(q)
    setLoading(true)
    setError(null)
    setHasSearched(true)
    try {
      const res = await fetch(`/api/intelligence/search?q=${encodeURIComponent(q)}`)
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error ?? `Request failed (${res.status})`)
      }
      const data: SearchResponse = await res.json()
      setResults(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong")
      setResults(null)
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    doSearch(query)
  }

  function handleChipClick(q: string) {
    setQuery(q)
    doSearch(q)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="relative mb-6">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 transition-all focus-within:border-cyan-500/40 focus-within:shadow-lg focus-within:shadow-cyan-500/10">
          <svg className="size-5 shrink-0 text-zinc-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='e.g. "best camera phone for travel under $900"'
            className="min-w-0 flex-1 bg-transparent text-base text-white placeholder-zinc-600 outline-none"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 transition-all hover:from-cyan-600 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="size-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Searching
              </span>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </form>

      <div className="mb-12 flex flex-wrap justify-center gap-2">
        {examples.map((ex) => (
          <button
            key={ex.query}
            onClick={() => handleChipClick(ex.query)}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-400 transition-all hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300"
          >
            {ex.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex flex-col items-center gap-3 py-20">
          <svg className="size-8 animate-spin text-cyan-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-zinc-500">Analyzing products...</p>
        </div>
      )}

      {error && !loading && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-8 text-center">
          <svg className="mx-auto mb-3 size-10 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {!loading && !error && hasSearched && results && results.count === 0 && (
        <div className="rounded-2xl border border-white/10 px-6 py-16 text-center">
          <svg className="mx-auto mb-4 size-12 text-zinc-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <p className="text-base font-medium text-zinc-400">No matching products found</p>
          <p className="mt-1 text-sm text-zinc-600">
            {results.detectedIntent.category
              ? "I don't have enough products in that category yet. Try smartphones or foldable smartphones."
              : <>Try a different search term or browse all <Link href="/products" className="text-cyan-400 hover:text-cyan-300">products</Link>.</>}
          </p>
        </div>
      )}

      {!loading && results && results.count > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {results.detectedIntent.intent && (
            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
              Focus: {results.detectedIntent.intent}
            </span>
          )}
          {results.detectedIntent.category && (
            <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
              Category: {results.detectedIntent.category}
            </span>
          )}
          {results.detectedIntent.maxPrice && (
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              Budget: under ${results.detectedIntent.maxPrice}
            </span>
          )}
          <span className="text-xs text-zinc-600">{results.count} result{results.count !== 1 ? "s" : ""}</span>
        </div>
      )}

      {!loading && results?.results.map((item) => (
        <Link
          key={item.slug}
          href={`/products/${item.slug}`}
          className="group mb-4 block overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_40px_rgba(6,182,212,0.06)] hover:from-white/[0.06] hover:to-white/[0.02]"
        >
          <div className="flex flex-col sm:flex-row">
            <div className="relative flex h-48 w-full shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 to-slate-900 sm:h-auto sm:w-48">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5" />
              <ProductImage src={item.image_url} alt={item.name} />
              <div className="absolute right-2 top-2 sm:hidden">
                <ScoreRingSmall score={item.scores.overall} />
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-3 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-cyan-400">{item.brand}</span>
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-zinc-500">{item.category}</span>
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-white transition-colors group-hover:text-cyan-200">
                    {item.name}
                  </h3>
                </div>
                <div className="hidden shrink-0 sm:block">
                  <ScoreRingSmall score={item.scores.overall} />
                </div>
              </div>

              <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">{item.reason}</p>

              {item.specs && (
                <div className="flex flex-wrap gap-1.5">
                  {findSpec(item.specs, "Chip", "Chipset") && (
                    <span className="inline-flex items-center gap-1 rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-0.5 text-[10px] text-zinc-400">
                      ⚡ {findSpec(item.specs, "Chip", "Chipset")}
                    </span>
                  )}
                  {findSpec(item.specs, "Display", "Screen Size", "Screen Type") && (
                    <span className="inline-flex items-center gap-1 rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-0.5 text-[10px] text-zinc-400">
                      📱 {findSpec(item.specs, "Display", "Screen Size", "Screen Type")}
                    </span>
                  )}
                  {findSpec(item.specs, "RAM") && (
                    <span className="inline-flex items-center gap-1 rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-0.5 text-[10px] text-zinc-400">
                      💾 {findSpec(item.specs, "RAM")}
                    </span>
                  )}
                  {findSpec(item.specs, "Camera", "Rear Camera") && (
                    <span className="inline-flex items-center gap-1 rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-0.5 text-[10px] text-zinc-400">
                      📷 {findSpec(item.specs, "Camera", "Rear Camera")}
                    </span>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                <MiniBar label="Camera" value={item.scores.camera} color="bg-purple-400" />
                <MiniBar label="Battery" value={item.scores.battery} color="bg-emerald-400" />
                <MiniBar label="Display" value={item.scores.display} color="bg-blue-400" />
                <MiniBar label="Gaming" value={item.scores.gaming} color="bg-cyan-400" />
              </div>

              <div className="mt-auto flex items-center justify-between pt-1">
                <div className="text-lg font-bold text-white">
                  {item.stockStatus === "coming_soon" ? (
                    <span className="text-sm font-medium text-amber-400">Coming soon</span>
                  ) : item.priceAvailable
                    ? item.currency === "MAD"
                      ? `${item.price.toLocaleString()} MAD`
                      : `$${item.price.toLocaleString()}`
                    : <span className="text-sm text-zinc-600">Price N/A</span>}
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100">
                  View details
                  <svg className="size-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
