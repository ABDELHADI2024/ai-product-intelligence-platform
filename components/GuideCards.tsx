import Link from 'next/link';
import { ArrowRight, BadgeDollarSign, BatteryCharging, Camera, Gamepad2 } from 'lucide-react';

const guides = [
  { href: '/best/best-camera-phones', title: 'Best camera phones', text: 'Ranked by Witflag scores.', icon: Camera, tone: 'cyan' },
  { href: '/best/best-battery-phones', title: 'Best battery phones', text: 'Ranked by Witflag scores.', icon: BatteryCharging, tone: 'green' },
  { href: '/best/best-gaming-phones', title: 'Best gaming phones', text: 'Ranked by Witflag scores.', icon: Gamepad2, tone: 'violet' },
  { href: '/best/best-value-phones', title: 'Best value phones', text: 'Ranked by Witflag scores.', icon: BadgeDollarSign, tone: 'amber' },
];

export default function GuideCards() {
  return (
    <section>
      <div className="section-head">
        <div>
          <h2>Start by your need</h2>
          <p>Browse our buying guides to find the perfect phone for what matters most.</p>
        </div>
        <Link href="/best/best-camera-phones">View all guides <ArrowRight size={14} /></Link>
      </div>

      <div className="guide-grid">
        {guides.map((guide) => {
          const Icon = guide.icon;
          return (
            <Link className={`guide-card ${guide.tone}`} href={guide.href} key={guide.href}>
              <div className="guide-icon"><Icon size={23} /></div>
              <h3>{guide.title}</h3>
              <p>{guide.text}</p>
              <span>Explore <ArrowRight size={13} /></span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
