import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About — Witflag",
  description:
    "Witflag is an AI-native phone decision engine for smartphones and foldable smartphones. Compare by camera, battery, gaming, value, and long-term fit.",
  openGraph: {
    title: "About — Witflag",
    description:
      "AI-powered phone decision engine. Turn specs into clear buying decisions.",
  },
}

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-white/[0.06] bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
        <div className="absolute -left-32 top-10 size-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -right-32 top-20 size-72 rounded-full bg-purple-500/8 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-zinc-500">
              <span className="size-1 rounded-full bg-blue-400" />
              About
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              AI Product Intelligence
            </h1>
            <p className="mt-2 text-zinc-500">
              A decision engine for phones. Turn specs into clear buying decisions.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8 text-sm leading-relaxed text-zinc-400">
          <p>
            <strong className="text-white">Witflag</strong> is an
            AI-native phone decision engine. We help you choose the right phone by
            budget, market, and real-life needs — not just specs.
          </p>

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 sm:p-8">
            <h2 className="mb-4 text-base font-semibold text-white">How it works</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-blue-400" />
                <span><strong className="text-white">Decision-first rankings</strong> — Phones scored across gaming, camera, battery, display, and value so you pick by what matters.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-purple-400" />
                <span><strong className="text-white">Use-case comparisons</strong> — See which phone wins for camera, battery, gaming, or value — not only raw specs.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-cyan-400" />
                <span><strong className="text-white">Intent-based search</strong> — Tell us your use case and budget. Get recommendations that match your real needs.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-emerald-400" />
                <span><strong className="text-white">Live product data</strong> — 300+ phones in our database with AI-powered scores, updated regularly.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 sm:p-8">
            <h2 className="mb-4 text-base font-semibold text-white">Current V1 scope</h2>
            <p>
              We currently support <strong className="text-white">smartphones</strong> and{" "}
              <strong className="text-white">foldable smartphones</strong>. Each product is
              evaluated across five scoring dimensions (gaming, camera, battery, display, and
              value) with an overall score that reflects real-world performance and user value.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <Link
              href="/products"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-zinc-400 transition-all hover:border-white/20 hover:text-white"
            >
              Explore Phones
            </Link>
            <Link
              href="/compare"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-zinc-400 transition-all hover:border-white/20 hover:text-white"
            >
              Compare Phones
            </Link>
            <Link
              href="/smart-search"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-zinc-400 transition-all hover:border-white/20 hover:text-white"
            >
              Smart Search
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
