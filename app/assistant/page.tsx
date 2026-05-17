import Link from 'next/link';
import { BrainCircuit, Camera, BatteryCharging, Cpu, Euro, Sparkles } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import { getRecommendedProducts, useCaseLabel } from '@/lib/products';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams?: Promise<{ useCase?: string; budget?: string; brand?: string }>;
};

const useCases = [
  { value: 'balanced', label: 'Balanced', icon: Sparkles },
  { value: 'camera', label: 'Camera', icon: Camera },
  { value: 'battery', label: 'Battery', icon: BatteryCharging },
  { value: 'gaming', label: 'Gaming', icon: Cpu },
  { value: 'value', label: 'Value', icon: Euro },
];

const budgets = ['300', '500', '800', '1200'];

export default async function AssistantPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : {};
  const useCase = params.useCase || 'balanced';
  const budget = params.budget || '';
  const recommendations = await getRecommendedProducts({ useCase, budget });

  return (
    <main className="mx-auto max-w-7xl px-5 py-14">
      <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 md:p-10 card-glow">
        <div className="flex items-center gap-3 text-cyan-300">
          <BrainCircuit className="h-7 w-7" />
          <p className="text-sm font-bold uppercase tracking-[0.28em]">No-cost guided assistant</p>
        </div>
        <h1 className="mt-5 text-5xl font-black text-white">Find your smartphone match</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          This first assistant uses your Supabase scores, not paid AI APIs. Choose a budget and priority, then Witflag ranks smartphones by decision signals.
        </p>
      </section>

      <form className="mt-10 rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <label className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Main priority</label>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5 lg:grid-cols-3">
              {useCases.map((item) => {
                const Icon = item.icon;
                const active = useCase === item.value;
                return (
                  <label key={item.value} className={`cursor-pointer rounded-2xl border p-4 text-center transition ${active ? 'border-cyan-300 bg-cyan-300/10 text-cyan-200' : 'border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.07]'}`}>
                    <input type="radio" name="useCase" value={item.value} defaultChecked={active} className="hidden" />
                    <Icon className="mx-auto h-5 w-5" />
                    <span className="mt-2 block text-sm font-bold">{item.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Maximum budget</label>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {budgets.map((item) => (
                <label key={item} className={`cursor-pointer rounded-2xl border p-4 text-center font-black transition ${budget === item ? 'border-cyan-300 bg-cyan-300/10 text-cyan-200' : 'border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.07]'}`}>
                  <input type="radio" name="budget" value={item} defaultChecked={budget === item} className="hidden" />
                  Under €{item}
                </label>
              ))}
            </div>
          </div>
        </div>

        <button className="mt-7 rounded-2xl bg-cyan-300 px-6 py-4 font-black text-slate-950 hover:bg-white">Get recommendations</button>
      </form>

      <section className="mt-12">
        <div className="mb-7">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Recommendation results</p>
          <h2 className="mt-3 text-4xl font-black text-white">{useCaseLabel(useCase)}</h2>
          <p className="mt-3 text-slate-400">Ranked from your current AI-ready smartphone dataset.</p>
        </div>
        <ProductGrid products={recommendations} highlight={useCase as any} />
      </section>

      <section className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 text-slate-300">
        <h2 className="text-2xl font-black text-white">How this assistant works</h2>
        <p className="mt-4 leading-7">
          This version is rule-based: it filters by budget and ranks by camera_score, battery_score, gaming_score, value_score or global_score. Later, we can connect semantic search and RAG to make it conversational.
        </p>
        <Link href="/products" className="mt-5 inline-block font-bold text-cyan-300 hover:text-white">Explore all smartphones →</Link>
      </section>
    </main>
  );
}
