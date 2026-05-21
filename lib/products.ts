import { createClient } from '@supabase/supabase-js'

export type Product = {
  id?: string
  brand?: string | null
  model?: string | null
  slug?: string | null
  full_name?: string | null
  product_type?: string | null
  normalized_category?: string | null
  image_url?: string | null
  screen_size?: string | number | null
  screen_type?: string | number | null
  resolution?: string | number | null
  refresh_rate?: string | number | null
  chipset?: string | null
  battery_mah?: string | number | null
  rear_camera?: string | null
  front_camera?: string | null
  ram?: string | number | null
  storage?: string | number | null
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
  pros_en?: string | null
  cons_en?: string | null
  expert_opinion_en?: string | null
  release_year?: string | number | null
  created_at?: string | null
  [key: string]: unknown
}

export type UseCase = 'camera' | 'battery' | 'gaming' | 'value' | 'balanced'

export type SearchIntent = {
  rawQuery: string
  useCase: UseCase
  budget: number | null
  brand: string | null
  explanation: string
}

export type SearchResult = {
  product: Product
  matchScore: number
  reason: string
}


export type RecommendationResult = {
  product: Product
  matchScore: number
  reason: string
  strengths: string[]
}

export type ComparisonWinner = {
  key: string
  label: string
  winner: Product | null
  value: number | null
}

export type ComparisonVerdict = {
  winner: Product | null
  summary: string
}

const fallbackProducts: Product[] = [
  {
    id: 'demo-s24-ultra',
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    full_name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    normalized_category: 'smartphones',
    image_url: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-5g-1.jpg',
    price_usd: 1199,
    global_score: 92,
    camera_score: 94,
    battery_score: 88,
    gaming_score: 90,
    performance_score: 93,
    display_score: 96,
    value_score: 81,
    chipset: 'Snapdragon 8 Gen 3',
    battery_mah: 5000,
    rear_camera: '200MP AI camera system',
    screen_size: '6.8 inch',
    content_summary_en:
      'The most complete Android flagship with elite camera, display, performance, and productivity features.',
  },
  {
    id: 'demo-iphone-15-pro-max',
    brand: 'Apple',
    model: 'iPhone 15 Pro Max',
    full_name: 'Apple iPhone 15 Pro Max',
    slug: 'apple-iphone-15-pro-max',
    normalized_category: 'smartphones',
    image_url: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-1.jpg',
    price_usd: 1199,
    global_score: 90,
    camera_score: 92,
    battery_score: 86,
    gaming_score: 91,
    performance_score: 95,
    display_score: 91,
    value_score: 78,
    chipset: 'A17 Pro',
    battery_mah: 4441,
    rear_camera: '48MP triple camera',
    screen_size: '6.7 inch',
    content_summary_en:
      'Premium iPhone profile with strong video, performance, build quality, and ecosystem value.',
  },
  {
    id: 'demo-oneplus-12',
    brand: 'OnePlus',
    model: '12',
    full_name: 'OnePlus 12',
    slug: 'oneplus-12',
    normalized_category: 'smartphones',
    image_url: 'https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-12-1.jpg',
    price_usd: 799,
    global_score: 87,
    camera_score: 84,
    battery_score: 93,
    gaming_score: 91,
    performance_score: 94,
    display_score: 89,
    value_score: 90,
    chipset: 'Snapdragon 8 Gen 3',
    battery_mah: 5400,
    rear_camera: '50MP Hasselblad camera',
    screen_size: '6.82 inch',
    content_summary_en:
      'High-value flagship profile with fast performance, excellent battery, and strong display quality.',
  },
  {
    id: 'demo-pixel-8-pro',
    brand: 'Google',
    model: 'Pixel 8 Pro',
    full_name: 'Google Pixel 8 Pro',
    slug: 'google-pixel-8-pro',
    normalized_category: 'smartphones',
    image_url: 'https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-pro-1.jpg',
    price_usd: 999,
    global_score: 85,
    camera_score: 93,
    battery_score: 80,
    gaming_score: 78,
    performance_score: 82,
    display_score: 90,
    value_score: 82,
    chipset: 'Google Tensor G3',
    battery_mah: 5050,
    rear_camera: '50MP AI camera',
    screen_size: '6.7 inch',
    content_summary_en:
      'AI-first smartphone profile with excellent computational photography and clean software.',
  },
  {
    id: 'demo-xiaomi-14-ultra',
    brand: 'Xiaomi',
    model: '14 Ultra',
    full_name: 'Xiaomi 14 Ultra',
    slug: 'xiaomi-14-ultra',
    normalized_category: 'smartphones',
    image_url: 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-ultra-1.jpg',
    price_usd: 1099,
    global_score: 84,
    camera_score: 95,
    battery_score: 84,
    gaming_score: 89,
    performance_score: 92,
    display_score: 92,
    value_score: 80,
    chipset: 'Snapdragon 8 Gen 3',
    battery_mah: 5000,
    rear_camera: 'Leica quad camera',
    screen_size: '6.73 inch',
    content_summary_en:
      'Camera-focused flagship profile with premium optics, high performance, and a vivid display.',
  },
  {
    id: 'demo-s23-ultra',
    brand: 'Samsung',
    model: 'Galaxy S23 Ultra',
    full_name: 'Samsung Galaxy S23 Ultra',
    slug: 'samsung-galaxy-s23-ultra',
    normalized_category: 'smartphones',
    image_url: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s23-ultra-5g-1.jpg',
    price_usd: 899,
    global_score: 83,
    camera_score: 91,
    battery_score: 86,
    gaming_score: 87,
    performance_score: 88,
    display_score: 92,
    value_score: 85,
    chipset: 'Snapdragon 8 Gen 2',
    battery_mah: 5000,
    rear_camera: '200MP camera',
    screen_size: '6.8 inch',
    content_summary_en:
      'Previous-generation flagship with excellent camera hardware and strong current value.',
  },
]

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) return null
  return createClient(url, key)
}

