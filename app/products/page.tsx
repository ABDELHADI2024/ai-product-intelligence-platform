import type { Metadata } from "next"
import Link from "next/link"
import ProductCard from "@/components/ProductCard"
import { getAllProducts } from "@/lib/supabase"
import { categoryLabels } from "@/lib/categories"

export const metadata: Metadata = {
  title: "Explore Phones — Witflag",
  description:
    "Find the right smartphone or foldable by use case, budget, or feature priority. AI-powered scores across camera, battery, gaming, display, and value.",
  openGraph: {
  title: "Explore Phones — Witflag",
    description:
      "AI-powered phone decisions. Compare by camera, battery, gaming, display, and value.",
  },
}

export default async function ProductsPage(props: {
  searchParams: Promise<{ q?: string; category?: string }>
}) {
  const { q, category } = await props.searchParams
  const allProducts = await getAllProducts()

  const categories = [...new Set(allProducts.map((p) => p.category))]

  const query = q?.trim().toLowerCase() ?? ""

  let filtered = allProducts
  if (category) {
    filtered = filtered.filter((p) => p.category === category)
  }
  if (query) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    )
  }

  return (
    <div className="flex flex-col">
      {/* ── Header ── */}
      <section className="relative overflow-hidden border-b border-white/[0.06] bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
        <div className="absolute -left-32 top-10 size-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -right-32 top-20 size-72 rounded-full bg-purple-500/8 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-zinc-500">
              <span className="size-1 rounded-full bg-blue-400" />
              Decision Engine
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Explore Phones
            </h1>
            <p className="mt-2 text-zinc-500">
              Find the right phone by use case, budget, or feature priority — powered by AI scores
            </p>

            {/* ── Search ── */}
            <div className="mx-auto mt-8 max-w-lg">
              <form action="/products" method="GET">
                {category && (
                  <input type="hidden" name="category" value={category} />
                )}
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 transition-all duration-300 hover:border-white/20 focus-within:border-blue-500/50 focus-within:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                  <svg
                    className="size-5 shrink-0 text-zinc-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                  <input
                    type="text"
                    name="q"
                    defaultValue={q ?? ""}
                    placeholder="Search by product, brand, or use case..."
                    className="w-full bg-transparent text-sm text-white placeholder-zinc-600 outline-none"
                  />
                  <kbd className="hidden shrink-0 rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-zinc-600 sm:block">
                    ⌘K
                  </kbd>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters + Grid ── */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Category chips */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <Link
            href={query ? `/products?q=${encodeURIComponent(query)}` : "/products"}
            className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
              !category
                ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                : "border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
            }`}
          >
            All
          </Link>
          {categories.map((cat) => {
            const params = new URLSearchParams()
            if (query) params.set("q", query)
            params.set("category", cat)
            return (
              <Link
                key={cat}
                href={`/products?${params.toString()}`}
                className={`rounded-full border px-4 py-1.5 text-sm capitalize transition-all ${
                  category === cat
                    ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                    : "border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
                }`}
              >
                {categoryLabels[cat] ?? cat}
              </Link>
            )
          })}
        </div>

        {/* Decision/Filter chips */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {[
            { label: "Best overall", query: "best+overall+phone" },
            { label: "Best value", query: "best+value+phone" },
            { label: "Lowest price", query: "cheapest+smartphone" },
            { label: "Highest score", query: "highest+rated+phone" },
            { label: "Best camera", query: "best+camera+phone" },
            { label: "Best battery", query: "best+battery+phone" },
            { label: "Best performance", query: "best+gaming+phone" },
            { label: "Flagship", query: "best+flagship+phone" },
            { label: "Foldable", query: "best+foldable+phone" },
            { label: "Good value", query: "best+value+flagship" },
          ].map((chip) => {
            const params = new URLSearchParams()
            if (query) params.set("q", query)
            if (category) params.set("category", category)
            const chipHref = `/smart-search?q=${chip.query}`
            return (
              <Link
                key={chip.label}
                href={chipHref}
                className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs text-zinc-400 transition-all hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                {chip.label}
              </Link>
            )
          })}
        </div>

        {/* Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            Showing{" "}
            <span className="font-medium text-zinc-300">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "product" : "products"}
            {category ? (
              <>
                {" "}
                in{" "}
                <span className="font-medium text-zinc-300">
                  {categoryLabels[category] ?? category}
                </span>
              </>
            ) : null}
            {query ? (
              <>
                {" "}
                for &ldquo;<span className="font-medium text-zinc-300">{query}</span>&rdquo;
              </>
            ) : null}
          </p>
          {(category || query) && (
            <Link
              href="/products"
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-400"
            >
              Clear filters
            </Link>
          )}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg
              className="mb-4 size-12 text-zinc-700"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <p className="text-base font-medium text-zinc-400">
              No products found
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              {query
                ? "Try a different search term or category"
                : "Try a different category"}
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
