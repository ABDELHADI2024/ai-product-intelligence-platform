import Link from 'next/link';
import type { Product } from '@/lib/products';

function formatScore(score: number | null | undefined) {
  if (score === null || score === undefined) return 'Pending';
  return `${score}/100`;
}

export default function ProductCard({ product }: { product: Product }) {
  const slug = product.slug || product.id;
  const name = product.full_name || `${product.brand || ''} ${product.model || ''}`.trim() || 'Unknown product';

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-48 items-center justify-center rounded-2xl bg-slate-50 p-4">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_url} alt={name} className="max-h-full max-w-full object-contain" />
        ) : (
          <span className="text-sm text-slate-400">No image</span>
        )}
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          {product.normalized_category || product.product_type || 'Product'}
        </p>
        <h3 className="mt-2 text-lg font-bold text-slate-950">{name}</h3>
        <p className="mt-2 text-sm text-slate-600">
          {product.content_summary_en || 'AI product intelligence summary coming soon.'}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">Score</p>
          <p className="font-semibold text-slate-950">{formatScore(product.global_score)}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">Battery</p>
          <p className="font-semibold text-slate-950">{product.battery_mah || 'Coming soon'}</p>
        </div>
      </div>

      <Link
        href={`/products/${slug}`}
        className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white"
      >
        View product
      </Link>
    </article>
  );
}
