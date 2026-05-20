import Link from 'next/link'
import {
  ArrowLeft,
  BadgeDollarSign,
  BatteryCharging,
  Camera,
  Cpu,
  Gamepad2,
  MonitorSmartphone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import {
  formatPrice,
  getProductBySlug,
  getProducts,
  getProductName,
  safeNumber,
  safeText,
  splitList,
} from '@/lib/products'

export const dynamic = 'force-dynamic'

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>
}

function scoreTone(value: string | number | null | undefined) {
  const score = safeNumber(value)
  if (score === null) return 'border-slate-600 text-slate-400'
  if (score >= 88) return 'border-emerald-400 text-emerald-300'
  if (score >= 78) return 'border-cyan-400 text-cyan-300'
  if (score >= 68) return 'border-amber-400 text-amber-300'
  return 'border-rose-400 text-rose-300'
}

function ScoreBlock({ label, value, icon: Icon }: {
  label: string
  value?: string | number | null
  icon: typeof Camera
}) {
  const score = safeNumber(value)

  return (
    <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300">
          <Icon className="h-5 w-5" />
        </div>
        <div className={`flex h-14 w-14 items-center justify-center rounded-full border-4 bg-slate-950/70 text-lg font-black ${scoreTone(value)}`}>
          {score === null ? '—' : Math.round(score)}
        </div>
      </div>
      <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-slate-500">{label}</p>
    </div>
  )
}

function SpecPill({ label, value, icon: Icon }: {
  label: string
  value?: string | number | null
  icon: typeof Smartphone
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] text-cyan-300">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{label}</p>
          <p className="mt-1 text-sm font-bold text-white">{safeText(value, 'Coming soon')}</p>
        </div>
      </div>
    </div>
  )
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return (
      <main className="min-h-screen bg-[#020617] px-5 py-24 text-white">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.045] p-10 text-center">
          <h1 className="text-3xl font-black">Smartphone not found</h1>
          <p className="mt-3 text-slate-400">This product does not exist in the database yet.</p>
          <Link href="/products" className="mt-8 inline-flex rounded-full bg-cyan-400 px-6 py-3 font-bold text-slate-950">
            Back to products
          </Link>
        </div>
      </main>
    )
  }

  const products = await getProducts(8)
  const relatedProducts = products.filter((item) => item.id !== product.id).slice(0, 4)
  const name = getProductName(product)
  const globalScore = safeNumber(product.global_score)
  const pros = splitList(product.pros_en)
  const cons = splitList(product.cons_en)

  return (
    <main className="min-h-screen overflow-hidden bg-[#020617] text-white">
      <section className="relative border-b border-white/10 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_90%_10%,rgba(139,92,246,0.22),transparent_34%)]">
        <div className="mx-auto max-w-7xl px-5 py-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-cyan-300">
            <ArrowLeft className="h-4 w-4" /> Back to catalog
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative rounded-[2.4rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30">
              <div className="absolute inset-x-16 bottom-12 h-20 rounded-full bg-violet-500/20 blur-3xl" />
              <div className="absolute inset-x-20 bottom-16 h-12 rounded-full border border-violet-400/30 bg-violet-500/10" />

              <div className="relative flex min-h-[520px] items-center justify-center rounded-[2rem] border border-white/10 bg-slate-950/70 p-8">
                {product.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.image_url} alt={name} className="max-h-[470px] max-w-full object-contain drop-shadow-2xl" />
                ) : (
                  <Smartphone className="h-28 w-28 text-cyan-300" />
                )}

                <div className={`absolute bottom-6 right-6 flex h-24 w-24 items-center justify-center rounded-full border-[7px] bg-slate-950/80 text-3xl font-black ${scoreTone(product.global_score)}`}>
                  {globalScore === null ? '—' : Math.round(globalScore)}
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-200">
                <Sparkles className="h-4 w-4" /> AI-scored smartphone profile
              </div>

              <p className="mt-6 text-sm font-black uppercase tracking-[0.3em] text-cyan-300">
                {safeText(product.brand, 'Smartphone')}
              </p>

              <h1 className="mt-3 max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
                {name}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <p className="text-3xl font-black text-white">{formatPrice(product)}</p>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-bold text-slate-300">
                  Global score {globalScore === null ? '—' : Math.round(globalScore)}/100
                </span>
              </div>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                {safeText(product.content_summary_en, 'A premium smartphone with strong AI-scored performance across key buying signals.')}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <SpecPill label="Display" value={product.screen_size || product.screen_type} icon={MonitorSmartphone} />
                <SpecPill label="Chipset" value={product.chipset} icon={Cpu} />
                <SpecPill label="Battery" value={product.battery_mah ? `${product.battery_mah} mAh` : null} icon={BatteryCharging} />
                <SpecPill label="Camera" value={product.rear_camera} icon={Camera} />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/compare?phones=${product.slug || ''}`} className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-black text-slate-950 transition hover:bg-cyan-300">
                  Compare this phone <Trophy className="h-4 w-4" />
                </Link>
                <Link href="/assistant" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-6 py-3 font-bold text-white transition hover:border-cyan-300/35 hover:bg-white/[0.08]">
                  Get recommendations <Sparkles className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-6">
          <ScoreBlock label="Global" value={product.global_score} icon={Sparkles} />
          <ScoreBlock label="Camera" value={product.camera_score} icon={Camera} />
          <ScoreBlock label="Battery" value={product.battery_score} icon={BatteryCharging} />
          <ScoreBlock label="Display" value={product.display_score} icon={MonitorSmartphone} />
          <ScoreBlock label="Gaming" value={product.gaming_score} icon={Gamepad2} />
          <ScoreBlock label="Value" value={product.value_score} icon={BadgeDollarSign} />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6">
            <h2 className="flex items-center gap-2 text-2xl font-black"><ShieldCheck className="h-6 w-6 text-emerald-300" />Pros</h2>
            <div className="mt-5 space-y-3">
              {(pros.length ? pros : ['Strong AI-scored performance']).map((item) => (
                <div key={item} className="rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.06] p-4 text-sm leading-6 text-slate-200">{item}</div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6">
            <h2 className="flex items-center gap-2 text-2xl font-black"><Zap className="h-6 w-6 text-amber-300" />Cons</h2>
            <div className="mt-5 space-y-3">
              {(cons.length ? cons : ['Some specs may need validation']).map((item) => (
                <div key={item} className="rounded-2xl border border-amber-300/15 bg-amber-300/[0.06] p-4 text-sm leading-6 text-slate-200">{item}</div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[0.06] p-6">
            <h2 className="flex items-center gap-2 text-2xl font-black"><Sparkles className="h-6 w-6 text-cyan-300" />AI Verdict</h2>
            <p className="mt-5 text-sm leading-7 text-slate-200">
              {safeText(product.expert_opinion_en, 'Witflag evaluates this smartphone using camera, battery, display, gaming, value, and global decision signals.')}
            </p>
          </div>
        </div>

        {relatedProducts.length ? (
          <div className="mt-14">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">Related picks</p>
                <h2 className="mt-2 text-4xl font-black tracking-tight">More smartphones to compare</h2>
              </div>
              <Link href="/products" className="text-sm font-bold text-cyan-300 hover:text-cyan-200">View catalog →</Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {relatedProducts.map((item, index) => (
                <ProductCard key={item.id} product={item} rank={index + 1} />
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </main>
  )
}
