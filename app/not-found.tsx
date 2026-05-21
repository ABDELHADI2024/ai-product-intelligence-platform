import Link from 'next/link'
import PageHero from '@/components/PageHero'

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="404" title="This intelligence page was not found." text="The page may have moved, or the product profile is not indexed yet." />
      <div className="wf-cta-row"><Link className="wf-btn wf-btn-primary" href="/products">Browse products</Link><Link className="wf-btn wf-btn-ghost" href="/">Back home</Link></div>
    </>
  )
}
