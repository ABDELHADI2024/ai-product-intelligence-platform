import { Globe2, LineChart, Scale, Search, ShieldCheck, Zap } from 'lucide-react'

const features = [
  { icon: LineChart, title: 'Score-based intelligence', text: '6 decision signals scored using structured data.' },
  { icon: Search, title: 'Smart search', text: 'Natural language search across the full catalog.' },
  { icon: Scale, title: 'Product comparison', text: 'Compare up to 4 products side by side with ease.' },
  { icon: Zap, title: 'Data-ready updates', text: 'New products and data updated every day.' },
  { icon: ShieldCheck, title: 'Trusted insights', text: 'Objective analysis for smarter buying.' },
  { icon: Globe2, title: 'International-ready platform', text: 'Multi-currency-ready structure for global users.' }
]

export default function FeatureStrip() {
  return (
    <section className="feature-strip" aria-label="Witflag features">
      {features.map((feature) => {
        const Icon = feature.icon
        return (
          <div className="feature-box" key={feature.title}>
            <Icon />
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        )
      })}
    </section>
  )
}
