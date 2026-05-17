import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import { getRecommendations } from '@/lib/products';

export const dynamic = 'force-dynamic';

type AssistantPageProps = {
  searchParams?: Promise<{ priority?: string; budget?: string }>;
};

const priorities = [
  { id: 'balanced', label: 'Balanced' },
  { id: 'camera', label: 'Camera' },
  { id: 'battery', label: 'Battery' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'value', label: 'Value' },
];

const budgets = [300, 500, 800, 1200];

export default async function AssistantPage({ searchParams }: AssistantPageProps) {
  const params = searchParams ? await searchParams : {};
  const priority = params.priority || 'balanced';
  const budget = params.budget ? Number(params.budget) : undefined;
  const products = await getRecommendations(priority, budget);

  return (
    <main className="min-h-screen px-5 py-12 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Guided AI Buyer Assistant</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-black">Choose a smartphone without confusion.</h1>
          <p className="mt-4 max-w-3xl text-slate-300">
            This first assistant version is no-cost and score-based. It recommends smartphones from Supabase using your priorities and budget.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="h-fit rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Step 1</p>
            <h2 className="mt-2 text-xl font-black">What matters most?</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {priorities.map((item) => (
                <Link
                  key={item.id}
                  href={`/assistant?priority=${item.id}${budget ? `&budget=${budget}` : ''}`}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${priority === item.id ? 'bg-cyan-300 text-slate-950' : 'border border-white/10 bg-white/[0.04] text-slate-300'}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <p className="mt-8 text-xs uppercase tracking-[0.25em] text-slate-500">Step 2</p>
            <h2 className="mt-2 text-xl font-black">Budget</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {budgets.map((amount) => (
                <Link
                  key={amount}
                  href={`/assistant?priority=${priority}&budget=${amount}`}
                  className={`rounded-2xl px-4 py-3 text-center text-sm font-semibold ${budget === amount ? 'bg-cyan-300 text-slate-950' : 'border border-white/10 bg-white/[0.04] text-slate-300'}`}
                >
                  Under €{amount}
                </Link>
              ))}
            </div>
          </aside>

          <div>
            <div className="mb-5 rounded-[2rem] border border-cyan-300/15 bg-cyan-300/5 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Recommendation result</p>
              <h2 className="mt-3 text-3xl font-black">Top matches for {priority} {budget ? `under €${budget}` : ''}</h2>
              <p className="mt-3 text-slate-300">
                Ranking uses your current product scores: camera, battery, gaming, value, display, and global score.
              </p>
            </div>
            <ProductGrid products={products} />
          </div>
        </div>
      </section>
    </main>
  );
}
