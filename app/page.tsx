import Link from 'next/link';
import { Brain, GitCompare, Search, ShieldCheck, Sparkles, Smartphone } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const products = await getProducts(6);

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.22),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_50%_70%,rgba(16,185,129,0.10),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-200">
              <Sparkles className="h-4 w-4" /> Smartphone-first AI product intelligence
            </div>
            <h1 className="mt-8 max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Find the right smartphone with AI-powered product intelligence.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Witflag turns specs, scores, prices, and product content into smarter buying decisions: search, compare, understand tradeoffs, and choose with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/products" className="rounded-full bg-cyan-300 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-cyan-300/20 transition hover:bg-cyan-200">
                Explore smartphones
              </Link>
              <Link href="/search" className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 font-bold text-white transition hover:border-cyan-300/40">
                Smart search
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">
              {[
                ['AI Scored', 'Smart ranking'],
                ['Compare', 'Decision engine'],
                ['RAG-ready', 'Data foundation'],
              ].map(([title, subtitle]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xl font-black text-white">{title}</p>
                  <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[3rem] bg-cyan-300/10 blur-3xl" />
            <div className="relative rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-black/40 backdrop-blur">
              <div className="rounded-[2rem] bg-slate-950 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <p className="font-bold text-white">Witflag AI Advisor</p>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">Live data</span>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="max-w-[85%] rounded-2xl bg-white/[0.06] p-4 text-slate-200">I want a smartphone for photos, battery, and daily use under €500.</div>
                  <div className="ml-auto max-w-[88%] rounded-2xl bg-cyan-300 p-4 font-semibold text-slate-950">I’ll compare camera, battery, display, value score, and price to recommend the best matches.</div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Recommendation logic</p>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <span className="rounded-xl bg-white/[0.06] p-3">Camera score</span>
                      <span className="rounded-xl bg-white/[0.06] p-3">Battery score</span>
                      <span className="rounded-xl bg-white/[0.06] p-3">Value score</span>
                      <span className="rounded-xl bg-white/[0.06] p-3">Use case fit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Live database</p>
            <h2 className="mt-2 text-4xl font-black">Latest smartphones</h2>
          </div>
          <Link href="/products" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">View all →</Link>
        </div>
        <ProductGrid products={products} />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            [Brain, 'AI Recommendations', 'Guided smartphone buying workflows.'],
            [Search, 'Semantic Search', 'Natural-language product discovery.'],
            [GitCompare, 'Dynamic Compare', 'Side-by-side verdicts by use case.'],
            [ShieldCheck, 'Trusted Data', 'Supabase-backed product records.'],
          ].map(([Icon, title, text]) => {
            const Component = Icon as typeof Smartphone;
            return (
              <div key={String(title)} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <Component className="h-7 w-7 text-cyan-300" />
                <h3 className="mt-5 text-xl font-bold text-white">{String(title)}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{String(text)}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
