import { createClient } from "@supabase/supabase-js"
import type { Product } from "./types"
import { fallbackProducts } from "./fallback-data"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

function pick<T>(row: Record<string, unknown>, ...keys: string[]): T | undefined {
  for (const key of keys) {
    const val = row[key]
    if (val !== null && val !== undefined && val !== "") return val as T
  }
  return undefined
}

function num(row: Record<string, unknown>, ...keys: string[]): number {
  return Number(pick(row, ...keys) ?? 0)
}

function str(row: Record<string, unknown>, ...keys: string[]): string {
  return String(pick(row, ...keys) ?? "")
}

function generateDescription(row: Record<string, unknown>): string {
  const brand = str(row, "brand")
  const model = str(row, "full_name", "model")
  const chipset = str(row, "chipset")
  const rearCam = str(row, "rear_camera")
  const battery = str(row, "battery_capacity", "battery_mah")
  const category = str(row, "normalized_category", "product_type")
  const ram = str(row, "ram")
  const storage = str(row, "storage")
  const parts: string[] = [`${brand} ${model}`]
  if (category) parts.push(`in the ${category} category`)
  if (chipset) parts.push(`powered by ${chipset}`)
  if (ram || storage) parts.push(`with ${[ram, storage].filter(Boolean).join(" / ")}`)
  if (rearCam) parts.push(`featuring ${rearCam} camera`)
  if (battery) parts.push(`${battery} battery`)

  return parts.join(" ") + "."
}

function buildSpecs(row: Record<string, unknown>): Record<string, string> {
  const specFields: [string, string[]][] = [
    ["Screen Size", ["screen_size"]],
    ["Screen Type", ["screen_type"]],
    ["Resolution", ["resolution"]],
    ["Refresh Rate", ["refresh_rate"]],
    ["Chipset", ["chipset"]],
    ["GPU", ["gpu"]],
    ["RAM", ["ram"]],
    ["Storage", ["storage"]],
    ["Rear Camera", ["rear_camera"]],
    ["Front Camera", ["front_camera"]],
    ["Battery Capacity", ["battery_capacity"]],
    ["Battery (mAh)", ["battery_mah"]],
    ["Fast Charge", ["fast_charge"]],
    ["Network", ["network"]],
    ["OS", ["os"]],
    ["AI Features", ["ai_features"]],
    ["Condition", ["condition"]],
    ["Availability", ["availability"]],
    ["Stock Status", ["stock_status"]],
    ["Release Year", ["release_year"]],
  ]

  const specs: Record<string, string> = {}
  for (const [label, keys] of specFields) {
    const val = pick<string>(row, ...keys)
    if (val) specs[label] = val
  }
  return specs
}

function normalizeProduct(row: Record<string, unknown>): Product | null {
  const name = str(row, "full_name", "model")
  if (!name) return null

  const cameraScore = num(row, "camera_score", "score_photo")
  const batteryScore = num(row, "battery_score", "score_battery")
  const gamingScore = num(row, "gaming_score", "score_gaming")
  const displayScore = num(row, "display_score")
  const valueScore = num(row, "value_score")
  const globalScore = num(row, "global_score")

  const avgScore = Math.round(
    [cameraScore, batteryScore, gamingScore, displayScore, valueScore].filter(Boolean).reduce((a, b) => a + b, 0) /
      Math.max(1, [cameraScore, batteryScore, gamingScore, displayScore, valueScore].filter(Boolean).length)
  )

  return {
    id: str(row, "id"),
    name,
    slug: str(row, "slug"),
    brand: str(row, "brand"),
    category: str(row, "normalized_category", "product_type", "category"),
    description: str(row, "description") || generateDescription(row),
    image: str(row, "image", "images", "image_url", "product_image", "main_image") || "/images/placeholder.svg",
    price: num(row, "price_usd", "price_eur", "price_mad", "price"),
    currency: str(row, "currency") || "USD",
    releaseDate: str(row, "release_year"),
    specs: buildSpecs(row),
    scores: {
      overall: globalScore || avgScore,
      gaming: gamingScore,
      camera: cameraScore,
      battery: batteryScore,
      display: displayScore,
      value: valueScore,
    },
    pros: Array.isArray(row.pros) ? row.pros : [],
    cons: Array.isArray(row.cons) ? row.cons : [],
    affiliateUrl: str(row, "affiliate_url") || undefined,
  }
}

export async function getTopProducts(limit = 6): Promise<Product[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("global_score", { ascending: false, nullsFirst: false })
        .limit(limit)

      if (error) {
        console.warn("Supabase query error:", error.message)
      }

      if (!error && data && data.length > 0) {
        const mapped = data.map(normalizeProduct).filter(Boolean) as Product[]
        if (mapped.length > 0) return mapped
      }
    } catch {
      console.warn("Supabase fetch failed")
    }
  }

  return [...fallbackProducts]
    .sort((a, b) => b.scores.overall - a.scores.overall)
    .slice(0, limit)
}

export async function getAllProducts(): Promise<Product[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("global_score", { ascending: false, nullsFirst: false })

      if (error) {
        console.warn("Supabase query error:", error.message)
      }

      if (!error && data && data.length > 0) {
        const mapped = data.map(normalizeProduct).filter(Boolean) as Product[]
        if (mapped.length > 0) return mapped
      }
    } catch {
      console.warn("Supabase fetch failed")
    }
  }

  return fallbackProducts
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .maybeSingle()

      if (error) {
        console.warn("Supabase query error:", error.message)
      }

      if (!error && data) {
        return normalizeProduct(data)
      }
    } catch {
      console.warn("Supabase fetch failed")
    }
  }

  return fallbackProducts.find((p) => p.slug === slug) ?? null
}
