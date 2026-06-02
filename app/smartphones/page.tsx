import type { Metadata } from "next"
import Link from "next/link"
import ProductCard from "@/components/ProductCard"
import { getAllProducts } from "@/lib/supabase"
import { rankByIntent } from "@/lib/ranking"

export const metadata: Metadata = {
  title: "Smartphones — Witflag",
  description:
    "Compare the best smartphones with AI-powered scores for gaming, camera, battery, and value.",
  openGraph: {
    title: "Smartphones — Witflag",
    description:
      "Explore the best smartphones ranked by AI-powered scoring across camera, battery, gaming, display, and value.",
  },
}

export default async function SmartphonesPage() {
  const allProducts = await getAllProducts()
  const filtered = allProducts.filter((p) => p.category === "smartphones")
  const smartphones = rankByIntent(filtered, "best-overall").map((r) => r.product)

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-white/[0.06] bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
        <div className="absolute -left-32 top-10 size-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -right-32 top-20 size-72 rounded-full bg-blue-500/8 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-zinc-500">
              <span className="size-1 rounded-full bg-cyan-400" />
              Smartphones
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Smartphones
            </h1>
            <p className="mt-2 text-zinc-500">
              Explore the best smartphones ranked by AI-powered scoring. Compare
              camera, battery, gaming, display, and value across every major brand.
            </p>
            <p className="mt-1 text-xs text-zinc-600">Ranked by overall smartphone intelligence</p>

            <div className="mx-auto mt-8 flex max-w-lg justify-center gap-3">
              <Link
                href="/products?category=smartphones"
                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-zinc-400 transition-all hover:border-white/20 hover:text-white"
              >
                View in Products
              </Link>
              <Link
                href="/foldable"
                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-zinc-400 transition-all hover:border-white/20 hover:text-white"
              >
                Foldable Phones &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            Showing{" "}
            <span className="font-medium text-zinc-300">{smartphones.length}</span>{" "}
            {smartphones.length === 1 ? "smartphone" : "smartphones"}
          </p>
        </div>

        {smartphones.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {smartphones.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg className="mb-4 size-12 text-zinc-700" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
            <p className="text-base font-medium text-zinc-400">No smartphones found</p>
            <p className="mt-1 text-sm text-zinc-600">Check back later for new additions.</p>
          </div>
        )}
      </section>
    </div>
  )
}
