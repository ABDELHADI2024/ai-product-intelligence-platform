import Link from 'next/link';
import type { Product } from '@/lib/products';
import { formatPrice, formatScore, safeText } from '@/lib/products';

type RecommendationCardProps = {
  product: Product;
  reason: string;
  rank: number;
};

export default function RecommendationCard({ product, reason, rank }: RecommendationCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.07]"
    >
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-lg font-bold text-cyan-200">
          {rank}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">
            {safeText(product.brand, 'Smartphone')}
          </p>
          <h3 className="mt-1 text-xl font-semibold text-white group-hover:text-cyan-100">
            {safeText(product.full_name, product.model || 'Smartphone')}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{reason}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-white/10 px-3 py-1 text-white">
              Score {formatScore(product.global_score)}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-white">
              {formatPrice(product.price_eur)}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-white">
              Battery {safeText(product.battery_mah, 'Soon')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
