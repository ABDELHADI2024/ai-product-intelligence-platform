import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatPrice, getProductName, Product, safeText } from '@/lib/products';
import ScoreRing from './ScoreRing';

type SEOProductRowProps = {
  product: Product;
  rank: number;
  scoreLabel?: string;
  scoreValue?: string | number | null;
};

export default function SEOProductRow({
  product,
  rank,
  scoreLabel = 'AI Score',
  scoreValue,
}: SEOProductRowProps) {
  const displayScore = scoreValue ?? product.global_score;

  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/20">
      <div className="grid gap-5 md:grid-cols-[80px_150px_1fr_120px] md:items-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-xl font-black text-cyan-200">
          #{rank}
        </div>

        <div className="flex h-40 items-center justify-center rounded-3xl bg-slate-950/80 p-4">
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={getProductName(product)}
              className="max-h-full object-contain"
            />
          ) : (
            <span className="text-sm text-slate-600">No image</span>
          )}
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">
            {safeText(product.brand, 'Smartphone')}
          </p>
          <h3 className="mt-2 text-2xl font-black text-white">
            {getProductName(product)}
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            {safeText(product.content_summary_en, 'A smartphone ranked by Witflag product intelligence signals.')}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1">
              {formatPrice(product)}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1">
              Battery {safeText(product.battery_mah, 'Soon')}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1">
              {safeText(product.chipset, 'Chipset coming soon')}
            </span>
          </div>
          {product.slug ? (
            <Link
              href={`/products/${product.slug}`}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
            >
              View product
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>

        <div className="flex justify-center md:justify-end">
          <ScoreRing value={displayScore} label={scoreLabel} />
        </div>
      </div>
    </article>
  );
}
