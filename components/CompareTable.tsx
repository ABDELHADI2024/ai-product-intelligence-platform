import { Product, formatPrice, safeText, safeNumber } from '@/lib/products';

type CompareTableProps = { products: Product[] };

const scoreRows: [string, keyof Product][] = [
  ['Global Score', 'global_score'],
  ['Camera', 'camera_score'],
  ['Battery', 'battery_score'],
  ['Display', 'display_score'],
  ['Gaming', 'gaming_score'],
  ['Value', 'value_score'],
];

const specRows: [string, keyof Product | 'price'][] = [
  ['Price', 'price'],
  ['Screen', 'screen_size'],
  ['Chipset', 'chipset'],
  ['RAM', 'ram'],
  ['Storage', 'storage'],
  ['Battery', 'battery_mah'],
  ['Rear Camera', 'rear_camera'],
  ['Front Camera', 'front_camera'],
  ['Refresh Rate', 'refresh_rate'],
];

function getWinnerIndex(products: Product[], key: keyof Product): number {
  let best = -1;
  let bestVal = -Infinity;
  products.forEach((p, i) => {
    const v = safeNumber(p[key], 0);
    if (v > bestVal) { bestVal = v; best = i; }
  });
  return best;
}

export default function CompareTable({ products }: CompareTableProps) {
  if (products.length === 0) return null;

  return (
    <div className="compare-table-wrap">
      <table className="compare-table">
        <thead>
          <tr>
            <th>Specification</th>
            {products.map((p) => (
              <th key={p.id}>
                <div className="compare-product-head">
                  {p.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image_url} alt={safeText(p.full_name, 'Phone')} />
                  ) : (
                    <span style={{ fontSize: 32 }}>📱</span>
                  )}
                  <span className="compare-product-name">{safeText(p.full_name, p.model || 'Phone')}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Score rows */}
          {scoreRows.map(([label, key]) => {
            const winnerIdx = getWinnerIndex(products, key);
            return (
              <tr key={label}>
                <td>{label}</td>
                {products.map((p, i) => {
                  const val = safeNumber(p[key], 0);
                  const isWinner = i === winnerIdx && val > 0;
                  return (
                    <td key={p.id + key} className={`score-cell${isWinner ? ' winner-cell' : ''}`}>
                      {val > 0 ? Math.round(val) : '—'}
                      {isWinner ? ' ↑' : ''}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          {/* Spec rows */}
          {specRows.map(([label, key]) => (
            <tr key={label}>
              <td>{label}</td>
              {products.map((p) => (
                <td key={p.id + key}>
                  {key === 'price'
                    ? formatPrice(p)
                    : key === 'battery_mah'
                    ? `${safeText(p.battery_mah, '—')}mAh`
                    : safeText(p[key as keyof Product], '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
