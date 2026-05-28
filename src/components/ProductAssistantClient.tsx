"use client"

import Link from "next/link"
import { useState, useRef, useEffect, type FormEvent } from "react"

interface SearchResult {
  name: string
  slug: string
  brand: string
  category: string
  price: number
  priceAvailable: boolean
  currency: string
  scores: {
    overall: number
    gaming: number
    camera: number
    battery: number
    display: number
    value: number
  }
  reason: string
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

interface Message {
  role: "user" | "assistant"
  content: string
  results?: SearchResult[]
  intent?: {
    intent: string | null
    category: string | null
    maxPrice: number | null
  }
}

const examples = [
  "Best camera phone for travel under 900",
  "Best battery phone for all-day use",
  "Best gaming phone under 700",
  "Best value flagship for students",
  "Best foldable phone for productivity",
]

function ScoreBadge({ label, value }: { label: string; value: number }) {
  const valid = value > 0 && Number.isFinite(value)
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-zinc-800/60 px-2 py-0.5 text-[11px] text-zinc-400">
      {label} {valid ? value : "N/A"}
    </span>
  )
}

function formatCurrency(price: number, currency: string): string {
  if (currency === "MAD") return `${price.toLocaleString()} MAD`
  return `$${price.toLocaleString()}`
}

export default function ProductAssistantClient() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I can help you find the perfect product. Our database currently focuses on smartphones and foldable smartphones. Try asking about battery, camera, gaming, or display \u2014 with or without a budget.",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  async function handleSend(q: string) {
    const query = q.trim()
    if (!query || loading) return

    setInput("")
    setError(null)

    const userMsg: Message = { role: "user", content: query }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    try {
      const res = await fetch(`/api/intelligence/search?q=${encodeURIComponent(query)}`)
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error ?? `Request failed (${res.status})`)
      }
      const data: SearchResponse = await res.json()

      let content = ""
      const parts: string[] = []

      if (data.count === 0) {
        content = data.detectedIntent.category
          ? "I don't have enough products in that category yet. Try smartphones or foldable smartphones."
          : "I couldn't find any products matching that description. Try being more specific or browse all products."
      } else {
        if (data.detectedIntent.intent) {
          parts.push(`I found some great options focusing on **${data.detectedIntent.intent}**`)
          if (data.detectedIntent.maxPrice) {
            parts.push(`under **$${data.detectedIntent.maxPrice}**`)
          }
          parts.push(":")
        } else {
          parts.push("Here are the top recommendations")
          if (data.detectedIntent.maxPrice) {
            parts.push(`under **$${data.detectedIntent.maxPrice}**`)
          }
          parts.push(":")
        }
        content = parts.join(" ") + "\n"
      }

      const assistantMsg: Message = {
        role: "assistant",
        content,
        results: data.results.slice(0, 3),
        intent: data.detectedIntent,
      }
      setMessages((prev) => [...prev, assistantMsg])
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    handleSend(input)
  }

  function handleChipClick(q: string) {
    handleSend(q)
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col px-4 sm:px-6 lg:px-8">
      {/* Chat container */}
      <div className="flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02]">
        {/* Messages area */}
        <div className="flex max-h-[540px] min-h-[320px] flex-col gap-4 overflow-y-auto p-4 sm:p-6">
          {messages.map((msg, i) => (
            <div key={i}>
              {msg.role === "user" ? (
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 px-4 py-2.5 text-sm text-white shadow-lg">
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20">
                      <svg className="size-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="whitespace-pre-line text-sm leading-relaxed text-zinc-300">
                        {msg.content}
                      </p>

                      {/* Intent badges */}
                      {msg.intent && (msg.intent.intent || msg.intent.category || msg.intent.maxPrice) && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {msg.intent.intent && (
                            <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-medium text-blue-300">
                              {msg.intent.intent}
                            </span>
                          )}
                          {msg.intent.category && (
                            <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-0.5 text-[11px] font-medium text-purple-300">
                              {msg.intent.category}
                            </span>
                          )}
                          {msg.intent.maxPrice && (
                            <span className="rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-0.5 text-[11px] font-medium text-green-300">
                              under ${msg.intent.maxPrice}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Recommendation cards */}
                      {msg.results && msg.results.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {msg.results.map((item, j) => (
                            <Link
                              key={item.slug}
                              href={`/products/${item.slug}`}
                              className="group flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 transition-all hover:border-white/10 hover:bg-white/[0.06]"
                            >
                              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-zinc-800 text-[11px] font-bold text-zinc-500">
                                {j + 1}
                              </span>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                                    {item.brand}
                                  </span>
                                  <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-500">
                                    {item.category}
                                  </span>
                                </div>
                                <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                                  {item.name}
                                </p>
                                <p className="mt-0.5 text-xs text-zinc-500">
                                  {item.reason}
                                </p>
                                <div className="mt-1.5 flex flex-wrap gap-1">
                                  <ScoreBadge label="Overall" value={item.scores.overall} />
                                  <ScoreBadge label="Gaming" value={item.scores.gaming} />
                                  <ScoreBadge label="Camera" value={item.scores.camera} />
                                  <ScoreBadge label="Battery" value={item.scores.battery} />
                                </div>
                              </div>
                              <div className="shrink-0 text-right">
                                {item.priceAvailable ? (
                                  <p className="text-sm font-semibold text-white">
                                    {formatCurrency(item.price, item.currency)}
                                  </p>
                                ) : (
                                  <p className="text-[11px] text-zinc-600">N/A</p>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20">
                <svg className="size-3.5 animate-spin text-blue-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
              <p className="text-sm text-zinc-500">Analyzing products...</p>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                <svg className="size-3.5 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
              </div>
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Example chips */}
        {messages.length <= 1 && !loading && (
          <div className="flex flex-wrap gap-2 border-t border-white/[0.06] px-4 pb-4 pt-3 sm:px-6">
            {examples.map((ex) => (
              <button
                key={ex}
                onClick={() => handleChipClick(ex)}
                className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-zinc-400 transition-all hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-300"
              >
                {ex}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="border-t border-white/[0.06] p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 transition-all focus-within:border-blue-500/50 focus-within:shadow-lg focus-within:shadow-blue-500/10">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about any product..."
                className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder-zinc-600 outline-none"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-600 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
