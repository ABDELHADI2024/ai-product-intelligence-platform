import Link from 'next/link';
import { Brain, Search, GitCompare, Sparkles } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/products';

export default async function HomePage() {
  const products = await getProducts(8);

  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="max-w-4xl">
          <div className="mb-5 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
            AI-native product intelligence platform
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
            Smarter product discovery for consumer tech.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Witflag combines structured product data, semantic search, AI recommendations, comparison intelligence, scores, and multilingual content for smartphones, tablets, wearables, earbuds, and AI devices.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-300">View products</Link>
            <Link href="/search" className="rounded-2xl border border-white/15 px-5 py-3 font-semibold text-white hover:bg-white/10">Smart search</Link>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-4">
          {[
            ['Semantic Search', Search],
            ['AI Recommendations', Sparkles],
            ['Dynamic Comparison', GitCompare],
            ['RAG-ready Data', Brain]
          ].map(([label, Icon]: any) => (
            <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <Icon className="h-7 w-7 text-cyan-300" />
              <h3 className="mt-4 font-semibold text-white">{label}</h3>
              <p className="mt-2 text-sm text-slate-400">Built for enterprise-grade product intelligence workflows.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-cyan-300">Live database</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Latest products</h2>
          </div>
          <Link href="/products" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">View all</Link>
        </div>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
