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
  price_mad?: number | string | null;
  screen_size: string | null;
  screen_type: string | null;
  resolution: string | null;
  refresh_rate: string | null;
  chipset: string | null;
  ram: string | null;
  storage: string | null;
  battery_mah: string | number | null;
  battery_capacity?: string | null;
  charging_w?: string | number | null;
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
  project_stage?: string | null;
  is_active?: boolean | null;
};

const fallbackProducts: Product[] = [
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
    pros_en: 'Large display, strong battery profile, modern design, good value positioning',
    cons_en: 'Full benchmark data and final pricing still need validation',
    expert_opinion_en:
      'A promising large-screen smartphone for users who care about display, battery life, and everyday performance.',
  },
];

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

export function safeNumber(value: number | string | null | undefined, fallback = 0): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[^0-9.-]/g, ''));
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
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
  if (!price) return 'Price soon';
  return `€${Math.round(price)}`;
}

export function splitList(value: string | null | undefined): string[] {
  if (!value) return [];
  return value
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 5);
}

export function scoreTone(value: number | string | null | undefined): string {
  const score = safeNumber(value, 0);
  if (score >= 85) return 'text-emerald-300 border-emerald-400/30 bg-emerald-400/10';
  if (score >= 75) return 'text-cyan-300 border-cyan-400/30 bg-cyan-400/10';
  if (score >= 60) return 'text-amber-300 border-amber-400/30 bg-amber-400/10';
  return 'text-slate-300 border-white/10 bg-white/5';
}

export function useCaseScore(product: Product, useCase: string): number {
  if (useCase === 'camera') return safeNumber(product.camera_score);
  if (useCase === 'battery') return safeNumber(product.battery_score);
  if (useCase === 'gaming') return safeNumber(product.gaming_score);
  if (useCase === 'display') return safeNumber(product.display_score);
  if (useCase === 'value') return safeNumber(product.value_score);
  return safeNumber(product.global_score);
}

export function useCaseLabel(useCase: string): string {
  const labels: Record<string, string> = {
    camera: 'Best for camera',
    battery: 'Best for battery',
    gaming: 'Best for gaming',
    display: 'Best display',
    value: 'Best value',
    balanced: 'Best overall',
  };
  return labels[useCase] || 'Best overall';
}

function sortByScore(products: Product[], scoreKey: keyof Product): Product[] {
  return [...products].sort((a, b) => safeNumber(b[scoreKey] as any) - safeNumber(a[scoreKey] as any));
}

export async function getProducts(limit = 24): Promise<Product[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return fallbackProducts.slice(0, limit);

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('normalized_category', ['smartphones', 'foldable-smartphones'])
    .order('global_score', { ascending: false, nullsFirst: false })
    .limit(limit);

  if (error || !data || data.length === 0) return fallbackProducts.slice(0, limit);
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

  return fallbackProducts.find((product) => product.slug === slug) || null;
}

export async function searchProducts(query = '', limit = 48): Promise<Product[]> {
  const supabase = getSupabaseClient();
  const normalizedQuery = query.trim();

  if (!supabase) return fallbackProducts;

  let request = supabase
    .from('products')
    .select('*')
    .in('normalized_category', ['smartphones', 'foldable-smartphones'])
    .limit(limit);

  if (normalizedQuery) {
    request = request.or(
      `brand.ilike.%${normalizedQuery}%,model.ilike.%${normalizedQuery}%,full_name.ilike.%${normalizedQuery}%,chipset.ilike.%${normalizedQuery}%,content_summary_en.ilike.%${normalizedQuery}%`,
    );
  }

  const { data, error } = await request.order('global_score', { ascending: false, nullsFirst: false });
  if (error || !data) return [];
  return data as Product[];
}

export async function getTopProductsByUseCase(useCase: string, limit = 6): Promise<Product[]> {
  const products = await getProducts(120);
  const keyMap: Record<string, keyof Product> = {
    camera: 'camera_score',
    battery: 'battery_score',
    gaming: 'gaming_score',
    display: 'display_score',
    value: 'value_score',
    balanced: 'global_score',
  };
  return sortByScore(products, keyMap[useCase] || 'global_score').slice(0, limit);
}

export async function getRecommendedProducts(filters: {
  useCase?: string;
  budget?: string;
  brand?: string;
}): Promise<Product[]> {
  const products = await getProducts(200);
  const budgetMax = filters.budget ? safeNumber(filters.budget, 0) : 0;
  const useCase = filters.useCase || 'balanced';

  return products
    .filter((product) => {
      const price = safeNumber(product.price_eur, 0);
      const matchBudget = !budgetMax || !price || price <= budgetMax;
      const matchBrand = !filters.brand || product.brand?.toLowerCase() === filters.brand.toLowerCase();
      return matchBudget && matchBrand;
    })
    .sort((a, b) => useCaseScore(b, useCase) - useCaseScore(a, useCase))
    .slice(0, 6);
}
