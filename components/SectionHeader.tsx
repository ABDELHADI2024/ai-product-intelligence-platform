import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  text?: string
  href?: string
  linkLabel?: string
}

export default function SectionHeader({ eyebrow, title, text, href, linkLabel = 'View all' }: SectionHeaderProps) {
  return (
    <div className="wf-section-head">
      <div>
        {eyebrow ? <span className="wf-section-eyebrow">{eyebrow}</span> : null}
        <h2>{title}</h2>
        {text ? <p>{text}</p> : null}
      </div>
      {href ? <Link href={href} className="wf-link">{linkLabel} <ArrowRight size={15} /></Link> : null}
    </div>
  )
}
