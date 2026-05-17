import { Product, formatPrice, safeText } from '@/lib/products';

type CompareTableProps = {
  products: Product[];
};

const rows = [
  ['Global Score', 'global_score'],
  ['Camera', 'camera_score'],
  ['Battery', 'battery_score'],
  ['Display', 'display_score'],
  ['Gaming', 'gaming_score'],
  ['Value', 'value_score'],
  ['Price', 'price'],
  ['Screen', 'screen_size'],
  ['Chipset', 'chipset'],
  ['RAM', 'ram'],
  ['Storage', 'storage'],
  ['Battery', 'battery_mah'],
];

export default function CompareTable({ products }: CompareTableProps) {
  return (
    <div className="compare-table-wrap">
      <table className="compare-table">
        <thead>
          <tr>
            <th>Metric</th>
            {products.map((product) => (
              <th key={product.id}>
                <div className="compare-product-head">
                  {product.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={product.image_url} alt={safeText(product.full_name, 'Phone')} />
                  ) : null}
                  <span>{safeText(product.full_name, product.model || 'Phone')}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, key]) => (
            <tr key={label + key}>
              <td>{label}</td>
              {products.map((product) => (
                <td key={product.id + key}>
                  {key === 'price'
                    ? formatPrice(product)
                    : key === 'battery_mah'
                    ? `${safeText(product.battery_mah, '—')}mAh`
                    : safeText(product[key as keyof Product], '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
