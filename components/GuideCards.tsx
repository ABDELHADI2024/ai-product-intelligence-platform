import Link from 'next/link'
import { BadgeDollarSign, BatteryCharging, Camera, Zap } from 'lucide-react'

const guides = [
  { href: '/best/best-camera-phones', title: 'Best camera phones', text: 'Ranked by Witflag scores.', icon: Camera },
  { href: '/best/best-battery-phones', title: 'Best battery phones', text: 'Ranked by Witflag scores.', icon: BatteryCharging },
  { href: '/best/best-gaming-phones', title: 'Best gaming phones', text: 'Ranked by Witflag scores.', icon: Zap },
  { href: '/best/best-value-phones', title: 'Best value phones', text: 'Ranked by Witflag scores.', icon: BadgeDollarSign }
]

export default function GuideCards() {
  return (
    <section>
      <div className="section-head">
        <div>
          <h2>Start by your need ✨</h2>
          <p>Browse our buying guides to find the perfect phone for what matters most.</p>
        </div>
        <Link href="/best/best-camera-phones">View all guides →</Link>
      </div>

      <div className="guide-grid">
        {guides.map((guide) => {
          const Icon = guide.icon
          return (
            <Link className="guide-card" href={guide.href} key={guide.href}>
              <div className="guide-icon"><Icon size={23} /></div>
              <h3>{guide.title}</h3>
              <p>{guide.text}</p>
              <span>Explore →</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
