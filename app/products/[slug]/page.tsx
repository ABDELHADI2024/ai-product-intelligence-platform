import Link from 'next/link'
import { ArrowRight, BatteryCharging, Camera, Cpu, MonitorSmartphone, Scale, Sparkles, Zap } from 'lucide-react'
import { formatPrice, getProductBySlug, getProductName, Product, safeNumber, safeText, scoreLabel } from '@/lib/products'
import ScoreRing from '@/components/ScoreRing'
import { notFound } from 'next/navigation'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

function Spec({ label, value, icon: Icon }: { label: string; value: any; icon: any }) {
  return <div className="wf-spec"><Icon size={18} /><span>{label}</span><strong>{safeText(value)}</strong></div>
}

function ScoreRow({ label, value }: { label: string; value?: Product[keyof Product] }) {
  const score = safeNumber(value)
  return (
    <tr>
      <td>{label}</td>
      <td>{score === null ? '—' : Math.round(score)}</td>
      <td>{scoreLabel(score)}</td>
    </tr>
  )
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()
  const name = getProductName(product)

  return (
    <>
      <section className="wf-panel wf-featured" style={{ marginTop: 16 }}>
        <div className="wf-featured-copy">
          <div className="wf-chip"><Sparkles size={14} /> AI product profile</div>
          <h2>{name}</h2>
          <Link className="wf-brand-link" href={`/brands/${String(product.brand || 'smartphone').toLowerCase()}`}>{safeText(product.brand, 'Smartphone')}</Link>
          <div className="wf-price">{formatPrice(product)}</div>
          <p>{safeText(product.content_summary_en, 'A structured smartphone profile ready for comparison, search, and recommendation workflows.')}</p>
          <div className="wf-cta-row">
            <Link className="wf-btn wf-btn-primary" href={`/compare?add=${product.slug || slug}`}>Compare device <Scale size={15} /></Link>
            <Link className="wf-btn wf-btn-ghost" href="/assistant">Ask AI assistant <ArrowRight size={15} /></Link>
          </div>
        </div>
        <div className="wf-featured-visual">
          <div className="wf-orbit" />
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="wf-phone-img" src={product.image_url} alt={name} />
          ) : <div className="wf-phone-placeholder" />}
          <div className="wf-score-block"><ScoreRing value={product.global_score} /><div className="wf-score-label"><strong>Global Score</strong><span>{scoreLabel(product.global_score)}</span></div></div>
        </div>
      </section>

      <section className="wf-section">
        <div className="wf-section-head"><div><h2>Decision signals</h2><p>Structured scoring foundation for search, ranking, and recommendations.</p></div></div>
        <table className="wf-table">
          <thead><tr><th>Signal</th><th>Score</th><th>Interpretation</th></tr></thead>
          <tbody>
            <ScoreRow label="Global" value={product.global_score} />
            <ScoreRow label="Camera" value={product.camera_score} />
            <ScoreRow label="Battery" value={product.battery_score} />
            <ScoreRow label="Gaming" value={product.gaming_score} />
            <ScoreRow label="Performance" value={product.performance_score} />
            <ScoreRow label="Value" value={product.value_score} />
          </tbody>
        </table>
      </section>

      <section className="wf-section">
        <div className="wf-section-head"><div><h2>Core specs</h2><p>Fast product facts for SEO, AEO, and AI retrieval.</p></div></div>
        <div className="wf-spec-grid">
          <Spec label="Chipset" value={product.chipset} icon={Cpu} />
          <Spec label="Display" value={product.screen_size} icon={MonitorSmartphone} />
          <Spec label="Battery" value={product.battery_mah ? `${product.battery_mah} mAh` : null} icon={BatteryCharging} />
          <Spec label="Rear camera" value={product.rear_camera} icon={Camera} />
        </div>
      </section>
    </>
  )
}
