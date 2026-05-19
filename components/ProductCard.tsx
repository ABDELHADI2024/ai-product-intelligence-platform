import Link from 'next/link';
import { ArrowRight, BatteryCharging, Camera, Cpu, Sparkles } from 'lucide-react';
import { formatPrice, getProductName, Product, safeText } from '@/lib/products';
import ScoreRing from './ScoreRing';

type ProductCardProps = {
  product: Product;
};

function toNumber(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;

  const parsed = Number(String(value).replace(/[^\d.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
}

function ScoreCell({
  value,
  label,
  colorClass = 'text-cyan-300',
}: {
  value?: string | number | null;
  label: string;
  colorClass?: string;
}) {
  const parsed = toNumber(value);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center">
      <p className={`text-lg font-black ${colorClass}`}>
        {parsed === null ? '—' : Math.round(parsed)}
      </p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const name = getProductName(product);

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 shadow-2xl shadow-black/25 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35">
      <div className="relative flex h-64 items-center justify-center rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-5">
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
          <Sparkles className="h-3.5 w-3.5" />
          AI scored
        </div>

        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={name}
            className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="text-sm text-slate-600">No image</div>
        )}
      </div>

      <div className="p-2 pt-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">
              {safeText(product.brand, 'Smartphone')}
            </p>
            <h3 className="mt-2 line-clamp-2 text-xl font-black text-white">{name}</h3>
            <p className="mt-2 font-semibold text-cyan-100">{formatPrice(product)}</p>
          </div>

          <ScoreRing value={product.global_score} label="Global" size="sm" />
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-400">
          {safeText(
            product.content_summary_en,
            'AI-ready smartphone profile prepared for search, comparison, and recommendations.'
          )}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <ScoreCell value={product.camera_score} label="Camera" colorClass="text-cyan-300" />
          <ScoreCell value={product.battery_score} label="Battery" colorClass="text-violet-300" />
          <ScoreCell value={product.gaming_score} label="Gaming" colorClass="text-amber-300" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-xs text-slate-300">
            <Camera className="h-4 w-4 text-cyan-300" />
            Camera
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-xs text-slate-300">
            <BatteryCharging className="h-4 w-4 text-violet-300" />
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
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300"
            >
              View
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}

          <Link
            href={`/compare?phones=${product.slug || ''}`}
            className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white hover:bg-white/[0.1]"
          >
            Compare
          </Link>
        </div>
      </div>
    </article>
  );
}
