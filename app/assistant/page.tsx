import Link from 'next/link'
import { ArrowRight, Bot, Camera, Gamepad2, Search, Sparkles, WalletCards } from 'lucide-react'
import BentoGrid from '@/components/BentoGrid'
import PageHero from '@/components/PageHero'
import { getProducts } from '@/lib/products'

export const metadata = { title: 'AI Assistant', description: 'Guided AI assistant interface for smartphone discovery and recommendations.' }
export const revalidate = 3600

const prompts = [
  { icon: Camera, text: 'I want the best camera phone for travel.' },
  { icon: Gamepad2, text: 'Find me a fast gaming phone with good battery.' },
  { icon: WalletCards, text: 'Show the best value flagship under my budget.' },
  { icon: Search, text: 'Compare Samsung, Apple, Google, and Xiaomi.' }
]

export default async function AssistantPage() {
  const products = (await getProducts(6)).slice(0, 3)
  return (
    <>
      <PageHero eyebrow="Guided AI" title="The assistant UI for smart buying decisions." text="This page gives your AI product assistant one consistent visual system: prompts, answers, recommendations, and explainable decision signals." />
      <section className="wf-assistant-grid">
        <div className="wf-chat-card">
          <div className="wf-chip"><Bot size={14} /> Assistant flow</div>
          <div className="wf-message">I am in Morocco and I want a phone with strong camera, battery, and value. What should I buy?</div>
          <div className="wf-message wf-message-ai"><strong>Witflag AI:</strong> I will rank options using global score, camera score, battery score, value score, price, and availability. Start with these top recommendations, then compare tradeoffs.</div>
          <div className="wf-cta-row"><Link className="wf-btn wf-btn-primary" href="/search"><Sparkles size={15} /> Open smart search</Link><Link className="wf-btn wf-btn-ghost" href="/compare">Compare results <ArrowRight size={15} /></Link></div>
        </div>
        <div className="wf-chat-card">
          <div className="wf-chip">Prompt templates</div>
          <div className="wf-prompt-list">
            {prompts.map((prompt) => {
              const Icon = prompt.icon
              return <div className="wf-prompt" key={prompt.text}><Icon size={16} /> {prompt.text}</div>
            })}
          </div>
        </div>
      </section>
      <section className="wf-section">
        <div className="wf-section-head"><div><h2>Assistant recommendations</h2><p>Cards use the same locked product UI as the rest of the platform.</p></div></div>
        <BentoGrid products={products} columns={3} />
      </section>
    </>
  )
}
