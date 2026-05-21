import { Sparkles } from 'lucide-react'

export default function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="wf-page-hero">
      <div className="wf-chip"><Sparkles size={14} /> {eyebrow}</div>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  )
}
