"use client"

import { useState, useEffect, useRef, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface FeaturedItem {
  imageUrl: string | null
  score: number
  price: string
  href: string
  brand: string
  name: string
  scores: { overall: number; gaming: number; camera: number; battery: number; display: number; value: number }
}

const examples = [
  { label: "📸 Best camera", query: "best camera phone" },
  { label: "💰 Under $800", query: "best phone under 800" },
  { label: "🔋 Long battery", query: "best battery phone" },
  { label: "🎮 Gaming", query: "best gaming phone" },
]

const productReasons: Record<string, string> = {
  "iPhone 17 Pro Max": "The ultimate flagship with A19 Pro chip and a professional-grade 48MP quad-camera system. Best-in-class performance and stunning display.",
  "Samsung Galaxy S25 Ultra": "A productivity powerhouse with Galaxy AI, S Pen support, and a 200MP camera that captures every detail. The complete premium Android experience.",
  "Pixel 10 Pro": "Google's AI-first smartphone with legendary computational photography and exclusive Tensor G5 features. The smartest Pixel yet.",
  "OnePlus 14": "Flagship killer reborn with 100W charging, Snapdragon 8 Gen 4, and a gorgeous 2K AMOLED display. Unbeatable value.",
  "Samsung Galaxy Z Fold 7": "The most refined foldable with a stunning 7.6″ AMOLED display and Galaxy AI optimized for multitasking.",
  "Google Pixel Fold 3": "The thinnest foldable with Pixel's legendary camera, clean software, and exclusive AI features in a slim package.",
  "OnePlus Open 2": "The ultimate foldable value with the largest inner display and blazing 100W charging. A true foldable breakthrough.",
}

const specHighlights: Record<string, { chip: string; display: string; camera: string }> = {
  "iPhone 17 Pro Max": { chip: "A19 Pro", display: "6.9″ OLED", camera: "48MP Quad" },
  "Samsung Galaxy S25 Ultra": { chip: "Snapdragon 8 Gen 4", display: "6.9″ AMOLED 2X", camera: "200MP" },
  "Pixel 10 Pro": { chip: "Tensor G5", display: "6.7″ LTPO OLED", camera: "50MP AI" },
  "OnePlus 14": { chip: "Snapdragon 8 Gen 4", display: "6.82″ 2K AMOLED", camera: "50MP Hasselblad" },
  "Samsung Galaxy Z Fold 7": { chip: "Snapdragon 8 Gen 4", display: "7.6″ AMOLED", camera: "50MP Triple" },
  "Google Pixel Fold 3": { chip: "Tensor G5", display: "7.2″ OLED", camera: "48MP" },
  "OnePlus Open 2": { chip: "Snapdragon 8 Gen 4", display: "8.0″ 2K AMOLED", camera: "50MP Hasselblad" },
}

function FeaturedPhoneFallback() {
  return (
    <div className="relative z-10">
      <div className="absolute -left-12 top-8 h-[158px] w-[84px] rotate-[-5deg] rounded-[18px] border border-white/15 bg-gradient-to-br from-zinc-700 via-zinc-950 to-black shadow-2xl">
        <div className="absolute left-3 top-4 h-4 w-4 rounded-full border border-white/20 bg-black/80" />
        <div className="absolute left-8 top-4 h-4 w-4 rounded-full border border-white/20 bg-black/80" />
        <div className="absolute left-3 top-10 h-4 w-4 rounded-full border border-white/20 bg-black/80" />
      </div>
      <div className="relative h-[198px] w-[100px] rounded-[22px] border border-white/20 bg-gradient-to-br from-slate-800 via-slate-950 to-black shadow-[0_30px_44px_rgba(0,0,0,0.72)]">
        <div className="absolute inset-[6px] overflow-hidden rounded-[16px] bg-gradient-to-br from-cyan-400/25 via-blue-500/15 to-purple-700/25">
          <div className="absolute -right-8 top-9 h-24 w-12 rotate-[24deg] rounded-full bg-white/25 blur-xl" />
          <div className="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="absolute left-1/2 top-2 h-1.5 w-8 -translate-x-1/2 rounded-full bg-black/60" />
      </div>
    </div>
  )
}

function MiniBar({ label, value, color }: { label: string; value: number; color: string }) {
  const valid = value > 0 && Number.isFinite(value)
  return (
    <div className="flex items-center gap-2">
      <span className="w-12 shrink-0 text-[11px] font-medium text-zinc-500">{label}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={`h-full origin-left rounded-full transition-all duration-500 ${color} ${valid ? "mini-bar-fill" : ""}`}
          style={{ width: valid ? `${value}%` : 0 }}
        />
      </div>
      <span className="w-5 shrink-0 text-right text-[11px] font-bold tabular-nums text-white/80">{valid ? value : "—"}</span>
    </div>
  )
}

export default function HeroInteractive({ featured }: { featured: FeaturedItem[] }) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [slideKey, setSlideKey] = useState(0)
  const pauseRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const items = featured.slice(0, 4)
  const current = items[index]
  const scores = current?.scores ?? { overall: 0, gaming: 0, camera: 0, battery: 0, display: 0, value: 0 }

  useEffect(() => {
    if (items.length <= 1) return
    if (paused) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
      setSlideKey((k) => k + 1)
    }, 5000)
    return () => clearInterval(id)
  }, [paused, items.length])

  function pauseForInteraction() {
    setPaused(true)
    if (pauseRef.current) clearTimeout(pauseRef.current)
    pauseRef.current = setTimeout(() => setPaused(false), 8000)
  }

  async function doSearch(q: string) {
    if (!q.trim()) return
    setLoading(true)
    try {
      await router.push(`/smart-search?q=${encodeURIComponent(q)}`)
    } catch {
      setLoading(false)
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    doSearch(query)
  }

  function handleChip(q: string) {
    setQuery(q)
    doSearch(q)
  }

  function prev() {
    setIndex((i) => (i - 1 + items.length) % items.length)
    setSlideKey((k) => k + 1)
    pauseForInteraction()
  }

  function next() {
    setIndex((i) => (i + 1) % items.length)
    setSlideKey((k) => k + 1)
    pauseForInteraction()
  }

  function goTo(i: number) {
    if (i === index) return
    setIndex(i)
    setSlideKey((k) => k + 1)
    pauseForInteraction()
  }

  const spec = current ? specHighlights[current.name] : null

  return (
    <div className="pt-10 sm:pt-12">
      <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left column */}
        <div className="flex flex-col gap-5">
          <h1 className="text-[52px] font-extrabold leading-[0.98] tracking-[-0.02em] text-white md:text-[58px] lg:text-[62px]">
            AI-powered phone
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent gradient-shift">
              decisions,
            </span>
            <br />
            <span className="text-white">not just specs.</span>
          </h1>

          <p className="max-w-[400px] text-sm leading-relaxed text-zinc-400">
            Compare phones by camera, battery, gaming, value, and long-term use. Turn specs into clear buying decisions.
          </p>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="group flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 transition-all duration-300 focus-within:border-cyan-500/30 focus-within:bg-white/[0.05] focus-within:shadow-[0_0_24px_rgba(6,182,212,0.06)]">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-600/20">
                  <svg className="size-4 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. &quot;best camera phone for travel under $900&quot;"
                  className="min-w-0 flex-1 bg-transparent text-[15px] text-white placeholder-zinc-600 outline-none"
                />
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="flex h-8 items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 px-4 text-xs font-semibold text-white shadow-sm transition-all hover:opacity-90 disabled:opacity-40"
                >
                  {loading ? (
                    <span className="inline-block size-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <>
                      Ask AI
                      <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-3 flex flex-wrap gap-2">
              {examples.map((ex) => (
                <button
                  key={ex.query}
                  type="button"
                  onClick={() => handleChip(ex.query)}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[12px] text-zinc-400 transition-all hover:border-white/15 hover:bg-white/[0.06] hover:text-zinc-200"
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column — featured carousel */}
        <div className="flex flex-col gap-4">
          {current && (
            <div
              className="relative"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => {
                if (pauseRef.current) {
                  clearTimeout(pauseRef.current)
                  pauseRef.current = null
                }
                setPaused(false)
              }}
            >
              {/* Carousel arrows */}
              {items.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute -left-3 top-1/2 z-20 flex size-9 -translate-y-1/2 items-center justify-center rounded-xl border border-white/[0.08] bg-slate-950/80 text-zinc-400 backdrop-blur-sm transition-all hover:border-white/20 hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                  >
                    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    className="absolute -right-3 top-1/2 z-20 flex size-9 -translate-y-1/2 items-center justify-center rounded-xl border border-white/[0.08] bg-slate-950/80 text-zinc-400 backdrop-blur-sm transition-all hover:border-white/20 hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                  >
                    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </>
              )}

              {/* Featured card */}
              <div key={`${current.name}-${slideKey}`} className="card-slide-in">
                <Link
                  href={current.href}
                  className="group relative block overflow-hidden rounded-[26px] p-7 transition-all duration-500 hover:shadow-[0_24px_80px_rgba(6,182,212,0.30),0_0_0_1px_rgba(34,211,238,0.20)] sm:p-8"
                  style={{
                    background:
                      "radial-gradient(circle at 78% 18%, rgba(124,58,237,0.30), transparent 32%), radial-gradient(circle at 46% 58%, rgba(14,165,233,0.18), transparent 38%), linear-gradient(135deg, #0f1a2e 0%, #0d1625 40%, #0a1020 100%)",
                    border: "1px solid rgba(148,163,184,0.14)",
                    minHeight: "360px",
                    boxShadow:
                      "0 24px 80px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-purple-500/50 shimmer-sweep" />
                  <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-purple-500/20 blur-3xl" />
                  <div className="absolute -bottom-28 left-8 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

                  {/* Hover glow overlay */}
                  <div className="absolute inset-0 rounded-[26px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{
                    boxShadow: "inset 0 0 60px rgba(6,182,212,0.08)",
                  }} />

                  <div className="relative z-10 flex gap-6">
                    {/* Left content */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/80">
                            FEATURED
                          </span>
                          <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2 py-1">
                            <div className="flex size-[22px] items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-[10px] font-bold text-white">
                              {current.score}
                            </div>
                            <span className="text-[10px] font-medium text-zinc-400">{scoreLabel(current.score)}</span>
                          </div>
                        </div>

                        <div className="mt-3.5">
                          <span className="text-sm font-medium text-cyan-300">{current.brand}</span>
                          <h3 className="mt-1 text-[25px] font-bold leading-[1.08] text-white transition-colors group-hover:text-cyan-200">
                            {current.name}
                          </h3>
                        </div>

                        <div className="mt-2.5 flex items-center gap-1.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className="size-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-0.5 text-xs text-zinc-500">
                            {current.score >= 90 ? "5.0" : current.score >= 80 ? "4.5" : "4.0"}
                          </span>
                        </div>

                        {/* AI Reason */}
                        <p className="mt-2.5 max-w-[280px] text-[13px] leading-5 text-zinc-300/80 line-clamp-2">
                          {productReasons[current.name] ?? "Top-rated flagship with outstanding performance."}
                        </p>

                        {/* Spec chips */}
                        {spec && (
                          <div className="mt-2.5 flex flex-wrap gap-1.5">
                            <span className="inline-flex items-center gap-1 rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-0.5 text-[10px] text-zinc-400">
                              <span className="text-[10px]">⚡</span> {spec.chip}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-0.5 text-[10px] text-zinc-400">
                              <span className="text-[10px]">📱</span> {spec.display}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-0.5 text-[10px] text-zinc-400">
                              <span className="text-[10px]">📷</span> {spec.camera}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Mini score bars */}
                      <div className="mt-2.5 space-y-1">
                        <MiniBar label="Camera" value={scores.camera} color="bg-purple-400" />
                        <MiniBar label="Battery" value={scores.battery} color="bg-emerald-400" />
                        <MiniBar label="Display" value={scores.display} color="bg-blue-400" />
                        <MiniBar label="Gaming" value={scores.gaming} color="bg-cyan-400" />
                      </div>

                      <div>
                        <div className="mt-3 text-[22px] font-bold tracking-tight text-white">{current.price}</div>

                        {/* View details — appears on hover */}
                        <div className="mt-2 flex items-center gap-2">
                          <span className="inline-flex h-[34px] items-center justify-center gap-1.5 rounded-lg border border-white/[0.10] bg-white/[0.06] px-3.5 text-xs font-medium text-white/70 transition-all duration-300 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10 group-hover:text-cyan-300">
                            View Details
                            <svg className="size-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                          </span>
                          <span className="text-[11px] text-zinc-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            Full specs & review
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right side — product image */}
                    <div className="relative hidden w-[230px] shrink-0 sm:block">
                      {current.imageUrl ? (
                        <div className="relative flex min-h-[280px] flex-1 items-center justify-center">
                          <div className="absolute h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />
                          <div className="absolute h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl" />
                          <img
                            src={current.imageUrl}
                            alt={`${current.brand} ${current.name}`}
                            className="relative z-10 max-h-[235px] w-auto object-contain drop-shadow-[0_28px_34px_rgba(0,0,0,0.65)] transition duration-500 group-hover:scale-[1.04] phone-float"
                          />
                          {/* Premium smartphone dock */}
                          <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center">
                            <div className="h-2 w-14 rounded-full bg-gradient-to-b from-cyan-400/15 via-purple-500/10 to-transparent blur-[3px]" />
                            <div className="-mt-1 h-2.5 w-10 rounded-full bg-gradient-to-b from-zinc-500 to-zinc-800 border border-white/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.4)]" />
                            <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                          </div>
                        </div>
                      ) : (
                        <div className="relative flex min-h-[280px] flex-1 items-center justify-center">
                          <div className="absolute h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />
                          <div className="absolute h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl" />
                          <div className="phone-float"><FeaturedPhoneFallback /></div>
                          {/* Premium smartphone dock */}
                          <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center">
                            <div className="h-2 w-14 rounded-full bg-gradient-to-b from-cyan-400/15 via-purple-500/10 to-transparent blur-[3px]" />
                            <div className="-mt-1 h-2.5 w-10 rounded-full bg-gradient-to-b from-zinc-500 to-zinc-800 border border-white/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.4)]" />
                            <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>

              {/* Dots */}
              {items.length > 1 && (
                <div className="mt-3 flex items-center justify-center gap-2">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`relative h-2 rounded-full transition-all duration-500 ${
                        i === index
                          ? "w-8 bg-cyan-400/30"
                          : "w-2 bg-white/[0.15] hover:bg-white/30"
                      }`}
                    >
                      {i === index && (
                        <div
                          key={`${slideKey}-${i}`}
                          className={`absolute inset-0 rounded-full bg-cyan-400 ${!paused ? "dot-pulse" : ""}`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Auto-rotation indicator */}
              {!paused && items.length > 1 && (
                <div className="mt-2 flex items-center justify-center gap-1.5">
                  <span className="inline-block size-1 rounded-full bg-cyan-400/50 animate-pulse" />
                  <span className="text-[10px] text-zinc-600">Auto-rotating</span>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="inline-flex h-[42px] items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 px-5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(34,211,238,0.35)] transition-all hover:opacity-90"
            >
              Browse Products
              <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </Link>

            <Link
              href="/compare"
              className="inline-flex h-[42px] items-center justify-center gap-2 rounded-lg border border-white/[0.10] bg-white/[0.04] px-5 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Compare Now
              <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function scoreLabel(score: number) {
  if (!(score > 0 && Number.isFinite(score))) return "N/A"
  if (score >= 90) return "Excellent"
  if (score >= 80) return "Great"
  if (score >= 70) return "Good"
  return "Fair"
}

function ScoreRingBig({ score }: { score: number }) {
  const valid = score > 0 && Number.isFinite(score)
  const color = score >= 90 ? "stroke-emerald-400" : score >= 80 ? "stroke-cyan-400" : score >= 70 ? "stroke-blue-400" : "stroke-zinc-500"
  const r = 26
  const c = 2 * Math.PI * r
  const offset = valid ? c - (score / 100) * c : 0
  return (
    <div className="relative flex size-[62px] items-center justify-center">
      {valid ? (
        <svg className="absolute inset-0 size-[62px] -rotate-90" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
          <circle cx="30" cy="30" r={r} fill="none" className={color} strokeWidth="3" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 0.8s ease" }} />
        </svg>
      ) : (
        <div className="absolute inset-0 size-[62px] rounded-full bg-white/[0.03]" />
      )}
      <span className="text-base font-extrabold text-white">{valid ? score : "N/A"}</span>
    </div>
  )
}
