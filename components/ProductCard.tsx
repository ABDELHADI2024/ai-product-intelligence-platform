import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { formatPrice, getProductName, Product, safeNumber, safeText } from '@/lib/products';
import ScoreRing from './ScoreRing';

type ProductCardProps = { product: Product };

function ScoreCell({
  value,
  label,
  color = '#3b82f6',
}: {
  value?: string | number | null;
  label: string;
  color?: string;
}) {
  const n = safeNumber(value);
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-sm font-bold" style={{ color }}>
        {n === null ? '—' : Math.round(n)}
      </div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const name = getProductName(product);

  return (
    <article className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-300">
      {/* Image Section */}
      <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200/50 text-xs font-medium text-gray-700">
          <Sparkles size={12} className="text-blue-600" /> AI Scored
        </div>
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={name}
            className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
            No image
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Brand & Name */}
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {safeText(product.brand, 'Smartphone')}
          </p>
          <h3 className="font-bold text-gray-900 line-clamp-2 text-sm">
            {name}
          </h3>
          <p className="text-lg font-bold text-gray-900">
            {formatPrice(product)}
          </p>
        </div>

        {/* Summary */}
        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
          {safeText(product.content_summary_en, 'AI-scored product profile')}
        </p>

        {/* Score Grid */}
        <div className="grid grid-cols-3 gap-2 py-2 border-t border-gray-100">
          <ScoreCell value={product.camera_score} label="Camera" color="#0ea5e9" />
          <ScoreCell value={product.battery_score} label="Battery" color="#8b5cf6" />
          <ScoreCell value={product.gaming_score} label="Gaming" color="#f59e0b" />
        </div>

        {/* Global Score */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs font-medium text-gray-600">Overall Score</span>
          <ScoreRing value={product.global_score} label="" size="xs" />
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {product.slug ? (
            <Link
              href={`/products/${product.slug}`}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors duration-200"
            >
              View <ArrowRight size={14} />
            </Link>
          ) : null}
          <Link
            href={`/compare?phones=${product.slug || ''}`}
            className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Compare
          </Link>
        </div>
      </div>
    </article>
  );
}
