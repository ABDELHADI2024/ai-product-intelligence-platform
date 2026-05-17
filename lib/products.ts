import { getSupabaseClient } from './supabase';

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
  price_mad?: number | string | null;
  screen_size: string | null;
  screen_type: string | null;
  resolution: string | null;
  refresh_rate: string | null;
  refresh_rate_hz?: string | null;
  brightness_nits?: string | null;
  chipset: string | null;
  gpu?: string | null;
  ram: string | null;
  ram_gb?: string | null;
  storage: string | null;
  storage_gb?: string | null;
  battery_mah: string | number | null;
  battery_capacity?: string | null;
  charging_w?: string | null;
  rear_camera: string | null;
  main_camera_mp?: string | null;
  front_camera: string | null;
  front_camera_mp?: string | null;
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
  meta_title?: string | null;
  meta_description?: string | null;
  project_stage?: string | null;
  created_at?: string | null;
};

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

export function safeNumber(value: number | string | null | undefined, fallback = 0): number {
  if (value === null || value === undefined || value === '') return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function safeText(value: string | number | null | undefined, fallback = 'Coming soon'): string {
  if (value === null || value === undefined || value === '') return fallback;
  return String(value);
}

export function formatScore(value: number | string | null | undefined): string {
  const score = safeNumber(value, 0);
  return score > 0 ? String(Math.round(score)) : 'Pending';
}

export function formatPrice(value: number | string | null | undefined): string {
  const price = safeNumber(value, 0);
  if (price <= 0) return 'Price coming soon';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

export function splitList(value: string | null | undefined): string[] {
  if (!value) return [];
  return value
    .split(/[,;|\n]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6);
}

export function scoreTone(value: number | string | null | undefined): string {
  const score = safeNumber(value, 0);
  if (score >= 85) return 'text-emerald-300 border-emerald-300/40 bg-emerald-300/10';
  if (score >= 70) return 'text-cyan-300 border-cyan-300/40 bg-cyan-300/10';
  if (score >= 55) return 'text-amber-300 border-amber-300/40 bg-amber-300/10';
  return 'text-slate-300 border-white/15 bg-white/[0.04]';
}

export function useCaseLabel(product: Product): string {
  const camera = safeNumber(product.camera_score);
  const battery = safeNumber(product.battery_score);
  const gaming = safeNumber(product.gaming_score);
  const value = safeNumber(product.value_score);
  const best = Math.max(camera, battery, gaming, value);
  if (best === camera) return 'Best for camera';
  if (best === battery) return 'Best for battery';
  if (best === gaming) return 'Best for performance';
  return 'Best value';
}

export async function getProducts(limit = 24): Promise<Product[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return demoProducts.slice(0, limit);

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('normalized_category', ['smartphones', 'foldable-smartphones'])
    .order('global_score', { ascending: false, nullsFirst: false })
    .limit(limit);

  if (error || !data || data.length === 0) {
    return demoProducts.slice(0, limit);
  }

  return data as Product[];
}

export async function getLatestProducts(limit = 8): Promise<Product[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return demoProducts.slice(0, limit);

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('normalized_category', ['smartphones', 'foldable-smartphones'])
    .order('created_at', { ascending: false, nullsFirst: false })
    .limit(limit);

  if (error || !data || data.length === 0) return getProducts(limit);
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

export async function searchProducts(query: string, limit = 24): Promise<Product[]> {
  const trimmed = query.trim();
  if (!trimmed) return getProducts(limit);

  const supabase = getSupabaseClient();
  if (!supabase) {
    return demoProducts.filter((product) =>
      `${product.brand} ${product.model} ${product.full_name}`
        .toLowerCase()
        .includes(trimmed.toLowerCase())
    );
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('normalized_category', ['smartphones', 'foldable-smartphones'])
    .or(
      `brand.ilike.%${trimmed}%,model.ilike.%${trimmed}%,full_name.ilike.%${trimmed}%,chipset.ilike.%${trimmed}%,content_summary_en.ilike.%${trimmed}%`
    )
    .order('global_score', { ascending: false, nullsFirst: false })
    .limit(limit);

  if (error || !data) return [];
  return data as Product[];
}

export async function getRecommendations(priority = 'balanced', budget?: number): Promise<Product[]> {
  const products = await getProducts(96);
  const filtered = budget ? products.filter((p) => safeNumber(p.price_eur, 0) <= budget || !p.price_eur) : products;

  const scoreKey =
    priority === 'camera'
      ? 'camera_score'
      : priority === 'battery'
        ? 'battery_score'
        : priority === 'gaming'
          ? 'gaming_score'
          : priority === 'value'
            ? 'value_score'
            : 'global_score';

  return filtered
    .sort((a, b) => safeNumber(b[scoreKey as keyof Product] as string | number | null) - safeNumber(a[scoreKey as keyof Product] as string | number | null))
    .slice(0, 6);
}
