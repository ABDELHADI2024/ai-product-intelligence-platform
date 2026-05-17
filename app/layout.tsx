import type { Metadata } from 'next';
import Link from 'next/link';
import { BrainCircuit, GitCompare, Search, Smartphone } from 'lucide-react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Witflag — AI Smartphone Intelligence',
  description:
    'AI-native smartphone intelligence platform for product discovery, comparison, scoring and guided recommendations.',
};

const navItems = [
  { href: '/products', label: 'Products', icon: Smartphone },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/compare', label: 'Compare', icon: GitCompare },
  { href: '/assistant', label: 'AI Assistant', icon: BrainCircuit },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-2xl">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/20">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xl font-black text-white">Witflag</div>
                <div className="text-xs uppercase tracking-[0.24em] text-cyan-300">AI Smartphone Intelligence</div>
              </div>
            </Link>

            <div className="hidden items-center gap-2 md:flex">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} className="flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </header>
        {children}
        <footer className="border-t border-white/10 px-5 py-10 text-center text-sm text-slate-500">
          Witflag — AI Smartphone Intelligence Platform
        </footer>
      </body>
    </html>
  );
}
