import Link from 'next/link';
import { ArrowLeft, BatteryCharging, Camera, Cpu, Euro, Gauge, MonitorSmartphone, Sparkles } from 'lucide-react';
import MetricBox from '@/components/MetricBox';
import { formatPrice, formatScore, getProductBySlug, safeText } from '@/lib/products';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

function splitList(value: string | null | undefined) {
  if (!value) return [];
  return value.split(',').map((item) => item.trim()).filter(Boolean);
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <main className="mx-auto max-w-5xl px-5 py-16">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600">
          <ArrowLeft size={16} /> Back to products
        </Link>
        <h1 className="mt-8 text-4xl font-black text-slate-950">Product not found</h1>
        <p className="mt-4 text-slate-600">This product does not exist yet in the Witflag database.</p>
      </main>
    );
  }

  const pros = splitList(product.pros_en);
  const cons = splitList(product.cons_en);

  return (
    <main className="bg-slate-50">
      <section className="border-b border-slate-200 bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
            <ArrowLeft size={16} /> Back to products
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl">
              <div className="flex h-[420px] items-center justify-center rounded-[1.5rem] bg-white p-8">
                {product.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.image_url} alt={safeText(product.full_name, 'Product')} className="max-h-full object-contain" />
                ) : (
                  <div className="text-slate-500">No image available</div>
                )}
              </div>
            </div>

            <div className="py-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
                <Sparkles size={16} /> AI product intelligence record
              </div>
              <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-cyan-300">{safeText(product.brand, 'Brand')}</p>
              <h1 className="mt-2 text-5xl font-black tracking-tight text-white md:text-6xl">
                {safeText(product.full_name || product.model, 'Unnamed product')}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                {safeText(
                  product.content_summary_en,
                  'This product is ready for AI enrichment. Add specs, scores, content, and embeddings in Supabase to unlock full product intelligence.'
                )}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-cyan-300 p-5 text-slate-950">
                  <div className="flex items-center gap-2 text-sm font-semibold"><Gauge size={18} /> Global score</div>
                  <p className="mt-2 text-4xl font-black">{formatScore(product.global_score)}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 text-white">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-300"><Euro size={18} /> Price</div>
                  <p className="mt-2 text-3xl font-black">{formatPrice(product.price_eur)}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 text-white">
                  <div className="text-sm font-semibold text-slate-300">Category</div>
                  <p className="mt-2 text-2xl font-black capitalize">{safeText(product.normalized_category, 'Consumer tech')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-4 md:grid-cols-4">
          <MetricBox icon={MonitorSmartphone} label="Display" value={product.screen_size} helper={product.refresh_rate || product.resolution} />
          <MetricBox icon={Cpu} label="Performance" value={product.chipset} helper={`${safeText(product.ram, 'RAM coming soon')} • ${safeText(product.storage, 'Storage coming soon')}`} />
          <MetricBox icon={BatteryCharging} label="Battery" value={product.battery_mah ? `${product.battery_mah}mAh` : null} helper="Battery profile" />
          <MetricBox icon={Camera} label="Camera" value={product.rear_camera} helper={`Camera score ${formatScore(product.camera_score)}`} />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-20 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-black text-slate-950">AI verdict</h2>
          <p className="mt-4 text-lg leading-8 text-slate-700">
            {safeText(
              product.expert_opinion_en,
              'AI verdict is coming soon. Add expert opinion content in Supabase to activate this section.'
            )}
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-bold text-slate-950">Pros</h3>
              <ul className="mt-3 space-y-2 text-slate-600">
                {(pros.length ? pros : ['Add pros in Supabase']).map((item) => (
                  <li key={item} className="rounded-2xl bg-emerald-50 px-4 py-3">✓ {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-950">Cons</h3>
              <ul className="mt-3 space-y-2 text-slate-600">
                {(cons.length ? cons : ['Add cons in Supabase']).map((item) => (
                  <li key={item} className="rounded-2xl bg-amber-50 px-4 py-3">• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Score breakdown</h2>
          <div className="mt-6 space-y-5">
            {[
              ['Camera', product.camera_score],
              ['Battery', product.battery_score],
              ['Display', product.display_score],
              ['Gaming', product.gaming_score],
              ['Value', product.value_score],
            ].map(([label, value]) => (
              <div key={String(label)}>
                <div className="flex justify-between text-sm font-semibold text-slate-700">
                  <span>{label}</span>
                  <span>{formatScore(value)}</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-slate-950" style={{ width: `${formatScore(value) === 'Pending' ? 0 : formatScore(value)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
