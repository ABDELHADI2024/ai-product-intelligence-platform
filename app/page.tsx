import Link from 'next/link';
import { ArrowRight, Brain, GitCompare, Radar, Search, ShieldCheck, Sparkles, Wand2 } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import ScoreRing from '@/components/ScoreRing';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

const features = [
  { icon: Search, title: 'Semantic smartphone search', text: 'Move beyond brand keywords and search by real buying intent: camera, battery, gaming, budget, and lifestyle.' },
  { icon: Brain, title: 'AI recommendation logic', text: 'Use scores, specs, and buyer priorities to explain which smartphone fits each user profile.' },
  { icon: GitCompare, title: 'Dynamic comparison engine', text: 'Compare phones by use case instead of showing only cold specification tables.' },
  { icon: Wand2, title: 'SEO intelligence engine', text: 'Transform product data into buying guides, comparison pages, and multilingual content.' },
];

export default async function HomePage() {
  const products = await getProducts(9);
  const heroProduct = products[0];

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative border-b border-white/10 px-5 py-16 lg:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_35%),radial-gradient(circle_at_70%_20%,rgba(124,58,237,0.18),transparent_28%),linear-gradient(180deg,#020617,#0f172a)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-200">
              <Sparkles className="h-4 w-4" /> AI Smartphone Intelligence Platform
            </div>
            <h1 className="max-w-4xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Choose the right smartphone with AI product intelligence.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Witflag combines structured specs, smart scores, comparison logic, buyer guidance, and SEO-ready product intelligence for smartphone discovery.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/assistant" className="inline-flex items-center gap-2 rounded-2xl bg-cyan-300 px-6 py-4 font-black text-slate-950 transition hover:bg-white">
                Start AI buyer assistant <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/products" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 font-bold text-white transition hover:border-cyan-300/40 hover:bg-white/[0.08]">
                Explore smartphones
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              <MiniStat label="Products" value={`${products.length}+`} />
              <MiniStat label="Data source" value="Live DB" />
              <MiniStat label="Focus" value="Phones" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-cyan-300/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Featured intelligence</p>
                  <h2 className="mt-1 text-2xl font-black">{heroProduct?.full_name || 'AI Smartphone Profile'}</h2>
                </div>
                <ScoreRing score={heroProduct?.global_score} label="match" />
              </div>
              <div className="flex h-[26rem] items-center justify-center rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/50 p-8 ring-1 ring-white/10">
                {heroProduct?.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={heroProduct.image_url} alt={heroProduct.full_name || 'Smartphone'} className="max-h-full object-contain drop-shadow-2xl" />
                ) : (
                  <Radar className="h-32 w-32 text-cyan-300/40" />
                )}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <MiniPanel icon={Search} label="Search" value="Intent-aware" />
                <MiniPanel icon={GitCompare} label="Compare" value="Use-case verdict" />
                <MiniPanel icon={Brain} label="Recommend" value="Score-based" />
                <MiniPanel icon={ShieldCheck} label="Data" value="Supabase live" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Platform intelligence</p>
            <h2 className="mt-2 text-4xl font-black">Built around the buyer decision.</h2>
          </div>
          <Link href="/compare" className="text-sm font-bold text-cyan-300 hover:text-white">View comparison engine →</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
              <feature.icon className="h-8 w-8 text-cyan-300" />
              <h3 className="mt-5 text-xl font-black">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Live smartphone database</p>
            <h2 className="mt-2 text-4xl font-black">Latest AI-ready smartphones.</h2>
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-3 font-bold text-white hover:border-cyan-300/40">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-black text-white">{value}</p>
    </div>
  );
}

function MiniPanel({ icon: Icon, label, value }: { icon: typeof Search; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
      <Icon className="h-5 w-5 text-cyan-300" />
      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="font-bold text-white">{value}</p>
    </div>
  );
}
