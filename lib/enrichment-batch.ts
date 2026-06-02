import type { Product } from "./types"
import { buildProductEnrichmentProfile } from "./product-enrichment"
import { buildProductDocument } from "./product-document"
import { buildProductDocumentChunks, type ProductDocumentChunk } from "./product-chunker"

const SOURCE_VERSION = "18-b"

export interface ProductIntelligenceRow {
  product_id: string
  slug: string
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
  source_version: string
}

export interface ProductDocumentRow {
  product_id: string
  slug: string
  document_text: string
  metadata: {
    name: string
    brand: string
    category: string
    price: number
    overall_score: number
    camera_score: number
    battery_score: number
    gaming_score: number
    display_score: number
    value_score: number
  }
  chunks: ProductDocumentChunk[]
  source_version: string
}

export interface BatchEnrichmentResult {
  generated_at: string
  source_version: string
  product_count: number
  intelligence_rows: ProductIntelligenceRow[]
  document_rows: ProductDocumentRow[]
}

function buildMetadata(product: Product): ProductDocumentRow["metadata"] {
  return {
    name: product.name,
    brand: product.brand,
    category: product.category,
    price: product.price > 0 ? product.price : 0,
    overall_score: product.scores.overall,
    camera_score: product.scores.camera,
    battery_score: product.scores.battery,
    gaming_score: product.scores.gaming,
    display_score: product.scores.display,
    value_score: product.scores.value,
  }
}

export function buildProductIntelligenceRow(product: Product): ProductIntelligenceRow {
  const profile = buildProductEnrichmentProfile(product)

  return {
    product_id: product.id,
    slug: product.slug,
    product_summary: profile.product_summary,
    buying_verdict: profile.buying_verdict,
    best_for: profile.best_for,
    not_best_for: profile.not_best_for,
    strengths: profile.strengths,
    weaknesses: profile.weaknesses,
    ai_tags: profile.ai_tags,
    use_cases: profile.use_cases,
    buyer_persona: profile.buyer_persona,
    data_quality_score: profile.data_quality_score,
    data_quality_level: profile.data_quality_level,
    source_version: SOURCE_VERSION,
  }
}

export function buildProductDocumentRow(product: Product): ProductDocumentRow {
  return {
    product_id: product.id,
    slug: product.slug,
    document_text: buildProductDocument(product),
    metadata: buildMetadata(product),
    chunks: buildProductDocumentChunks(product),
    source_version: SOURCE_VERSION,
  }
}

export function buildBatchEnrichment(products: Product[]): BatchEnrichmentResult {
  const intelligence_rows: ProductIntelligenceRow[] = []
  const document_rows: ProductDocumentRow[] = []

  for (const product of products) {
    intelligence_rows.push(buildProductIntelligenceRow(product))
    document_rows.push(buildProductDocumentRow(product))
  }

  return {
    generated_at: new Date().toISOString(),
    source_version: SOURCE_VERSION,
    product_count: products.length,
    intelligence_rows,
    document_rows,
  }
}
