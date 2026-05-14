import Link from 'next/link';
import type { Product } from '@/lib/products';
import { formatPrice, formatScore, safeText } from '@/lib/products';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const slug = product.slug || '#';

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white shadow-xl shadow-slate-950/5 transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex h-64 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-6">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.full_name || product.model || 'Product image'}
            className="max-h-full object-contain transition group-hover:scale-105"
          />
        ) : (
          <div className="text-sm text-slate-400">No image available</div>
        )}
      </div>

      <div className="space-y-5 p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-600">
            {safeText(product.normalized_category, 'Product')}
          </p>
          <h3 className="mt-2 text-xl font-bold text-slate-950">
            {safeText(product.full_name, safeText(product.model, 'Unnamed product'))}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
            {safeText(
              product.content_summary_en,
              'A product intelligence record prepared for semantic search, AI recommendations, comparison workflows, and multilingual content.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-slate-500">AI score</p>
            <p className="font-semibold text-slate-950">{formatScore(product.global_score)}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-slate-500">Price</p>
            <p className="font-semibold text-slate-950">{formatPrice(product.price_eur)}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-slate-500">Battery</p>
            <p className="font-semibold text-slate-950">
              {product.battery_mah ? `${product.battery_mah}mAh` : 'Coming soon'}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-slate-500">Screen</p>
            <p className="font-semibold text-slate-950">{safeText(product.screen_size)}</p>
          </div>
        </div>

        <Link
          href={slug === '#' ? '/products' : `/products/${slug}`}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
        >
          View product
        </Link>
      </div>
    </article>
  );
}
