import Link from 'next/link';
import { BrainCircuit, Bell, Globe, Search } from 'lucide-react';

const NAV = [
  { href: '/',          label: 'Home' },
  { href: '/products',  label: 'Products' },
  { href: '/compare',   label: 'Compare' },
  { href: '/search',    label: 'Search' },
  { href: '/assistant', label: 'AI Insights' },
  { href: '/best',      label: 'About' },
];

export default function Header() {
  return (
    <header>
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 56,
          gap: '1.5rem',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '.7rem', flexShrink: 0 }}>
          <div
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg,#7c3aed,#6366f1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(124,58,237,.4)',
            }}
          >
            <BrainCircuit size={18} color="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: '1.05rem', letterSpacing: '.08em', color: '#fff' }}>
              WITFLAG
            </div>
            <div style={{ fontSize: 9, letterSpacing: '.25em', textTransform: 'uppercase', color: '#a78bfa', marginTop: -2 }}>
              Product Intelligence Platform
            </div>
          </div>
        </Link>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                padding: '.45rem .9rem',
                borderRadius: 8,
                fontSize: '.82rem',
                fontWeight: 500,
                color: '#a89ec9',
                transition: 'background .15s, color .15s',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = 'rgba(124,58,237,.12)';
                (e.target as HTMLElement).style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = 'transparent';
                (e.target as HTMLElement).style.color = '#a89ec9';
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', flexShrink: 0 }}>
          {[Search, Bell].map((Icon, i) => (
            <button
              key={i}
              style={{
                width: 32, height: 32,
                borderRadius: 8,
                border: '1px solid rgba(124,58,237,.2)',
                background: 'rgba(124,58,237,.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#a89ec9',
                transition: 'border-color .15s, color .15s',
              }}
            >
              <Icon size={14} />
            </button>
          ))}
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: '.35rem',
              padding: '.3rem .65rem',
              borderRadius: 8,
              border: '1px solid rgba(124,58,237,.2)',
              background: 'rgba(124,58,237,.06)',
              fontSize: '.75rem', color: '#a89ec9', cursor: 'pointer',
            }}
          >
            <Globe size={12} /> EN
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        style={{
          borderTop: '1px solid rgba(124,58,237,.12)',
          padding: '.6rem 2.5rem',
          display: 'none', /* show via CSS media query */
        }}
        className="mobile-nav"
      >
        <nav style={{ display: 'flex', gap: '.4rem', overflowX: 'auto' }}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="tag tag-v"
              style={{ whiteSpace: 'nowrap', borderRadius: 8 }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
