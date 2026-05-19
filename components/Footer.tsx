import Link from 'next/link';
import { BrainCircuit } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'rgba(7,5,15,.95)', borderTop: '1px solid rgba(124,58,237,.12)', padding: '2.5rem 2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '2.5rem', marginBottom: '2rem' }}>

        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.7rem', marginBottom: '1rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#7c3aed,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BrainCircuit size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: '1rem', color: '#fff', letterSpacing: '.06em' }}>WITFLAG</div>
              <div style={{ fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: '#a78bfa', marginTop: -2 }}>AI Product Intelligence</div>
            </div>
          </div>
          <p style={{ fontSize: '.78rem', color: '#4a4168', lineHeight: 1.65, maxWidth: 280 }}>
            Smartphone discovery, comparison, search, AI recommendations, and SEO intelligence powered by structured product data.
          </p>
          <div style={{ display: 'flex', gap: '.5rem', marginTop: '1rem' }}>
            <span className="tag tag-v" style={{ fontSize: '.62rem' }}>10,000+ Products</span>
            <span className="tag tag-c" style={{ fontSize: '.62rem' }}>AI Scored</span>
          </div>
        </div>

        {/* Links */}
        {[
          { heading: 'Explore', links: [['Products','/products'],['Search','/search'],['Compare','/compare'],['AI Insights','/assistant']] },
          { heading: 'Categories', links: [['Smartphones','/best/best-camera-phones'],['Laptops','/best'],['Headphones','/best'],['Tablets','/best']] },
          { heading: 'Company', links: [['About','/best'],['Brands','/brands'],['Blog','/best'],['Contact','/best']] },
        ].map(({ heading, links }) => (
          <div key={heading}>
            <div style={{ fontSize: '.65rem', letterSpacing: '.22em', textTransform: 'uppercase', color: '#4a4168', fontWeight: 600, marginBottom: '1rem' }}>{heading}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
              {links.map(([label, href]) => (
                <Link key={label} href={href} style={{ fontSize: '.8rem', color: '#a89ec9', transition: 'color .15s' }}
                  onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#a78bfa'}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#a89ec9'}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid rgba(124,58,237,.1)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '.72rem', color: '#4a4168' }}>
          © {new Date().getFullYear()} Witflag — AI Product Intelligence Platform. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['Products','Compare','About'].map((l) => (
            <Link key={l} href="#" style={{ fontSize: '.75rem', color: '#4a4168' }}>{l}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
