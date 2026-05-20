import Link from 'next/link';
import {
  BatteryCharging,
  Camera,
  Gamepad2,
  Gem,
  Search,
  Sparkles,
  Trophy,
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import {
  getProducts,
  normalizeUseCase,
  safeNumber,
  type Product,
  type UseCase,
} from '@/lib/products';

export const dynamic = 'force-dynamic';

type AssistantPageProps = {
  searchParams?: Promise<{
    use?: string;
    budget?: string;
  }>;
};

const priorities: {
  id: UseCase;
  label: string;
  description: string;
  icon: typeof Sparkles;
  gradient: string;
}[] = [
  {
    id: 'balanced',
    label: 'Balanced',
    description: 'Best global balance across camera, battery, gaming, display, and value.',
    icon: Sparkles,
    gradient: 'from-cyan-400/20 to-violet-500/20',
  },
  {
    id: 'camera',
    label: 'Camera',
    description: 'For photos, video, social media, travel, and creator usage.',
    icon: Camera,
    gradient: 'from-cyan-400/20 to-blue-500/20',
  },
  {
    id: 'battery',
    label: 'Battery',
    description: 'For long days, travel, work, and reliable daily usage.',
    icon: BatteryCharging,
    gradient: 'from-emerald-400/20 to-cyan-500/20',
  },
  {
    id: 'gaming',
    label: 'Gaming',
    description: 'For performance, chipset power, smooth display, and heat control.',
    icon: Gamepad2,
    gradient: 'from-amber-400/20 to-violet-500/20',
  },
  {
    id: 'value',
    label: 'Value',
    description: 'For the strongest phone experience for the money.',
    icon: Gem,
    gradient: 'from-violet-400/20 to-fuchsia-500/20',
  },
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

function useLabel(use: UseCase) {
  const labels: Record<UseCase, string> = {
    balanced: 'Balanced buyer',
    camera: 'Camera-first buyer',
    battery: 'Battery-first buyer',
    gaming: 'Gaming-first buyer',
    value: 'Value-first buyer',
  };
  return labels[use];
}

export default async function AssistantPage({ searchParams }: AssistantPageProps) {
  const sp = searchParams ? await searchParams : {};
  const use = normalizeUseCase(sp.use);
  const budget = sp.budget ? Number(sp.budget) : null;
  const products = await getProducts(300);
  const recommendations = rankProducts(products, use, budget);
  const activePriority = priorities.find((item) => item.id === use) || priorities[0];
  const ActiveIcon = activePriority.icon;

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_34%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.22),transparent_34%)]">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-200">
                <Sparkles className="h-4 w-4" />
                AI Buyer Assistant
              </div>

              <h1 className="mt-7 max-w-5xl text-5xl font-black tracking-tight md:text-7xl">
                Tell Witflag what matters. Get the right phone.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                Choose your priority and budget. Witflag ranks real smartphones using your
                product intelligence scores — no paid AI API needed for this MVP.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/search?q=best camera phone under 500"
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-bold text-slate-950 hover:bg-cyan-300"
                >
                  <Search className="h-4 w-4" />
                  Try smart search
                </Link>
                <Link
                  href="/compare"
                  className="rounded-full border border-white/15 bg-white/[0.05] px-6 py-3 font-bold text-white hover:bg-white/[0.08]"
                >
                  Compare phones
                </Link>
              </div>
            </div>

            <div className={`rounded-[2.5rem] border border-white/10 bg-gradient-to-br ${activePriority.gradient} p-6 shadow-2xl shadow-black/30`}>
              <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-300/10 text-cyan-300">
                    <ActiveIcon className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                      Active profile
                    </p>
                    <h2 className="mt-1 text-2xl font-black">{useLabel(use)}</h2>
                  </div>
                </div>

                <p className="mt-5 leading-7 text-slate-300">{activePriority.description}</p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <p className="text-2xl font-black">{budget ? `€${budget}` : 'Any'}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">Budget</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <p className="text-2xl font-black">{recommendations.length}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">Matches</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[360px_1fr]">
        <aside className="h-fit rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Assistant filters</p>
          <h2 className="mt-2 text-2xl font-black">Build your profile</h2>

          <div className="mt-6 space-y-3">
            {priorities.map((priority) => {
              const Icon = priority.icon;
              const active = priority.id === use;

              return (
                <Link
                  key={priority.id}
                  href={makeHref(priority.id, sp.budget || '')}
                  className={`block rounded-3xl border p-4 transition ${
                    active
                      ? 'border-cyan-300/50 bg-cyan-300/10'
                      : 'border-white/10 bg-white/[0.03] hover:border-cyan-300/25'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={active ? 'h-5 w-5 text-cyan-300' : 'h-5 w-5 text-slate-400'} />
                    <span className="font-bold">{priority.label}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{priority.description}</p>
                </Link>
              );
            })}
          </div>

          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold text-slate-300">Budget</p>
            <div className="grid gap-2">
              {budgets.map((item) => {
                const active = (sp.budget || '') === item.value;
                return (
                  <Link
                    key={item.label}
                    href={makeHref(use, item.value)}
                    className={`rounded-2xl border px-4 py-3 text-sm font-bold transition ${
                      active
                        ? 'border-cyan-300/50 bg-cyan-300/10 text-cyan-100'
                        : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-300/25'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        <section>
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Recommendations</p>
            <h2 className="mt-2 text-4xl font-black">Best matches for you.</h2>
            <p className="mt-3 text-slate-400">
              Ranked from your live product database using camera, battery, gaming,
              value, display, and global score signals.
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {recommendations.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
