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
  screen_size: string | null;
  screen_type: string | null;
  resolution: string | null;
  refresh_rate: string | null;
  chipset: string | null;
  ram: string | null;
  storage: string | null;
  battery_mah: string | null;
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
};

export function safeNumber(value: number | string | null | undefined, fallback = 0): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

export function formatScore(value: number | string | null | undefined): string {
  const score = safeNumber(value, 0);
  return score > 0 ? String(Math.round(score)) : 'Pending';
}

export function formatPrice(value: number | string | null | undefined): string {
  const price = safeNumber(value, 0);
  return price > 0 ? `€${Math.round(price)}` : 'Price soon';
}

export function safeText(value: string | null | undefined, fallback = 'Coming soon'): string {
  if (!value || value.trim().length === 0) return fallback;
  return value;
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
    content_summary_en: 'A large-screen smartphone prepared for AI product intelligence, semantic search, recommendation workflows, and dynamic comparison pages.',
    pros_en: 'Large OLED display, strong battery profile, modern design, good value positioning',
    cons_en: 'Full benchmark data still needs validation, camera details need final confirmation',
    expert_opinion_en: 'A promising large-screen smartphone for users who care about display, battery life, and everyday performance.',
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

export async function getProducts(limit = 12): Promise<Product[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return demoProducts.slice(0, limit);
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
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

    if (!error && data) {
      return data as Product;
    }
  }

  return demoProducts.find((product) => product.slug === slug) || null;
}
