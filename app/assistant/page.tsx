import Link from 'next/link';
import { BatteryCharging, Camera, Gamepad2, Gem, Sparkles } from 'lucide-react';
import AssistantChatPreview from '@/components/AssistantChatPreview';
import BentoGrid from '@/components/BentoGrid';
import ProductCard from '@/components/ProductCard';
import { getProducts, normalizeUseCase, safeNumber, type Product, type UseCase } from '@/lib/products';

export const dynamic = 'force-dynamic';

type AssistantPageProps = {
  searchParams?: Promise<{ use?: string; budget?: string }>;
};

const priorities: { id: UseCase; label: string; description: string; icon: typeof Sparkles }[] = [
  { id: 'balanced', label: 'Balanced', description: 'Best global balance across all decision signals.', icon: Sparkles },
  { id: 'camera', label: 'Camera', description: 'Photos, video, social media, travel, and creator usage.', icon: Camera },
  { id: 'battery', label: 'Battery', description: 'Long days, travel, work, and reliable daily usage.', icon: BatteryCharging },
  { id: 'gaming', label: 'Gaming', description: 'Performance, chipset power, smooth display, and heat control.', icon: Gamepad2 },
  { id: 'value', label: 'Value', description: 'The strongest phone experience for the money.', icon: Gem },
];

const budgets = [
  { label: 'Any budget', value: '' },
  { label: 'Under €300', value: '300' },
  { label: 'Under €500', value: '500' },
  { label: 'Under €800', value: '800' },
  { label: 'Premium', value: '1200' },
];

function makeHref(use: UseCase, budget?: string) {
  const params = new URLSearchParams();
  params.set('use', use);
  if (budget) params.set('budget', budget);
  return `/assistant?${params.toString()}`;
}

function scoreProduct(product: Product, use: UseCase) {
  const global = safeNumber(product.global_score) || 0;
  const camera = safeNumber(product.camera_score) || 0;
  const battery = safeNumber(product.battery_score) || 0;
  const gaming = safeNumber(product.gaming_score) || 0;
  const display = safeNumber(product.display_score) || 0;
  const value = safeNumber(product.value_score) || 0;
  if (use === 'camera') return camera * 0.48 + global * 0.22 + display * 0.15 + value * 0.15;
  if (use === 'battery') return battery * 0.48 + global * 0.22 + value * 0.16 + display * 0.14;
  if (use === 'gaming') return gaming * 0.46 + display * 0.18 + battery * 0.16 + global * 0.2;
  if (use === 'value') return value * 0.48 + global * 0.25 + battery * 0.14 + camera * 0.13;
  return global * 0.4 + camera * 0.15 + battery * 0.15 + gaming * 0.1 + display * 0.1 + value * 0.1;
}

function rankProducts(products: Product[], use: UseCase, budget: number | null) {
  return products
    .filter((product) => {
      if (!budget) return true;
      const price = safeNumber(product.price_eur);
      return price === null || price <= budget;
    })
    .sort((a, b) => scoreProduct(b, use) - scoreProduct(a, use))
    .slice(0, 6);
}

function assistantTitle(use: UseCase) {
  const labels: Record<UseCase, string> = {
    balanced: 'balanced smartphone',
    camera: 'camera-first phone',
    battery: 'battery-first phone',
    gaming: 'gaming phone',
    value: 'best-value phone',
  };
  return labels[use];
}

export default async function AssistantPage({ searchParams }: AssistantPageProps) {
  const sp = searchParams ? await searchParams : {};
  const use = normalizeUseCase(sp.use);
  const budget = sp.budget ? Number(sp.budget) : null;
  const products = await getProducts(300);
  const recommendations = rankProducts(products, use, budget);

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_34%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.22),transparent_34%)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-200">
              <Sparkles className="h-4 w-4" />
              Guided Assistant
            </div>
            <h1 className="mt-7 max-w-5xl text-5xl font-black tracking-tight md:text-7xl">
              Find your {assistantTitle(use)} with real score logic.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              This is not the future RAG chatbot yet. It is a guided product advisor that uses your real smartphone database and score signals.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {budgets.map((item) => (
                <Link
                  key={item.label}
                  href={makeHref(use, item.value)}
                  className={`rounded-full border px-5 py-3 text-sm font-bold transition ${(sp.budget || '') === item.value ? 'border-cyan-300/50 bg-cyan-300/10 text-cyan-100' : 'border-white/10 bg-white/[0.05] text-slate-300 hover:border-cyan-300/30'}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <AssistantChatPreview use={use} budget={budget} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="grid gap-4 md:grid-cols-5">
          {priorities.map((priority) => {
            const Icon = priority.icon;
            const active = priority.id === use;
            return (
              <Link
                key={priority.id}
                href={makeHref(priority.id, sp.budget || '')}
                className={`rounded-[2rem] border p-5 transition hover:-translate-y-1 ${active ? 'border-cyan-300/50 bg-cyan-300/10' : 'border-white/10 bg-white/[0.045] hover:border-cyan-300/30'}`}
              >
                <Icon className={active ? 'h-7 w-7 text-cyan-300' : 'h-7 w-7 text-slate-400'} />
                <h2 className="mt-4 font-black">{priority.label}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">{priority.description}</p>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 mb-6">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Real recommendations</p>
          <h2 className="mt-2 text-4xl font-black">Best matches from your live products.</h2>
          <p className="mt-3 text-slate-400">Ranked with score logic. Later, RAG will add conversational explanations.</p>
        </div>

        <BentoGrid>
          {recommendations.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </BentoGrid>
      </section>
    </main>
  );
}
