import Link from 'next/link';
import { BrainCircuit } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-300">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <div>
              <p className="font-black text-white">Witflag</p>
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">AI Product Intelligence</p>
            </div>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">
            Smartphone discovery, comparison, search, assistant recommendations, and SEO intelligence powered by structured product data.
          </p>
        </div>

        <div>
          <p className="font-bold text-white">Explore</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            <Link href="/products" className="hover:text-cyan-200">Products</Link>
            <Link href="/search" className="hover:text-cyan-200">Search</Link>
            <Link href="/compare" className="hover:text-cyan-200">Compare</Link>
            <Link href="/assistant" className="hover:text-cyan-200">Assistant</Link>
          </div>
        </div>

        <div>
          <p className="font-bold text-white">SEO Guides</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            <Link href="/best" className="hover:text-cyan-200">Best phones</Link>
            <Link href="/brands" className="hover:text-cyan-200">Brands</Link>
            <Link href="/best/best-camera-phones" className="hover:text-cyan-200">Camera phones</Link>
            <Link href="/best/best-phones-under-500" className="hover:text-cyan-200">Under €500</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-slate-500">
        Witflag — AI Smartphone Intelligence Platform
      </div>
    </footer>
  );
}
