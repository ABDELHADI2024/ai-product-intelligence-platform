import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import ScoreRing from './ScoreRing';
import { formatPrice, safeText, type Product } from '@/lib/products';

type RecommendationCardProps = {
  product: Product;
  reason?: string;
  rank?: number;
};

export default function RecommendationCard({
  product,
  reason,
  rank,
}: RecommendationCardProps) {
  const href = product.slug ? `/products/${product.slug}` : '/products';

  return (
    <article className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.065]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

      <div className="flex gap-5">
        <div className="relative flex h-36 w-28 shrink-0 items-center justify-center rounded-3xl bg-slate-950/70 p-3 ring-1 ring-white/10">
          {rank ? (
            <div className="absolute left-2 top-2 rounded-full bg-cyan-400 px-2 py-0.5 text-xs font-bold text-slate-950">
              #{rank}
            </div>
          ) : null}

          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.full_name || product.model || 'Smartphone'}
              className="max-h-full object-contain drop-shadow-2xl"
            />
          ) : (
            <div className="text-xs text-slate-500">No image</div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">
                {safeText(product.brand, 'Smartphone')}
              </p>
              <h3 className="mt-1 line-clamp-2 text-xl font-bold text-white">
                {safeText(product.full_name, product.model || 'Smartphone')}
              </h3>
            </div>

            <ScoreRing value={product.global_score} label="Score" size="sm" />
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
            {reason ||
              safeText(
                product.content_summary_en,
                'Recommended from Witflag smartphone intelligence scores.'
              )}
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-white/10 px-3 py-1 text-white">
              {formatPrice(product)}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-white">
              Battery {safeText(product.battery_mah, 'Soon')}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-white">
              Camera {safeText(product.camera_score, 'Pending')}
            </span>
          </div>

          <Link
            href={href}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200"
          >
            View recommendation
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-2xl border border-cyan-300/10 bg-cyan-300/5 px-4 py-3 text-xs text-cyan-100">
        <Sparkles className="h-4 w-4 text-cyan-300" />
        Matched using budget, usage priority, and Witflag AI-ready scores.
      </div>
    </article>
  );
}
