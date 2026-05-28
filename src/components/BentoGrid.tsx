import Link from "next/link"

interface BentoItem {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  size: "sm" | "md" | "lg"
  gradient: string
}

const items: BentoItem[] = [
  {
    title: "AI Search",
    description: "Natural language product search. Ask questions like \"best phone under $500\" and get intelligent results.",
    href: "/products",
    size: "md",
    gradient: "from-cyan-500/10 to-cyan-600/5",
    icon: (
      <svg className="size-5 text-cyan-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
  },
  {
    title: "Smart Comparisons",
    description: "Compare products side-by-side with visual score breakdowns and spec differences.",
    href: "/compare",
    size: "sm",
    gradient: "from-purple-500/10 to-purple-600/5",
    icon: (
      <svg className="size-5 text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    ),
  },
  {
    title: "Score Engine",
    description: "AI-powered scoring across performance, camera, battery, display, and value metrics.",
    href: "/products",
    size: "sm",
    gradient: "from-blue-500/10 to-blue-600/5",
    icon: (
      <svg className="size-5 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    title: "Buying Guides",
    description: "Expert-curated guides to help you make informed purchasing decisions across all categories.",
    href: "/guides",
    size: "md",
    gradient: "from-cyan-500/10 to-cyan-600/5",
    icon: (
      <svg className="size-5 text-cyan-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "Price Intelligence",
    description: "Track price history, find the best deals, and get notified when prices drop on your favorite products.",
    href: "/products",
    size: "sm",
    gradient: "from-purple-500/10 to-purple-600/5",
    icon: (
      <svg className="size-5 text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: "AI Assistant",
    description: "Get personalized recommendations by telling our AI what you need. Natural conversations, real data.",
    href: "/assistant",
    size: "lg",
    gradient: "from-blue-500/10 via-purple-500/5 to-indigo-600/5",
    icon: (
      <svg className="size-5 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
      </svg>
    ),
  },
]

function BentoCard({ item, className }: { item: BentoItem; className?: string }) {
  return (
    <Link
      href={item.href}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br ${item.gradient} p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-cyan-500/5 ${className}`}
    >
      <div className="relative z-10">
        <div className="mb-3 flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          {item.icon}
        </div>
        <h3 className="mb-1.5 text-base font-semibold text-white transition-colors group-hover:text-cyan-300">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-zinc-500">
          {item.description}
        </p>
      </div>
      <div className="absolute -bottom-6 -right-6 size-24 rounded-full bg-white/[0.02] blur-2xl transition-all group-hover:bg-white/[0.04]" />
    </Link>
  )
}

export default function BentoGrid() {
  return (
    <section className="w-full border-t border-white/[0.06] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-medium text-cyan-400">
            <span className="size-1 rounded-full bg-cyan-400" />
            Intelligence Capabilities
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Everything you need to decide
          </h2>
          <p className="mt-2 text-zinc-500">
            AI-powered tools to research, compare, and choose the best products
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.slice(0, 1).map((item) => (
            <BentoCard key={item.title} item={item} className="lg:col-span-2" />
          ))}
          {items.slice(1, 3).map((item) => (
            <BentoCard key={item.title} item={item} />
          ))}
          {items.slice(3, 4).map((item) => (
            <BentoCard key={item.title} item={item} className="lg:col-span-2" />
          ))}
          {items.slice(4, 5).map((item) => (
            <BentoCard key={item.title} item={item} />
          ))}
          {items.slice(5, 6).map((item) => (
            <BentoCard key={item.title} item={item} className="lg:col-span-2" />
          ))}
        </div>
      </div>
    </section>
  )
}
