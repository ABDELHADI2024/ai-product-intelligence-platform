import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Witflag AI — Smartphone Intelligence Platform',
  description:
    'AI-powered smartphone discovery, comparison, scores, recommendations, and buying guidance.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <footer className="border-t border-white/10 bg-[#020617]/80 px-5 py-8 text-center text-sm text-slate-500">
          Witflag — AI Smartphone Intelligence Platform
        </footer>
      </body>
    </html>
  );
}
