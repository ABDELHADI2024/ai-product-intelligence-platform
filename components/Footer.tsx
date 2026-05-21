import Link from 'next/link';

const sections = [
  { title: 'Explore', links: [['Products','/products'], ['Search','/search'], ['Compare','/compare'], ['Assistant','/assistant']] },
  { title: 'Guides', links: [['Best phones','/best'], ['Camera phones','/best/best-camera-phones'], ['Battery phones','/best/best-battery-phones'], ['Under €500','/best/best-phones-under-500']] },
  { title: 'Brands', links: [['All brands','/brands'], ['Xiaomi','/brands/xiaomi'], ['Vivo','/brands/vivo'], ['OnePlus','/brands/oneplus']] },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="content-shell footer-grid">
        <div>
          <Link href="/" className="nav-brand">
            <div className="logo-mark">W</div>
            <div>
              <div className="nav-brand-title">Witflag</div>
              <div className="nav-brand-sub">AI Product Intelligence</div>
            </div>
          </Link>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">
            Smartphone discovery, comparison, search, assistant recommendations, and SEO intelligence powered by structured product data.
          </p>
        </div>
        {sections.map((s) => (
          <div key={s.title}>
            <p className="footer-title">{s.title}</p>
            <div className="footer-links">
              {s.links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-slate-500">
        Witflag — AI Smartphone Intelligence Platform
      </div>
    </footer>
  );
}
