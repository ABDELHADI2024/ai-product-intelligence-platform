import Link from 'next/link';
import { BatteryCharging, Camera, Cpu, Display, Euro, ShieldCheck, Sparkles } from 'lucide-react';
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
      <main className="mx-auto max-w-5xl px-5 py-16">
        <Link href="/products" className="text-sm font-bold text-cyan-300">← Back to products</Link>
        <h1 className="mt-8 text-4xl font-black text-white">Product not found</h1>
        <p className="mt-4 text-slate-300">This smartphone does not exist yet in the Witflag database.</p>
      </main>
    );
  }

  const pros = splitList(product.pros_en);
  const cons = splitList(product.cons_en);

  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 py-12">
        <Link href="/products" className="text-sm font-bold text-cyan-300 hover:text-white">← Back to smartphones</Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-5 card-glow">
            <div className="relative flex h-[520px] items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 p-8">
              <div className="absolute left-6 top-6 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
                AI-ready profile
              </div>
              {product.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.image_url} alt={safeText(product.full_name, 'Product')} className="max-h-full object-contain drop-shadow-2xl" />
              ) : (
                <Sparkles className="h-24 w-24 text-slate-700" />
              )}
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">{safeText(product.brand, 'Smartphone')}</p>
            <h1 className="mt-3 text-5xl font-black tracking-tight text-white md:text-6xl">{safeText(product.full_name || product.model, 'Smartphone')}</h1>
            <div className="mt-7 flex flex-wrap items-center gap-6">
              <ScoreRing value={product.global_score} size="lg" />
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Estimated price</p>
                <p className="mt-1 text-4xl font-black text-white">{formatPrice(product.price_eur)}</p>
                <p className="mt-2 text-sm text-slate-400">AI score combines camera, battery, gaming, display and value.</p>
              </div>
            </div>
            <p className="mt-8 text-lg leading-8 text-slate-300">{safeText(product.content_summary_en, 'This smartphone profile is ready for AI enrichment and comparison workflows.')}</p>

            <div className="mt-8 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-cyan-300" />
                <h2 className="text-xl font-black text-white">AI verdict</h2>
              </div>
              <p className="mt-4 leading-7 text-slate-300">{safeText(product.expert_opinion_en, 'A balanced smartphone option. Add more validated specs and market prices to improve the recommendation confidence.')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="grid gap-4 md:grid-cols-4">
          <MetricBox icon={Display} label="Display" value={product.screen_size} helper={product.refresh_rate || product.resolution} />
          <MetricBox icon={Cpu} label="Performance" value={product.chipset} helper={`${safeText(product.ram, 'RAM coming soon')} · ${safeText(product.storage, 'Storage coming soon')}`} />
          <MetricBox icon={BatteryCharging} label="Battery" value={product.battery_mah ? `${product.battery_mah}mAh` : null} helper="Battery score uses capacity and charging profile." />
          <MetricBox icon={Camera} label="Camera" value={product.rear_camera} helper="Camera score uses main camera and video signals." />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-black text-white">Decision signals</h2>
          <div className="mt-6 grid gap-3">
            {[
              ['Camera', product.camera_score],
              ['Battery', product.battery_score],
              ['Display', product.display_score],
              ['Gaming', product.gaming_score],
              ['Value', product.value_score],
            ].map(([label, value]) => (
              <div key={String(label)} className="flex items-center justify-between rounded-2xl bg-white/[0.04] p-4">
                <span className="font-bold text-slate-300">{label}</span>
                <span className="text-xl font-black text-white">{safeText(value as string | number | null, '—')}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6">
            <h2 className="text-2xl font-black text-white">Pros</h2>
            <ul className="mt-5 space-y-3 text-slate-300">
              {(pros.length ? pros : ['Strong product profile', 'AI-ready data available', 'Good comparison candidate']).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-amber-400/20 bg-amber-400/10 p-6">
            <h2 className="text-2xl font-black text-white">Tradeoffs</h2>
            <ul className="mt-5 space-y-3 text-slate-300">
              {(cons.length ? cons : ['Some specs may need validation', 'Final market pricing may vary']).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 md:flex md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black text-white">Need help choosing?</h2>
            <p className="mt-2 text-slate-400">Use the guided assistant or compare this smartphone against other AI-ready products.</p>
          </div>
          <div className="mt-5 flex gap-3 md:mt-0">
            <Link href="/assistant" className="rounded-2xl bg-cyan-300 px-5 py-3 font-black text-slate-950 hover:bg-white">Assistant</Link>
            <Link href="/compare" className="rounded-2xl border border-white/10 px-5 py-3 font-bold text-white hover:bg-white/10">Compare</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
