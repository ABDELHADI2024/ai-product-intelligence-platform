import Link from 'next/link';
import { ArrowRight, BatteryCharging, Camera, Cpu, Sparkles } from 'lucide-react';
import { formatPrice, getProductName, Product, safeNumber, safeText } from '@/lib/products';
import ScoreRing from './ScoreRing';

type ProductCardProps = {
  product: Product;
};

function ScoreCell({
  value,
  label,
  colorClass = 'text-cyan-300',
}: {
  value?: string | number | null;
  label: string;
  colorClass?: string;
}) {
  const parsed = safeNumber(value);

  return (
    <div className="score-cell">
      <div className={`sv ${colorClass}`}>
        {parsed === null ? '—' : Math.round(parsed)}
      </div>
      <div className="sl">{label}</div>
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const name = getProductName(product);

  return (
    <article className="pcard group">
      <div className="pcard-img">
        <span className="tag tag-v absolute left-4 top-4">
          <Sparkles className="h-3.5 w-3.5" />
          AI scored
        </span>

        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_url} alt={name} />
        ) : (
          <div className="text-sm text-slate-600">No image</div>
        )}
      </div>

      <div className="pcard-body">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="pcard-brand">{safeText(product.brand, 'Smartphone')}</p>
            <h3 className="pcard-name line-clamp-2">{name}</h3>
            <p className="pcard-price mt-2">{formatPrice(product)}</p>
          </div>

          <ScoreRing value={product.global_score} label="Global" size="sm" />
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-400">
          {safeText(
            product.content_summary_en,
            'AI-ready smartphone profile prepared for search, comparison, and recommendations.'
          )}
        </p>

        <div className="scores-5 mt-5">
          <ScoreCell value={product.camera_score} label="Camera" colorClass="text-cyan-300" />
          <ScoreCell value={product.battery_score} label="Battery" colorClass="text-emerald-300" />
          <ScoreCell value={product.gaming_score} label="Gaming" colorClass="text-amber-300" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-xs text-slate-300">
            <Camera className="h-4 w-4 text-cyan-300" />
            Camera
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-xs text-slate-300">
            <BatteryCharging className="h-4 w-4 text-emerald-300" />
            Battery
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-xs text-slate-300">
            <Cpu className="h-4 w-4 text-amber-300" />
            Gaming
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-xs text-slate-300">
            Value {safeText(product.value_score, '—')}
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          {product.slug ? (
            <Link
              href={`/products/${product.slug}`}
              className="btn-primary flex-1"
            >
              View
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}

          <Link
            href={`/compare?phones=${product.slug || ''}`}
            className="btn-ghost"
          >
            Compare
          </Link>
        </div>
      </div>
    </article>
  );
}
