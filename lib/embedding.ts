// Server-only embedding utility for OpenAI text-embedding-3-small
// This module is intended for server-side use only.
// Do not import from client components.

const OPENAI_API_BASE = "https://api.openai.com/v1"

const DEFAULT_EMBEDDING_MODEL = "text-embedding-3-small"
const DEFAULT_EMBEDDING_DIMENSIONS = 1536
const DEFAULT_EMBEDDING_PRICE_PER_1M_TOKENS = 0.02
const DEFAULT_BATCH_LIMIT = 50
const MONTHLY_EMBEDDING_BUDGET_USD = 1
const MAX_BATCH_LIMIT = 50

export interface EmbeddingOptions {
  model?: string
  dimensions?: number
}

function estimateTokens(text: string): number {
  return Math.ceil(text.trim().length / 4)
}

export function estimateEmbeddingCost(inputTokens: number): number {
  return (inputTokens / 1_000_000) * DEFAULT_EMBEDDING_PRICE_PER_1M_TOKENS
}

export function estimateSearchEmbeddingCost(
  searchCount: number,
  avgTokensPerSearch = 50
): number {
  return estimateEmbeddingCost(searchCount * avgTokensPerSearch)
}

export function getEmbeddingModel(): string {
  return process.env.EMBEDDING_MODEL || DEFAULT_EMBEDDING_MODEL
}

export function getEmbeddingBatchLimit(): number {
  const raw = process.env.EMBEDDING_BATCH_LIMIT
  if (!raw) return DEFAULT_BATCH_LIMIT
  const parsed = Number.parseInt(raw, 10)
  if (Number.isNaN(parsed) || parsed < 1) return DEFAULT_BATCH_LIMIT
  return Math.min(parsed, MAX_BATCH_LIMIT)
}

export function assertEmbeddingBudget(estimatedTokens: number): void {
  const cost = estimateEmbeddingCost(estimatedTokens)
  if (cost > MONTHLY_EMBEDDING_BUDGET_USD) {
    throw new Error(
      `Estimated monthly embedding cost $${cost.toFixed(4)} exceeds budget of $${MONTHLY_EMBEDDING_BUDGET_USD}. Reduce batch size or increase MONTHLY_EMBEDDING_BUDGET_USD.`
    )
  }
}

async function createEmbedding(
  input: string,
  options?: EmbeddingOptions
): Promise<{ embedding: number[]; tokens: number }> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured")
  }

  const trimmed = input.trim()
  if (trimmed.length === 0) {
    throw new Error("Cannot generate embedding for empty string")
  }

  const model = options?.model || getEmbeddingModel()
  const dimensions = options?.dimensions || DEFAULT_EMBEDDING_DIMENSIONS

  const response = await fetch(`${OPENAI_API_BASE}/embeddings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: trimmed,
      dimensions,
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "unknown error")
    throw new Error(
      `OpenAI embedding API error (${response.status}): ${errorBody}`
    )
  }

  const json = await response.json()
  const data = json.data?.[0]
  if (!data?.embedding || !Array.isArray(data.embedding)) {
    throw new Error("OpenAI embedding API returned unexpected response format")
  }

  const embedding = data.embedding as number[]

  if (embedding.length !== DEFAULT_EMBEDDING_DIMENSIONS) {
    throw new Error(
      `Expected embedding dimension ${DEFAULT_EMBEDDING_DIMENSIONS}, got ${embedding.length}`
    )
  }

  for (const val of embedding) {
    if (typeof val !== "number" || !Number.isFinite(val)) {
      throw new Error("Embedding vector contains invalid values")
    }
  }

  const tokensUsed = json.usage?.total_tokens ?? estimateTokens(trimmed)

  return { embedding, tokens: tokensUsed }
}

export async function generateEmbedding(
  input: string,
  options?: EmbeddingOptions
): Promise<number[]> {
  const result = await createEmbedding(input, options)
  return result.embedding
}

export async function generateBatchEmbeddings(
  inputs: string[],
  options?: EmbeddingOptions
): Promise<number[][]> {
  if (inputs.length === 0) {
    throw new Error("Cannot generate embeddings for empty batch")
  }

  const batchLimit = getEmbeddingBatchLimit()
  if (inputs.length > batchLimit) {
    throw new Error(
      `Batch size ${inputs.length} exceeds limit of ${batchLimit}. Reduce batch size or increase EMBEDDING_BATCH_LIMIT.`
    )
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured")
  }

  for (const input of inputs) {
    if (!input || input.trim().length === 0) {
      throw new Error("Batch contains empty string")
    }
  }

  const model = options?.model || getEmbeddingModel()
  const dimensions = options?.dimensions || DEFAULT_EMBEDDING_DIMENSIONS
  const trimmedInputs = inputs.map((s) => s.trim())

  const estimatedTokens = trimmedInputs.reduce(
    (sum, s) => sum + estimateTokens(s),
    0
  )
  const estimatedCost = estimateEmbeddingCost(estimatedTokens)
  console.warn(
    `[embedding] Batch ${trimmedInputs.length} inputs, ~${estimatedTokens} tokens, ~$${estimatedCost.toFixed(6)}`
  )

  const response = await fetch(`${OPENAI_API_BASE}/embeddings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: trimmedInputs,
      dimensions,
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "unknown error")
    throw new Error(
      `OpenAI embedding API error (${response.status}): ${errorBody}`
    )
  }

  const json = await response.json()
  const data = json.data as Array<{ embedding: number[]; index: number }> | undefined

  if (!data || !Array.isArray(data)) {
    throw new Error("OpenAI embedding API returned unexpected response format")
  }

  const sorted = [...data].sort((a, b) => a.index - b.index)
  const results: number[][] = []

  for (let i = 0; i < sorted.length; i++) {
    const item = sorted[i]
    if (!item.embedding || !Array.isArray(item.embedding)) {
      throw new Error(`Embedding at index ${i} has invalid format`)
    }

    const embedding = item.embedding as number[]
    if (embedding.length !== DEFAULT_EMBEDDING_DIMENSIONS) {
      throw new Error(
        `Expected embedding dimension ${DEFAULT_EMBEDDING_DIMENSIONS}, got ${embedding.length} at index ${i}`
      )
    }

    for (const val of embedding) {
      if (typeof val !== "number" || !Number.isFinite(val)) {
        throw new Error(
          `Embedding vector at index ${i} contains invalid values`
        )
      }
    }

    results.push(embedding)
  }

  return results
}
