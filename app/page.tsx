import Link from 'next/link';
import { ArrowRight, BatteryCharging, BrainCircuit, Camera, Cpu, GitCompare, Search, ShieldCheck, Smartphone, Sparkles } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import { getProducts, getTopProductsByUseCase } from '@/lib/products';

const intelligencePillars = [
  { icon: Search, title: 'Smartphone search', text: 'Find phones by brand, budget, chipset, camera, battery and use case.' },
  { icon: GitCompare, title: 'Dynamic comparison', text: 'Compare phones by scores, specs and practical buyer priorities.' },
  { icon: BrainCircuit, title: 'Guided AI assistant', text: 'No-cost recommendation flow powered by your product scores.' },
  { icon: ShieldCheck, title: 'AI-ready data', text: 'Structured data prepared for future semantic search, RAG and SEO.' },
];

const useCases = [
  { href: '/search?q=camera', icon: Camera, title: 'Camera phones', text: 'For photos, video and social content.' },
  { href: '/search?q=battery', icon: BatteryCharging, title: 'Battery phones', text: 'For long days and heavy use.' },
  { href: '/search?q=gaming', icon: Cpu, title: 'Gaming phones', text: 'For performance, chipset and refresh rate.' },
];

export default async function HomePage() {
  const products = await getProducts(6);
  const cameraPicks = await getTopProductsByUseCase('camera', 3);

  return (
    <main>
      <section className="relative overflow-hidden px-5 py-20 md:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(34,211,238,0.12),transparent_35rem)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-200">
              <Sparkles className="h-4 w-4" />
              Smartphone-first AI product intelligence
            </div>
            <h1 className="mt-7 max-w-5xl text-5xl font-black tracking-tight text-white md:text-7xl">
              Choose the right smartphone with <span className="text-gradient">AI-ready intelligence</span>.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
              Witflag transforms smartphone specs, scores, prices and content into a premium discovery experience: search, compare, understand and choose with confidence.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/products" className="inline-flex items-center gap-2 rounded-2xl bg-cyan-300 px-6 py-4 font-black text-slate-950 transition hover:bg-white">
                Explore smartphones <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/assistant" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-bold text-white transition hover:bg-white/10">
                Try AI Buyer Assistant
              </Link>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-5 card-glow backdrop-blur-2xl">
            <div className="rounded-[2rem] bg-slate-950/70 p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Live intelligence</p>
                  <h2 className="mt-2 text-2xl font-black text-white">Smartphone radar</h2>
                </div>
                <Smartphone className="h-9 w-9 text-cyan-300" />
              </div>
              <div className="mt-6 grid gap-3">
                {cameraPicks.slice(0, 3).map((product, index) => (
                  <Link key={product.id} href={`/products/${product.slug}`} className="flex items-center justify-between rounded-2xl bg-white/[0.04] p-4 transition hover:bg-white/[0.08]">
                    <div>
                      <p className="text-sm text-slate-400">#{index + 1} AI pick</p>
                      <p className="font-bold text-white">{product.full_name}</p>
                    </div>
                    <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-sm font-bold text-cyan-200">{product.global_score ?? '—'}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="grid gap-4 md:grid-cols-4">
          {intelligencePillars.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                <Icon className="h-7 w-7 text-cyan-300" />
                <h3 className="mt-5 text-xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Latest smartphone intelligence</p>
            <h2 className="mt-3 text-4xl font-black text-white">Top AI-ready smartphones</h2>
          </div>
          <Link href="/products" className="text-sm font-bold text-cyan-300 hover:text-white">View full catalog →</Link>
        </div>
        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {useCases.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} href={item.href} className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-7 transition hover:-translate-y-1 hover:border-cyan-300/40">
                <Icon className="h-8 w-8 text-cyan-300" />
                <h3 className="mt-5 text-2xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-slate-400">{item.text}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
