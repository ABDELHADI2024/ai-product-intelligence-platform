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
  chipset?: string | null
  battery_mah?: string | number | null
  rear_camera?: string | null
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
  [key: string]: any
}

const fallbackProducts: Product[] = [
  {
    id: 'demo-s24-ultra',
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    full_name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    normalized_category: 'smartphones',
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
    content_summary_en: 'Flagship Android profile with elite camera, display, performance, and long-term productivity features.'
  },
  {
    id: 'demo-iphone-15-pro-max',
    brand: 'Apple',
    model: 'iPhone 15 Pro Max',
    full_name: 'Apple iPhone 15 Pro Max',
    slug: 'apple-iphone-15-pro-max',
    normalized_category: 'smartphones',
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
    content_summary_en: 'Premium iPhone profile with strong video, performance, build quality, and ecosystem value.'
  },
  {
    id: 'demo-oneplus-12',
    brand: 'OnePlus',
    model: '12',
    full_name: 'OnePlus 12',
    slug: 'oneplus-12',
    normalized_category: 'smartphones',
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
    content_summary_en: 'High-value flagship profile with fast performance, excellent battery, and strong display quality.'
  },
  {
    id: 'demo-pixel-8-pro',
    brand: 'Google',
    model: 'Pixel 8 Pro',
    full_name: 'Google Pixel 8 Pro',
    slug: 'google-pixel-8-pro',
    normalized_category: 'smartphones',
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
    content_summary_en: 'AI-first smartphone profile with excellent computational photography and clean software.'
  },
  {
    id: 'demo-xiaomi-14-ultra',
    brand: 'Xiaomi',
    model: '14 Ultra',
    full_name: 'Xiaomi 14 Ultra',
    slug: 'xiaomi-14-ultra',
    normalized_category: 'smartphones',
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
    content_summary_en: 'Camera-focused flagship profile with premium optics, high performance, and a vivid display.'
  },
  {
    id: 'demo-s23-ultra',
    brand: 'Samsung',
    model: 'Galaxy S23 Ultra',
    full_name: 'Samsung Galaxy S23 Ultra',
    slug: 'samsung-galaxy-s23-ultra',
    normalized_category: 'smartphones',
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
    content_summary_en: 'Previous-generation flagship with excellent camera hardware and strong current value.'
  }
]

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export function safeNumber(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === '') return null
  const number = typeof value === 'number' ? value : Number(String(value).replace(/[^0-9.-]/g, ''))
  return Number.isFinite(number) ? number : null
}

export function safeText(value: string | number | null | undefined, fallback = '—'): string {
  if (value === null || value === undefined || value === '') return fallback
  return String(value)
}

export function getProductName(product?: Product | null) {
  if (!product) return 'Unknown product'
  return safeText(product.full_name || [product.brand, product.model].filter(Boolean).join(' '), 'Unknown product')
}

