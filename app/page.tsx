import Link from 'next/link';
import { Bot, GitCompare, Search, Sparkles } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import UseCaseSection from '@/components/UseCaseSection';
import AIScoreExplanation from '@/components/AIScoreExplanation';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const products = await getProducts(8);

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent_35%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_30%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
              <Sparkles className="h-4 w-4" />
              AI Smartphone Intelligence Platform
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">
              Smarter smartphone decisions with AI product intelligence.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Witflag helps buyers search, compare, and understand smartphones using structured specs, scores, recommendations, and AI-ready product data.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/assistant" className="rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950">
                Try AI Buyer Assistant
              </Link>
              <Link href="/products" className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white">
                View smartphones
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4 text-center">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-2xl font-bold text-white">AI</p>
                <p className="text-xs text-slate-400">Guidance</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-2xl font-bold text-white">5</p>
                <p className="text-xs text-slate-400">Core scores</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-2xl font-bold text-white">RAG</p>
                <p className="text-xs text-slate-400">Ready data</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-cyan-950/20">
            <div className="grid gap-4">
              <div className="rounded-3xl bg-black/20 p-5">
                <Search className="h-6 w-6 text-cyan-300" />
                <h3 className="mt-4 text-xl font-semibold text-white">Semantic smartphone search</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">Search by needs like camera, battery, budget, gaming, or student use.</p>
              </div>
              <div className="rounded-3xl bg-black/20 p-5">
                <GitCompare className="h-6 w-6 text-purple-300" />
                <h3 className="mt-4 text-xl font-semibold text-white">Dynamic comparison engine</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">Compare phones by specs, scores, value, and user intent.</p>
              </div>
              <div className="rounded-3xl bg-black/20 p-5">
                <Bot className="h-6 w-6 text-green-300" />
                <h3 className="mt-4 text-xl font-semibold text-white">Guided AI buyer assistant</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">A no-cost first AI workflow powered by your Supabase scores.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <UseCaseSection />
      <AIScoreExplanation />

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Live database</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Latest smartphones</h2>
          </div>
          <Link href="/products" className="text-sm text-cyan-200">View all</Link>
        </div>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
