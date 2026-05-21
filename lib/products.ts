import { createClient } from '@supabase/supabase-js'

export type Product = {
  id?: string
  brand?: string | null
  model?: string | null
  slug?: string | null
  full_name?: string | null
  product_type?: string | null
  type_model?: string | null
  normalized_category?: string | null
  image_url?: string | null
  screen_size?: string | number | null
  chipset?: string | null
  ram?: string | number | null
  storage?: string | number | null
  battery_mah?: string | number | null
  rear_camera?: string | null
  front_camera?: string | null
  global_score?: string | number | null
  camera_score?: string | number | null
  battery_score?: string | number | null
  gaming_score?: string | number | null
  performance_score?: string | number | null
  display_score?: string | number | null
  value_score?: string | number | null
  price_usd?: string | number | null
  price_eur?: string | number | null
  price_mad?: string | number | null
  currency?: string | null
  content_summary_en?: string | null
  release_year?: string | number | null
  created_at?: string | null
  [key: string]: unknown
}

export type SearchIntent = 'camera' | 'battery' | 'gaming' | 'performance' | 'value' | 'display' | 'general'

const fallbackProducts: Product[] = [
  {
    id: 'demo-s24-ultra', brand: 'Samsung', model: 'Galaxy S24 Ultra', full_name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra', normalized_category: 'smartphones', price_usd: 1199, global_score: 92,
    camera_score: 94, battery_score: 88, gaming_score: 90, performance_score: 93, display_score: 96, value_score: 81,
    chipset: 'Snapdragon 8 Gen 3', battery_mah: 5000, rear_camera: '200MP AI camera system', screen_size: '6.8 inch',
    content_summary_en: 'Flagship Android profile with elite camera, display, performance, productivity features, and premium software support.'
  },
  {
    id: 'demo-iphone-15-pro-max', brand: 'Apple', model: 'iPhone 15 Pro Max', full_name: 'Apple iPhone 15 Pro Max',
    slug: 'apple-iphone-15-pro-max', normalized_category: 'smartphones', price_usd: 1199, global_score: 90,
    camera_score: 92, battery_score: 86, gaming_score: 91, performance_score: 95, display_score: 91, value_score: 78,
    chipset: 'A17 Pro', battery_mah: 4441, rear_camera: '48MP triple camera', screen_size: '6.7 inch',
    content_summary_en: 'Premium iPhone profile with strong video, gaming performance, build quality, and ecosystem value.'
  },
  {
    id: 'demo-oneplus-12', brand: 'OnePlus', model: '12', full_name: 'OnePlus 12', slug: 'oneplus-12',
    normalized_category: 'smartphones', price_usd: 799, global_score: 87, camera_score: 84, battery_score: 93,
    gaming_score: 91, performance_score: 94, display_score: 89, value_score: 90, chipset: 'Snapdragon 8 Gen 3',
    battery_mah: 5400, rear_camera: '50MP Hasselblad camera', screen_size: '6.82 inch',
    content_summary_en: 'High-value flagship profile with fast performance, excellent battery, smooth charging, and strong display quality.'
  },
  {
    id: 'demo-pixel-8-pro', brand: 'Google', model: 'Pixel 8 Pro', full_name: 'Google Pixel 8 Pro', slug: 'google-pixel-8-pro',
    normalized_category: 'smartphones', price_usd: 999, global_score: 85, camera_score: 93, battery_score: 80,
    gaming_score: 78, performance_score: 82, display_score: 90, value_score: 82, chipset: 'Google Tensor G3',
    battery_mah: 5050, rear_camera: '50MP AI camera', screen_size: '6.7 inch',
    content_summary_en: 'AI-first smartphone profile with excellent computational photography, clean software, and smart everyday features.'
  },
  {
    id: 'demo-xiaomi-14-ultra', brand: 'Xiaomi', model: '14 Ultra', full_name: 'Xiaomi 14 Ultra', slug: 'xiaomi-14-ultra',
    normalized_category: 'smartphones', price_usd: 1099, global_score: 84, camera_score: 95, battery_score: 84,
    gaming_score: 89, performance_score: 92, display_score: 92, value_score: 80, chipset: 'Snapdragon 8 Gen 3',
    battery_mah: 5000, rear_camera: 'Leica quad camera', screen_size: '6.73 inch',
    content_summary_en: 'Camera-focused flagship profile with premium optics, high performance, and vivid display quality.'
  },
  {
    id: 'demo-s23-ultra', brand: 'Samsung', model: 'Galaxy S23 Ultra', full_name: 'Samsung Galaxy S23 Ultra',
    slug: 'samsung-galaxy-s23-ultra', normalized_category: 'smartphones', price_usd: 899, global_score: 83,
    camera_score: 91, battery_score: 86, gaming_score: 87, performance_score: 88, display_score: 92, value_score: 85,
    chipset: 'Snapdragon 8 Gen 2', battery_mah: 5000, rear_camera: '200MP camera', screen_size: '6.8 inch',
    content_summary_en: 'Previous-generation flagship with excellent camera hardware and strong current value.'
  }
]

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export function safeNumber(value: string | number | null | undefined | unknown): number | null {
  if (value === null || value === undefined || value === '') return null
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  const number = Number(String(value).replace(/[^0-9.-]/g, ''))
  return Number.isFinite(number) ? number : null
}

