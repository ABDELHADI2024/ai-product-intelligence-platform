import Link from 'next/link';
import { Plus } from 'lucide-react';
import { formatPrice, getProductName, Product, safeText } from '@/lib/products';

type ComparisonProductPickerProps = {
  products: Product[];
  selectedSlugs: string[];
};

export default function ComparisonProductPicker({
  products,
  selectedSlugs,
}: ComparisonProductPickerProps) {
  const selectedSet = new Set(selectedSlugs);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {products.slice(0, 12).map((product) => {
        const slug = product.slug || '';
        const nextSelected = selectedSet.has(slug)
          ? selectedSlugs.filter((item) => item !== slug)
          : [...selectedSlugs, slug].slice(0, 4);

        const href =
          nextSelected.length > 0
            ? `/compare?phones=${encodeURIComponent(nextSelected.join(','))}`
            : '/compare';

        return (
          <Link
            href={href}
            key={product.id}
            className={`group rounded-[1.75rem] border p-4 transition hover:-translate-y-1 ${
              selectedSet.has(slug)
                ? 'border-cyan-300/60 bg-cyan-300/10'
                : 'border-white/10 bg-white/[0.04] hover:border-cyan-300/30'
            }`}
          >
            <div className="flex h-36 items-center justify-center rounded-3xl bg-slate-950/80 p-4">
              {product.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image_url}
                  alt={getProductName(product)}
                  className="max-h-full object-contain transition group-hover:scale-105"
                />
              ) : (
                <Plus className="h-8 w-8 text-slate-600" />
              )}
            </div>

            <h3 className="mt-4 line-clamp-2 font-bold text-white">
              {getProductName(product)}
            </h3>

            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-slate-400">{safeText(product.brand)}</span>
              <span className="font-semibold text-cyan-200">{formatPrice(product)}</span>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              {selectedSet.has(slug) ? 'Selected for comparison' : 'Click to compare'}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
