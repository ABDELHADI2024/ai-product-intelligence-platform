import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { BatteryCharging, Camera, Cpu, GitCompare, Search, ShieldCheck, Sparkles } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import SearchBar from '@/components/SearchBar';
import ScoreRing from '@/components/ScoreRing';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

const features: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Search, title: 'Smart search', text: 'Search by brand, model, use case, or buying intent.' },
  { icon: GitCompare, title: 'Dynamic compare', text: 'Compare smartphones by specs, price, and scores.' },
  { icon: ShieldCheck, title: 'AI verdicts', text: 'Explain who each smartphone is best for.' },
  { icon: Sparkles, title: 'Guided assistant', text: 'No-cost recommendation flow using product scores.' },
];

export default async function HomePage() {
  const products = await getProducts(8);
  const heroProduct = products[0];

  return (
    <main className="min-h-screen text-white">
      <section className="relative overflow-hidden border-b border-white/10 ai-grid">
        <div className="absolute left-1/2 top-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-10 top-32 h-[28rem] w-[28rem] rounded-full bg-purple-500/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200">
              <Sparkles className="h-4 w-4" />
              AI-powered smartphone buying decisions
            </div>
            <h1 className="mt-8 max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
              Find the right smartphone with <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">AI product intelligence.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Witflag analyzes smartphone specs, scores, prices, strengths, trade-offs, and use cases to help buyers choose with confidence.
            </p>
            <div className="mt-8 max-w-2xl">
              <SearchBar placeholder="Try: best phone for camera and battery under 500 euros" />
            </div>
            <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ['296', 'AI-ready phones'],
                ['6', 'decision scores'],
                ['0€', 'assistant API cost'],
                ['Live', 'Supabase data'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-5">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Featured smartphone</p>
                  <h2 className="mt-2 text-2xl font-black">{heroProduct?.full_name || 'Huawei Nova 15 Max'}</h2>
                </div>
                <ScoreRing value={heroProduct?.global_score || 84} label="AI Score" />
              </div>
              <div className="mt-6 flex h-80 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 p-8">
                {heroProduct?.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={heroProduct.image_url} alt={heroProduct.full_name || 'Smartphone'} className="max-h-full object-contain drop-shadow-2xl" />
                ) : null}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
                <div className="rounded-2xl bg-white/[0.04] p-3"><Camera className="mx-auto mb-2 h-4 w-4 text-cyan-300" />Camera</div>
                <div className="rounded-2xl bg-white/[0.04] p-3"><BatteryCharging className="mx-auto mb-2 h-4 w-4 text-emerald-300" />Battery</div>
                <div className="rounded-2xl bg-white/[0.04] p-3"><Cpu className="mx-auto mb-2 h-4 w-4 text-purple-300" />Power</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-4 md:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <Icon className="h-6 w-6 text-cyan-300" />
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Top rated smartphones</p>
            <h2 className="mt-3 text-4xl font-black">AI-scored product intelligence</h2>
          </div>
          <Link href="/products" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">View all smartphones →</Link>
        </div>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
