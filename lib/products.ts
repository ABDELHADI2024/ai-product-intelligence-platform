import { getSupabaseClient } from './supabase';

export type Product = {
  id: string;
  brand: string | null;
  model: string | null;
  slug: string | null;
  product_type: string | null;
  type_model?: string | null;
  normalized_category: string | null;
  full_name: string | null;
  condition?: string | null;
  release_year?: number | string | null;
  release_month?: string | null;
  stock_status?: string | null;
  availability?: string | null;
  price_usd?: number | string | null;
  price_eur?: number | string | null;
  price_mad?: number | string | null;
  price_sar?: number | string | null;
  price_aed?: number | string | null;
  currency?: string | null;
  image_url: string | null;
  video_url?: string | null;
  screen_size?: string | null;
  screen_size_inch?: string | null;
  screen_type?: string | null;
  resolution?: string | null;
  refresh_rate?: string | null;
  refresh_rate_hz?: string | null;
  brightness_nits?: string | null;
  screen_protection?: string | null;
  chipset?: string | null;
  gpu?: string | null;
  cpu_cores?: string | null;
  ram?: string | null;
  ram_gb?: string | null;
  storage?: string | null;
  storage_gb?: string | null;
  battery_capacity?: string | null;
  battery_mah?: string | null;
  fast_charge?: string | null;
  charging_w?: string | null;
  rear_camera?: string | null;
  main_camera_mp?: string | null;
  front_camera?: string | null;
  front_camera_mp?: string | null;
  camera_score?: number | string | null;
  battery_score?: number | string | null;
  display_score?: number | string | null;
  gaming_score?: number | string | null;
  value_score?: number | string | null;
  global_score?: number | string | null;
  score_gaming?: number | string | null;
  score_battery?: number | string | null;
  score_photo?: number | string | null;
  score_screen?: number | string | null;
  score_value?: number | string | null;
  compare_score?: number | string | null;
  content_summary_en?: string | null;
  content_summary_fr?: string | null;
  content_summary_ar?: string | null;
  pros_en?: string | null;
  cons_en?: string | null;
  expert_opinion_en?: string | null;
  faq_en?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  is_active?: boolean | null;
  embedding_ready?: boolean | null;
  multilingual_ready?: boolean | null;
  project_stage?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

type UseCase = 'balanced' | 'camera' | 'battery' | 'gaming' | 'value' | 'display' | string;

type PriceInput =
  | Product
  | Pick<Product, 'price_eur' | 'price_usd' | 'price_mad'>
  | string
  | number
  | null
  | undefined;

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
    price_usd: 539,
    price_mad: 5399,
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
    is_active: true,
  },
];

export function safeNumber(value: unknown, fallback = 0): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const cleaned = value.replace(/[^0-9.-]/g, '');
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  return fallback;
}

export function safeText(value: unknown, fallback = 'Coming soon'): string {
  if (value === null || value === undefined) {
    return fallback;
  }

  const text = String(value).trim();
  return text.length > 0 ? text : fallback;
}

export function formatScore(value: unknown): string {
  const score = safeNumber(value, 0);
  return score > 0 ? `${Math.round(score)}` : 'Pending';
}

export function formatPrice(input: PriceInput): string {
  if (input === null || input === undefined) {
    return 'Price coming soon';
  }

  if (typeof input === 'string' || typeof input === 'number') {
    const price = safeNumber(input, 0);
    return price > 0 ? `€${Math.round(price).toLocaleString('en-US')}` : 'Price coming soon';
  }

  const eur = safeNumber(input.price_eur, 0);
  if (eur > 0) return `€${Math.round(eur).toLocaleString('en-US')}`;

  const usd = safeNumber(input.price_usd, 0);
  if (usd > 0) return `$${Math.round(usd).toLocaleString('en-US')}`;

  const mad = safeNumber(input.price_mad, 0);
  if (mad > 0) return `${Math.round(mad).toLocaleString('en-US')} MAD`;

  return 'Price coming soon';
}

