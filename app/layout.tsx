import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Witflag | AI Product Intelligence Platform',
  description: 'AI-native product intelligence for smartphones, tablets, wearables, earbuds and smart devices.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Witflag<span className="text-cyan-400"> AI</span>
            </Link>
            <nav className="flex gap-4 text-sm text-slate-300">
              <Link href="/products" className="hover:text-white">Products</Link>
              <Link href="/search" className="hover:text-white">Search</Link>
              <Link href="/compare" className="hover:text-white">Compare</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500">
          Witflag — AI Product Intelligence Platform
        </footer>
      </body>
    </html>
  );
}
