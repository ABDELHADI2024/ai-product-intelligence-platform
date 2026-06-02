import type { Metadata } from "next"
import ProductAssistantClient from "@/components/ProductAssistantClient"

export const metadata: Metadata = {
  title: "Product Assistant – Witflag",
  description:
    "Ask questions and get AI-powered phone recommendations for your needs and budget.",
  openGraph: {
    title: "Product Assistant – Witflag",
    description: "Ask for product recommendations in plain English. Get smart, data-driven suggestions powered by our intelligence engine.",
  },
}

export default function AssistantPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-white/[0.06] bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" />
        <div className="absolute -left-32 top-10 size-80 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute -right-32 top-20 size-72 rounded-full bg-blue-500/8 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-zinc-500">
              <span className="size-1 rounded-full bg-purple-400" />
              AI Assistant
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Product Assistant
            </h1>
            <p className="mt-2 text-zinc-500">
              Ask for the best phone by budget, use case, brand, or market. Get decision-first recommendations in plain English.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <ProductAssistantClient />
      </section>
    </div>
  )
}