export function splitList(value: string | null | undefined): string[] {
  if (!value) return [];

  return value
    .split(/[,;\n•]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 8);
}

export function getCategoryLabel(category: string | null | undefined): string {
  const value = safeText(category, 'smartphones');

  const labels: Record<string, string> = {
    smartphones: 'Smartphone',
    'foldable-smartphones': 'Foldable',
    tablets: 'Tablet',
    smartwatches: 'Smartwatch',
    earbuds: 'Earbuds',
  };

  return labels[value] ?? value.replace(/-/g, ' ');
}

function getUseCaseScore(product: Product, useCase: UseCase): number {
  switch (useCase) {
    case 'camera':
      return safeNumber(product.camera_score, 0) * 1.25 + safeNumber(product.global_score, 0) * 0.25;
    case 'battery':
      return safeNumber(product.battery_score, 0) * 1.25 + safeNumber(product.global_score, 0) * 0.25;
    case 'gaming':
      return safeNumber(product.gaming_score, 0) * 1.15 + safeNumber(product.display_score, 0) * 0.2;
    case 'value':
      return safeNumber(product.value_score, 0) * 1.25 + safeNumber(product.global_score, 0) * 0.25;
    case 'display':
      return safeNumber(product.display_score, 0) * 1.25 + safeNumber(product.global_score, 0) * 0.25;
    case 'balanced':
    default:
      return safeNumber(product.global_score, 0);
  }
}

function sortByGlobalScore(products: Product[]): Product[] {
  return [...products].sort(
    (a, b) => safeNumber(b.global_score, 0) - safeNumber(a.global_score, 0)
  );
}

function normalizeProducts(data: Product[]): Product[] {
  return data.filter((product) => {
    const category = product.normalized_category;
    return category === 'smartphones' || category === 'foldable-smartphones' || !category;
  });
}

export async function getProducts(limit = 24): Promise<Product[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return demoProducts.slice(0, limit);
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .in('normalized_category', ['smartphones', 'foldable-smartphones'])
      .limit(Math.max(limit, 1));

    if (error || !data || data.length === 0) {
      return demoProducts.slice(0, limit);
    }

    return sortByGlobalScore(normalizeProducts(data as Product[])).slice(0, limit);
  } catch (error) {
    console.error('getProducts failed:', error);
    return demoProducts.slice(0, limit);
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (!error && data) {
        return data as Product;
      }
    } catch (error) {
      console.error('getProductBySlug failed:', error);
    }
  }

  return demoProducts.find((product) => product.slug === slug) || null;
}

export async function searchProducts(query: string, limit = 40): Promise<Product[]> {
  const cleanQuery = query.trim().toLowerCase();
  const products = await getProducts(300);

  if (!cleanQuery) {
    return [];
  }

  const tokens = cleanQuery.split(/\s+/).filter(Boolean);

  const scored = products
    .map((product) => {
      const haystack = [
        product.brand,
        product.model,
        product.full_name,
        product.normalized_category,
        product.product_type,
        product.chipset,
        product.screen_type,
        product.ram,
        product.storage,
        product.battery_mah,
        product.content_summary_en,
      ]
        .map((part) => safeText(part, '').toLowerCase())
        .join(' ');

      const tokenMatches = tokens.filter((token) => haystack.includes(token)).length;
      const directMatch = haystack.includes(cleanQuery) ? 2 : 0;
      const score = tokenMatches + directMatch + safeNumber(product.global_score, 0) / 100;

      return { product, score };
    })
    .filter((item) => item.score > 0.5)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product);

  return scored.slice(0, limit);
}

export function rankProductsForUseCase(
  products: Product[],
  useCase: UseCase = 'balanced',
  maxBudget?: number
): Product[] {
  return [...products]
    .filter((product) => {
      if (!maxBudget || maxBudget <= 0) return true;
      const price = safeNumber(product.price_eur, 0);
      return price > 0 ? price <= maxBudget : true;
    })
    .sort((a, b) => getUseCaseScore(b, useCase) - getUseCaseScore(a, useCase));
}
