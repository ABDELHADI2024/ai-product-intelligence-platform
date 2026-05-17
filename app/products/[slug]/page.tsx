import Link from 'next/link';
import {
  BatteryCharging,
  Camera,
  Cpu,
  Euro,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import MetricBox from '@/components/MetricBox';
import ScoreRing from '@/components/ScoreRing';
import { formatPrice, getProductBySlug, safeText, splitList } from '@/lib/products';

export const dynamic = 'force-dynamic';

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <main className="min-h-screen px-5 py-16 text-white">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-10">
          <Link href="/products" className="text-sm text-cyan-300">← Back to products</Link>
          <h1 className="mt-6 text-4xl font-black">Product not found</h1>
          <p className="mt-4 text-slate-300">This smartphone does not exist yet in the Witflag database.</p>
        </div>
      </main>
    );
  }

  const pros = splitList(product.pros_en);
  const cons = splitList(product.cons_en);

  return (
    <main className="min-h-screen text-white">
      <section className="relative overflow-hidden border-b border-white/10 ai-grid">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Link href="/products" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">← Back to smartphones</Link>
            <div className="mt-7 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30">
              <div className="flex min-h-[430px] items-center justify-center rounded-[1.6rem] bg-slate-950/75 p-8">
                {product.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.image_url} alt={safeText(product.full_name, 'Smartphone')} className="max-h-[390px] object-contain drop-shadow-2xl" />
                ) : (
                  <MonitorSmartphone className="h-20 w-20 text-slate-600" />
                )}
              </div>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="h-16 rounded-2xl border border-white/10 bg-white/[0.04]" />
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1fr_230px]">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200">
                <Sparkles className="h-4 w-4" />
                AI evaluated smartphone
              </div>
              <p className="mt-8 text-sm uppercase tracking-[0.3em] text-cyan-300">{safeText(product.brand, 'Brand')}</p>
              <h1 className="mt-2 text-5xl font-black tracking-tight">{safeText(product.full_name, product.model || 'Smartphone')}</h1>
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <div>
                  <p className="text-sm text-slate-500">Estimated price</p>
                  <p className="text-3xl font-black text-white">{formatPrice(product.price_eur)}</p>
                </div>
                <ScoreRing value={product.global_score} label="Global Score" size="lg" />
              </div>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{safeText(product.content_summary_en, 'AI-ready smartphone profile for product discovery and comparison.')}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/compare" className="rounded-full bg-cyan-300 px-6 py-3 font-bold text-slate-950 hover:bg-cyan-200">Add to compare</Link>
                <Link href="/assistant" className="rounded-full border border-white/10 bg-white/[0.05] px-6 py-3 font-bold text-white hover:bg-white/[0.08]">Ask assistant</Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Key specs</p>
              <div className="mt-5 space-y-4 text-sm">
                <div><p className="text-slate-500">Display</p><p className="font-semibold">{safeText(product.screen_size, 'Coming soon')}</p></div>
                <div><p className="text-slate-500">Chipset</p><p className="font-semibold">{safeText(product.chipset, 'Coming soon')}</p></div>
                <div><p className="text-slate-500">RAM / Storage</p><p className="font-semibold">{safeText(product.ram, '—')} / {safeText(product.storage, '—')}</p></div>
                <div><p className="text-slate-500">Battery</p><p className="font-semibold">{product.battery_mah ? `${product.battery_mah}mAh` : 'Coming soon'}</p></div>
                <div><p className="text-slate-500">Camera</p><p className="font-semibold">{safeText(product.rear_camera, 'Coming soon')}</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="grid gap-4 md:grid-cols-4">
          <MetricBox icon={MonitorSmartphone} label="Display" value={product.screen_size} helper={safeText(product.screen_type, 'Display profile')} />
          <MetricBox icon={Cpu} label="Performance" value={product.chipset} helper={`${safeText(product.ram, 'RAM')} · ${safeText(product.storage, 'Storage')}`} />
          <MetricBox icon={BatteryCharging} label="Battery" value={product.battery_mah ? `${product.battery_mah}mAh` : null} helper="Battery intelligence score included." />
          <MetricBox icon={Camera} label="Camera" value={product.rear_camera} helper={`Camera score: ${safeText(product.camera_score, 'Pending')}`} />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300"><ShieldCheck className="h-5 w-5" /></div>
            <div><p className="text-sm uppercase tracking-[0.25em] text-cyan-300">AI verdict</p><h2 className="text-2xl font-black">Who should buy it?</h2></div>
          </div>
          <p className="mt-6 text-lg leading-8 text-slate-300">{safeText(product.expert_opinion_en, 'This smartphone is evaluated across camera, battery, display, performance, and value signals.')}</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-emerald-300/15 bg-emerald-300/5 p-5">
              <h3 className="font-bold text-emerald-200">Pros</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">{(pros.length ? pros : ['Strong product intelligence profile']).map((item) => <li key={item}>✓ {item}</li>)}</ul>
            </div>
            <div className="rounded-3xl border border-red-300/15 bg-red-300/5 p-5">
              <h3 className="font-bold text-red-200">Cons</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">{(cons.length ? cons : ['Some specifications may need validation']).map((item) => <li key={item}>• {item}</li>)}</ul>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">AI scores breakdown</p>
          <div className="mt-7 grid grid-cols-2 gap-5 sm:grid-cols-3">
            <ScoreRing value={product.camera_score} label="Camera" />
            <ScoreRing value={product.battery_score} label="Battery" />
            <ScoreRing value={product.display_score} label="Display" />
            <ScoreRing value={product.gaming_score} label="Gaming" />
            <ScoreRing value={product.value_score} label="Value" />
            <ScoreRing value={product.global_score} label="Global" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="rounded-[2rem] border border-cyan-300/15 bg-gradient-to-br from-cyan-300/10 via-blue-500/5 to-purple-500/10 p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Next decision</p>
              <h2 className="mt-3 text-3xl font-black">Compare before you buy.</h2>
              <p className="mt-3 max-w-2xl text-slate-300">Use Witflag comparison and guided recommendations to understand the best choice for your budget and priorities.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/compare" className="rounded-full bg-white px-6 py-3 font-bold text-slate-950">Compare</Link>
              <Link href="/assistant" className="rounded-full border border-white/10 bg-white/[0.05] px-6 py-3 font-bold text-white">Assistant</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
