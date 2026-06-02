import type { Product } from "./types"

const categoryLabels: Record<string, string> = {
  smartphones: "Smartphone",
  "foldable-smartphones": "Foldable Smartphone",
}

function isValidScore(value: number): boolean {
  return typeof value === "number" && Number.isFinite(value) && value > 0
}

function formatPrice(product: Product): string {
  if (product.price > 0) {
    return `$${product.price.toFixed(0)} ${product.currency}`
  }
  return "Price N/A"
}

function formatScore(value: number, label: string): string {
  if (isValidScore(value)) {
    return `${label}: ${Math.round(value)}/100`
  }
  return `${label}: N/A`
}

export function buildProductDocument(product: Product): string {
  const parts: string[] = []

  const categoryLabel = categoryLabels[product.category] ?? product.category

  parts.push(`${product.brand} ${product.name}`)
  parts.push(`Category: ${categoryLabel}`)

  if (product.description) {
    parts.push("")
    parts.push(product.description)
  }

  parts.push("")
  parts.push(`Price: ${formatPrice(product)}`)

  const hasAnyScore = isValidScore(product.scores.overall) ||
    isValidScore(product.scores.gaming) ||
    isValidScore(product.scores.camera) ||
    isValidScore(product.scores.battery) ||
    isValidScore(product.scores.display) ||
    isValidScore(product.scores.value)

  if (hasAnyScore) {
    parts.push("")
    parts.push("Scores:")
    if (isValidScore(product.scores.overall)) {
      parts.push(`  Overall: ${Math.round(product.scores.overall)}/100`)
    }
    if (isValidScore(product.scores.camera)) {
      parts.push(`  Camera: ${Math.round(product.scores.camera)}/100`)
    }
    if (isValidScore(product.scores.battery)) {
      parts.push(`  Battery: ${Math.round(product.scores.battery)}/100`)
    }
    if (isValidScore(product.scores.gaming)) {
      parts.push(`  Gaming: ${Math.round(product.scores.gaming)}/100`)
    }
    if (isValidScore(product.scores.display)) {
      parts.push(`  Display: ${Math.round(product.scores.display)}/100`)
    }
    if (isValidScore(product.scores.value)) {
      parts.push(`  Value: ${Math.round(product.scores.value)}/100`)
    }
  }

  const specEntries = Object.entries(product.specs)
  if (specEntries.length > 0) {
    parts.push("")
    parts.push("Key Specifications:")
    for (const [key, value] of specEntries) {
      parts.push(`  ${key}: ${value}`)
    }
  }

  if (product.pros.length > 0) {
    parts.push("")
    parts.push("Pros:")
    for (const pro of product.pros) {
      parts.push(`  + ${pro}`)
    }
  }

  if (product.cons.length > 0) {
    parts.push("")
    parts.push("Cons:")
    for (const con of product.cons) {
      parts.push(`  - ${con}`)
    }
  }

  return parts.join("\n")
}
