import type { Product } from "./types"
import { evaluateProductDataQuality } from "./data-quality"

export interface ProductEnrichmentProfile {
  product_summary: string
  buying_verdict: string
  best_for: string[]
  not_best_for: string[]
  strengths: string[]
  weaknesses: string[]
  ai_tags: string[]
  use_cases: string[]
  buyer_persona: string
  data_quality_score: number
  data_quality_level: "excellent" | "good" | "fair" | "poor"
}

function isValidScore(value: number): boolean {
  return typeof value === "number" && Number.isFinite(value) && value > 0
}

function getScoreTierLabel(score: number): string {
  if (!isValidScore(score)) return "N/A"
  if (score >= 90) return "Excellent"
  if (score >= 80) return "Great"
  if (score >= 70) return "Good"
  return "Fair"
}

function buildProductSummary(product: Product): string {
  const parts: string[] = [`${product.brand} ${product.name}`]
  parts.push(`a ${product.category === "foldable" ? "foldable " : ""}smartphone`)

  if (isValidScore(product.scores.overall)) {
    const rounded = Math.round(product.scores.overall)
    if (rounded >= 95) parts.push("with best-in-class overall performance")
    else if (rounded >= 90) parts.push("with excellent overall performance")
    else if (rounded >= 80) parts.push("with strong overall performance")
    else if (rounded >= 70) parts.push("with solid overall performance")
    else parts.push("with decent performance")
  }

  if (product.description) {
    const short = product.description.length > 120
      ? product.description.slice(0, 120).replace(/\s+\S*$/, "") + "…"
      : product.description
    parts.push(`— ${short}`)
  }

  return parts.join(" ")
}

function buildBuyingVerdict(product: Product): string {
  const parts: string[] = []

  if (isValidScore(product.scores.overall)) {
    const rounded = Math.round(product.scores.overall)
    if (rounded >= 95) {
      parts.push("Best-in-class choice for buyers seeking the absolute best.")
    } else if (rounded >= 90) {
      parts.push("Excellent choice for premium buyers.")
    } else if (rounded >= 85) {
      parts.push("Great all-rounder with competitive strengths.")
    } else {
      parts.push("Solid option in its segment.")
    }
  } else {
    parts.push("Consider this product based on your specific needs.")
  }

  const bestFor = buildBestFor(product)
  const meaningful = bestFor.filter((b) => b !== "General use")
  if (meaningful.length > 0) {
    parts.push(`Best for: ${meaningful.slice(0, 2).join(", ")}.`)
  }

  if (isValidScore(product.scores.value) && product.scores.value < 80) {
    parts.push("Premium pricing — verify value against alternatives.")
  }

  if (!(product.price > 0)) {
    parts.push("No confirmed pricing — verify with retailer.")
  }

  return parts.join(" ")
}

function buildBestFor(product: Product): string[] {
  const best: string[] = []
  if (isValidScore(product.scores.gaming) && product.scores.gaming >= 90) best.push("Mobile gamers")
  if (isValidScore(product.scores.camera) && product.scores.camera >= 90) best.push("Photography enthusiasts")
  if (isValidScore(product.scores.battery) && product.scores.battery >= 90) best.push("Heavy daily users")
  if (isValidScore(product.scores.value) && product.scores.value >= 90) best.push("Value-focused buyers")
  if (isValidScore(product.scores.display) && product.scores.display >= 90) best.push("Media and streaming users")
  if (product.category === "foldable") best.push("Multitaskers and power users")
  if (best.length === 0) best.push("General use")
  return best
}

function buildNotBestFor(product: Product): string[] {
  const notBest: string[] = []
  if (isValidScore(product.scores.gaming) && product.scores.gaming < 80) notBest.push("Mobile gamers")
  if (isValidScore(product.scores.camera) && product.scores.camera < 80) notBest.push("Photography enthusiasts")
  if (isValidScore(product.scores.battery) && product.scores.battery < 80) notBest.push("Heavy daily users")
  if (isValidScore(product.scores.value) && product.scores.value < 80) notBest.push("Value-focused buyers")
  if (isValidScore(product.scores.display) && product.scores.display < 80) notBest.push("Media and streaming users")
  if (product.price > 1500) notBest.push("Budget-conscious buyers")
  if (!(product.price > 0)) notBest.push("Buyers who need confirmed pricing")
  return notBest
}

function buildStrengths(product: Product): string[] {
  const strengths: string[] = []
  const scoreFields: [string, number][] = [
    ["Camera", product.scores.camera],
    ["Battery", product.scores.battery],
    ["Gaming", product.scores.gaming],
    ["Display", product.scores.display],
    ["Value", product.scores.value],
  ]
  const valid = scoreFields
    .filter(([, s]) => isValidScore(s))
    .sort(([, a], [, b]) => b - a)
  for (const [label] of valid.slice(0, 3)) {
    strengths.push(`Top-tier ${label.toLowerCase()} performance`)
  }
  if (product.pros.length > 0) {
    strengths.push(...product.pros.slice(0, 2))
  }
  return strengths.slice(0, 5)
}

