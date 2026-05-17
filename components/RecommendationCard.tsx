import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import {
  formatPrice,
  getProductName,
  Product,
  RecommendationResult,
  safeText,
} from '@/lib/products';
import ScoreRing from './ScoreRing';

type RecommendationCardProps = {
  recommendation: RecommendationResult;
  rank?: number;
};

export default function RecommendationCard({
  recommendation,
  rank = 1,
}: RecommendationCardProps) {
  const { product, matchScore, reason, strengths } = recommendation;

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:border-cyan-300/30">
      <div className="flex items-start justify-between gap-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
          <Sparkles className="h-3.5 w-3.5" />
          Recommendation #{rank}
        </div>

        <ScoreRing value={matchScore} label="Match" size="sm" />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-[150px_1fr]">
        <div className="flex h-44 items-center justify-center rounded-3xl bg-slate-950/80 p-4">
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={getProductName(product)}
              className="max-h-full object-contain transition group-hover:scale-105"
            />
          ) : (
            <span className="text-slate-600">No image</span>
          )}
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">
            {safeText(product.brand, 'Smartphone')}
          </p>

          <h3 className="mt-2 text-2xl font-black text-white">
            {getProductName(product)}
          </h3>

          <p className="mt-2 font-semibold text-cyan-100">
            {formatPrice(product)}
          </p>

          <p className="mt-4 text-sm leading-6 text-slate-300">{reason}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {strengths.map((strength) => (
              <span
                key={strength}
                className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-slate-300"
              >
                {strength}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {product.slug ? (
              <Link
                href={`/products/${product.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
              >
                View details
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}

            <Link
              href={`/compare?phones=${product.slug || ''}`}
              className="rounded-full border border-white/15 bg-white/[0.05] px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/[0.08]"
            >
              Compare
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
