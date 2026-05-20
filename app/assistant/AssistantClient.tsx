'use client'
import { useState, useRef, useEffect } from 'react'
import { smartSearchProducts, safeText, safeNumber, formatPrice, type Product } from '@/lib/products'

type Msg = { role: 'user' | 'ai'; text: string }

const STARTERS = [
  'What is the best camera phone under €500?',
  'Compare Xiaomi vs Samsung gaming performance',
  'Which phone has the best battery life?',
  'Best foldable phone right now?',
]

function buildReply(query: string, products: Product[]): string {
  const q = query.toLowerCase()
  if (!products.length) {
    return `I searched for "${query}" but found no matching products in the catalog. Try different keywords like a brand name or feature.`
  }
  const top = products.slice(0, 3)
  const names = top.map(p => {
    const n = safeText(p.full_name || p.model)
    const score = safeNumber(p.global_score)
    const price = formatPrice(p.price_eur)
    return `**${n}** (${price}${score ? ` · score ${score}` : ''})`
  })

  if (q.includes('camera')) {
    const sorted = [...products].sort((a, b) => (safeNumber(b.camera_score) ?? 0) - (safeNumber(a.camera_score) ?? 0))
    const best = sorted[0]
    return `For camera quality, **${safeText(best.full_name || best.model)}** tops the list with a camera score of ${safeNumber(best.camera_score)}. Other strong options: ${names.slice(0, 2).join(', ')}.`
  }
  if (q.includes('battery')) {
    const sorted = [...products].sort((a, b) => (safeNumber(b.battery_score) ?? 0) - (safeNumber(a.battery_score) ?? 0))
    const best = sorted[0]
    return `For battery life, **${safeText(best.full_name || best.model)}** scores highest at ${safeNumber(best.battery_score)}. Also consider: ${names.slice(1, 3).join(', ')}.`
  }
  if (q.includes('gaming') || q.includes('game')) {
    const sorted = [...products].sort((a, b) => (safeNumber(b.gaming_score) ?? 0) - (safeNumber(a.gaming_score) ?? 0))
    const best = sorted[0]
    return `Top gaming phone: **${safeText(best.full_name || best.model)}** (gaming score: ${safeNumber(best.gaming_score)}). Alternatives: ${names.slice(1, 3).join(', ')}.`
  }

  return `I found ${products.length} products matching "${query}". Top picks:\n\n${names.join('\n')}\n\nWould you like to compare any of these?`
}

export default function AssistantClient() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'ai', text: 'Hi! I can help you find the right smartphone based on scores, budget, camera, battery, or gaming. What are you looking for?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])

  const send = async (text: string) => {
    if (!text.trim() || loading) return
    setInput('')
    setMsgs(prev => [...prev, { role: 'user', text }])
    setLoading(true)

    try {
      const searchResponse = await smartSearchProducts(text)
      const products = searchResponse.results.map((result) => result.product)
      const reply = buildReply(text, products)
      setMsgs(prev => [...prev, { role: 'ai', text: reply }])
    } catch {
      setMsgs(prev => [...prev, { role: 'ai', text: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-sm">
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>Product Assistant</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 8 }}>
          Ask the <span style={{ color: 'var(--accent)' }}>Witflag</span> Assistant
        </h1>
        <p style={{ color: 'var(--text-2)', fontSize: 14 }}>
          Recommendations powered by structured product data — not guesswork.
        </p>
      </div>

      {/* Starter pills */}
      {msgs.length <= 1 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {STARTERS.map(s => (
            <button
              key={s}
              className="chip"
              style={{ cursor: 'pointer', padding: '6px 14px' }}
              onClick={() => send(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="chat-wrap">
        <div className="chat-messages">
          {msgs.map((m, i) => (
            <div key={i} className={`chat-msg${m.role === 'user' ? ' user' : ''}`}>
              <div className={`chat-avatar${m.role === 'ai' ? ' ai' : ' user-av'}`}>
                {m.role === 'ai' ? '🤖' : '👤'}
              </div>
              <div className={`chat-bubble ${m.role === 'ai' ? 'ai' : 'user'}`}
                dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }}
              />
            </div>
          ))}
          {loading && (
            <div className="chat-msg">
              <div className="chat-avatar ai">🤖</div>
              <div className="chat-bubble ai" style={{ color: 'var(--text-3)' }}>Searching product data…</div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="chat-input-row">
          <input
            type="text"
            className="chat-input"
            placeholder="Ask me about smartphones…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send(input)}
            disabled={loading}
          />
          <button className="btn btn-primary" onClick={() => send(input)} disabled={loading || !input.trim()}>
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