export function safeText(value: string | number | null | undefined | unknown, fallback = '—'): string {
  if (value === null || value === undefined || value === '') return fallback
  return String(value)
}

export function getProductName(product?: Product | null): string {
  if (!product) return 'Unknown product'
  const joined = [product.brand, product.model].filter(Boolean).join(' ')
  return safeText(product.full_name || joined, 'Unknown product')
}

export function productSlug(product: Product): string {
  if (typeof product.slug === 'string' && product.slug.trim()) return product.slug
  return getProductName(product).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function formatPrice(product?: Product | null): string {
  if (!product) return 'Price TBA'
  const usd = safeNumber(product.price_usd)
  const eur = safeNumber(product.price_eur)
  const mad = safeNumber(product.price_mad)
  if (usd !== null) return `$${Math.round(usd).toLocaleString('en-US')}`
  if (eur !== null) return `€${Math.round(eur).toLocaleString('en-US')}`
  if (mad !== null) return `${Math.round(mad).toLocaleString('en-US')} MAD`
  return 'Price TBA'
}

export function formatScore(value?: string | number | null | unknown): string {
  const score = safeNumber(value)
  return score === null ? '—' : String(Math.round(score))
}

export function scoreLabel(value?: string | number | null | unknown): string {
  const score = safeNumber(value)
  if (score === null) return 'Unknown'
  if (score >= 90) return 'Elite'
  if (score >= 85) return 'Excellent'
  if (score >= 78) return 'Strong'
  if (score >= 68) return 'Balanced'
  return 'Entry'
}

export function getScoreColorClass(value?: string | number | null | unknown): string {
  const score = safeNumber(value)
  if (score === null) return 'score-muted'
  if (score >= 88) return 'score-elite'
  if (score >= 78) return 'score-strong'
  return 'score-basic'
}

export async function getProducts(limit = 60): Promise<Product[]> {
  const supabase = getSupabase()
  if (!supabase) return fallbackProducts.slice(0, limit)

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('global_score', { ascending: false, nullsFirst: false })
      .limit(limit)

    if (error || !data || data.length === 0) return fallbackProducts.slice(0, limit)
    return data as Product[]
  } catch {
    return fallbackProducts.slice(0, limit)
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts(200)
  return products.find((product) => productSlug(product) === slug || product.slug === slug) || null
}

export function detectSearchIntent(query: string): SearchIntent {
  const q = query.toLowerCase()
  if (/camera|photo|video|portrait|zoom|selfie/.test(q)) return 'camera'
  if (/battery|charge|charging|long|autonomy/.test(q)) return 'battery'
  if (/gaming|game|fps|pubg|fortnite|genshin/.test(q)) return 'gaming'
  if (/performance|fast|speed|chip|processor/.test(q)) return 'performance'
  if (/cheap|budget|value|price|affordable|deal/.test(q)) return 'value'
  if (/display|screen|oled|amoled|refresh/.test(q)) return 'display'
  return 'general'
}

export function getIntentScoreKey(intent: SearchIntent): keyof Product {
  if (intent === 'camera') return 'camera_score'
  if (intent === 'battery') return 'battery_score'
  if (intent === 'gaming') return 'gaming_score'
  if (intent === 'performance') return 'performance_score'
  if (intent === 'value') return 'value_score'
  if (intent === 'display') return 'display_score'
  return 'global_score'
}

export function rankProducts(products: Product[], key: keyof Product = 'global_score'): Product[] {
  return [...products].sort((a, b) => (safeNumber(b[key]) || 0) - (safeNumber(a[key]) || 0))
}

export async function searchProducts(query: string, limit = 60): Promise<Product[]> {
  const products = await getProducts(limit)
  const q = query.trim().toLowerCase()
  if (!q) return products

  const words = q.split(/\s+/).filter(Boolean)
  const intent = detectSearchIntent(q)
  const key = getIntentScoreKey(intent)

  const filtered = products.filter((product) => {
    const haystack = [
      product.brand,
      product.model,
      product.full_name,
      product.normalized_category,
      product.chipset,
      product.rear_camera,
      product.content_summary_en,
      product.release_year
    ].filter(Boolean).join(' ').toLowerCase()

    return haystack.includes(q) || words.some((part) => haystack.includes(part)) || intent !== 'general'
  })

  return rankProducts(filtered, key).slice(0, limit)
}

export type SmartSearchResult = {
  product: Product
  score: number
  reason: string
}

export type SmartSearchResponse = {
  query: string
  intent: SearchIntent
  results: SmartSearchResult[]
}

export async function smartSearchProducts(query: string, limit = 6): Promise<SmartSearchResponse> {
  const intent = detectSearchIntent(query)
  const key = getIntentScoreKey(intent)
  const products = await searchProducts(query, limit)

  return {
    query,
    intent,
    results: products.slice(0, limit).map((product) => ({
      product,
      score: safeNumber(product[key]) || safeNumber(product.global_score) || 0,
      reason: getRecommendationReason(product, intent)
    }))
  }
}

export function getRecommendationReason(product: Product, intent: SearchIntent | string = 'general'): string {
  const name = getProductName(product)
  const normalizedIntent = String(intent).toLowerCase() as SearchIntent

  if (normalizedIntent === 'camera') {
    return `${name} is recommended because its camera score and imaging profile are strong for photos, video, and everyday content.`
  }
  if (normalizedIntent === 'battery') {
    return `${name} is recommended because its battery profile is strong for long daily use.`
  }
  if (normalizedIntent === 'gaming') {
    return `${name} is recommended because its performance and gaming scores are strong for demanding apps and games.`
  }
  if (normalizedIntent === 'performance') {
    return `${name} is recommended because its chipset and performance score make it a fast option.`
  }
  if (normalizedIntent === 'value') {
    return `${name} is recommended because it has a strong balance between price, score, and features.`
  }
  if (normalizedIntent === 'display') {
    return `${name} is recommended because its display profile is strong for media, reading, and daily use.`
  }

  return `${name} is recommended because it has one of the strongest overall intelligence scores in the current product data.`
}

export function getBestProducts(products: Product[], guide: string): Product[] {
  const intent = detectSearchIntent(guide)
  return rankProducts(products, getIntentScoreKey(intent))
}

export function getComparisonWinners(products: Product[]) {
  const categories = [
    { key: 'global_score' as keyof Product, label: 'Best overall' },
    { key: 'camera_score' as keyof Product, label: 'Best camera' },
    { key: 'battery_score' as keyof Product, label: 'Best battery' },
    { key: 'gaming_score' as keyof Product, label: 'Best gaming' },
    { key: 'value_score' as keyof Product, label: 'Best value' }
  ]

  return categories.map((category) => ({
    ...category,
    product: rankProducts(products, category.key)[0] || null,
    score: safeNumber(rankProducts(products, category.key)[0]?.[category.key])
  }))
}

export function getComparisonVerdict(products: Product[]): string {
  if (!products.length) return 'Select products to generate an AI-style verdict.'
  const overall = rankProducts(products, 'global_score')[0]
  const value = rankProducts(products, 'value_score')[0]
  const camera = rankProducts(products, 'camera_score')[0]
  const names = [overall, value, camera].map(getProductName)
  return `${names[0]} is the strongest overall pick. ${names[1]} looks best for value-focused buyers, while ${names[2]} is the strongest camera-focused option.`
}

export { fallbackProducts }
