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

  [key: string]: unknown;
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

export type RecommendationResult = {
  product: Product;
  matchScore: number;
  reason: string;
  strengths: string[];
};

export type SearchIntent = {
  rawQuery: string;
  useCase: UseCase;
  budget: number | null;
  brand: string | null;
  category: 'smartphones' | 'foldable-smartphones' | null;
  explanation: string;
};

export type SearchResult = {
  product: Product;
  matchScore: number;
  reason: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function getSupabaseDebugStatus() {
  return {
    hasUrl: Boolean(supabaseUrl),
    hasAnonKey: Boolean(supabaseAnonKey),
  };
}

function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

// Keep one fallback only for local/dev safety.
// Production should show real Supabase data after env vars + RLS are correct.
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
      'Huawei Nova 15 Max is a demo fallback product used only when Supabase is not reachable.',
    pros_en:
      'Large display, strong battery profile, modern design, good value positioning',
    cons_en:
      'Full benchmark data and final pricing still need validation',
    expert_opinion_en:
      'A promising large-screen smartphone for users who care about display, battery life, and everyday performance.',
  },
];

const productColumns = '*';

function isSmartphoneProduct(product: Product): boolean {
  return (
    product.normalized_category === 'smartphones' ||
    product.normalized_category === 'foldable-smartphones'
  );
}

export function normalizeUseCase(value: string | null | undefined): UseCase {
  const normalized = String(value || 'balanced').toLowerCase();

  if (
    normalized === 'camera' ||
    normalized === 'battery' ||
    normalized === 'gaming' ||
    normalized === 'value' ||
    normalized === 'balanced'
  ) {
    return normalized;
  }

  return 'balanced';
}

export function safeNumber(value: string | number | null | undefined | unknown): number | null {
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
  value: string | number | null | undefined | unknown,
  fallback = 'Coming soon'
): string {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }

  return String(value);
}

export function formatScore(value: string | number | null | undefined | unknown): string {
  const score = safeNumber(value);

  if (score === null) {
    return 'Pending';
  }

  return `${Math.round(score)}/100`;
}

export function scoreLabel(value: string | number | null | undefined | unknown): string {
  const score = safeNumber(value);

  if (score === null) return 'Pending';
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Great';
  if (score >= 70) return 'Good';
  if (score >= 60) return 'Fair';
  return 'Needs review';
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

    if (eur !== null) return `€${Math.round(eur)}`;
    if (usd !== null) return `$${Math.round(usd)}`;
    if (mad !== null) return `${Math.round(mad).toLocaleString()} MAD`;
    return 'Price unavailable';
  }

  const price = safeNumber(value);
  if (price === null) return 'Price unavailable';
  return `€${Math.round(price)}`;
}

