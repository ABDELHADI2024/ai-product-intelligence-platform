import Link from 'next/link'
import { ArrowRight, BatteryCharging, Camera, Gamepad2, Sparkles } from 'lucide-react'
import {
  formatPrice,
  getProductName,
  Product,
  safeNumber,
  safeText,
} from '@/lib/products'

type ProductCardProps = {
  product: Product
  rank?: number
}

function scoreTone(value: string | number | null | undefined) {
  const score = safeNumber(value)
  if (score === null) return 'border-slate-600 text-slate-400'
  if (score >= 88) return 'border-emerald-400 text-emerald-300 shadow-[0_0_22px_rgba(52,211,153,0.18)]'
  if (score >= 78) return 'border-cyan-400 text-cyan-300 shadow-[0_0_22px_rgba(34,211,238,0.18)]'
  if (score >= 68) return 'border-amber-400 text-amber-300 shadow-[0_0_22px_rgba(251,191,36,0.18)]'
  return 'border-rose-400 text-rose-300'
}

function MiniScore({ label, value, tone = 'text-cyan-300' }: {
  label: string
  value?: string | number | null
  tone?: string
}) {
  const score = safeNumber(value)

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2 text-center">
      <div className={`text-sm font-black ${tone}`}>{score === null ? '—' : Math.round(score)}</div>
      <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">{label}</div>
    </div>
  )
}

export default function ProductCard({ product, rank }: ProductCardProps) {
  const name = getProductName(product)
  const globalScore = safeNumber(product.global_score)

  return (
    <article className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#07111f]/80 p-3 shadow-2xl shadow-black/25 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-[#0a1628]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12),transparent_38%),radial-gradient(circle_at_100%_100%,rgba(139,92,246,0.12),transparent_34%)] opacity-70" />

      <div className="relative">
        <div className="relative flex h-52 items-center justify-center overflow-hidden rounded-[1.2rem] border border-white/10 bg-slate-950/70 p-4">
          <div className="absolute inset-x-8 bottom-6 h-10 rounded-full bg-cyan-400/10 blur-2xl transition group-hover:bg-violet-400/20" />

          {rank ? (
            <div className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-xl border border-amber-300/30 bg-amber-300/15 text-sm font-black text-amber-200">
              {rank}
            </div>
          ) : (
            <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-200">
              <Sparkles className="h-3 w-3" />
              AI
            </div>
          )}

          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={name}
              className="relative z-10 max-h-full max-w-full object-contain drop-shadow-2xl transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="relative z-10 text-sm text-slate-600">No image</div>
          )}

          <div className={`absolute bottom-3 right-3 z-20 flex h-12 w-12 items-center justify-center rounded-full border-4 bg-slate-950/80 text-base font-black ${scoreTone(product.global_score)}`}>
            {globalScore === null ? '—' : Math.round(globalScore)}
          </div>
        </div>

        <div className="px-1 pt-4">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-300">
            {safeText(product.brand, 'Smartphone')}
          </p>

          <h3 className="mt-1 line-clamp-2 min-h-[3rem] text-lg font-black leading-tight text-white">
            {name}
          </h3>

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-base font-black text-white">{formatPrice(product)}</p>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400">
              Global {globalScore === null ? '—' : Math.round(globalScore)}
            </span>
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
            {safeText(product.content_summary_en, 'AI-ready smartphone profile prepared for search, comparison, and recommendations.')}
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <MiniScore label="Cam" value={product.camera_score} tone="text-cyan-300" />
            <MiniScore label="Bat" value={product.battery_score} tone="text-emerald-300" />
            <MiniScore label="Game" value={product.gaming_score} tone="text-violet-300" />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-[11px] text-slate-400">
            <div className="flex items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] py-2">
              <Camera className="h-3.5 w-3.5 text-cyan-300" /> Camera
            </div>
            <div className="flex items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] py-2">
              <BatteryCharging className="h-3.5 w-3.5 text-emerald-300" /> Battery
            </div>
            <div className="flex items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] py-2">
              <Gamepad2 className="h-3.5 w-3.5 text-violet-300" /> Gaming
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            {product.slug ? (
              <Link href={`/products/${product.slug}`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300">
                View <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}

            <Link href={`/compare?phones=${product.slug || ''}`} className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-bold text-white transition hover:border-cyan-300/35 hover:bg-white/[0.08]">
              Compare
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
