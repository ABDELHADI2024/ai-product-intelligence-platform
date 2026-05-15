import Link from 'next/link';
import { BatteryCharging, Camera, Cpu, MonitorSmartphone, Sparkles, Zap } from 'lucide-react';
import MetricBox from '@/components/MetricBox';
import ScoreRing from '@/components/ScoreRing';
import { formatPrice, getProductBySlug, safeText, splitList } from '@/lib/products';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <main className="mx-auto max-w-5xl px-5 py-16 text-white">
        <Link href="/products" className="text-sm text-cyan-300">← Back to products</Link>
        <h1 className="mt-8 text-4xl font-bold">Product not found</h1>
        <p className="mt-4 text-slate-300">This smartphone does not exist yet in the Witflag database.</p>
      </main>
    );
  }

  const pros = splitList(product.pros_en);
  const cons = splitList(product.cons_en);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.16),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.16),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-10">
          <Link href="/products" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">← Back to smartphones</Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/30">
              <div className="flex h-[460px] items-center justify-center rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/30 p-8">
                {product.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.image_url} alt={product.full_name || 'Smartphone'} className="max-h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]" />
                ) : (
                  <MonitorSmartphone className="h-24 w-24 text-slate-700" />
                )}
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-8 shadow-2xl shadow-black/30">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">{safeText(product.brand, 'Brand')}</p>
                  <h1 className="mt-3 text-5xl font-black tracking-tight md:text-6xl">{safeText(product.full_name || product.model)}</h1>
                  <p className="mt-5 text-3xl font-black text-cyan-100">{formatPrice(product.price_eur)}</p>
                </div>
                <ScoreRing value={product.global_score} label="Global score" size="lg" />
              </div>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                {product.content_summary_en || 'This smartphone is ready for AI enrichment. Add more specs, scores, and content in Supabase to unlock the full product intelligence experience.'}
              </p>

              <div className="mt-8 rounded-3xl border border-cyan-300/15 bg-cyan-300/10 p-5">
                <div className="flex items-center gap-3 text-cyan-200">
                  <Sparkles className="h-5 w-5" />
                  <p className="font-bold">AI verdict</p>
                </div>
                <p className="mt-3 leading-7 text-slate-200">
                  {product.expert_opinion_en || 'Witflag will analyze this smartphone using scores, user intent, comparison rules, and AI recommendation logic.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-4 md:grid-cols-4">
          <MetricBox icon={MonitorSmartphone} label="Display" value={product.screen_size} helper={`${safeText(product.screen_type, 'Display type pending')} · ${safeText(product.refresh_rate, 'Refresh rate pending')}`} />
          <MetricBox icon={Cpu} label="Performance" value={product.chipset} helper={`${safeText(product.ram, 'RAM pending')} · ${safeText(product.storage, 'Storage pending')}`} />
          <MetricBox icon={BatteryCharging} label="Battery" value={product.battery_mah ? `${product.battery_mah}mAh` : product.battery_capacity} helper={product.charging_w ? `${product.charging_w} charging` : 'Charging details pending'} />
          <MetricBox icon={Camera} label="Camera" value={product.rear_camera} helper={`Camera score: ${safeText(product.camera_score, 'Pending')}`} />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-16 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-cyan-300" />
            <h2 className="text-2xl font-black">AI score breakdown</h2>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-5">
            <ScoreRing value={product.camera_score} label="Camera" />
            <ScoreRing value={product.battery_score} label="Battery" />
            <ScoreRing value={product.display_score} label="Display" />
            <ScoreRing value={product.gaming_score} label="Gaming" />
            <ScoreRing value={product.value_score} label="Value" />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-[2rem] border border-emerald-300/15 bg-emerald-300/10 p-6">
            <h3 className="text-xl font-black text-emerald-200">Pros</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
              {(pros.length ? pros : ['Add validated pros in Supabase']).map((item) => <li key={item}>✓ {item}</li>)}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-rose-300/15 bg-rose-300/10 p-6">
            <h3 className="text-xl font-black text-rose-200">Cons</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
              {(cons.length ? cons : ['Add validated cons in Supabase']).map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
