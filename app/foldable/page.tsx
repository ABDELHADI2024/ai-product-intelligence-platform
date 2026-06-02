import type { Metadata } from "next"
import Link from "next/link"
import ProductCard from "@/components/ProductCard"
import { getAllProducts } from "@/lib/supabase"
import { rankByIntent } from "@/lib/ranking"

export const metadata: Metadata = {
  title: "Foldable Smartphones — Witflag",
  description:
    "Compare the best foldable smartphones with AI-powered scores for gaming, camera, battery, display, and value.",
  openGraph: {
    title: "Foldable Smartphones — Witflag",
    description:
      "Discover foldable smartphones ranked by AI-powered scoring for display, performance, and value.",
  },
}

export default async function FoldablePage() {
  const allProducts = await getAllProducts()
  const filtered = allProducts.filter((p) => p.category === "foldable-smartphones")
  const foldables = rankByIntent(filtered, "best-foldable").map((r) => r.product)

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-white/[0.06] bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" />
        <div className="absolute -left-32 top-10 size-80 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute -right-32 top-20 size-72 rounded-full bg-violet-500/8 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-zinc-500">
              <span className="size-1 rounded-full bg-purple-400" />
              Foldable
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Foldable Smartphones
            </h1>
            <p className="mt-2 text-zinc-500">
              Discover foldable smartphones with expansive inner displays,
              powerful multitasking, and premium design. AI-ranked by display
              quality, performance, and overall value.
            </p>
            <p className="mt-1 text-xs text-zinc-600">Ranked by foldable display, performance, and value</p>

            <div className="mx-auto mt-8 flex max-w-lg justify-center gap-3">
              <Link
                href="/products?category=foldable-smartphones"
                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-zinc-400 transition-all hover:border-white/20 hover:text-white"
              >
                View in Products
              </Link>
              <Link
                href="/smartphones"
                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-zinc-400 transition-all hover:border-white/20 hover:text-white"
              >
                Smartphones &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            Showing{" "}
            <span className="font-medium text-zinc-300">{foldables.length}</span>{" "}
            {foldables.length === 1 ? "foldable" : "foldables"}
          </p>
        </div>

        {foldables.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {foldables.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg className="mb-4 size-12 text-zinc-700" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.75m12-2.122A2.25 2.25 0 0 1 19.5 9v.75m-15 0A2.25 2.25 0 0 1 2.25 12l1.512 4.942A2.25 2.25 0 0 0 5.947 18.75h12.106a2.25 2.25 0 0 0 2.185-1.808L21.75 12a2.25 2.25 0 0 0-2.25-2.25H4.5Z" />
            </svg>
            <p className="text-base font-medium text-zinc-400">No foldable smartphones found</p>
            <p className="mt-1 text-sm text-zinc-600">Check back later for new additions.</p>
          </div>
        )}
      </section>
    </div>
  )
}
