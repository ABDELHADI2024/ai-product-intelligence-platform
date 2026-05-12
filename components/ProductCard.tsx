import Link from 'next/link';
import type { Product } from '@/lib/products';

function scoreLabel(score: number | null | undefined) {
  if (score === null || score === undefined) return 'Pending';
  return String(score);
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug || product.id}`} className="group block rounded-3xl border border-white/10 bg-white/[0.04] p-4 card-glow transition hover:-translate-y-1 hover:bg-white/[0.07]">
      <div className="flex h-48 items-center justify-center rounded-2xl bg-slate-900/80 p-4">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_url} alt={product.full_name || 'Product'} className="max-h-full object-contain" />
        ) : (
          <div className="text-slate-500">No image</div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-xs uppercase tracking-wide text-cyan-300">{product.brand || 'Brand'}</p>
        <h3 className="mt-1 text-lg font-semibold text-white group-hover:text-cyan-200">{product.full_name || product.model}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-400">
          {product.content_summary_en || 'Specs coming soon. Product is ready for AI intelligence enrichment.'}
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-xl bg-slate-900 p-2">
            <div className="text-slate-500">Global</div>
            <div className="font-semibold text-white">{scoreLabel(product.global_score)}</div>
          </div>
          <div className="rounded-xl bg-slate-900 p-2">
            <div className="text-slate-500">Camera</div>
            <div className="font-semibold text-white">{scoreLabel(product.camera_score)}</div>
          </div>
          <div className="rounded-xl bg-slate-900 p-2">
            <div className="text-slate-500">Battery</div>
            <div className="font-semibold text-white">{scoreLabel(product.battery_score)}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
