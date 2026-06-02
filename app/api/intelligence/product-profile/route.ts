import { NextRequest, NextResponse } from "next/server"
import { getProductBySlug } from "@/lib/supabase"
import { buildProductDocument } from "@/lib/product-document"
import { evaluateProductDataQuality } from "@/lib/data-quality"
import { buildScoreSummaries, type ScoreSummaries } from "@/lib/score-summaries"
import { buildProductEnrichmentProfile } from "@/lib/product-enrichment"

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get("slug")?.trim()

    if (!slug) {
      return NextResponse.json(
        { error: "Missing query parameter 'slug'" },
        { status: 400 }
      )
    }

    const product = await getProductBySlug(slug)

    if (!product) {
      return NextResponse.json(
        { error: `Product not found: ${slug}` },
        { status: 404 }
      )
    }

    const dataQuality = evaluateProductDataQuality(product)
    const scoreSummaries: ScoreSummaries = buildScoreSummaries(product)
    const productDocument = buildProductDocument(product)
    const enrichment = buildProductEnrichmentProfile(product)

    const profile = {
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      priceAvailable: product.price > 0,
      currency: product.currency,
      description: product.description,
      image: product.image,
      releaseDate: product.releaseDate,
      scores: product.scores,
      specsCount: Object.keys(product.specs).length,
      prosCount: product.pros.length,
      consCount: product.cons.length,
      product_summary: enrichment.product_summary,
      buying_verdict: enrichment.buying_verdict,
      best_for: enrichment.best_for,
      not_best_for: enrichment.not_best_for,
      strengths: enrichment.strengths,
      weaknesses: enrichment.weaknesses,
      ai_tags: enrichment.ai_tags,
      use_cases: enrichment.use_cases,
      buyer_persona: enrichment.buyer_persona,
      data_quality_score: enrichment.data_quality_score,
      data_quality_level: enrichment.data_quality_level,
      score_summaries: scoreSummaries,
      data_quality: dataQuality,
      product_document: productDocument,
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.warn("Product profile error:", error)
    return NextResponse.json(
      { error: "Failed to generate product profile" },
      { status: 500 }
    )
  }
}