export function productSlug(product: Product) {
  if (product.slug) return product.slug
  return getProductName(product).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function formatPrice(value?: Product | string | number | null) {
  if (value === null || value === undefined) return 'Price TBA'
  if (typeof value !== 'object') {
    const price = safeNumber(value)
    return price !== null ? `€${price.toLocaleString('en-US')}` : 'Price TBA'
  }
  const usd = safeNumber(value.price_usd)
  const eur = safeNumber(value.price_eur)
  const mad = safeNumber(value.price_mad)
  if (usd !== null) return `$${usd.toLocaleString('en-US')}`
  if (eur !== null) return `€${eur.toLocaleString('en-US')}`
  if (mad !== null) return `${mad.toLocaleString('en-US')} MAD`
  return 'Price TBA'
}

export function scoreLabel(value?: string | number | null) {
  const score = safeNumber(value)
  if (score === null) return 'Unknown'
  if (score >= 88) return 'Excellent'
  if (score >= 78) return 'Strong'
  if (score >= 68) return 'Balanced'
  return 'Entry'
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
  const products = await getProducts(100)
  return products.find((product) => productSlug(product) === slug || product.slug === slug) || null
}

export async function searchProducts(query: string, limit = 60): Promise<Product[]> {
  const products = await getProducts(limit)
  const q = query.trim().toLowerCase()
  if (!q) return products
  return products.filter((product) => {
    const haystack = [
      product.brand,
      product.model,
      product.full_name,
      product.normalized_category,
      product.chipset,
      product.rear_camera,
      product.content_summary_en
    ].filter(Boolean).join(' ').toLowerCase()
    return haystack.includes(q) || q.split(/\s+/).some((part) => haystack.includes(part))
  })
}

export function rankProducts(products: Product[], key: keyof Product = 'global_score') {
  return [...products].sort((a, b) => (safeNumber(b[key]) || 0) - (safeNumber(a[key]) || 0))
}

export function getBestProducts(products: Product[], guide: string) {
  const key = guide.includes('camera') ? 'camera_score'
    : guide.includes('battery') ? 'battery_score'
    : guide.includes('gaming') ? 'gaming_score'
    : guide.includes('value') ? 'value_score'
    : 'global_score'
  return rankProducts(products, key as keyof Product)
}


export type UseCase = 'camera' | 'battery' | 'gaming' | 'value' | 'balanced'
export type SearchIntent = {
  rawQuery: string
  useCase: UseCase
  budget: number | null
  brand: string | null
  explanation: string
}
export type SearchResult = { product: Product; matchScore: number; reason: string }

export function getBestUseCase(product: Product): string {
  const signals = [
    ['camera', safeNumber(product.camera_score)],
    ['battery', safeNumber(product.battery_score)],
    ['gaming', safeNumber(product.gaming_score)],
    ['display', safeNumber(product.display_score)],
    ['value', safeNumber(product.value_score)]
  ] as const
  const best = [...signals].sort((a, b) => (b[1] || 0) - (a[1] || 0))[0]
  return best?.[0] || 'balanced'
}

export function detectSearchIntent(query: string): SearchIntent {
  const rawQuery = query.trim()
  const lower = rawQuery.toLowerCase()
  let useCase: UseCase = 'balanced'
  if (/(camera|photo|video|selfie)/i.test(lower)) useCase = 'camera'
  if (/(battery|autonomy|charge|5000mah)/i.test(lower)) useCase = 'battery'
  if (/(gaming|game|performance|fps|chipset)/i.test(lower)) useCase = 'gaming'
  if (/(cheap|budget|value|affordable|under|price)/i.test(lower)) useCase = 'value'
  const budgetMatch = lower.match(/(?:under|below|less than|max|budget)\s*[€$]?(\d{2,5})|[€$]\s?(\d{2,5})/)
  const budget = budgetMatch ? Number(budgetMatch[1] || budgetMatch[2]) : null
  const knownBrands = ['apple','samsung','xiaomi','redmi','poco','oneplus','oppo','vivo','honor','huawei','realme','google','motorola','nothing','asus','sony','nokia','infinix','tecno']
  const brand = knownBrands.find(item => lower.includes(item)) || null
  const explanation = `${useCase} intent · ${budget ? `budget under ${budget}` : 'no strict budget'} · ${brand || 'all brands'}`
  return { rawQuery, useCase, budget, brand, explanation }
}

function scoreForUseCase(product: Product, useCase: UseCase): number {
  const global = safeNumber(product.global_score) || 0
  const camera = safeNumber(product.camera_score) || 0
  const battery = safeNumber(product.battery_score) || 0
  const gaming = safeNumber(product.gaming_score) || 0
  const display = safeNumber(product.display_score) || 0
  const value = safeNumber(product.value_score) || 0
  if (useCase === 'camera') return camera * 0.5 + global * 0.25 + display * 0.15 + value * 0.1
  if (useCase === 'battery') return battery * 0.5 + global * 0.25 + value * 0.15 + display * 0.1
  if (useCase === 'gaming') return gaming * 0.45 + global * 0.25 + display * 0.15 + battery * 0.15
  if (useCase === 'value') return value * 0.5 + global * 0.25 + battery * 0.15 + camera * 0.1
  return global * 0.5 + camera * 0.15 + battery * 0.15 + gaming * 0.1 + display * 0.1
}

export function rankSearchResults(products: Product[], intent: SearchIntent): SearchResult[] {
  const terms = intent.rawQuery.toLowerCase().split(/\s+/).filter(term => term.length > 1)
  return products
    .filter(product => {
      const price = safeNumber(product.price_usd) ?? safeNumber(product.price_eur)
      if (intent.budget && price !== null && price > intent.budget) return false
      if (intent.brand && !safeText(product.brand, '').toLowerCase().includes(intent.brand)) return false
      return true
    })
    .map(product => {
      const haystack = [product.brand, product.model, product.full_name, product.chipset, product.rear_camera, product.content_summary_en, product.normalized_category].filter(Boolean).join(' ').toLowerCase()
      const textScore = terms.reduce((score, term) => score + (haystack.includes(term) ? 6 : 0), 0)
      const matchScore = Math.round(Math.min(100, scoreForUseCase(product, intent.useCase) * 0.9 + textScore))
      return { product, matchScore, reason: `${getProductName(product)} matches your ${intent.useCase} search using product scores, price, and specifications.` }
    })
    .sort((a, b) => b.matchScore - a.matchScore)
}

export async function smartSearchProducts(query: string, limit = 24): Promise<{ intent: SearchIntent; results: SearchResult[] }> {
  const intent = detectSearchIntent(query)
  const products = await getProducts(300)
  const ranked = rankSearchResults(products, intent).slice(0, limit)
  return { intent, results: ranked }
}

export function formatScore(value?: string | number | null): string {
  const score = safeNumber(value)
  return score !== null ? `${Math.round(score)}/100` : 'Pending'
}

export type ComparisonWinner = {
  label: string
  key: keyof Product
  winner: Product | null
  value: number | null
}

function winnerByScore(products: Product[], key: keyof Product, label: string): ComparisonWinner {
  const ranked = [...products]
    .map((product) => ({ product, value: safeNumber(product[key]) }))
    .filter((item): item is { product: Product; value: number } => item.value !== null)
    .sort((a, b) => b.value - a.value)

  const top = ranked[0]
  return {
    label,
    key,
    winner: top?.product || null,
    value: top?.value ?? null
  }
}

export function getComparisonWinners(products: Product[]): ComparisonWinner[] {
  return [
    winnerByScore(products, 'global_score', 'Best overall'),
    winnerByScore(products, 'camera_score', 'Best camera'),
    winnerByScore(products, 'battery_score', 'Best battery'),
    winnerByScore(products, 'display_score', 'Best display'),
    winnerByScore(products, 'performance_score', 'Best performance'),
    winnerByScore(products, 'value_score', 'Best value')
  ]
}

export type ComparisonVerdict = {
  winner: Product | null
  summary: string
  reasons: string[]
}

export function getComparisonVerdict(products: Product[]): ComparisonVerdict {
  if (!products.length) {
    return {
      winner: null,
      summary: 'Select smartphones to generate a comparison verdict.',
      reasons: []
    }
  }

  const ranked = rankProducts(products, 'global_score')
  const winner = ranked[0] || null
  const name = getProductName(winner)
  const score = safeNumber(winner?.global_score)
  const bestUseCase = winner ? getBestUseCase(winner) : 'balanced'

  return {
    winner,
    summary: `${name} is the strongest recommendation in this comparison${score !== null ? ` with a ${Math.round(score)}/100 global score` : ''}. It looks best for ${bestUseCase} users based on the available product intelligence signals.`,
    reasons: [
      `Best overall profile: ${name}`,
      `Strongest use case: ${bestUseCase}`,
      `Price position: ${formatPrice(winner)}`
    ]
  }
}

export function getProductImage(product?: Product | null): string | null {
  return product?.image_url || product?.image || product?.thumbnail_url || null
}

export function getScoreColor(value?: string | number | null): string {
  const score = safeNumber(value)
  if (score === null) return 'neutral'
  if (score >= 88) return 'excellent'
  if (score >= 78) return 'strong'
  if (score >= 68) return 'balanced'
  return 'entry'
}
