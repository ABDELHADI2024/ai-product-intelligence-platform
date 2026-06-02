import type { Product } from "./types"
import { buildProductDocument } from "./product-document"

export interface ProductChunkMetadata {
  slug: string
  name: string
  brand: string
  category: string
  price: number
  overall_score: number
}

export interface ProductDocumentChunk {
  chunk_index: number
  chunk_text: string
  metadata: ProductChunkMetadata
}

export interface ChunkOptions {
  maxChunkSize?: number
  overlapChars?: number
}

const SECTION_BOUNDARIES = [
  "Key Specifications:",
  "Pros:",
  "Cons:",
]

function buildChunkMetadata(product: Product): ProductChunkMetadata {
  return {
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    category: product.category,
    price: product.price > 0 ? product.price : 0,
    overall_score: product.scores.overall,
  }
}

function splitBySections(text: string): string[] {
  const lines = text.split("\n")
  const sections: string[] = []
  let current: string[] = []

  for (const line of lines) {
    const isBoundary = SECTION_BOUNDARIES.some((b) => line.trim() === b)
    if (isBoundary && current.length > 0) {
      sections.push(current.join("\n"))
      current = [line]
    } else {
      current.push(line)
    }
  }

  if (current.length > 0) {
    sections.push(current.join("\n"))
  }

  return sections
}

export function chunkProductDocument(
  documentText: string,
  product: Product,
  options?: ChunkOptions
): ProductDocumentChunk[] {
  const maxChunkSize = options?.maxChunkSize ?? 800
  const metadata = buildChunkMetadata(product)

  if (documentText.length <= maxChunkSize) {
    return [
      {
        chunk_index: 0,
        chunk_text: documentText,
        metadata,
      },
    ]
  }

  const sections = splitBySections(documentText)
  const chunks: ProductDocumentChunk[] = []
  let chunkIndex = 0
  let buffer = ""

  for (const section of sections) {
    if (buffer.length + section.length + 1 > maxChunkSize && buffer.length > 0) {
      chunks.push({
        chunk_index: chunkIndex++,
        chunk_text: buffer.trim(),
        metadata,
      })
      buffer = section
    } else {
      if (buffer.length > 0) buffer += "\n"
      buffer += section
    }
  }

  if (buffer.trim().length > 0) {
    chunks.push({
      chunk_index: chunkIndex,
      chunk_text: buffer.trim(),
      metadata,
    })
  }

  return chunks
}

export function buildProductDocumentChunks(
  product: Product,
  options?: ChunkOptions
): ProductDocumentChunk[] {
  const documentText = buildProductDocument(product)
  return chunkProductDocument(documentText, product, options)
}
