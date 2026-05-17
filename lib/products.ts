import { getSupabaseClient } from './supabase';

export type Product = {
  id: string;
  brand: string | null;
  model: string | null;
  slug: string | null;
  product_type: string | null;
  normalized_category: string | null;
  full_name: string | null;
  price_eur: string | number | null;
  price_usd?: string | number | null;
  price_mad?: string | number | null;
  currency?: string | null;
  image_url: string | null;
  screen_size: string | null;
  screen_size_inch?: string | null;
  screen_type: string | null;
  resolution: string | null;
  refresh_rate: string | null;
  refresh_rate_hz?: string | number | null;
  chipset: string | null;
  gpu?: string | null;
  ram: string | null;
  ram_gb?: string | number | null;
  storage: string | null;
  storage_gb?: string | number | null;
  battery_mah: string | number | null;
  battery_capacity?: string | null;
  charging_w?: string | number | null;
  rear_camera: string | null;
  main_camera_mp?: string | number | null;
  front_camera: string | null;
  camera_score: string | number | null;
  battery_score: string | number | null;
  display_score: string | number | null;
  gaming_score: string | number | null;
  value_score: string | number | null;
  global_score: string | number | null;
  content_summary_en: string | null;
  pros_en: string | null;
  cons_en: string | null;
  expert_opinion_en: string | null;
  created_at?: string | null;
};

export const demoProducts: Product[] = [
  {
    id: 'demo-huawei-nova-15-max',
    brand: 'Huawei',
    model: 'Nova 15 Max',
    slug: 'huawei-nova-15-max',
    product_type: 'smartphone',
    normalized_category: 'smartphones',
    full_name: 'Huawei Nova 15 Max',
    price_eur: 499,
    image_url: 'https://fdn2.gsmarena.com/vv/pics/huawei/huawei-nova-15-max-1.jpg',
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
      'Huawei Nova 15 Max is a large-screen smartphone prepared for AI product intelligence, semantic search, recommendations, and dynamic comparison workflows.',
    pros_en: 'Large display, strong battery profile, modern design, good value positioning',
    cons_en: 'Full benchmark validation still needed, final market pricing may vary',
    expert_opinion_en:
      'A strong large-screen smartphone profile for users who want display comfort, battery life, and everyday value.',
  },
];

export function safeNumber(value: unknown, fallback = 0): number {
  if (value === null || value === undefined || value === '') return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function safeText(value: unknown, fallback = 'Coming soon'): string {
  if (value === null || value === undefined) return fallback;
  const text = String(value).trim();
  return text.length > 0 ? text : fallback;
}

export function formatScore(value: unknown): string {
  const score = safeNumber(value, 0);
  return score > 0 ? String(Math.round(score)) : '—';
}

export function formatPrice(product: Pick<Product, 'price_eur' | 'price_usd' | 'price_mad'>): string {
  const eur = safeNumber(product.price_eur, 0);
  if (eur > 0) return `€${Math.round(eur)}`;

  const usd = safeNumber(product.price_usd, 0);
  if (usd > 0) return `$${Math.round(usd)}`;

  const mad = safeNumber(product.price_mad, 0);
  if (mad > 0) return `${Math.round(mad)} MAD`;

  return 'Price coming soon';
}

export function splitList(value: string | null | undefined): string[] {
  if (!value) return [];
  return value
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6);
}

export function getCategoryLabel(value: string | null | undefined): string {
  const category = safeText(value, 'smartphones');
  return category.replaceAll('-', ' ');
}

export async function getProducts(limit = 60): Promise<Product[]> {
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

  if (error || !data || data.length === 0) {
    return demoProducts.slice(0, limit);
  }

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

export async function searchProducts(query: string, limit = 30): Promise<Product[]> {
  const clean = query.trim();
  const all = await getProducts(300);

  if (!clean) return all.slice(0, limit);

  const q = clean.toLowerCase();

  return all
    .filter((product) => {
      const searchable = [
        product.brand,
        product.model,
        product.full_name,
        product.normalized_category,
        product.chipset,
        product.content_summary_en,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchable.includes(q);
    })
    .slice(0, limit);
}

export function rankProductsForUseCase(products: Product[], useCase: string, budget?: number): Product[] {
  return [...products]
    .filter((product) => {
      if (!budget) return true;
      const price = safeNumber(product.price_eur, safeNumber(product.price_usd, 0));
      return price === 0 || price <= budget;
    })
    .sort((a, b) => {
      const key =
        useCase === 'camera'
          ? 'camera_score'
          : useCase === 'battery'
          ? 'battery_score'
          : useCase === 'gaming'
          ? 'gaming_score'
          : useCase === 'value'
          ? 'value_score'
          : 'global_score';

      return safeNumber(b[key as keyof Product]) - safeNumber(a[key as keyof Product]);
    });
}
