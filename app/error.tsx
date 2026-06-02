"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0e1a] px-4">
      <div className="relative">
        <div className="absolute -inset-20 rounded-full bg-red-500/10 blur-3xl" />
        <div className="relative text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-red-500/10">
            <svg className="size-8 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          </div>
          <h1 className="mt-6 text-2xl font-bold text-white sm:text-3xl">
            Something went wrong
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            {error.message || "An unexpected error occurred."}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={reset}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-blue-500/10 px-5 text-sm font-medium text-blue-400 transition-all hover:bg-blue-500/20"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-zinc-400 transition-all hover:border-white/20 hover:text-white"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
