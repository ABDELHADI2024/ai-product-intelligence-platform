"use client"

import Link from "next/link"
import { useState } from "react"

const navLinks = [
  { href: "/products", label: "Explore" },
  { href: "/smart-search?q=best+overall+phone", label: "Best Picks" },
  { href: "/compare", label: "Compare" },
  { href: "/smart-search", label: "Smart Search" },
  { href: "/assistant", label: "AI Advisor" },
  { href: "/guides", label: "Guides" },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto mt-3 flex h-14 max-w-[1160px] items-center justify-between rounded-[16px] border border-white/[0.10] bg-slate-950/60 px-6 backdrop-blur-2xl sm:h-[56px]">
        <Link href="/" className="flex items-center gap-[10px]">
          <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <span className="text-sm font-bold text-white">WF</span>
          </div>
          <span className="text-base font-bold tracking-tight text-white uppercase">
            WITFLAG
          </span>
        </Link>

        <nav className="hidden items-center gap-[34px] md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-semibold text-white/90 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex">
            <div className="flex h-[34px] w-[280px] items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.06] px-4">
              <svg className="size-3.5 shrink-0 text-zinc-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                placeholder="Find your next phone..."
                className="w-full bg-transparent text-[13px] text-white placeholder-zinc-600 outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value.trim()) {
                    window.location.href = `/products?q=${encodeURIComponent(e.currentTarget.value.trim())}`
                  }
                }}
              />
              <span className="rounded-md bg-white/[0.08] px-2 py-0.5 text-[11px] text-zinc-500">⌘K</span>
            </div>
          </div>

          <button className="flex size-[34px] items-center justify-center rounded-full border border-white/[0.10] text-zinc-500 transition-colors hover:text-white hover:bg-white/5" aria-label="Settings">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex size-[34px] items-center justify-center rounded-full text-zinc-400 hover:bg-white/5 hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mx-auto max-w-[1160px] px-4">
          <div className="border-t border-white/10 bg-black px-4 pb-4 md:hidden">
            <nav className="flex flex-col gap-1 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
