export default function ProductsLoading() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-white/[0.06] bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 sm:pt-16 lg:px-8">
          <div className="h-9 w-64 rounded-lg bg-gradient-to-r from-white/5 via-white/10 to-white/5 shimmer-sweep" />
          <div className="mt-3 h-5 w-96 rounded bg-gradient-to-r from-white/5 via-white/10 to-white/5 shimmer-sweep" />
          <div className="mt-6 flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 w-24 rounded-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 shimmer-sweep" />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
              <div className="flex items-center gap-2">
                <div className="h-4 w-16 rounded bg-gradient-to-r from-white/5 via-white/10 to-white/5 shimmer-sweep" />
                <div className="h-4 w-20 rounded bg-gradient-to-r from-white/5 via-white/10 to-white/5 shimmer-sweep" />
              </div>
              <div className="mt-2 h-5 w-40 rounded bg-gradient-to-r from-white/5 via-white/10 to-white/5 shimmer-sweep" />
              <div className="mt-3 aspect-[3/2] rounded-xl bg-gradient-to-r from-white/5 via-white/10 to-white/5 shimmer-sweep" />
              <div className="mt-3 space-y-2">
                <div className="h-3 w-full rounded bg-gradient-to-r from-white/5 via-white/10 to-white/5 shimmer-sweep" />
                <div className="h-3 w-3/4 rounded bg-gradient-to-r from-white/5 via-white/10 to-white/5 shimmer-sweep" />
              </div>
              <div className="mt-4 space-y-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="h-3 w-20 rounded bg-gradient-to-r from-white/5 via-white/10 to-white/5 shimmer-sweep" />
                    <div className="h-2 flex-1 rounded-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 shimmer-sweep" />
                    <div className="h-3 w-6 rounded bg-gradient-to-r from-white/5 via-white/10 to-white/5 shimmer-sweep" />
                  </div>
                ))}
              </div>
              <div className="mt-4 h-5 w-24 rounded bg-gradient-to-r from-white/5 via-white/10 to-white/5 shimmer-sweep" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
