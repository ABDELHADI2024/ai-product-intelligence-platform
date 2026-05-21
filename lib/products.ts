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
  release_year?: string | number | null
  created_at?: string | null
  [key: string]: unknown
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
    content_summary_en: 'The most complete Android flagship with elite camera, display, performance, and productivity features.'
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

export function getProductName(product?: Product | null): string {
  if (!product) return 'Unknown product'
  return safeText(product.full_name || [product.brand, product.model].filter(Boolean).join(' '), 'Unknown product')
}

export function productSlug(product: Product): string {
  if (product.slug) return product.slug
  return getProductName(product).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function formatPrice(product?: Product | null): string {
  if (!product) return 'Price TBA'
  const usd = safeNumber(product.price_usd)
  const eur = safeNumber(product.price_eur)
  const mad = safeNumber(product.price_mad)
  if (usd !== null) return `$${usd.toLocaleString('en-US')}`
  if (eur !== null) return `€${eur.toLocaleString('en-US')}`
  if (mad !== null) return `${mad.toLocaleString('en-US')} MAD`
  return 'Price TBA'
}

export function scoreLabel(value?: string | number | null): string {
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
  const products = await getProducts(200)
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
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return haystack.includes(q) || q.split(/\s+/).some((part) => haystack.includes(part))
  })
}

export function rankProducts(products: Product[], key: keyof Product = 'global_score'): Product[] {
  return [...products].sort((a, b) => (safeNumber(b[key] as string | number | null) || 0) - (safeNumber(a[key] as string | number | null) || 0))
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
