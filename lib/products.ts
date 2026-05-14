import { createClient } from '@supabase/supabase-js';

export type Product = {
  id: string;
  brand: string | null;
  model: string | null;
  full_name: string | null;
  slug: string | null;
  product_type: string | null;
  normalized_category: string | null;
  image_url: string | null;
  price_eur: number | string | null;
  price_usd?: number | string | null;
  screen_size: string | null;
  screen_type: string | null;
  resolution: string | null;
  refresh_rate: string | null;
  chipset: string | null;
  ram: string | null;
  storage: string | null;
  battery_mah: string | number | null;
  battery_capacity?: string | null;
  rear_camera: string | null;
  front_camera: string | null;
  camera_score: number | string | null;
  battery_score: number | string | null;
  display_score: number | string | null;
  gaming_score: number | string | null;
  value_score: number | string | null;
  global_score: number | string | null;
  content_summary_en: string | null;
  pros_en: string | null;
  cons_en: string | null;
  expert_opinion_en: string | null;
  created_at?: string | null;
};

export function safeText(value: unknown, fallback = 'Coming soon'): string {
  if (value === null || value === undefined || value === '') return fallback;
  return String(value);
}

export function safeNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value.replace(',', '.'));
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

export function formatScore(value: unknown): string {
  const number = safeNumber(value);
  if (number === null) return 'Pending';
  return `${Math.round(number)}/100`;
}

export function formatPrice(value: unknown, currency = '€'): string {
  const number = safeNumber(value);
  if (number === null) return 'Price coming soon';
  return `${currency}${number.toLocaleString('en-US')}`;
}

const demoProducts: Product[] = [
  {
    id: 'demo-huawei-nova-15-max',
    brand: 'Huawei',
    model: 'Nova 15 Max',
    full_name: 'Huawei Nova 15 Max',
    slug: 'huawei-nova-15-max',
    product_type: 'smartphone',
    normalized_category: 'smartphones',
    image_url: 'https://fdn2.gsmarena.com/vv/pics/huawei/huawei-nova-15-max-1.jpg',
    price_eur: 499,
    screen_size: '6.8 inches',
    screen_type: 'OLED',
    resolution: '1224 x 2700 pixels',
    refresh_rate: '120Hz',
    chipset: 'Mid-range 5G chipset',
    ram: '12GB',
    storage: '256GB',
    battery_mah: '5000',
    rear_camera: 'Triple camera system',
    front_camera: 'High-resolution selfie camera',
    camera_score: 82,
    battery_score: 86,
    display_score: 88,
    gaming_score: 78,
    value_score: 84,
    global_score: 84,
    content_summary_en:
      'Huawei Nova 15 Max is a large-screen smartphone prepared for AI product intelligence, semantic search, recommendation workflows, and dynamic comparison pages.',
    pros_en:
      'Large display, strong battery profile, modern design, good value positioning',
    cons_en:
      'Full benchmark data and final pricing still need validation',
    expert_opinion_en:
      'A promising large-screen smartphone for users who care about display, battery life, and everyday performance.',
  },
];

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey);
}

export async function getProducts(limit = 12): Promise<Product[]> {
  const supabase = getSupabaseClient();

  if (!supabase) return demoProducts.slice(0, limit);

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error || !data || data.length === 0) return demoProducts.slice(0, limit);
  return data as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getSupabaseClient();

  if (supabase) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (!error && data) return data as Product;
  }

  return demoProducts.find((product) => product.slug === slug) || null;
}

export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getProducts(50);
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return products;

  return products.filter((product) => {
    const searchable = [
      product.brand,
      product.model,
      product.full_name,
      product.normalized_category,
      product.product_type,
      product.chipset,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return searchable.includes(normalizedQuery);
  });
}
