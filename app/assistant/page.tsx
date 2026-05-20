import Link from 'next/link';
import {
  BatteryCharging,
  Camera,
  Gamepad2,
  Gem,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import RecommendationCard from '@/components/RecommendationCard';
import {
  buildRecommendations,
  getProducts,
  getUseCaseLabel,
  normalizeUseCase,
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
}[] = [
  {
    id: 'balanced',
    label: 'Balanced',
    description: 'Strong overall choice across camera, battery, display, gaming, and value.',
    icon: Sparkles,
  },
  {
    id: 'camera',
    label: 'Camera',
    description: 'Prioritize photos, video, social media, and camera experience.',
    icon: Camera,
  },
  {
    id: 'battery',
    label: 'Battery',
    description: 'Prioritize long battery life and reliable daily usage.',
    icon: BatteryCharging,
  },
  {
    id: 'gaming',
    label: 'Gaming',
    description: 'Prioritize performance, display, and sustained power.',
    icon: Gamepad2,
  },
  {
    id: 'value',
    label: 'Value',
    description: 'Prioritize the best score for the money.',
    icon: Gem,
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

  if (budget) {
    params.set('budget', budget);
  }

  return `/assistant?${params.toString()}`;
}

export default async function AssistantPage({ searchParams }: AssistantPageProps) {
  const sp = searchParams ? await searchParams : {};
  const use = normalizeUseCase(sp.use);
  const budgetNumber = sp.budget ? Number(sp.budget) : null;

  const products = await getProducts(300);
  const recommendations = buildRecommendations(products, use, budgetNumber, 6);

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="page-hero premium-shell border-b border-white/10">
        <div className="content-shell mx-auto max-w-7xl px-5 py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-200">
            <Sparkles className="h-4 w-4" />
            AI Buyer Assistant
          </div>

          <h1 className="mt-7 max-w-5xl text-5xl font-black tracking-tight md:text-7xl">
            Find the right smartphone without confusion.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Choose your priority and budget. Witflag ranks smartphones using
            camera, battery, gaming, display, value, and global scores from your
            real Supabase product intelligence database.
          </p>

          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.05] p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
              Current assistant profile
            </p>
            <p className="mt-2 text-xl font-bold text-white">
              {getUseCaseLabel(use)}
              {budgetNumber ? ` · under €${budgetNumber}` : ' · any budget'}
            </p>
          </div>
        </div>
      </section>

      <section className="content-shell mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[360px_1fr]">
        <aside className="h-fit rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300">
              <SlidersHorizontal className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                Filters
              </p>
              <h2 className="font-bold text-white">Choose your profile</h2>
            </div>
          </div>

          <div className="mt-7">
            <p className="mb-3 text-sm font-semibold text-slate-300">Main priority</p>
            <div className="space-y-3">
              {priorities.map((priority) => {
                const Icon = priority.icon;
                const active = priority.id === use;

                return (
                  <Link
                    key={priority.id}
                    href={makeHref(priority.id, sp.budget || '')}
                    className={`block rounded-2xl border p-4 transition ${
                      active
                        ? 'border-cyan-300/50 bg-cyan-300/10'
                        : 'border-white/10 bg-white/[0.03] hover:border-cyan-300/25'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={
                          active
                            ? 'h-5 w-5 text-cyan-300'
                            : 'h-5 w-5 text-slate-400'
                        }
                      />
                      <span className="font-semibold text-white">{priority.label}</span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {priority.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold text-slate-300">Budget</p>
            <div className="grid gap-2">
              {budgets.map((budget) => {
                const active = (sp.budget || '') === budget.value;

                return (
                  <Link
                    key={budget.label}
                    href={makeHref(use, budget.value)}
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? 'border-cyan-300/50 bg-cyan-300/10 text-cyan-100'
                        : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-300/25'
                    }`}
                  >
                    {budget.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        <section>
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
              Top recommendations
            </p>
            <h2 className="mt-2 text-3xl font-black text-white">
              Best matches for your profile
            </h2>
            <p className="mt-3 text-slate-400">
              Recommendations are ranked using your existing product scores, not paid AI generation.
            </p>
          </div>

          <div className="space-y-5">
            {recommendations.map((recommendation, index) => (
              <RecommendationCard
                key={recommendation.product.id}
                recommendation={recommendation}
                rank={index + 1}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
