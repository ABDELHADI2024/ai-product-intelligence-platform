import { hasSupabaseConfig, supabase } from './supabase';

export type Product = {
  id: string;
  brand: string | null;
  model: string | null;
  slug: string | null;
  full_name: string | null;
  product_type: string | null;
  normalized_category: string | null;
  image_url: string | null;
  price_eur: number | null;
  price_usd: number | null;
  screen_size: string | null;
  chipset: string | null;
  battery_mah: string | null;
  rear_camera: string | null;
  global_score: number | null;
  camera_score: number | null;
  battery_score: number | null;
  gaming_score: number | null;
  display_score: number | null;
  value_score: number | null;
  content_summary_en: string | null;
  expert_opinion_en: string | null;
  created_at?: string | null;
};

const demoProducts: Product[] = [
  {
    id: 'demo-1',
    brand: 'Huawei',
    model: 'Nova 15 Max',
    slug: 'huawei-nova-15-max',
    full_name: 'Huawei Nova 15 Max',
    product_type: 'smartphone',
    normalized_category: 'smartphones',
    image_url: 'https://fdn2.gsmarena.com/vv/pics/huawei/huawei-nova-15-max-1.jpg',
    price_eur: null,
    price_usd: null,
    screen_size: 'Specs coming soon',
    chipset: 'Specs coming soon',
    battery_mah: 'Specs coming soon',
    rear_camera: 'Specs coming soon',
    global_score: null,
    camera_score: null,
    battery_score: null,
    gaming_score: null,
    display_score: null,
    value_score: null,
    content_summary_en: 'A product intelligence record prepared for semantic search, AI recommendations, comparison workflows, and multilingual content.',
    expert_opinion_en: 'This product is ready for the Witflag AI intelligence pipeline.',
  },
];

export async function getProducts(limit = 24): Promise<Product[]> {
  if (!hasSupabaseConfig || !supabase) {
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
  if (!hasSupabaseConfig || !supabase) {
    return demoProducts.find((product) => product.slug === slug) || null;
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) {
    return demoProducts.find((product) => product.slug === slug) || null;
  }

  return data as Product;
}
