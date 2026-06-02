// Protected POST endpoint for product embedding generation.
// Admin/internal only — do not expose to public without authentication.
// Dry-run by default; never runs automatically on build or page load.
// Requires EMBEDDING_ADMIN_SECRET header guard; uses x-witflag-admin-secret header.
// Requires OPENAI_API_KEY and explicit dryRun: false to generate embeddings.
// Write mode is blocked unless ENABLE_EMBEDDING_WRITES=true and SQL is applied.

import { NextRequest, NextResponse } from "next/server"
import { getAllProducts } from "@/lib/supabase"
import { buildProductDocumentChunks } from "@/lib/product-chunker"
import {
  estimateEmbeddingCost,
  getEmbeddingModel,
  getEmbeddingBatchLimit,
  assertEmbeddingBudget,
  generateBatchEmbeddings,
} from "@/lib/embedding"

const V1_CATEGORIES = new Set(["smartphones", "foldable-smartphones"])

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const SOURCE_VERSION = "18-f1"

interface EmbedProductsBody {
  dryRun?: boolean
  limit?: number
  slugs?: string[]
  write?: boolean
}

function isUUID(value: string): boolean {
  return UUID_PATTERN.test(value)
}

function getAdminSecret(): string | null {
  return process.env.EMBEDDING_ADMIN_SECRET ?? null
}

function getRequestAdminSecret(request: NextRequest): string | null {
  return request.headers.get("x-witflag-admin-secret")
}

function isProduction(): boolean {
  return process.env.NODE_ENV === "production"
}

function requireAdminGuard(
  request: NextRequest,
  dryRun: boolean
): NextResponse | null {
  const adminSecret = getAdminSecret()
  const requestSecret = getRequestAdminSecret(request)

  if (!adminSecret) {
    if (isProduction()) {
      return NextResponse.json(
        {
          error:
            "Embedding endpoint is not configured. Set EMBEDDING_ADMIN_SECRET in your environment before deploying.",
        },
        { status: 503 }
      )
    }
    if (!dryRun) {
      return NextResponse.json(
        {
          error:
            "EMBEDDING_ADMIN_SECRET is not configured. Set it to enable non-dry-run execution.",
        },
        { status: 403 }
      )
    }
    return null
  }

  if (!requestSecret || requestSecret !== adminSecret) {
    return NextResponse.json(
      {
        error:
          "Invalid or missing admin secret. Provide x-witflag-admin-secret header with a valid EMBEDDING_ADMIN_SECRET.",
      },
      { status: 401 }
    )
  }

  return null
}

export async function POST(request: NextRequest) {
  try {
    const body: EmbedProductsBody = await request.json().catch(() => ({}))
    const dryRun = body.dryRun !== false
    const write = body.write === true
    const batchLimit = getEmbeddingBatchLimit()

    const guard = requireAdminGuard(request, dryRun)
    if (guard) return guard

    if (write) {
      const writesEnabled = process.env.ENABLE_EMBEDDING_WRITES === "true"
      if (!writesEnabled) {
        return NextResponse.json(
          {
            error:
              "Embedding writes are not enabled. Set ENABLE_EMBEDDING_WRITES=true to enable write mode. SQL must also be applied manually from supabase/product-intelligence-schema.sql.",
          },
          { status: 403 }
        )
      }
      return NextResponse.json(
        {
          error:
            "Write mode is not yet implemented in this phase. SQL schema exists at supabase/product-intelligence-schema.sql but has not been applied. Apply the SQL manually, then enable writes in a future phase.",
        },
        { status: 501 }
      )
    }

    const allProducts = await getAllProducts()

    const v1Products = allProducts.filter(
      (p) => V1_CATEGORIES.has(p.category) && isUUID(p.id)
    )

    let targetProducts = v1Products

    if (body.slugs && Array.isArray(body.slugs) && body.slugs.length > 0) {
      const slugSet = new Set(body.slugs)
      targetProducts = targetProducts.filter((p) => slugSet.has(p.slug))
    }

    if (body.limit && body.limit > 0) {
      const capped = Math.min(body.limit, batchLimit)
      targetProducts = targetProducts.slice(0, capped)
    } else {
      targetProducts = targetProducts.slice(0, batchLimit)
    }

    if (targetProducts.length === 0) {
      const model = getEmbeddingModel()
      return NextResponse.json({
        dryRun,
        productCount: 0,
        chunkCount: 0,
        estimatedTokens: 0,
        estimatedCost: 0,
        model,
        writeEnabled: false,
        message:
          "No eligible products found. Ensure Supabase is connected and products exist in v1 categories (smartphones, foldable).",
      })
    }

    const allChunks = targetProducts.flatMap((p) =>
      buildProductDocumentChunks(p)
    )

    const totalTokens = allChunks.reduce(
      (sum, c) => sum + Math.ceil(c.chunk_text.length / 4),
      0
    )

    assertEmbeddingBudget(totalTokens)

    const model = getEmbeddingModel()
    const estimatedCost = estimateEmbeddingCost(totalTokens)

    if (dryRun) {
      const sampleChunks = allChunks.slice(0, 3).map((c) => ({
        slug: c.metadata.slug,
        chunk_index: c.chunk_index,
        chunk_text_preview: c.chunk_text.slice(0, 120),
        chunk_text_length: c.chunk_text.length,
      }))

      return NextResponse.json({
        dryRun: true,
        productCount: targetProducts.length,
        chunkCount: allChunks.length,
        estimatedTokens: totalTokens,
        estimatedCost,
        model,
        writeEnabled: false,
        batchLimit,
        sampleChunks,
        sourceVersion: SOURCE_VERSION,
      })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "OPENAI_API_KEY is not configured. Set OPENAI_API_KEY in your environment to generate embeddings.",
        },
        { status: 503 }
      )
    }

    const chunkTexts = allChunks.map((c) => c.chunk_text)
    const embeddings = await generateBatchEmbeddings(chunkTexts)

    return NextResponse.json({
      dryRun: false,
      productCount: targetProducts.length,
      chunkCount: allChunks.length,
      embeddingCount: embeddings.length,
      dimensions: embeddings[0]?.length ?? 0,
      model,
      estimatedCost,
      tokensUsed: totalTokens,
      writeEnabled: false,
      writesPerformed: false,
      sourceVersion: SOURCE_VERSION,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred"
    console.warn("[embed-products] Error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
