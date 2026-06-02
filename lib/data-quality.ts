import type { Product } from "./types"

export interface DataQualityResult {
  total: number
  present: number
  missing: string[]
  score: number
  level: "excellent" | "good" | "fair" | "poor"
}

function isValidScore(value: number): boolean {
  return typeof value === "number" && Number.isFinite(value) && value > 0
}

export function evaluateProductDataQuality(product: Product): DataQualityResult {
  const missing: string[] = []

  if (!product.brand) missing.push("brand")
  if (!product.description || product.description.length < 20) missing.push("description")
  if (!product.image || product.image === "/images/placeholder.svg") missing.push("image")
  if (!(product.price > 0)) missing.push("price")
  if (!isValidScore(product.scores.camera)) missing.push("camera_score")
  if (!isValidScore(product.scores.battery)) missing.push("battery_score")
  if (!isValidScore(product.scores.gaming)) missing.push("gaming_score")
  if (!isValidScore(product.scores.display)) missing.push("display_score")
  if (!isValidScore(product.scores.value)) missing.push("value_score")
  if (!Array.isArray(product.pros) || product.pros.length < 2) missing.push("pros")
  if (!Array.isArray(product.cons) || product.cons.length < 2) missing.push("cons")

  const specCount = Object.keys(product.specs).length
  if (specCount < 5) missing.push("specs")

  const total = 13
  const present = total - missing.length
  const score = Math.round((present / total) * 100)

  let level: DataQualityResult["level"] = "excellent"
  if (score < 50) level = "poor"
  else if (score < 70) level = "fair"
  else if (score < 90) level = "good"

  return { total, present, missing, score, level }
}
