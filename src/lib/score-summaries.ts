import type { Product } from "./types"

export interface ScoreSummary {
  label: string
  raw: number
  valid: boolean
  tier: string
  summary: string
}

const SCORE_TIERS = [
  { label: "Excellent", min: 90, max: 100 },
  { label: "Great", min: 80, max: 89 },
  { label: "Good", min: 70, max: 79 },
  { label: "Fair", min: 0, max: 69 },
]

function isValidScore(value: number): boolean {
  return typeof value === "number" && Number.isFinite(value) && value > 0
}

function getTierLabel(score: number): string {
  for (const tier of SCORE_TIERS) {
    if (score >= tier.min && score <= tier.max) return tier.label
  }
  return "Fair"
}

function summarizeScore(label: string, score: number): ScoreSummary {
  if (!isValidScore(score)) {
    return {
      label,
      raw: score,
      valid: false,
      tier: "N/A",
      summary: `${label} score is not available.`,
    }
  }

  const tier = getTierLabel(score)
  const rounded = Math.round(score)

  const tierDescriptions: Record<string, string> = {
    Excellent: `Outstanding ${label.toLowerCase()} performance with a score of ${rounded}/100.`,
    Great: `Strong ${label.toLowerCase()} performance with a score of ${rounded}/100.`,
    Good: `Solid ${label.toLowerCase()} performance with a score of ${rounded}/100.`,
    Fair: `Moderate ${label.toLowerCase()} performance with a score of ${rounded}/100.`,
  }

  return {
    label,
    raw: score,
    valid: true,
    tier,
    summary: tierDescriptions[tier] ?? `${label}: ${rounded}/100.`,
  }
}

export interface ScoreSummaries {
  overall: ScoreSummary
  camera: ScoreSummary
  battery: ScoreSummary
  gaming: ScoreSummary
  display: ScoreSummary
  value: ScoreSummary
}

export function buildScoreSummaries(product: Product): ScoreSummaries {
  return {
    overall: summarizeScore("Overall", product.scores.overall),
    camera: summarizeScore("Camera", product.scores.camera),
    battery: summarizeScore("Battery", product.scores.battery),
    gaming: summarizeScore("Gaming", product.scores.gaming),
    display: summarizeScore("Display", product.scores.display),
    value: summarizeScore("Value", product.scores.value),
  }
}

export function buildScoreSummariesArray(product: Product): ScoreSummary[] {
  const summaries = buildScoreSummaries(product)
  return [
    summaries.overall,
    summaries.camera,
    summaries.battery,
    summaries.gaming,
    summaries.display,
    summaries.value,
  ]
}
