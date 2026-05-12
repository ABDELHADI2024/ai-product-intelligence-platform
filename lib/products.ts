import { supabase, isSupabaseConfigured } from './supabase';

export type Product = {
  id: string;
  brand: string | null;
  model: string | null;
  slug: string | null;
  full_name: string | null;
  product_type: string | null;
  normalized_category: string | null;
  image_url: string | null;
  price_usd: number | null;
  price_eur: number | null;
  screen_size: string | null;
  chipset: string | null;
  battery_mah: string | null;
  rear_camera: string | null;
  global_score: number | null;
  camera_score: number | null;
  battery_score: number | null;
  gaming_score: number | null;
  value_score: number | null;
  content_summary_en: string | null;
  project_stage: string | null;
  created_at: string | null;
};

const fallbackProducts: Product[] = [
  {
    id: 'demo-huawei-nova-15-max',
    brand: 'Huawei',
    model: 'Nova 15 Max',
    slug: 'huawei-nova-15-max',
    full_name: 'Huawei Nova 15 Max',
    product_type: 'smartphone',
    normalized_category: 'smartphones',
    image_url: 'https://fdn2.gsmarena.com/vv/pics/huawei/huawei-nova-15-max-1.jpg',
    price_usd: null,
    price_eur: null,
    screen_size: null,
    chipset: null,
    battery_mah: null,
    rear_camera: null,
    global_score: null,
    camera_score: null,
    battery_score: null,
    gaming_score: null,
    value_score: null,
    content_summary_en: 'Demo product from the Witflag AI data pipeline. Connect Supabase to display live products.',
    project_stage: 'demo',
    created_at: null
  }
];

export async function getProducts(limit = 24): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) return fallbackProducts;

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Supabase products error:', error.message);
    return fallbackProducts;
  }

  return data?.length ? (data as Product[]) : fallbackProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured || !supabase) {
    return fallbackProducts.find((product) => product.slug === slug) || null;
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Supabase product error:', error.message);
    return fallbackProducts.find((product) => product.slug === slug) || null;
  }

  return data as Product;
}
