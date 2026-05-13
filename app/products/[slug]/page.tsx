import Link from 'next/link';
import { notFound } from 'next/navigation';
import MetricBox from '@/components/MetricBox';
import { getProductBySlug } from '@/lib/products';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

function valueOrPending(value: unknown, fallback = 'Coming soon') {
  if (value === null || value === undefined || value === '') return fallback;
  return String(value);
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  const score = valueOrPending(product.global_score, 'Pending');
  const price = product.price_eur ? `€${product.price_eur}` : 'Price coming soon';

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/products" className="text-sm text-blue-700 hover:underline">
        ← Back to products
      </Link>

      <section className="mt-8 grid gap-8 lg:grid-cols-[420px_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.full_name || product.model || 'Product image'}
              className="mx-auto max-h-[380px] w-full rounded-2xl object-contain"
            />
          ) : (
            <div className="flex h-80 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              No image
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            {product.brand || 'Brand'} · {product.normalized_category || product.product_type || 'Product'}
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
            {product.full_name || product.model}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            {product.content_summary_en ||
              'This product is ready for AI enrichment. Add specs, scores, content, and embeddings in Supabase to unlock full product intelligence.'}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              AI Score: {score}
            </span>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              {price}
            </span>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              {valueOrPending(product.screen_size)}
            </span>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        <MetricBox label="Global" value={valueOrPending(product.global_score, 'Pending')} />
        <MetricBox label="Camera" value={valueOrPending(product.camera_score, 'Pending')} />
        <MetricBox label="Battery" value={valueOrPending(product.battery_score, 'Pending')} />
        <MetricBox label="Display" value={valueOrPending(product.display_score, 'Pending')} />
        <MetricBox label="Value" value={valueOrPending(product.value_score, 'Pending')} />
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Key specs</h2>
          <div className="mt-5 space-y-3 text-sm text-slate-700">
            <p><strong>Screen:</strong> {valueOrPending(product.screen_size)} {product.screen_type ? `· ${product.screen_type}` : ''}</p>
            <p><strong>Resolution:</strong> {valueOrPending(product.resolution)}</p>
            <p><strong>Refresh rate:</strong> {valueOrPending(product.refresh_rate)}</p>
            <p><strong>Chipset:</strong> {valueOrPending(product.chipset)}</p>
            <p><strong>Memory:</strong> {valueOrPending(product.ram)} / {valueOrPending(product.storage)}</p>
            <p><strong>Battery:</strong> {valueOrPending(product.battery_capacity || product.battery_mah)}</p>
            <p><strong>Rear camera:</strong> {valueOrPending(product.rear_camera)}</p>
            <p><strong>Front camera:</strong> {valueOrPending(product.front_camera)}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">AI product verdict</h2>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            {product.expert_opinion_en ||
              'The AI verdict will appear here after content enrichment.'}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-emerald-700">Pros</h3>
              <p className="mt-2 text-sm text-slate-600">
                {product.pros_en || 'Pros coming soon.'}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-rose-700">Cons</h3>
              <p className="mt-2 text-sm text-slate-600">
                {product.cons_en || 'Cons coming soon.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
