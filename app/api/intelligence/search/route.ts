import { NextRequest, NextResponse } from "next/server"
import { getAllProducts } from "@/lib/supabase"
import { parseIntent, rankProducts } from "@/lib/intelligence"

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get("q")?.trim()

    if (!q) {
      return NextResponse.json(
        { error: "Missing query parameter 'q'" },
        { status: 400 }
      )
    }

    const parsed = parseIntent(q)
    const products = await getAllProducts()
    const ranked = rankProducts(products, parsed)

    return NextResponse.json({
      query: q,
      detectedIntent: {
        intent: parsed.intent,
        category: parsed.category,
        maxPrice: parsed.maxPrice,
      },
      count: ranked.length,
      results: ranked.map((r) => ({
        name: r.product.name,
        slug: r.product.slug,
        brand: r.product.brand,
        category: r.product.category,
        price: r.product.price,
        priceAvailable: r.product.price > 0 && r.product.stockStatus !== "coming_soon",
        currency: r.product.currency,
        image_url: r.product.image,
        scores: r.product.scores,
        specs: r.product.specs,
        reason: r.reason,
        stockStatus: r.product.stockStatus,
      })),
    })
  } catch (error) {
    console.warn("Intelligence search error:", error)
    return NextResponse.json(
      { error: "Failed to process search" },
      { status: 500 }
    )
  }
}