export function safeNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null

  const number =
    typeof value === 'number'
      ? value
      : Number(String(value).replace(/[^0-9.-]/g, ''))

  return Number.isFinite(number) ? number : null
}

export function safeText(value: unknown, fallback = '—'): string {
  if (value === null || value === undefined || value === '') return fallback
  return String(value)
}

export function getProductName(product?: Product | null): string {
  if (!product) return 'Unknown product'
  return safeText(
    product.full_name || [product.brand, product.model].filter(Boolean).join(' '),
    'Unknown product'
  )
}

export function productSlug(product: Product): string {
  if (product.slug) return product.slug

  return getProductName(product)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function formatPrice(value?: Product | string | number | null): string {
  if (value === null || value === undefined) return 'Price TBA'

  if (typeof value === 'object') {
    const usd = safeNumber(value.price_usd)
    const eur = safeNumber(value.price_eur)
    const mad = safeNumber(value.price_mad)

    if (usd !== null) return `$${usd.toLocaleString('en-US')}`
    if (eur !== null) return `€${eur.toLocaleString('en-US')}`
    if (mad !== null) return `${mad.toLocaleString('en-US')} MAD`
    return 'Price TBA'
  }

  const price = safeNumber(value)
  return price !== null ? `$${price.toLocaleString('en-US')}` : 'Price TBA'
}


export function formatScore(value?: unknown): string {
  const score = safeNumber(value)
  return score === null ? '—' : `${Math.round(score)}/100`
}

const comparisonRows: { key: keyof Product; label: string }[] = [
  { key: 'global_score', label: 'Best overall' },
  { key: 'camera_score', label: 'Best camera' },
  { key: 'battery_score', label: 'Best battery' },
  { key: 'display_score', label: 'Best display' },
  { key: 'gaming_score', label: 'Best gaming' },
  { key: 'value_score', label: 'Best value' },
]

export function getComparisonWinners(products: Product[]): ComparisonWinner[] {
  return comparisonRows.map((row) => {
    let winner: Product | null = null
    let bestValue: number | null = null

    for (const product of products) {
      const value = safeNumber(product[row.key])
      if (value === null) continue

      if (bestValue === null || value > bestValue) {
        bestValue = value
        winner = product
      }
    }

    return {
      key: String(row.key),
      label: row.label,
      winner,
      value: bestValue,
    }
  })
}

export function getComparisonVerdict(products: Product[]): ComparisonVerdict {
  const overall = getComparisonWinners(products).find((winner) => winner.key === 'global_score')
  const winner = overall?.winner || null

  if (!winner) {
    return {
      winner: null,
      summary: 'Select at least two smartphones to generate a comparison verdict.',
    }
  }

  const name = getProductName(winner)
  const score = formatScore(winner.global_score)
  const camera = safeNumber(winner.camera_score)
  const battery = safeNumber(winner.battery_score)
  const value = safeNumber(winner.value_score)

  const signals = [
    camera !== null ? `camera ${Math.round(camera)}/100` : null,
    battery !== null ? `battery ${Math.round(battery)}/100` : null,
    value !== null ? `value ${Math.round(value)}/100` : null,
  ].filter(Boolean)

  return {
    winner,
    summary: `${name} is the strongest overall choice in this comparison with a global score of ${score}${signals.length ? `, supported by ${signals.join(', ')}` : ''}. Use the score rows below if your priority is camera, battery, gaming, display, or value.`,
  }
}

export function scoreLabel(value?: unknown): string {
  const score = safeNumber(value)
  if (score === null) return 'Unknown'
  if (score >= 88) return 'Excellent'
  if (score >= 78) return 'Strong'
  if (score >= 68) return 'Balanced'
  return 'Entry'
}

export function normalizeUseCase(value: unknown): UseCase {
  const text = safeText(value, 'balanced').toLowerCase()

  if (text === 'camera' || text === 'battery' || text === 'gaming' || text === 'value') {
    return text
  }

  return 'balanced'
}

export function detectSearchIntent(query: string): SearchIntent {
  const rawQuery = query.trim()
  const lower = rawQuery.toLowerCase()

  let useCase: UseCase = 'balanced'
  if (/(camera|photo|video|selfie|instagram|tiktok)/i.test(lower)) useCase = 'camera'
  if (/(battery|autonomy|long lasting|charge|mah)/i.test(lower)) useCase = 'battery'
  if (/(gaming|game|fps|gpu|performance|chipset)/i.test(lower)) useCase = 'gaming'
  if (/(value|budget|cheap|affordable|under|price)/i.test(lower)) useCase = 'value'

  const budgetMatch = lower.match(
    /(?:under|below|less than|max|budget)\s*€?\$?(\d{2,5})|€\s?(\d{2,5})|\$\s?(\d{2,5})/
  )
  const budget = budgetMatch
    ? Number(budgetMatch[1] || budgetMatch[2] || budgetMatch[3])
    : null

  const knownBrands = [
    'apple',
    'samsung',
    'xiaomi',
    'redmi',
    'poco',
    'oneplus',
    'oppo',
    'vivo',
    'honor',
    'huawei',
    'realme',
    'google',
    'motorola',
    'nothing',
    'asus',
    'sony',
    'nokia',
    'infinix',
    'tecno',
  ]
  const brand = knownBrands.find((item) => lower.includes(item)) || null

  const explanation = [
    `${useCase} intent`,
    budget ? `budget under ${budget}` : 'no strict budget',
    brand ? `brand: ${brand}` : 'all brands',
  ].join(' · ')

  return { rawQuery, useCase, budget, brand, explanation }
}

function scoreForUseCase(product: Product, useCaseInput: unknown): number {
  const useCase = normalizeUseCase(useCaseInput)
  const global = safeNumber(product.global_score) || 0
  const camera = safeNumber(product.camera_score) || 0
  const battery = safeNumber(product.battery_score) || 0
  const gaming = safeNumber(product.gaming_score) || 0
  const performance = safeNumber(product.performance_score) || gaming
  const display = safeNumber(product.display_score) || 0
  const value = safeNumber(product.value_score) || 0

  if (useCase === 'camera') {
    return camera * 0.46 + global * 0.22 + display * 0.14 + value * 0.12 + battery * 0.06
  }

  if (useCase === 'battery') {
    return battery * 0.46 + global * 0.22 + value * 0.16 + display * 0.08 + performance * 0.08
  }

  if (useCase === 'gaming') {
    return gaming * 0.36 + performance * 0.22 + display * 0.16 + battery * 0.12 + global * 0.14
  }

  if (useCase === 'value') {
    return value * 0.46 + global * 0.22 + battery * 0.12 + camera * 0.1 + display * 0.1
  }

  return global * 0.4 + camera * 0.15 + battery * 0.15 + gaming * 0.1 + display * 0.1 + value * 0.1
}

function keywordScore(product: Product, query: string): number {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .map((term) => term.trim())
    .filter((term) => term.length > 1)

  if (terms.length === 0) return 0

  const haystack = [
    product.brand,
    product.model,
    product.full_name,
    product.normalized_category,
    product.chipset,
    product.rear_camera,
    product.content_summary_en,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return terms.reduce((total, term) => total + (haystack.includes(term) ? 8 : 0), 0)
}

function buildSearchReason(product: Product, intent: SearchIntent): string {
  const name = getProductName(product)

  if (intent.useCase === 'camera') {
    return `${name} matches because it has strong camera and overall score signals.`
  }

  if (intent.useCase === 'battery') {
    return `${name} matches because it ranks well for battery and daily-use balance.`
  }

  if (intent.useCase === 'gaming') {
    return `${name} matches because of gaming, performance, display, and battery signals.`
  }

  if (intent.useCase === 'value') {
    return `${name} matches because it balances price, global score, and value score.`
  }

  return `${name} matches your search using brand, model, specs, and global score.`
}

async function fetchProducts(limit = 200): Promise<Product[]> {
  const supabase = getSupabase()

  if (!supabase) return fallbackProducts.slice(0, limit)

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('global_score', { ascending: false, nullsFirst: false })
      .limit(limit)

    if (error || !data || data.length === 0) {
      return fallbackProducts.slice(0, limit)
    }

    return data as Product[]
  } catch {
    return fallbackProducts.slice(0, limit)
  }
}

export async function getProducts(limit = 60): Promise<Product[]> {
  const products = await fetchProducts(limit)
  return products.slice(0, limit)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await fetchProducts(300)
  return products.find((product) => productSlug(product) === slug || product.slug === slug) || null
}

export async function searchProducts(query: string, limit = 60): Promise<Product[]> {
  const products = await fetchProducts(Math.max(limit, 120))
  const cleanQuery = query.trim().toLowerCase()

  if (!cleanQuery) return products.slice(0, limit)

  const terms = cleanQuery.split(/\s+/).filter((part) => part.length > 1)

  const filtered = products.filter((product) => {
    const haystack = [
      product.brand,
      product.model,
      product.full_name,
      product.normalized_category,
      product.chipset,
      product.rear_camera,
      product.content_summary_en,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return haystack.includes(cleanQuery) || terms.some((part) => haystack.includes(part))
  })

  return (filtered.length ? filtered : products).slice(0, limit)
}

export async function smartSearchProducts(
  query: string,
  limit = 24
): Promise<{ intent: SearchIntent; results: SearchResult[] }> {
  const intent = detectSearchIntent(query)
  const products = await fetchProducts(200)

  const results = products
    .filter((product) => {
      if (intent.brand && !safeText(product.brand, '').toLowerCase().includes(intent.brand)) {
        return false
      }

      if (intent.budget) {
        const price = safeNumber(product.price_usd ?? product.price_eur ?? product.price_mad)
        if (price !== null && price > intent.budget) return false
      }

      return true
    })
    .map((product) => {
      const intelligenceScore = scoreForUseCase(product, intent.useCase)
      const textScore = keywordScore(product, query)
      const matchScore = Math.round(Math.min(100, intelligenceScore * 0.92 + textScore))

      return {
        product,
        matchScore,
        reason: buildSearchReason(product, intent),
      }
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit)

  return { intent, results }
}

export function rankProducts(products: Product[], key: keyof Product = 'global_score'): Product[] {
  return [...products].sort(
    (a, b) => (safeNumber(b[key]) || 0) - (safeNumber(a[key]) || 0)
  )
}

export function getBestProducts(products: Product[], guide: string): Product[] {
  const key = guide.includes('camera')
    ? 'camera_score'
    : guide.includes('battery')
      ? 'battery_score'
      : guide.includes('gaming')
        ? 'gaming_score'
        : guide.includes('value')
          ? 'value_score'
          : 'global_score'

  return rankProducts(products, key as keyof Product)
}
