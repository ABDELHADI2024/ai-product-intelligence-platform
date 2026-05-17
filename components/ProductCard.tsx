import Link from 'next/link';
import { ArrowUpRight, BatteryCharging, Camera, Cpu, Sparkles } from 'lucide-react';
import type { Product } from '@/lib/products';
import { formatPrice, formatScore, safeText, scoreTone } from '@/lib/products';
import ScoreRing from '@/components/ScoreRing';

type ProductCardProps = {
  product: Product;
  highlight?: 'camera' | 'battery' | 'gaming' | 'value' | 'balanced';
};

export default function ProductCard({ product, highlight = 'balanced' }: ProductCardProps) {
  const slug = product.slug || '#';
  const highlightScore =
    highlight === 'camera'
      ? product.camera_score
      : highlight === 'battery'
        ? product.battery_score
        : highlight === 'gaming'
          ? product.gaming_score
          : highlight === 'value'
            ? product.value_score
            : product.global_score;

  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-cyan-950/40">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cyan-400/10 to-transparent opacity-70" />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">{safeText(product.brand, 'Smartphone')}</p>
          <h3 className="mt-2 line-clamp-2 text-xl font-black text-white">{safeText(product.full_name || product.model, 'Smartphone')}</h3>
        </div>
        <ScoreRing value={product.global_score} size="sm" />
      </div>

      <Link href={`/products/${slug}`} className="relative mt-5 flex h-56 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 p-5 ring-1 ring-white/10">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_url} alt={safeText(product.full_name, 'Product image')} className="max-h-full object-contain transition duration-500 group-hover:scale-105" />
        ) : (
          <Sparkles className="h-16 w-16 text-slate-600" />
        )}
      </Link>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Estimated price</p>
          <p className="text-2xl font-black text-white">{formatPrice(product.price_eur)}</p>
        </div>
        <span className={`rounded-full border px-3 py-1 text-sm font-bold ${scoreTone(highlightScore)}`}>{formatScore(highlightScore)}</span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 text-xs">
        <div className="rounded-2xl bg-white/[0.04] p-3 text-slate-300">
          <Camera className="mb-2 h-4 w-4 text-cyan-300" />
          {formatScore(product.camera_score)} camera
        </div>
        <div className="rounded-2xl bg-white/[0.04] p-3 text-slate-300">
          <BatteryCharging className="mb-2 h-4 w-4 text-emerald-300" />
          {formatScore(product.battery_score)} battery
        </div>
        <div className="rounded-2xl bg-white/[0.04] p-3 text-slate-300">
          <Cpu className="mb-2 h-4 w-4 text-violet-300" />
          {formatScore(product.gaming_score)} perf.
        </div>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-400">{safeText(product.content_summary_en, 'AI-ready smartphone profile prepared for search, comparison and recommendation workflows.')}</p>

      <Link href={`/products/${slug}`} className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-white">
        View intelligence profile <ArrowUpRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
