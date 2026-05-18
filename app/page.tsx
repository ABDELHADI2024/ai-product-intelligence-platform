import Link from 'next/link';
import { ArrowRight, BatteryCharging, Camera, Gamepad2, GitCompare, Search, Sparkles, Trophy } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const products = await getProducts(6);

  const stats = [
    ['296', 'AI-ready smartphones'],
    ['6', 'decision scores'],
    ['0 API', 'no-cost assistant'],
    ['SEO', 'buying guides'],
  ];

  const useCases = [
    { icon: Camera, label: 'Best camera phones', href: '/best/best-camera-phones' },
    { icon: BatteryCharging, label: 'Best battery phones', href: '/best/best-battery-phones' },
    { icon: Gamepad2, label: 'Best gaming phones', href: '/best/best-gaming-phones' },
    { icon: Trophy, label: 'Best value phones', href: '/best/best-value-phones' },
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="premium-shell border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-200">
              <Sparkles className="h-4 w-4" />
              AI Smartphone Intelligence Platform
            </div>

            <h1 className="mt-7 max-w-5xl text-5xl font-black tracking-tight md:text-7xl">
              Choose the right smartphone with product intelligence.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Witflag turns structured smartphone data into search, comparison,
              recommendations, buying guides, and AI-style decisions without
              requiring paid AI APIs for the MVP.
            </p>

            <form action="/search" className="mt-8 flex max-w-3xl flex-col gap-3 rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-black/20 md:flex-row">
              <div className="flex flex-1 items-center gap-3 px-3">
                <Search className="h-5 w-5 text-cyan-300" />
                <input
                  name="q"
                  placeholder="Search: best camera phone under 500..."
                  className="w-full bg-transparent py-3 text-white outline-none placeholder:text-slate-500"
                />
              </div>
              <button className="rounded-full bg-cyan-400 px-7 py-3 font-bold text-slate-950 hover:bg-cyan-300">
                Search
              </button>
            </form>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/assistant" className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-bold text-slate-950 hover:bg-cyan-300">
                Start assistant <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/compare" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-6 py-3 font-bold text-white hover:bg-white/[0.08]">
                Compare phones <GitCompare className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="glass-card rounded-[2.5rem] p-5">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Live intelligence system</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {stats.map(([value, label]) => (
                  <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-3xl font-black text-white">{value}</p>
                    <p className="mt-2 text-sm text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.06] p-5">
                <p className="text-sm text-slate-300">
                  The platform reads your Supabase database, ranks products,
                  detects user intent, and creates decision pages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Decision shortcuts</p>
            <h2 className="mt-3 text-4xl font-black text-white">Start from your real need.</h2>
          </div>
          <Link href="/best" className="text-sm font-bold text-cyan-300 hover:text-cyan-200">
            View all guides →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {useCases.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="glass-card rounded-[2rem] p-5 transition hover:-translate-y-1 hover:border-cyan-300/30">
                <Icon className="h-7 w-7 text-cyan-300" />
                <h3 className="mt-4 font-bold text-white">{item.label}</h3>
                <p className="mt-2 text-sm text-slate-400">Ranked using Witflag scores.</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Top ranked</p>
            <h2 className="mt-3 text-4xl font-black text-white">Live smartphones from Supabase.</h2>
          </div>
          <Link href="/products" className="text-sm font-bold text-cyan-300 hover:text-cyan-200">
            View catalog →
          </Link>
        </div>

        <ProductGrid products={products} />
      </section>
    </main>
  );
}
