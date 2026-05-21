'use client'

import { useEffect, useRef, useState } from 'react'
import { smartSearchProducts, safeText, safeNumber, formatPrice, type Product } from '@/lib/products'

type Msg = { role: 'user' | 'ai'; text: string }

const STARTERS = [
  'What is the best camera phone under €500?',
  'Compare Xiaomi vs Samsung gaming performance',
  'Which phone has the best battery life?',
  'Best value flagship right now?'
]

function productName(product: Product) {
  return safeText(product.full_name || [product.brand, product.model].filter(Boolean).join(' '), 'Smartphone')
}

function buildReply(query: string, products: Product[]): string {
  const q = query.toLowerCase()
  if (!products.length) return `I searched for "${query}" but found no matching products. Try a brand, budget, or feature.`
  const sorted = [...products].sort((a, b) => {
    const key = q.includes('camera') ? 'camera_score' : q.includes('battery') ? 'battery_score' : q.includes('gaming') || q.includes('game') ? 'gaming_score' : q.includes('value') || q.includes('budget') ? 'value_score' : 'global_score'
    return (safeNumber(b[key]) || 0) - (safeNumber(a[key]) || 0)
  })
  const top = sorted.slice(0, 3).map((p, i) => `${i + 1}. ${productName(p)} — ${formatPrice(p)} · score ${safeNumber(p.global_score) ?? 'pending'}`)
  return `Here are the best matches for "${query}":\n\n${top.join('\n')}\n\nI ranked them using price, global score, and the strongest decision signal in your question.`
}

export default function AssistantClient() {
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'ai', text: 'Hi! I can help you find the right smartphone using structured product scores.' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])

  async function send(text: string) {
    const clean = text.trim()
    if (!clean || loading) return
    setInput('')
    setMsgs(prev => [...prev, { role: 'user', text: clean }])
    setLoading(true)
    try {
      const response = await smartSearchProducts(clean)
      const products = response.results.map(result => result.product)
      setMsgs(prev => [...prev, { role: 'ai', text: buildReply(clean, products) }])
    } catch {
      setMsgs(prev => [...prev, { role: 'ai', text: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="wf-section">
      <div className="wf-chat-card">
        <div className="wf-chip">Product Assistant</div>
        <h1>Ask the Witflag Assistant</h1>
        <p>Recommendations powered by structured product data.</p>
        {msgs.length <= 1 && <div className="wf-prompt-list">{STARTERS.map(s => <button className="wf-prompt" key={s} onClick={() => send(s)}>{s}</button>)}</div>}
        <div className="wf-chat-stream">
          {msgs.map((m, i) => <div className={m.role === 'ai' ? 'wf-message wf-message-ai' : 'wf-message'} key={`${m.role}-${i}`}>{m.text}</div>)}
          {loading && <div className="wf-message wf-message-ai">Searching product data…</div>}
          <div ref={endRef} />
        </div>
        <div className="wf-searchbar wf-chat-input">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') send(input) }} placeholder="Ask for camera, battery, gaming, value…" disabled={loading} />
          <button onClick={() => send(input)} disabled={loading || !input.trim()}>Send</button>
        </div>
      </div>
    </section>
  )
}
