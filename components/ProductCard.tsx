import Link from 'next/link';
import { ArrowRight, BatteryCharging, Camera, Cpu, ImageIcon } from 'lucide-react';
import { formatPrice, getProductName, Product, safeNumber, safeText } from '@/lib/products';

type ProductCardProps = { product: Product; rank?: number };
type ScoreTone = 'great' | 'good' | 'mid' | 'low' | 'muted';

function scoreTone(value: number | null): ScoreTone {
  if (value === null) return 'muted';
  if (value >= 88) return 'great';
  if (value >= 78) return 'good';
  if (value >= 68) return 'mid';
  return 'low';
}

function ScoreBar({
  value,
  label,
  icon: Icon,
  color = '#22d3ee',
}: {
  value?: string | number | null;
  label: string;
  icon: typeof Camera;
  color?: string;
}) {
  const n = safeNumber(value);
  const width = n === null ? 0 : Math.max(8, Math.min(100, Math.round(n)));

  return (
    <div className="score-bar">
      <div className="score-bar-top">
        <span>
          <Icon size={13} style={{ color }} />
          {label}
        </span>
        <strong className={`score-text ${scoreTone(n)}`}>{n === null ? 'Pending' : Math.round(n)}</strong>
      </div>
      <div className="score-track" aria-hidden="true">
        <div
          className="score-fill"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
          }}
        />
      </div>
    </div>
  );
}

export default function ProductCard({ product, rank }: ProductCardProps) {
  const name = getProductName(product);
  const globalScore = safeNumber(product.global_score);

  return (
    <article className="pcard gring">
      <div className="pcard-img">
        {rank ? <span className="rank-chip">{rank}</span> : null}
        <span className={`score-chip ${scoreTone(globalScore)}`}>
          {globalScore !== null ? Math.round(globalScore) : '--'}
        </span>
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_url} alt={name} />
        ) : (
          <div className="phone-placeholder" aria-label="No product image">
            <ImageIcon size={30} />
          </div>
        )}
      </div>

      <div className="pcard-body">
        <div className="pcard-meta">
          <div className="pcard-brand">{safeText(product.brand, 'Smartphone')}</div>
          <span className="pcard-rank">Global score</span>
        </div>

        <div className="pcard-name line-clamp-2">{name}</div>
        <div className="pcard-price">{formatPrice(product)}</div>

        <div className="pcard-scores">
          <ScoreBar value={product.camera_score} label="Camera" icon={Camera} color="#22d3ee" />
          <ScoreBar value={product.battery_score} label="Battery" icon={BatteryCharging} color="#4ade80" />
          <ScoreBar value={product.gaming_score} label="Gaming" icon={Cpu} color="#fbbf24" />
        </div>

        <p className="pcard-summary line-clamp-2">
          {safeText(product.content_summary_en, 'AI-ready smartphone profile prepared for search, comparison, and recommendations.')}
        </p>

        <div className="pcard-actions">
          {product.slug ? (
            <Link href={`/products/${product.slug}`} className="btn-primary pcard-main-action">
              Details <ArrowRight size={13} />
            </Link>
          ) : null}
          <Link href={`/compare?phones=${product.slug || ''}`} className="btn-ghost pcard-secondary-action">
            Compare
          </Link>
        </div>
      </div>
    </article>
  );
}
