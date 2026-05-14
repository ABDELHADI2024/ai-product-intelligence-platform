import Link from 'next/link';
import { Brain, GitCompare, Search, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/products';

const features = [
  {
    icon: Search,
    title: 'Semantic product search',
    description: 'Search by needs, not only product names: camera, gaming, battery, student use, value, and more.',
  },
  {
    icon: Brain,
    title: 'AI recommendations',
    description: 'Rank products by user intent, product scores, specs, price, and decision context.',
  },
  {
    icon: GitCompare,
    title: 'Dynamic comparisons',
    description: 'Explain which product wins for camera, battery, display, performance, and value.',
  },
  {
    icon: ShieldCheck,
    title: 'RAG-ready database',
    description: 'Structured product data prepared for future assistants, embeddings, and source-grounded answers.',
  },
];

export default async function HomePage() {
  const products = await getProducts(8);

  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.25),transparent_32%),radial-gradient(circle_at_75%_20%,rgba(99,102,241,0.22),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
              <Sparkles size={16} /> AI-native product intelligence platform
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">
              Choose the right tech product with data, scores, and AI guidance.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Witflag combines structured product data, smart scoring, comparison intelligence, semantic search, and multilingual content for smartphones, tablets, wearables, earbuds, and AI devices.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/products" className="rounded-2xl bg-cyan-400 px-6 py-4 text-center font-bold text-slate-950 transition hover:bg-cyan-300">
                View products
              </Link>
              <Link href="/search" className="rounded-2xl border border-white/15 px-6 py-4 text-center font-bold text-white transition hover:border-cyan-300 hover:text-cyan-200">
                Smart search
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur">
            <div className="rounded-3xl bg-slate-900 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-cyan-200">Live intelligence preview</p>
                <TrendingUp className="text-cyan-300" size={20} />
              </div>
              <div className="mt-6 space-y-4">
                {['Camera score', 'Battery score', 'Value score', 'AI match'].map((label, index) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm text-slate-300">
                      <span>{label}</span>
                      <span>{[82, 86, 84, 91][index]}/100</span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-cyan-300" style={{ width: `${[82, 86, 84, 91][index]}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 rounded-2xl bg-cyan-300/10 p-4 text-sm leading-6 text-cyan-50">
                Example AI verdict: Best for users who want a large display, strong battery profile, and balanced value positioning.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-4 md:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-950">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600">Live database</p>
            <h2 className="mt-2 text-4xl font-black text-slate-950">Latest products</h2>
            <p className="mt-2 text-slate-600">Products loaded from Supabase and prepared for AI enrichment.</p>
          </div>
          <Link href="/products" className="hidden rounded-2xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:border-cyan-300 hover:text-cyan-700 sm:block">
            View all
          </Link>
        </div>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
