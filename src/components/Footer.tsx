import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.06] bg-black">
      <div className="mx-auto flex max-w-[1160px] flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-purple-600">
              <span className="text-[10px] font-bold text-white">PI</span>
            </div>
            <span className="text-xs font-semibold text-white">ProductIntel</span>
          </Link>
          <span className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()}. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-zinc-600">
          <Link href="/products" className="transition-colors hover:text-zinc-400">Explore</Link>
          <Link href="/compare" className="transition-colors hover:text-zinc-400">Compare</Link>
          <Link href="/smart-search" className="transition-colors hover:text-zinc-400">Smart Search</Link>
          <Link href="/assistant" className="transition-colors hover:text-zinc-400">AI Advisor</Link>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5">
          <span className="size-1 rounded-full bg-green-400" />
          <span className="text-[10px] text-zinc-500">AI-Powered</span>
        </div>
      </div>
    </footer>
  )
}
