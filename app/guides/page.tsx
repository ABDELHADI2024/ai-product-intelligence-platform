import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Buying Guides — Witflag",
  description:
    "Find the right phone for your needs.",
  openGraph: {
    title: "Buying Guides — Witflag",
    description:
      "Phone buying guides by use case. Camera, battery, gaming, value, and foldable guides coming soon.",
  },
}

export default function GuidesPage() {
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
              Guides
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Buying Guides
            </h1>
            <p className="mt-2 text-zinc-500">
              Decision-first guides — pick by use case, not just specs
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-sm leading-relaxed text-zinc-400">
          We are working on in-depth buying guides to help you choose the
          perfect smartphone or foldable device. In the meantime, explore our
          tools to compare products and find top-rated devices.
        </p>

        {/* Guide category cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Best Camera Phones", desc: "Find the best phones for photography and video — ranked by camera score and real-world use.", icon: "📷" },
            { title: "Best Battery Phones", desc: "All-day battery champions for travel, work, and heavy use.", icon: "🔋" },
            { title: "Best Value Flagships", desc: "Premium features without the premium price tag. Compare value scores and trade-offs.", icon: "💰" },
            { title: "Foldable Buying Guide", desc: "Is a foldable right for you? Compare durability, display, and use cases.", icon: "🔄" },
            { title: "How to Compare Phones", desc: "Go beyond specs. Learn how camera, battery, gaming, and value scores work together.", icon: "📊" },
            { title: "Gaming Phone Guide", desc: "Find the best phone for mobile gaming — performance, display, and cooling compared.", icon: "🎮" },
          ].map((guide) => (
            <div
              key={guide.title}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent p-5 transition-all duration-300"
            >
              <div className="absolute right-3 top-3 rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-400">
                Coming soon
              </div>
              <span className="text-2xl">{guide.icon}</span>
              <h3 className="mt-3 text-sm font-bold text-white">{guide.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{guide.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-xs text-zinc-600">
            In the meantime, explore our{" "}
            <Link href="/products" className="text-cyan-400 hover:text-cyan-300">products</Link>
            {" "}or use{" "}
            <Link href="/smart-search" className="text-cyan-400 hover:text-cyan-300">Smart Search</Link>
            {" "}to find phones by use case.
          </p>
        </div>
      </section>
    </div>
  )
}
