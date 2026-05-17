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
import {
  formatPrice,
  getProductBySlug,
  safeText,
  splitList,
} from '@/lib/products';

export const dynamic = 'force-dynamic';

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#020617] px-5 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <Link href="/products" className="text-sm text-cyan-300">
            ← Back to products
          </Link>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Product not found
            </p>
            <h1 className="mt-4 text-4xl font-bold">
              This product does not exist yet.
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              The product may not be available in the Witflag database yet.
              Return to the catalog to explore available smartphones.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-flex rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
            >
              View products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const pros = splitList(product.pros_en);
  const cons = splitList(product.cons_en);

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
          <div>
            <Link
              href="/products"
              className="text-sm font-medium text-cyan-300 hover:text-cyan-200"
            >
              ← Back to smartphones
            </Link>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="flex min-h-[420px] items-center justify-center rounded-[1.5rem] bg-slate-950/70 p-8">
                {product.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image_url}
                    alt={product.full_name || 'Smartphone'}
                    className="max-h-[380px] object-contain drop-shadow-2xl"
                  />
                ) : (
                  <div className="text-slate-500">No image available</div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200">
              <Sparkles className="h-4 w-4" />
              AI Smartphone Intelligence
            </div>

            <p className="mt-8 text-sm uppercase tracking-[0.3em] text-cyan-300">
              {safeText(product.brand, 'Smartphone')}
            </p>

            <h1 className="mt-3 max-w-3xl text-5xl font-black tracking-tight text-white md:text-6xl">
              {safeText(product.full_name, product.model || 'Smartphone')}
            </h1>

            <p className="mt-5 text-xl text-slate-300">
              {safeText(
                product.content_summary_en,
                'A smartphone prepared for AI-powered product discovery, comparison, and recommendation workflows.'
              )}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ScoreRing value={product.global_score} label="AI Score" />

              <div>
                <p className="text-sm text-slate-400">Estimated price</p>
                <p className="text-3xl font-bold text-white">
                  {formatPrice(product.price_eur)}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Price may vary by market and retailer.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/compare"
                className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
              >
                Compare smartphone
              </Link>

              <Link
                href="/assistant"
                className="rounded-full border border-white/15 bg-white/[0.05] px-6 py-3 font-semibold text-white hover:bg-white/[0.08]"
              >
                Ask AI Buyer Assistant
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-4 md:grid-cols-4">
          <MetricBox
            icon={MonitorSmartphone}
            label="Display"
            value={product.screen_size}
            helper={safeText(product.screen_type, 'Display details coming soon')}
          />

          <MetricBox
            icon={Cpu}
            label="Performance"
            value={product.chipset}
            helper={`${safeText(product.ram, 'RAM coming soon')} · ${safeText(
              product.storage,
              'Storage coming soon'
            )}`}
          />

          <MetricBox
            icon={BatteryCharging}
            label="Battery"
            value={product.battery_mah ? `${product.battery_mah}mAh` : null}
            helper="Battery profile based on available product data."
          />

          <MetricBox
            icon={Camera}
            label="Camera"
            value={product.rear_camera}
            helper={`Camera score: ${safeText(product.camera_score, 'Pending')}`}
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/20">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                AI verdict
              </p>
              <h2 className="text-2xl font-bold text-white">
                Who is this smartphone for?
              </h2>
            </div>
          </div>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            {safeText(
              product.expert_opinion_en,
              'This smartphone is evaluated using Witflag product intelligence scores, including camera, battery, display, gaming, and value signals.'
            )}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-emerald-300/15 bg-emerald-300/5 p-5">
              <h3 className="font-semibold text-emerald-200">Best reasons to consider</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {(pros.length ? pros : ['Strong AI-ready product profile']).map(
                  (item) => (
                    <li key={item}>✓ {item}</li>
                  )
                )}
              </ul>
            </div>

            <div className="rounded-3xl border border-amber-300/15 bg-amber-300/5 p-5">
              <h3 className="font-semibold text-amber-200">Possible trade-offs</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {(cons.length ? cons : ['Some specifications may need validation']).map(
                  (item) => (
                    <li key={item}>• {item}</li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
            Intelligence scores
          </p>

          <h2 className="mt-3 text-2xl font-bold text-white">
            Score breakdown
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-5">
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
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                Next decision
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white">
                Not sure if this is the right smartphone?
              </h2>
              <p className="mt-3 max-w-2xl text-slate-300">
                Use the guided AI Buyer Assistant to compare your budget,
                priorities, and usage style against Witflag smartphone scores.
              </p>
            </div>

            <Link
              href="/assistant"
              className="rounded-full bg-white px-6 py-3 text-center font-semibold text-slate-950 hover:bg-cyan-100"
            >
              Start assistant
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
