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

export type UseCase = 'camera' | 'battery' | 'gaming' | 'value' | 'balanced';

export type ScoreKey =
  | 'global_score'
  | 'camera_score'
  | 'battery_score'
  | 'display_score'
  | 'gaming_score'
  | 'value_score';

export type WinnerResult = {
  key: ScoreKey;
  label: string;
  winner: Product | null;
  value: number | null;
};

export type ComparisonVerdict = {
  bestOverall: Product | null;
  bestCamera: Product | null;
  bestBattery: Product | null;
  bestGaming: Product | null;
  bestDisplay: Product | null;
  bestValue: Product | null;
  summary: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey);
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
    price_usd: 549,
    price_mad: 5490,
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

const productColumns = `
  id,
  brand,
  model,
  full_name,
  slug,
  product_type,
  normalized_category,
  image_url,
  price_eur,
  price_usd,
  price_mad,
  screen_size,
  screen_type,
  resolution,
  refresh_rate,
  chipset,
  ram,
  storage,
  battery_mah,
  rear_camera,
  front_camera,
  camera_score,
  battery_score,
  display_score,
  gaming_score,
  value_score,
  global_score,
  content_summary_en,
  pros_en,
  cons_en,
  expert_opinion_en
`;

export function safeNumber(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }

  const parsed = Number(String(value).replace(/[^\d.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
}

export function safeText(
  value: string | number | null | undefined,
  fallback = 'Coming soon'
): string {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }

  return String(value);
}

export function formatScore(value: string | number | null | undefined): string {
  const score = safeNumber(value);

  if (score === null) {
    return 'Pending';
  }

  return `${Math.round(score)}/100`;
}

export function formatPrice(
  value:
    | Product
    | string
    | number
    | null
    | undefined
    | Pick<Product, 'price_eur' | 'price_usd' | 'price_mad'>
): string {
  if (value === null || value === undefined) {
    return 'Price unavailable';
  }

  if (typeof value === 'object' && 'price_eur' in value) {
    const eur = safeNumber(value.price_eur);
    const usd = safeNumber(value.price_usd);
    const mad = safeNumber(value.price_mad);

    if (eur !== null) {
      return `€${Math.round(eur)}`;
    }

    if (usd !== null) {
      return `$${Math.round(usd)}`;
    }

    if (mad !== null) {
      return `${Math.round(mad).toLocaleString()} MAD`;
    }

    return 'Price unavailable';
  }

  const price = safeNumber(value);

  if (price === null) {
    return 'Price unavailable';
  }

  return `€${Math.round(price)}`;
}

export function splitList(value: string | null | undefined): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getCategoryLabel(category: string | null | undefined): string {
  const normalized = safeText(category, '').toLowerCase();

  const labels: Record<string, string> = {
    smartphones: 'Smartphones',
    'foldable-smartphones': 'Foldable Smartphones',
    tablets: 'Tablets',
    smartwatches: 'Smartwatches',
    earbuds: 'Earbuds',
  };

  return labels[normalized] || safeText(category, 'Smartphones');
}

export function getProductName(product: Product): string {
  return (
    product.full_name ||
    [product.brand, product.model].filter(Boolean).join(' ') ||
    'Smartphone'
  );
}

function scoreProduct(product: Product, useCase: UseCase): number {
  const global = safeNumber(product.global_score) || 0;
  const camera = safeNumber(product.camera_score) || 0;
  const battery = safeNumber(product.battery_score) || 0;
  const gaming = safeNumber(product.gaming_score) || 0;
  const display = safeNumber(product.display_score) || 0;
  const value = safeNumber(product.value_score) || 0;

  if (useCase === 'camera') {
    return camera * 0.45 + global * 0.25 + display * 0.15 + value * 0.15;
  }

  if (useCase === 'battery') {
    return battery * 0.45 + global * 0.25 + value * 0.2 + display * 0.1;
  }

  if (useCase === 'gaming') {
    return gaming * 0.45 + display * 0.2 + battery * 0.15 + global * 0.2;
  }

  if (useCase === 'value') {
    return value * 0.45 + global * 0.25 + battery * 0.15 + camera * 0.15;
  }

  return (
    global * 0.4 +
    camera * 0.15 +
    battery * 0.15 +
    gaming * 0.1 +
    display * 0.1 +
    value * 0.1
  );
}

function rankExistingProductsForUseCase(
  products: Product[],
  useCase: UseCase,
  budget?: number | null,
  limit = 6
): Product[] {
  const filtered = products.filter((product) => {
    if (!budget) {
      return true;
    }

    const price = safeNumber(product.price_eur);
    return price === null || price <= budget;
  });

  return filtered
    .sort((a, b) => scoreProduct(b, useCase) - scoreProduct(a, useCase))
    .slice(0, limit);
}

export async function getProducts(limit = 24): Promise<Product[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return demoProducts.slice(0, limit);
  }

  const { data, error } = await supabase
    .from('products')
    .select(productColumns)
    .in('normalized_category', ['smartphones', 'foldable-smartphones'])
    .order('global_score', { ascending: false, nullsFirst: false })
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
      .select(productColumns)
      .eq('slug', slug)
      .maybeSingle();

    if (!error && data) {
      return data as Product;
    }
  }

  return demoProducts.find((product) => product.slug === slug) || null;
}