export function splitList(value: string | null | undefined): string[] {
  if (!value) return [];

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

export function productSlug(product: Product): string {
  if (product.slug) return product.slug;

  return getProductName(product)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getUseCaseLabel(useCaseInput: string): string {
  const useCase = normalizeUseCase(useCaseInput);

  const labels: Record<UseCase, string> = {
    camera: 'Camera-first',
    battery: 'Battery-first',
    gaming: 'Gaming-first',
    value: 'Best value',
    balanced: 'Balanced',
  };

  return labels[useCase];
}

function scoreProduct(product: Product, useCaseInput: string): number {
  const useCase = normalizeUseCase(useCaseInput);
  const global = safeNumber(product.global_score) || 0;
  const camera = safeNumber(product.camera_score) || 0;
  const battery = safeNumber(product.battery_score) || 0;
  const gaming = safeNumber(product.gaming_score) || 0;
  const display = safeNumber(product.display_score) || 0;
  const value = safeNumber(product.value_score) || 0;

  if (useCase === 'camera') return camera * 0.46 + global * 0.22 + display * 0.14 + value * 0.12 + battery * 0.06;
  if (useCase === 'battery') return battery * 0.46 + global * 0.22 + value * 0.16 + display * 0.08 + gaming * 0.08;
  if (useCase === 'gaming') return gaming * 0.44 + display * 0.18 + battery * 0.14 + global * 0.18 + value * 0.06;
  if (useCase === 'value') return value * 0.46 + global * 0.22 + battery * 0.12 + camera * 0.1 + display * 0.1;

  return global * 0.38 + camera * 0.16 + battery * 0.16 + gaming * 0.1 + display * 0.1 + value * 0.1;
}

function getStrengths(product: Product): string[] {
  const scores = [
    { label: 'camera', score: safeNumber(product.camera_score) },
    { label: 'battery', score: safeNumber(product.battery_score) },
    { label: 'display', score: safeNumber(product.display_score) },
    { label: 'gaming', score: safeNumber(product.gaming_score) },
    { label: 'value', score: safeNumber(product.value_score) },
  ]
    .filter((item) => item.score !== null)
    .sort((a, b) => (b.score || 0) - (a.score || 0));

  return scores.slice(0, 3).map((item) => `${item.label} ${Math.round(item.score || 0)}/100`);
}

function getRecommendationReason(product: Product, useCaseInput: string, budget?: number | null): string {
  const useCase = normalizeUseCase(useCaseInput);
  const name = getProductName(product);
  const price = safeNumber(product.price_eur);
  const priceLine = budget && price ? ` It fits within the €${budget} budget range.` : '';

  if (useCase === 'camera') return `${name} is recommended because it has one of the strongest camera profiles in the selected range, while still keeping a solid global score.${priceLine}`;
  if (useCase === 'battery') return `${name} is recommended for users who prioritize battery endurance and daily reliability, supported by its battery score and overall balance.${priceLine}`;
  if (useCase === 'gaming') return `${name} is a strong match for performance-focused users thanks to its gaming, display, and battery balance.${priceLine}`;
  if (useCase === 'value') return `${name} is a strong value pick because it balances price, global score, and practical everyday strengths.${priceLine}`;

  return `${name} is recommended as a balanced smartphone choice across camera, battery, display, gaming, and value signals.${priceLine}`;
}

function rankExistingProductsForUseCase(
  products: Product[],
  useCase: string,
  budget?: number | null,
  limit = 6
): Product[] {
  const filtered = products.filter((product) => {
    if (!budget) return true;
    const price = safeNumber(product.price_eur);
    return price === null || price <= budget;
  });

  return filtered
    .sort((a, b) => scoreProduct(b, useCase) - scoreProduct(a, useCase))
    .slice(0, limit);
}

export function getBestProducts(products: Product[], useCase: string, limit = products.length): Product[] {
  return rankExistingProductsForUseCase(products, useCase, null, limit);
}

export function buildRecommendations(
  products: Product[],
  useCase: string,
  budget?: number | null,
  limit = 6
): RecommendationResult[] {
  return rankExistingProductsForUseCase(products, useCase, budget, limit).map((product) => ({
    product,
    matchScore: Math.round(scoreProduct(product, useCase)),
    reason: getRecommendationReason(product, useCase, budget),
    strengths: getStrengths(product),
  }));
}

export function detectSearchIntent(query: string): SearchIntent {
  const rawQuery = query.trim();
  const lower = rawQuery.toLowerCase();

  let useCase: UseCase = 'balanced';
  if (/(camera|photo|video|selfie|instagram|tiktok)/i.test(lower)) useCase = 'camera';
  if (/(battery|autonomy|long lasting|5000mah|charge)/i.test(lower)) useCase = 'battery';
  if (/(gaming|game|performance|chipset|fps|gpu)/i.test(lower)) useCase = 'gaming';
  if (/(cheap|budget|value|affordable|under|less than|price)/i.test(lower)) useCase = 'value';

  const budgetMatch = lower.match(/(?:under|below|less than|max|budget)\s*€?\$?(\d{2,5})|€\s?(\d{2,5})|\$\s?(\d{2,5})/);
  const budget = budgetMatch ? Number(budgetMatch[1] || budgetMatch[2] || budgetMatch[3]) : null;

  const knownBrands = [
    'apple',
    'samsung',
    'xiaomi',
    'redmi',
    'poco',
    'oneplus',
    'oppo',
    'vivo',
    'honor',
    'huawei',
    'realme',
    'google',
    'motorola',
    'nothing',
    'asus',
    'sony',
    'nokia',
    'infinix',
    'tecno',
  ];

  const brand = knownBrands.find((item) => lower.includes(item)) || null;
  const category = lower.includes('fold') ? 'foldable-smartphones' : null;

  const explanationParts = [
    `${getUseCaseLabel(useCase)} intent`,
    budget ? `budget under €${budget}` : 'no strict budget detected',
    brand ? `brand focus: ${brand}` : 'all brands',
  ];

  return {
    rawQuery,
    useCase,
    budget,
    brand,
    category,
    explanation: explanationParts.join(' · '),
  };
}

function keywordScore(product: Product, query: string): number {
  const lower = query.toLowerCase();
  const haystack = [
    product.brand,
    product.model,
    product.full_name,
    product.chipset,
    product.content_summary_en,
    product.normalized_category,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  if (!lower) return 0;

  const terms = lower.split(/\s+/).filter((term) => term.length > 1);
  return terms.reduce((score, term) => score + (haystack.includes(term) ? 8 : 0), 0);
}

export function rankSearchResults(products: Product[], intent: SearchIntent): SearchResult[] {
  return products
    .filter((product) => {
      if (intent.budget) {
        const price = safeNumber(product.price_eur);
        if (price !== null && price > intent.budget) return false;
      }

      if (intent.brand && !safeText(product.brand, '').toLowerCase().includes(intent.brand)) {
        return false;
      }

      if (intent.category && product.normalized_category !== intent.category) {
        return false;
      }

      return true;
    })
    .map((product) => {
      const intelligenceScore = scoreProduct(product, intent.useCase);
      const textScore = keywordScore(product, intent.rawQuery);
      const matchScore = Math.round(Math.min(100, intelligenceScore * 0.9 + textScore));

      return {
        product,
        matchScore,
        reason: buildSearchReason(product, intent),
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

function buildSearchReason(product: Product, intent: SearchIntent): string {
  const name = getProductName(product);
  const useCase = normalizeUseCase(intent.useCase);

  if (useCase === 'camera') return `${name} ranks well for camera-focused searches because of its camera score, display profile, and global balance.`;
  if (useCase === 'battery') return `${name} is relevant for battery-focused searches because of its battery score and daily-use profile.`;
  if (useCase === 'gaming') return `${name} matches performance searches thanks to gaming, display, and chipset-related signals.`;
  if (useCase === 'value') return `${name} is relevant for value-focused searches because it balances price and overall score.`;

  return `${name} matches your search using brand, model, specifications, summary, and global product intelligence score.`;
}

async function fetchAllSmartphoneProducts(): Promise<Product[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    console.error('Supabase env vars missing: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.');
    return demoProducts;
  }

  const { data, error } = await supabase
    .from('products')
    .select(productColumns)
    .in('normalized_category', ['smartphones', 'foldable-smartphones'])
    .order('global_score', { ascending: false, nullsFirst: false });

  if (error) {
    console.error('Supabase products fetch error:', error.message);
    return demoProducts;
  }

  if (!data || data.length === 0) {
    console.error('Supabase products fetch returned zero rows.');
    return demoProducts;
  }

  return (data as Product[]).filter(isSmartphoneProduct);
}

export async function getProducts(limit = 24): Promise<Product[]> {
  const products = await fetchAllSmartphoneProducts();
  return products.slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getSupabaseClient();

  if (supabase) {
    const { data, error } = await supabase
      .from('products')
      .select(productColumns)
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.error('Supabase getProductBySlug error:', error.message);
    }

    if (!error && data) {
      return data as Product;
    }
  }

  return demoProducts.find((product) => product.slug === slug) || null;
}

export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
  const cleanSlugs = slugs.map((slug) => slug.trim()).filter(Boolean);
  if (cleanSlugs.length === 0) return [];

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

  if (error) {
    console.error('Supabase getProductsBySlugs error:', error.message);
    return [];
  }

  if (!data) return [];

  const productMap = new Map(
    (data as Product[]).map((product) => [product.slug, product])
  );

  return cleanSlugs
    .map((slug) => productMap.get(slug))
    .filter(Boolean) as Product[];
}

export async function searchProducts(query: string, limit = 80): Promise<Product[]> {
  const cleanQuery = query.trim();

  if (!cleanQuery) return getProducts(limit);

  const products = await fetchAllSmartphoneProducts();
  const lower = cleanQuery.toLowerCase();

  const filtered = products.filter((product) => {
    const haystack = [
      product.brand,
      product.model,
      product.full_name,
      product.chipset,
      product.content_summary_en,
      product.normalized_category,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return lower
      .split(/\s+/)
      .filter((term) => term.length > 1)
      .some((term) => haystack.includes(term));
  });

  return (filtered.length ? filtered : products).slice(0, limit);
}

export async function smartSearchProducts(query: string, limit = 24): Promise<{
  intent: SearchIntent;
  results: SearchResult[];
}> {
  const intent = detectSearchIntent(query);
  const products = await fetchAllSmartphoneProducts();
  const ranked = rankSearchResults(products, intent).slice(0, limit);

  return {
    intent,
    results: ranked,
  };
}

export function rankProductsForUseCase(
  products: Product[],
  useCase: string,
  budget?: number | null,
  limit?: number
): Product[];
export function rankProductsForUseCase(
  useCase: string,
  budget?: number | null,
  limit?: number
): Promise<Product[]>;
export function rankProductsForUseCase(
  arg1: Product[] | string,
  arg2?: string | number | null,
  arg3?: number | null,
  arg4 = 6
): Product[] | Promise<Product[]> {
  if (Array.isArray(arg1)) {
    const products = arg1;
    const useCase = typeof arg2 === 'string' ? arg2 : 'balanced';
    const budget = typeof arg3 === 'number' ? arg3 : null;
    const limit = typeof arg4 === 'number' ? arg4 : 6;

    return rankExistingProductsForUseCase(products, useCase, budget, limit);
  }

  const useCase = arg1;
  const budget = typeof arg2 === 'number' ? arg2 : null;
  const limit = typeof arg3 === 'number' ? arg3 : 6;

  return fetchAllSmartphoneProducts().then((products) =>
    rankExistingProductsForUseCase(products, useCase, budget, limit)
  );
}

export async function getDebugProductsSample(): Promise<{
  status: { hasUrl: boolean; hasAnonKey: boolean };
  count: number;
  products: Product[];
  error: string | null;
}> {
  const status = getSupabaseDebugStatus();
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      status,
      count: 0,
      products: [],
      error: 'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.',
    };
  }

  const { data, error } = await supabase
    .from('products')
    .select(productColumns)
    .in('normalized_category', ['smartphones', 'foldable-smartphones'])
    .order('global_score', { ascending: false, nullsFirst: false })
    .limit(20);

  if (error) {
    return {
      status,
      count: 0,
      products: [],
      error: error.message,
    };
  }

  const { count, error: countError } = await supabase
    .from('products')
    .select('id', { count: 'exact', head: true })
    .in('normalized_category', ['smartphones', 'foldable-smartphones']);

  return {
    status,
    count: count || 0,
    products: (data || []) as Product[],
    error: countError?.message || null,
  };
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

  const overallName = bestOverall ? getProductName(bestOverall) : 'the strongest overall option';
  const valueName = bestValue ? getProductName(bestValue) : 'the best value option';

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
