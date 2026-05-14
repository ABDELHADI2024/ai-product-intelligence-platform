import Link from 'next/link';
import type { Product } from '@/lib/products';
import { formatPrice, formatScore, safeText } from '@/lib/products';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const productName = safeText(product.full_name || product.model, 'Unnamed product');
  const category = safeText(product.normalized_category || product.product_type, 'Consumer tech');
  const score = formatScore(product.global_score);
  const price = formatPrice(product.price_eur);

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 p-6">
        <div className="absolute left-4 top-4 rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
          AI Score {score}
        </div>
        <div className="flex h-56 items-center justify-center rounded-2xl bg-white/70 p-5">
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={productName}
              className="max-h-full object-contain transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="text-sm text-slate-500">No image</div>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-600">
              {safeText(product.brand, 'Brand')}
            </p>
            <h3 className="mt-1 line-clamp-2 text-xl font-bold text-slate-950">
              {productName}
            </h3>
          </div>
          <div className="rounded-2xl bg-cyan-50 px-3 py-2 text-right">
            <p className="text-xs text-cyan-700">Price</p>
            <p className="font-bold text-cyan-950">{price}</p>
          </div>
        </div>

        <p className="mt-2 text-sm capitalize text-slate-500">{category}</p>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-slate-500">Screen</p>
            <p className="mt-1 font-semibold text-slate-950">{safeText(product.screen_size, 'Coming soon')}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-slate-500">Battery</p>
            <p className="mt-1 font-semibold text-slate-950">
              {product.battery_mah ? `${product.battery_mah}mAh` : 'Coming soon'}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-slate-500">Camera</p>
            <p className="mt-1 font-semibold text-slate-950">{formatScore(product.camera_score)}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-slate-500">Value</p>
            <p className="mt-1 font-semibold text-slate-950">{formatScore(product.value_score)}</p>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-cyan-600"
          >
            View product
          </Link>
          <Link
            href="/compare"
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700"
          >
            Compare
          </Link>
        </div>
      </div>
    </article>
  );
}
