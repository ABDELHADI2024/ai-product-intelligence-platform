import type { Product } from "./types"

export type RankingIntent =
  | "best-overall"
  | "best-camera"
  | "best-battery"
  | "best-gaming"
  | "best-value"
  | "best-foldable"

export interface RankingBreakdown {
  overall: number
  gaming: number
  camera: number
  battery: number
  display: number
  value: number
}

export interface RankedProduct {
  product: Product
  intent: RankingIntent
  rankScore: number
  breakdown: RankingBreakdown
  reason: string
}

export interface ScoreTier {
  label: "Excellent" | "Great" | "Good" | "Fair"
  min: number
  max: number
}

type ScoreKey = keyof Product["scores"]
type WeightMap = Record<ScoreKey, number>

export const WEIGHTS: Record<RankingIntent, WeightMap> = {
  "best-overall": {
    overall: 0.40,
    gaming: 0.12,
    camera: 0.12,
    battery: 0.12,
    display: 0.12,
    value: 0.12,
  },
  "best-camera": {
    overall: 0.15,
    gaming: 0,
    camera: 0.50,
    battery: 0.10,
    display: 0.15,
    value: 0.10,
  },
  "best-battery": {
    overall: 0.15,
    gaming: 0.05,
    camera: 0,
    battery: 0.55,
    display: 0.10,
    value: 0.15,
  },
  "best-gaming": {
    overall: 0.10,
    gaming: 0.45,
    camera: 0,
    battery: 0.15,
    display: 0.25,
    value: 0.05,
  },
  "best-value": {
    overall: 0.20,
    gaming: 0.05,
    camera: 0.10,
    battery: 0.10,
    display: 0.05,
    value: 0.50,
  },
  "best-foldable": {
    overall: 0.25,
    gaming: 0.10,
    camera: 0.05,
    battery: 0.15,
    display: 0.30,
    value: 0.15,
  },
}

const SCORE_KEYS: ScoreKey[] = ["overall", "gaming", "camera", "battery", "display", "value"]

const SCORE_TIERS: ScoreTier[] = [
  { label: "Excellent", min: 90, max: 100 },
  { label: "Great", min: 80, max: 89 },
  { label: "Good", min: 70, max: 79 },
  { label: "Fair", min: 0, max: 69 },
]

function isValidScore(value: number): boolean {
  return typeof value === "number" && Number.isFinite(value) && value > 0
}

function getTierLabel(score: number): ScoreTier["label"] {
  for (const tier of SCORE_TIERS) {
    if (score >= tier.min && score <= tier.max) return tier.label
  }
  return "Fair"
}

export function scoreTier(score: number): { label: ScoreTier["label"]; raw: number } {
  return { label: getTierLabel(score), raw: score }
}

function pickTopFields(weights: WeightMap, count: number): ScoreKey[] {
  return (Object.entries(weights) as [ScoreKey, number][])
    .filter(([, w]) => w > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([key]) => key)
}

export function calculateRankScore(product: Product, intent: RankingIntent): {
  rankScore: number
  breakdown: RankingBreakdown
} {
  const weights = WEIGHTS[intent]
  const scores = product.scores

  const valid: { key: ScoreKey; weight: number; value: number }[] = []

  for (const key of SCORE_KEYS) {
    const weight = weights[key]
    if (weight <= 0) continue
    const value = scores[key]
    if (isValidScore(value)) {
      valid.push({ key, weight, value })
    }
  }

  const defaultBreakdown: RankingBreakdown = { overall: 0, gaming: 0, camera: 0, battery: 0, display: 0, value: 0 }

  if (valid.length === 0) {
    return { rankScore: 0, breakdown: defaultBreakdown }
  }

  const totalWeight = valid.reduce((sum, v) => sum + v.weight, 0)
  const normalizedWeight = totalWeight > 0 ? totalWeight : 1

  let rankScore = 0
  const breakdown = { ...defaultBreakdown }

  for (const { key, weight, value } of valid) {
    const contribution = (weight / normalizedWeight) * value
    rankScore += contribution
    breakdown[key] = Math.round(contribution * 100) / 100
  }

  return { rankScore: Math.round(rankScore * 100) / 100, breakdown }
}

export function getRankingReason(product: Product, intent: RankingIntent): string {
  const weights = WEIGHTS[intent]
  const topFields = pickTopFields(weights, 2)
  const topValues = topFields.map((key) => product.scores[key])

  const priceStr = product.price > 0 ? `at $${product.price.toLocaleString()}` : ""

  switch (intent) {
    case "best-overall": {
      if (topFields.length >= 2) {
        return `Strong all-around performer with ${topFields[0]} (${topValues[0]}) and ${topFields[1]} (${topValues[1]})${priceStr ? ` ${priceStr}` : ""}`
      }
      return `Balanced flagship with overall score ${product.scores.overall}/100${priceStr ? ` ${priceStr}` : ""}`
    }
    case "best-camera":
      return `Top camera score (${product.scores.camera}/100) with excellent display (${product.scores.display}/100)${priceStr ? ` ${priceStr}` : ""}`
    case "best-battery":
      return `Exceptional battery (${product.scores.battery}/100) and great value (${product.scores.value}/100)${priceStr ? ` ${priceStr}` : ""}`
    case "best-gaming":
      return `Optimized for gaming (${product.scores.gaming}/100) with smooth display (${product.scores.display}/100)${priceStr ? ` ${priceStr}` : ""}`
    case "best-value":
      return `Best value (${product.scores.value}/100) with solid overall score (${product.scores.overall}/100)${priceStr ? ` ${priceStr}` : ""}`
    case "best-foldable":
      return `Superior foldable display (${product.scores.display}/100) with strong overall performance (${product.scores.overall}/100)${priceStr ? ` ${priceStr}` : ""}`
  }
}

export function rankByIntent(products: Product[], intent: RankingIntent): RankedProduct[] {
  const ranked: RankedProduct[] = products.map((product) => {
    const { rankScore, breakdown } = calculateRankScore(product, intent)
    const reason = getRankingReason(product, intent)
    return { product, intent, rankScore, breakdown, reason }
  })

  return ranked.sort((a, b) => {
    const scoreDiff = b.rankScore - a.rankScore
    if (scoreDiff !== 0) return scoreDiff > 0 ? 1 : -1
    return b.product.scores.overall - a.product.scores.overall
  })
}

export function getTopByIntent(products: Product[], intent: RankingIntent, limit = 3): RankedProduct[] {
  return rankByIntent(products, intent).slice(0, limit)
}
