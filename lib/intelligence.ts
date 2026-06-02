import type { Product } from "./types"
import { rankByIntent, type RankingIntent } from "./ranking"

export interface ParsedIntent {
  intent: string | null
  category: string | null
  maxPrice: number | null
}

export interface RankedResult {
  product: Product
  reason: string
  score: number
}

const intentKeywords: Record<string, string[]> = {
  camera: ["camera", "photo", "photography", "selfie", "video", "vlogging"],
  battery: ["battery", "autonomy", "battery life", "long lasting", "charge"],
  gaming: ["gaming", "game", "performance", "fast", "speed", "processor"],
  display: ["display", "screen", "oled", "amoled", "resolution", "bright"],
  value: ["value", "cheap", "budget", "affordable", "deal", "worth"],
}

const categoryKeywords: Record<string, string[]> = {
  smartphones: ["phone", "smartphone", "iphone", "android", "mobile"],
  "foldable-smartphones": ["foldable", "fold", "folding", "flip"],
}

export function parseIntent(query: string): ParsedIntent {
  const lower = query.toLowerCase()

  let intent: string | null = null
  for (const [key, keywords] of Object.entries(intentKeywords)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      intent = key
      break
    }
  }

  let category: string | null = null
  for (const [cat, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      category = cat
      break
    }
  }

  const priceMatch = lower.match(/(?:under|below|less than|max|budget|up to)\s*\$?\s*(\d+)/)
  const maxPrice = priceMatch ? Number.parseInt(priceMatch[1], 10) : null

  return { intent, category, maxPrice }
}

function mapToRankingIntent(intent: string | null): RankingIntent {
  switch (intent) {
    case "camera": return "best-camera"
    case "battery": return "best-battery"
    case "gaming": return "best-gaming"
    case "value": return "best-value"
    default: return "best-overall"
  }
}

function hasPrice(product: Product): boolean {
  return product.price > 0
}

export function rankProducts(
  products: Product[],
  parsed: ParsedIntent
): RankedResult[] {
  const { intent, category, maxPrice } = parsed

  let filtered = products

  if (category) {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    )
  }

  if (maxPrice !== null) {
    filtered = filtered.filter((p) => hasPrice(p) && p.price <= maxPrice)
  }

  const rankingIntent = mapToRankingIntent(intent)
  const ranked = rankByIntent(filtered, rankingIntent)

  return ranked.slice(0, 10).map((r) => ({
    product: r.product,
    reason: r.reason,
    score: Math.round(r.rankScore * 10) / 10,
  }))
}
