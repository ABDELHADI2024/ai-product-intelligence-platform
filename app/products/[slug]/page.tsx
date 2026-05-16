import Link from 'next/link';
import { BatteryCharging, Camera, Cpu, MonitorSmartphone, ShieldCheck, Sparkles, Trophy, WalletCards } from 'lucide-react';
import MetricBox from '@/components/MetricBox';
import ScoreRing from '@/components/ScoreRing';
import { formatPrice, getBestUseCase, getProductBySlug, safeText, splitList } from '@/lib/products';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-950 px-5 py-16 text-white">
        <section className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-10">
          <Link href="/products" className="text-cyan-300">← Back to products</Link>
          <h1 className="mt-8 text-4xl font-black">Product not found</h1>
          <p className="mt-4 text-slate-300">This smartphone does not exist yet in the Witflag database.</p>
        </section>
      </main>
    );
  }

  const pros = splitList(product.pros_en);
  const cons = splitList(product.cons_en);
  const bestUseCase = getBestUseCase(product);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10 px-5 py-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.20),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(124,58,237,0.16),transparent_30%),linear-gradient(180deg,#020617,#0f172a)]" />
        <div className="mx-auto max-w-7xl">
          <Link href="/products" className="text-sm font-bold text-cyan-300 hover:text-white">← Back to smartphone catalog</Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="flex h-[32rem] items-center justify-center rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 p-8 ring-1 ring-white/10">
                {product.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.image_url} alt={safeText(product.full_name)} className="max-h-full object-contain drop-shadow-2xl" />
                ) : (
                  <MonitorSmartphone className="h-28 w-28 text-slate-700" />
                )}
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-200">
                <Sparkles className="h-4 w-4" /> AI smartphone profile
              </div>
              <p className="mt-6 text-sm uppercase tracking-[0.24em] text-cyan-300">{safeText(product.brand, 'Smartphone')}</p>
              <h1 className="mt-2 text-5xl font-black tracking-tight lg:text-6xl">{safeText(product.full_name || product.model)}</h1>
              <div className="mt-6 flex flex-wrap items-center gap-5">
                <ScoreRing score={product.global_score} label="AI score" size="lg" />
                <div>
                  <p className="text-3xl font-black text-cyan-200">{formatPrice(product.price_eur)}</p>
                  <p className="mt-2 text-slate-400">Best current use case: <span className="font-bold text-white">{bestUseCase}</span></p>
                </div>
              </div>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                {safeText(product.content_summary_en, 'This smartphone is ready for AI enrichment. Add validated specs, scores, pros, cons, and product intelligence content in Supabase.')}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <MetricBox icon={MonitorSmartphone} label="Display" value={product.screen_size} helper={`${safeText(product.screen_type)} • ${safeText(product.refresh_rate)}`} />
                <MetricBox icon={Cpu} label="Performance" value={product.chipset} helper={`${safeText(product.ram)} RAM • ${safeText(product.storage)} storage`} />
                <MetricBox icon={BatteryCharging} label="Battery" value={product.battery_mah ? `${product.battery_mah} mAh` : null} helper="Battery intelligence score based on product profile." />
                <MetricBox icon={Camera} label="Camera" value={product.rear_camera} helper={`Camera score: ${safeText(product.camera_score, 'Pending')}`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2.5rem] border border-cyan-300/20 bg-cyan-300/[0.06] p-8">
            <Trophy className="h-10 w-10 text-cyan-300" />
            <h2 className="mt-5 text-3xl font-black">AI verdict</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              {safeText(product.expert_opinion_en, `Witflag classifies this smartphone as a strong candidate for ${bestUseCase.toLowerCase()} buyers. Add more verified specs and benchmark data to improve the verdict.`)}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <MetricBox icon={Sparkles} label="Global score" value={product.global_score} />
            <MetricBox icon={Camera} label="Camera score" value={product.camera_score} />
            <MetricBox icon={BatteryCharging} label="Battery score" value={product.battery_score} />
            <MetricBox icon={MonitorSmartphone} label="Display score" value={product.display_score} />
            <MetricBox icon={Cpu} label="Gaming score" value={product.gaming_score} />
            <MetricBox icon={WalletCards} label="Value score" value={product.value_score} />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <ListPanel title="Why it can be a good choice" items={pros} fallback="Add pros_en in Supabase to show validated advantages." positive />
          <ListPanel title="What to verify before buying" items={cons} fallback="Add cons_en in Supabase to show transparent tradeoffs." />
        </div>

        <div className="mt-8 rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8">
          <ShieldCheck className="h-10 w-10 text-cyan-300" />
          <h2 className="mt-5 text-3xl font-black">Product intelligence status</h2>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">
            This page is powered by Supabase product data and designed for future semantic search, AI recommendations, RAG assistant answers, comparison intelligence, and SEO automation.
          </p>
        </div>
      </section>
    </main>
  );
}

function ListPanel({ title, items, fallback, positive = false }: { title: string; items: string[]; fallback: string; positive?: boolean }) {
  return (
    <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-8">
      <h3 className="text-2xl font-black">{title}</h3>
      <div className="mt-5 space-y-3">
        {items.length ? items.map((item) => (
          <div key={item} className="rounded-2xl bg-slate-950/60 p-4 text-slate-300">
            <span className={positive ? 'text-cyan-300' : 'text-amber-300'}>●</span> {item}
          </div>
        )) : <p className="text-slate-400">{fallback}</p>}
      </div>
    </div>
  );
}
