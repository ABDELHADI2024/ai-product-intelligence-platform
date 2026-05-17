import Link from 'next/link';
import { BatteryCharging, Camera, Cpu, Smartphone } from 'lucide-react';
import {
  formatPrice,
  formatScore,
  Product,
  safeText,
  useCaseLabel,
} from '@/lib/products';
import ScoreRing from './ScoreRing';

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const href = `/products/${product.slug}`;

  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.07]"
    >
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl transition group-hover:bg-cyan-300/20" />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
            {useCaseLabel(product)}
          </div>
          <ScoreRing value={product.global_score} label="" size="sm" />
        </div>

        <div className="mt-4 flex h-44 items-center justify-center rounded-3xl bg-slate-950/70 p-4 ring-1 ring-white/5">
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={safeText(product.full_name, 'Smartphone')}
              className="max-h-full object-contain transition duration-500 group-hover:scale-105"
            />
          ) : (
            <Smartphone className="h-16 w-16 text-slate-600" />
          )}
        </div>

        <div className="mt-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{safeText(product.brand, 'Brand')}</p>
          <h3 className="mt-2 line-clamp-2 min-h-[3rem] text-lg font-black leading-tight text-white">
            {safeText(product.full_name, product.model || 'Smartphone')}
          </h3>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-lg font-bold text-cyan-200">{formatPrice(product.price_eur)}</p>
            <p className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-300">
              Score {formatScore(product.global_score)}
            </p>
          </div>
        </div>

        {!compact ? (
          <div className="mt-5 grid grid-cols-3 gap-2 text-xs text-slate-300">
            <div className="rounded-2xl bg-white/[0.04] p-3">
              <Camera className="mb-2 h-4 w-4 text-cyan-300" />
              {formatScore(product.camera_score)} Camera
            </div>
            <div className="rounded-2xl bg-white/[0.04] p-3">
              <BatteryCharging className="mb-2 h-4 w-4 text-emerald-300" />
              {formatScore(product.battery_score)} Battery
            </div>
            <div className="rounded-2xl bg-white/[0.04] p-3">
              <Cpu className="mb-2 h-4 w-4 text-purple-300" />
              {formatScore(product.gaming_score)} Power
            </div>
          </div>
        ) : null}

        <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/50 p-3 text-sm text-slate-400">
          <p className="line-clamp-2">{safeText(product.content_summary_en, 'AI-ready smartphone profile.')}</p>
        </div>
      </div>
    </Link>
  );
}
