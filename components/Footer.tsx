import Link from 'next/link';
import { BrainCircuit } from 'lucide-react';

const sections = [
  {
    heading: 'Explore',
    links: [
      ['Products', '/products'],
      ['Search', '/search'],
      ['Compare', '/compare'],
      ['Assistant', '/assistant'],
    ],
  },
  {
    heading: 'Guides',
    links: [
      ['Best phones', '/best'],
      ['Camera phones', '/best/best-camera-phones'],
      ['Battery phones', '/best/best-battery-phones'],
      ['Under €500', '/best/best-phones-under-500'],
    ],
  },
  {
    heading: 'Brands',
    links: [
      ['All brands', '/brands'],
      ['Xiaomi', '/brands/xiaomi'],
      ['Vivo', '/brands/vivo'],
      ['OnePlus', '/brands/oneplus'],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-300">
              <BrainCircuit className="h-6 w-6" />
            </div>

            <div>
              <p className="font-black text-white">WITFLAG</p>
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                AI Product Intelligence
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">
            Smartphone discovery, comparison, search, assistant recommendations,
            and SEO intelligence powered by structured product data.
          </p>
        </div>

        {sections.map((section) => (
          <div key={section.heading}>
            <p className="font-bold text-white">{section.heading}</p>

            <div className="mt-4 grid gap-3 text-sm text-slate-400">
              {section.links.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="transition hover:text-violet-300"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Witflag — AI Smartphone Intelligence Platform.
      </div>
    </footer>
  );
}