export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
  const cleanSlugs = slugs.map((slug) => slug.trim()).filter(Boolean);

  if (cleanSlugs.length === 0) {
    return [];
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    return demoProducts.filter(
      (product) => product.slug && cleanSlugs.includes(product.slug)
    );
  }

  const { data, error } = await supabase
    .from('products')
    .select(productColumns)
    .in('slug', cleanSlugs);

  if (error || !data) {
    return [];
  }

  const productMap = new Map(
    (data as Product[]).map((product) => [product.slug, product])
  );

  return cleanSlugs
    .map((slug) => productMap.get(slug))
    .filter(Boolean) as Product[];
}

export async function searchProducts(query: string, limit = 24): Promise<Product[]> {
  const cleanQuery = query.trim();

  if (!cleanQuery) {
    return getProducts(limit);
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    const lower = cleanQuery.toLowerCase();
    return demoProducts.filter((product) =>
      [product.brand, product.model, product.full_name, product.chipset]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(lower)
    );
  }

  const { data, error } = await supabase
    .from('products')
    .select(productColumns)
    .in('normalized_category', ['smartphones', 'foldable-smartphones'])
    .or(
      `brand.ilike.%${cleanQuery}%,model.ilike.%${cleanQuery}%,full_name.ilike.%${cleanQuery}%,chipset.ilike.%${cleanQuery}%,content_summary_en.ilike.%${cleanQuery}%`
    )
    .order('global_score', { ascending: false, nullsFirst: false })
    .limit(limit);

  if (error || !data) {
    return [];
  }

  return data as Product[];
}

// Compatibility overloads:
// 1. Old assistant pages may call: rankProductsForUseCase(products, useCase, budget)
// 2. Newer code may call: await rankProductsForUseCase(useCase, budget, limit)
export function rankProductsForUseCase(
  products: Product[],
  useCase: UseCase,
  budget?: number | null,
  limit?: number
): Product[];
export function rankProductsForUseCase(
  useCase: UseCase,
  budget?: number | null,
  limit?: number
): Promise<Product[]>;
export function rankProductsForUseCase(
  arg1: Product[] | UseCase,
  arg2?: UseCase | number | null,
  arg3?: number | null,
  arg4 = 6
): Product[] | Promise<Product[]> {
  if (Array.isArray(arg1)) {
    const products = arg1;
    const useCase = (arg2 || 'balanced') as UseCase;
    const budget = typeof arg3 === 'number' ? arg3 : null;
    const limit = typeof arg4 === 'number' ? arg4 : 6;

    return rankExistingProductsForUseCase(products, useCase, budget, limit);
  }

  const useCase = arg1;
  const budget = typeof arg2 === 'number' ? arg2 : null;
  const limit = typeof arg3 === 'number' ? arg3 : 6;

  return getProducts(120).then((products) =>
    rankExistingProductsForUseCase(products, useCase, budget, limit)
  );
}

export function getWinner(products: Product[], key: ScoreKey): Product | null {
  const ranked = [...products]
    .map((product) => ({ product, score: safeNumber(product[key]) }))
    .filter((item) => item.score !== null)
    .sort((a, b) => (b.score || 0) - (a.score || 0));

  return ranked[0]?.product || null;
}

export function getComparisonWinners(products: Product[]): WinnerResult[] {
  const rows: { key: ScoreKey; label: string }[] = [
    { key: 'global_score', label: 'Best overall' },
    { key: 'camera_score', label: 'Best camera' },
    { key: 'battery_score', label: 'Best battery' },
    { key: 'display_score', label: 'Best display' },
    { key: 'gaming_score', label: 'Best gaming' },
    { key: 'value_score', label: 'Best value' },
  ];

  return rows.map((row) => {
    const winner = getWinner(products, row.key);

    return {
      ...row,
      winner,
      value: winner ? safeNumber(winner[row.key]) : null,
    };
  });
}

export function getComparisonVerdict(products: Product[]): ComparisonVerdict {
  const bestOverall = getWinner(products, 'global_score');
  const bestCamera = getWinner(products, 'camera_score');
  const bestBattery = getWinner(products, 'battery_score');
  const bestGaming = getWinner(products, 'gaming_score');
  const bestDisplay = getWinner(products, 'display_score');
  const bestValue = getWinner(products, 'value_score');

  const overallName = bestOverall
    ? getProductName(bestOverall)
    : 'the strongest overall option';

  const valueName = bestValue
    ? getProductName(bestValue)
    : 'the best value option';

  const summary =
    products.length > 1
      ? `${overallName} is the strongest overall pick based on the global score. If price/value matters more, ${valueName} deserves special attention. Camera, battery, gaming, and display winners may differ depending on your personal priority.`
      : 'Select at least two smartphones to generate a more useful comparison verdict.';

  return {
    bestOverall,
    bestCamera,
    bestBattery,
    bestGaming,
    bestDisplay,
    bestValue,
    summary,
  };
}
