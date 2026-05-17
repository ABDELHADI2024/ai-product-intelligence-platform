import Link from 'next/link';
import MetricBox from '@/components/MetricBox';
import ScoreRing from '@/components/ScoreRing';
import { formatPrice, getProductBySlug, safeText, splitList } from '@/lib/products';

export const dynamic = 'force-dynamic';

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <main className="page-hero">
        <span className="eyebrow">Product not found</span>
        <h1>This smartphone does not exist yet.</h1>
        <Link className="primary-button" href="/products">Back to products</Link>
      </main>
    );
  }

  const pros = splitList(product.pros_en);
  const cons = splitList(product.cons_en);
  const name = safeText(product.full_name, product.model || 'Smartphone');

  return (
    <main>
      <section className="product-hero">
        <div className="product-media-panel">
          <div className="image-stage">
            {product.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.image_url} alt={name} />
            ) : (
              <span>📱</span>
            )}
          </div>
        </div>

        <div className="product-info-panel">
          <div className="breadcrumb">Home / Smartphones / {safeText(product.brand, 'Brand')}</div>
          <span className="eyebrow">{safeText(product.brand, 'Smartphone')}</span>
          <h1>{name}</h1>
          <div className="product-price">{formatPrice(product)}</div>
          <p>{safeText(product.content_summary_en, 'AI-ready smartphone profile with structured specs, scores and buying intelligence.')}</p>

          <div className="product-actions">
            <Link href="/compare" className="primary-button">Add to compare</Link>
            <Link href="/assistant" className="secondary-button">Ask assistant</Link>
          </div>
        </div>

        <div className="key-spec-card">
          <h3>Key specifications</h3>
          <MetricBox label="Display" value={product.screen_size} helper={product.screen_type} />
          <MetricBox label="Chipset" value={product.chipset} helper={`${safeText(product.ram, 'RAM')} · ${safeText(product.storage, 'Storage')}`} />
          <MetricBox label="Battery" value={product.battery_mah ? `${product.battery_mah}mAh` : null} helper="Battery profile" />
          <MetricBox label="Camera" value={product.rear_camera} helper={`Score ${safeText(product.camera_score, '—')}`} />
        </div>
      </section>

      <section className="section-shell detail-grid">
        <div className="wide-card">
          <h2>AI scores breakdown</h2>
          <div className="score-row">
            <ScoreRing value={product.camera_score} label="Camera" />
            <ScoreRing value={product.battery_score} label="Battery" />
            <ScoreRing value={product.display_score} label="Display" />
            <ScoreRing value={product.gaming_score} label="Gaming" />
            <ScoreRing value={product.value_score} label="Value" />
            <ScoreRing value={product.global_score} label="Global" />
          </div>
        </div>

        <div className="verdict-card">
          <h2>AI verdict</h2>
          <p>{safeText(product.expert_opinion_en, 'Witflag evaluates this smartphone using camera, battery, display, gaming and value signals.')}</p>
        </div>

        <div className="list-card positive">
          <h3>Pros</h3>
          <ul>{(pros.length ? pros : ['Strong AI-ready profile']).map((item) => <li key={item}>✓ {item}</li>)}</ul>
        </div>

        <div className="list-card negative">
          <h3>Cons</h3>
          <ul>{(cons.length ? cons : ['Some specs may need validation']).map((item) => <li key={item}>• {item}</li>)}</ul>
        </div>
      </section>
    </main>
  );
}
