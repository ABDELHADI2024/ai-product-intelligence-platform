import Link from 'next/link';
import { ArrowRight, BatteryCharging, Camera, Cpu } from 'lucide-react';
import { formatPrice, getProductName, SearchResult, safeText } from '@/lib/products';
import ScoreRing from './ScoreRing';

type SearchResultCardProps = {
  result: SearchResult;
  rank?: number;
};

export default function SearchResultCard({ result, rank = 1 }: SearchResultCardProps) {
  const { product, matchScore, reason } = result;

  return (
    <article className="group rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:border-cyan-300/30">
      <div className="grid gap-5 md:grid-cols-[170px_1fr_120px] md:items-center">
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
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
              Result #{rank}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-slate-300">
              {safeText(product.brand, 'Smartphone')}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-slate-300">
              {formatPrice(product)}
            </span>
          </div>

          <h3 className="mt-4 text-2xl font-black text-white">
            {getProductName(product)}
          </h3>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            {reason}
          </p>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-300">
              <Camera className="h-4 w-4 text-cyan-300" />
              Camera {safeText(product.camera_score, '—')}
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-300">
              <BatteryCharging className="h-4 w-4 text-cyan-300" />
              Battery {safeText(product.battery_score, '—')}
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-300">
              <Cpu className="h-4 w-4 text-cyan-300" />
              Gaming {safeText(product.gaming_score, '—')}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {product.slug ? (
              <Link
                href={`/products/${product.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
              >
                View product
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

        <div className="flex justify-center md:justify-end">
          <ScoreRing value={matchScore} label="Match" />
        </div>
      </div>
    </article>
  );
}
