import Link from 'next/link'
import type { Product } from '@/lib/products'
import { getProductName, safeNumber } from '@/lib/products'

export default function HomeHero({
  products,
  featured,
}: {
  products: Product[]
  featured?: Product
}) {
  const heroProduct = featured ?? products[0] ?? null
  const featuredName = heroProduct ? getProductName(heroProduct) : 'AI product intelligence'
  const featuredScore = safeNumber(heroProduct?.global_score)
  const productCount = Math.max(products.length, 50)

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 px-6 py-16 text-white shadow-2xl sm:px-10 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.28),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.24),transparent_35%)]" />

      <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
            AI-native product intelligence platform
          </p>

          <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Discover, compare, and understand the best tech products with AI.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Witflag combines semantic product search, scoring, recommendations, comparisons,
            and assistant-ready product intelligence in one clean experience.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="rounded-full bg-white px-6 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-slate-200"
            >
              Explore products
            </Link>

            <Link
              href="/assistant"
              className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10"
            >
              Ask AI assistant
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
          <p className="text-sm font-medium text-slate-300">Featured intelligence card</p>

          <h2 className="mt-4 text-2xl font-black">{featuredName}</h2>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">AI score</p>
              <p className="mt-2 text-3xl font-black">{featuredScore}</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Products</p>
              <p className="mt-2 text-3xl font-black">{productCount}+</p>
            </div>
          </div>

          <p className="mt-6 text-sm leading-6 text-slate-300">
            Built for product discovery, SEO automation, RAG assistants, and future vertical
            intelligence platforms.
          </p>
        </div>
      </div>
    </section>
  )
}
