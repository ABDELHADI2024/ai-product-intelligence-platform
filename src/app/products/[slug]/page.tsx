import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getProductBySlug, getAllProducts } from "@/lib/supabase"
import { categoryLabels } from "@/lib/categories"

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const product = await getProductBySlug(slug)

  if (!product) return { title: "Product Not Found" }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  const productUrl = `${siteUrl}/products/${product.slug}`
  const isRealImage = product.image && product.image !== "/images/placeholder.svg" && product.image.trim() !== ""

  return {
    title: `${product.name} — ProductIntel`,
    description: product.description,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: `${product.name} — ProductIntel`,
      description: product.description,
      url: productUrl,
      images: isRealImage ? [{ url: product.image }] : undefined,
    },
    twitter: {
      card: isRealImage ? "summary_large_image" : "summary",
      title: `${product.name} — ProductIntel`,
      description: product.description,
      images: isRealImage ? product.image : undefined,
    },
  }
}

function ScoreRing({ score, size = 20 }: { score: number; size?: number }) {
  const valid = score > 0 && Number.isFinite(score)
  const color =
    score >= 90 ? "stroke-emerald-400" :
    score >= 80 ? "stroke-amber-400" :
    score >= 70 ? "stroke-blue-400" :
    "stroke-zinc-500"

  const r = 18
  const circumference = 2 * Math.PI * r
  const offset = valid ? circumference - (score / 100) * circumference : 0

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size + 24, height: size + 24 }}
    >
      {valid ? (
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 44 44">
        <circle
          cx="22" cy="22" r={r}
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3"
        />
        <circle
          cx="22" cy="22" r={r}
          fill="none"
          className={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      ) : (
        <div
          className="absolute inset-0 rounded-full bg-white/[0.03]"
          style={{ width: size + 24, height: size + 24 }}
        />
      )}
      <span className="text-lg font-bold text-white">{valid ? score : "N/A"}</span>
    </div>
  )
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  if (value === 0) return null

  const color =
    value >= 90 ? "bg-emerald-400" :
    value >= 80 ? "bg-amber-400" :
    value >= 70 ? "bg-blue-400" :
    "bg-zinc-500"

  return (
    <div className="flex items-center gap-3">
      <span className="w-24 text-sm text-zinc-500">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-8 text-right text-sm font-semibold tabular-nums text-zinc-300">
        {value}
      </span>
    </div>
  )
}

export default async function ProductDetailPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  const specs = Object.entries(product.specs)
  const pros = product.pros ?? []
  const cons = product.cons ?? []

  const scores = [
    { label: "Gaming", value: product.scores.gaming },
    { label: "Camera", value: product.scores.camera },
    { label: "Battery", value: product.scores.battery },
    { label: "Display", value: product.scores.display },
    { label: "Value", value: product.scores.value },
  ]

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    description: product.description,
    category: categoryLabels[product.category] ?? product.category,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="flex flex-col">
      {/* ── Breadcrumb ── */}
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-zinc-600">
          <Link href="/" className="transition-colors hover:text-zinc-400">
            Home
          </Link>
          <svg className="size-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
          <Link href="/products" className="transition-colors hover:text-zinc-400">
            Products
          </Link>
          <svg className="size-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
          <span className="text-zinc-400">{product.name}</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-white/[0.06] bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
        <div className="absolute -left-32 top-10 size-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -right-32 top-20 size-64 rounded-full bg-purple-500/8 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            {/* Info */}
            <div className="flex-1">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-blue-500/10 px-2.5 py-0.5 text-sm font-medium text-blue-400">
                  {product.brand}
                </span>
                <span className="rounded-md bg-white/5 px-2.5 py-0.5 text-sm text-zinc-500">
                  {categoryLabels[product.category] ?? product.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                {product.description}
              </p>

              <div className="mt-6 flex items-center gap-6">
                {product.price > 0 ? (
                  <>
                    <span className="text-3xl font-bold text-white">
                      ${product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-zinc-600">{product.currency}</span>
                  </>
                ) : (
                  <span className="text-base text-zinc-600">Price N/A</span>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-zinc-400 transition-all hover:border-white/20 hover:text-white"
                >
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                  Back to Products
                </Link>
                <Link
                  href="/compare"
                  className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-zinc-400 transition-all hover:border-white/20 hover:text-white"
                >
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                  Compare Products
                </Link>
              </div>
            </div>

            {/* Score ring */}
            <div className="flex shrink-0 flex-col items-center gap-2">
              <ScoreRing score={product.scores.overall} />
              <span className="text-xs text-zinc-600">Overall Score</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Score breakdown */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="mb-4 text-lg font-semibold text-white">
                Score Breakdown
              </h2>
              <div className="space-y-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
                {scores.map((s) => (
                  <ScoreRow key={s.label} label={s.label} value={s.value} />
                ))}
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="grid gap-6 sm:grid-cols-2">
              {pros.length > 0 && (
                <div>
                  <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                    <svg className="size-4 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    Pros
                  </h2>
                  <ul className="space-y-2">
                    {pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                        <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-green-400/60" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {cons.length > 0 && (
                <div>
                  <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                    <svg className="size-4 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    Cons
                  </h2>
                  <ul className="space-y-2">
                    {cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                        <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-red-400/60" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Specs sidebar */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">
              Key Specifications
            </h2>
            <div className="space-y-0 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03]">
              {specs.map(([key, value], i) => (
                <div
                  key={key}
                  className={`flex justify-between px-5 py-3 ${
                    i < specs.length - 1 ? "border-b border-white/[0.04]" : ""
                  }`}
                >
                  <span className="text-sm text-zinc-500">{key}</span>
                  <span className="ml-4 text-right text-sm text-zinc-300">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Recommendation Summary ── */}
        <div className="mt-12">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent p-8 sm:p-10">
            <div className="absolute -right-16 -top-16 size-40 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 size-40 rounded-full bg-purple-500/10 blur-3xl" />
            <div className="relative">
              <h2 className="text-lg font-semibold text-white">
                Recommendation Summary
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
                {product.name} by {product.brand} scores{" "}
                <strong className="text-white">{product.scores.overall > 0 && Number.isFinite(product.scores.overall) ? `${product.scores.overall}/100` : "N/A"}</strong>{" "}
                overall. It excels in{" "}
                {scores
                  .filter((s) => s.value > 0)
                  .sort((a, b) => b.value - a.value)
                  .slice(0, 3)
                  .map((s, i, arr) =>
                    i === arr.length - 1
                      ? `and ${s.label.toLowerCase()}`
                      : `${s.label.toLowerCase()}`
                  )
                  .join(", ")}{" "}
                {product.price > 0 ? (
                  <>with a price of{" "}
                    <strong className="text-white">
                      ${product.price.toLocaleString()}
                    </strong></>
                ) : (
                  <>with price not publicly listed</>
                )}
                . {pros.length > 0 && `Key advantages include ${pros.slice(0, 2).join(" and ").toLowerCase()}.`}{" "}
                This product is best suited for users looking for a{" "}
                {product.scores.gaming >= 90
                  ? "high-performance"
                  : "balanced"}{" "}
                {categoryLabels[product.category]?.toLowerCase() ??
                  product.category}{" "}
                with strong{" "}
                {scores
                  .filter((s) => s.value > 0)
                  .sort((a, b) => b.value - a.value)[0]?.label.toLowerCase() ??
                                     "gaming"}
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
