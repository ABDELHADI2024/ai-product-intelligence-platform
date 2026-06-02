import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0e1a] px-4">
      <div className="relative">
        <div className="absolute -inset-20 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative text-center">
          <h1 className="bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-8xl font-black tracking-tight text-transparent sm:text-9xl">
            404
          </h1>
          <p className="mt-4 text-lg text-zinc-400 sm:text-xl">
            Page not found
          </p>
          <p className="mt-2 text-sm text-zinc-600">
            This page doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-blue-500/10 px-5 text-sm font-medium text-blue-400 transition-all hover:bg-blue-500/20"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-zinc-400 transition-all hover:border-white/20 hover:text-white"
            >
              Browse Products
            </Link>
            <Link
              href="/smartphones"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-zinc-400 transition-all hover:border-white/20 hover:text-white"
            >
              Smartphones
            </Link>
            <Link
              href="/foldable"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-zinc-400 transition-all hover:border-white/20 hover:text-white"
            >
              Foldable
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
