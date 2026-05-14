import Link from 'next/link';
import MetricBox from '@/components/MetricBox';
import { formatPrice, formatScore, getProductBySlug, safeText } from '@/lib/products';

export const dynamic = 'force-dynamic';

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <main className="mx-auto max-w-5xl px-5 py-16">
        <Link href="/products" className="text-sm text-cyan-300">
          ← Back to products
        </Link>
        <h1 className="mt-8 text-4xl font-bold text-white">Product not found</h1>
        <p className="mt-4 text-slate-300">
          This product does not exist yet in the Witflag database.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-12">
      <Link href="/products" className="text-sm text-cyan-300 hover:text-cyan-200">
        ← Back to products
      </Link>

      <section className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <div className="flex h-96 items-center justify-center rounded-3xl bg-slate-900 p-6">
            {product.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image_url}
                alt={product.full_name || 'Product'}
                className="max-h-full object-contain"
              />
            ) : (
              <div className="text-slate-500">No image</div>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-cyan-300">
            {safeText(product.brand, 'Brand')}
          </p>
          <h1 className="mt-2 text-5xl font-bold text-white">
            {safeText(product.full_name, safeText(product.model, 'Unnamed product'))}
          </h1>
          <p className="mt-4 text-xl font-semibold text-cyan-200">
            {formatPrice(product.price_eur)}
          </p>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            {safeText(
              product.content_summary_en,
              'This product is ready for AI enrichment. Add specs, scores, content, and embeddings in Supabase to unlock full product intelligence.'
            )}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <MetricBox label="Screen" value={product.screen_size} />
            <MetricBox label="Chipset" value={product.chipset} />
            <MetricBox label="Battery" value={product.battery_mah ? `${product.battery_mah}mAh` : null} />
            <MetricBox label="Rear camera" value={product.rear_camera} />
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-5">
        <MetricBox label="Global score" value={formatScore(product.global_score)} />
        <MetricBox label="Camera score" value={formatScore(product.camera_score)} />
        <MetricBox label="Battery score" value={formatScore(product.battery_score)} />
        <MetricBox label="Gaming score" value={formatScore(product.gaming_score)} />
        <MetricBox label="Value score" value={formatScore(product.value_score)} />
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-bold text-white">Pros</h2>
          <p className="mt-3 leading-7 text-slate-300">{safeText(product.pros_en)}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-bold text-white">Cons</h2>
          <p className="mt-3 leading-7 text-slate-300">{safeText(product.cons_en)}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-bold text-white">AI verdict</h2>
          <p className="mt-3 leading-7 text-slate-300">{safeText(product.expert_opinion_en)}</p>
        </div>
      </section>
    </main>
  );
}