function buildWeaknesses(product: Product): string[] {
  const weaknesses: string[] = []
  const scoreFields: [string, number][] = [
    ["Camera", product.scores.camera],
    ["Battery", product.scores.battery],
    ["Gaming", product.scores.gaming],
    ["Display", product.scores.display],
    ["Value", product.scores.value],
  ]
  const valid = scoreFields
    .filter(([, s]) => isValidScore(s))
    .sort(([, a], [, b]) => a - b)
  for (const [label] of valid.slice(0, 2)) {
    weaknesses.push(`Below-average ${label.toLowerCase()} score`)
  }
  if (product.cons.length > 0) {
    weaknesses.push(...product.cons.slice(0, 3))
  }

  const quality = evaluateProductDataQuality(product)
  if (quality.level === "poor" || quality.level === "fair") {
    weaknesses.push("Limited visual or data completeness")
  }

  return weaknesses.slice(0, 5)
}

function buildAITags(product: Product): string[] {
  const tags: string[] = []

  if (product.category === "foldable") {
    tags.push("foldable")
  } else {
    tags.push("smartphone")
  }

  tags.push(product.brand.toLowerCase())

  if (isValidScore(product.scores.overall)) {
    const rounded = Math.round(product.scores.overall)
    if (rounded >= 95) tags.push("best-in-class")
    else if (rounded >= 85) tags.push("flagship")
    else if (rounded >= 75) tags.push("mid-range")
    else tags.push("budget")
  }

  if (isValidScore(product.scores.gaming) && product.scores.gaming >= 85) tags.push("gaming")
  if (isValidScore(product.scores.camera) && product.scores.camera >= 85) tags.push("camera-phone")
  if (isValidScore(product.scores.battery) && product.scores.battery >= 85) tags.push("long-battery")
  if (isValidScore(product.scores.display) && product.scores.display >= 85) tags.push("great-display")
  if (isValidScore(product.scores.value) && product.scores.value >= 85) tags.push("great-value")

  if (product.price > 1000) tags.push("premium")
  else if (product.price > 0 && product.price <= 700) tags.push("affordable")

  if (product.pros.length >= 3) tags.push("well-reviewed")

  return [...new Set(tags)]
}

function buildUseCases(product: Product): string[] {
  const useCases: string[] = []

  if (product.category === "foldable") {
    useCases.push("Multitasking and split-screen productivity")
    useCases.push("Large-screen media consumption on the go")
  }

  if (isValidScore(product.scores.gaming) && product.scores.gaming >= 85) {
    useCases.push("High-performance mobile gaming")
  }
  if (isValidScore(product.scores.camera) && product.scores.camera >= 85) {
    useCases.push("Professional-grade photography and videography")
  }
  if (isValidScore(product.scores.battery) && product.scores.battery >= 85) {
    useCases.push("All-day usage without recharging")
  }
  if (isValidScore(product.scores.display) && product.scores.display >= 85) {
    useCases.push("Streaming and content creation")
  }
  if (isValidScore(product.scores.value) && product.scores.value >= 85) {
    useCases.push("Cost-effective flagship experience")
  }

  return useCases.slice(0, 5)
}

function buildBuyerPersona(product: Product): string {
  const segments: string[] = []

  if (product.price > 1000) {
    segments.push("premium buyer")
  } else if (product.price > 700) {
    segments.push("mid-range buyer")
  } else if (product.price > 0) {
    segments.push("budget-conscious buyer")
  } else {
    segments.push("informed buyer")
  }

  const highScores: string[] = []
  if (isValidScore(product.scores.gaming) && product.scores.gaming >= 85) highScores.push("gaming")
  if (isValidScore(product.scores.camera) && product.scores.camera >= 85) highScores.push("photography")
  if (isValidScore(product.scores.battery) && product.scores.battery >= 85) highScores.push("battery life")
  if (isValidScore(product.scores.display) && product.scores.display >= 85) highScores.push("display quality")

  if (highScores.length > 0) {
    segments.push(`prioritizes ${highScores.slice(0, 2).join(" and ")}`)
  }

  if (product.category === "foldable") {
    segments.push("wants a foldable form factor")
  }

  const tierLabel = getScoreTierLabel(product.scores.overall)
  if (tierLabel === "Excellent") segments.push("expects top-tier quality")
  else if (tierLabel === "Great") segments.push("seeks reliable performance")

  return segments.length > 0
    ? `A ${segments.join(", ")}.`
    : "A general smartphone buyer."
}

export function buildProductEnrichmentProfile(product: Product): ProductEnrichmentProfile {
  const quality = evaluateProductDataQuality(product)

  return {
    product_summary: buildProductSummary(product),
    buying_verdict: buildBuyingVerdict(product),
    best_for: buildBestFor(product),
    not_best_for: buildNotBestFor(product),
    strengths: buildStrengths(product),
    weaknesses: buildWeaknesses(product),
    ai_tags: buildAITags(product),
    use_cases: buildUseCases(product),
    buyer_persona: buildBuyerPersona(product),
    data_quality_score: quality.score,
    data_quality_level: quality.level,
  }
}

export {
  buildProductSummary,
  buildBuyingVerdict,
  buildBestFor,
  buildNotBestFor,
  buildStrengths,
  buildWeaknesses,
  buildAITags,
  buildUseCases,
  buildBuyerPersona,
}
