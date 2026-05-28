import type { Metadata } from "next"
import SmartSearchClient from "@/components/SmartSearchClient"

export const metadata: Metadata = {
  title: "Smart Search – ProductIntel",
  description: "Describe what you're looking for in plain English and get AI-powered product recommendations.",
  openGraph: {
    title: "Smart Search – ProductIntel",
    description: "Describe what you're looking for in plain English and get AI-powered product recommendations.",
  },
}

export default function SmartSearchPage(props: { searchParams?: Promise<{ q?: string }> }) {
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
              AI Search
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Smart Search
            </h1>
            <p className="mt-2 text-zinc-500">
              Describe what you are looking for in plain English and get AI-powered recommendations.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SmartSearchClient searchParams={props.searchParams} />
      </section>
    </div>
  )
}
