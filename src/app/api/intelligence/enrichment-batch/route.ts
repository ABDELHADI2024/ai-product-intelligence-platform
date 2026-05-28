import { NextRequest, NextResponse } from "next/server"
import { getAllProducts } from "@/lib/supabase"
import { buildBatchEnrichment } from "@/lib/enrichment-batch"

export async function GET(request: NextRequest) {
  try {
    const limitParam = request.nextUrl.searchParams.get("limit")
    const limit = limitParam ? Math.min(Math.max(1, Number.parseInt(limitParam, 10)), 500) : undefined

    const products = await getAllProducts()
    const target = limit ? products.slice(0, limit) : products

    const result = buildBatchEnrichment(target)

    return NextResponse.json(result)
  } catch (error) {
    console.warn("Batch enrichment error:", error)
    return NextResponse.json(
      { error: "Failed to generate batch enrichment" },
      { status: 500 }
    )
  }
}
