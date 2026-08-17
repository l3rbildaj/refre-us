import Image from "next/image";
import Link from "next/link";
import { refrigerantMeta } from "@/data/refrigerant-meta";
import { parseWeight } from "@/lib/product";

/**
 * Single catalogue card, shared by the homepage grid, the catalogue page and
 * the product-page cross-sell.
 *
 * `compact` drops the application line and badges for tighter contexts.
 */
export default function ProductCard({ product, compact = false }) {
  const meta = refrigerantMeta[product.slug] ?? {};
  const hasCompare = Boolean(product.compare_at_price);
  const weight = parseWeight(product.product_name);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-cyan/50 hover:shadow-lg"
    >
      {/* White (not gray) tile: the source PNGs have opaque white backgrounds. */}
      <div className="relative flex items-center justify-center bg-white p-6">
        {/* z-10: on hover, group-hover:scale-105 puts the image's own
            transform into a stacking context, which otherwise lets it paint
            over these absolutely-positioned badges despite coming first in
            the DOM. */}
        {!compact && product.discount && (
          <span className="absolute left-3 top-3 z-10 rounded-md bg-brand-amber px-2 py-1 text-[11px] font-bold text-white">
            −{product.discount}
          </span>
        )}
        {!compact && meta.safety && (
          <span
            className={`absolute right-3 top-3 z-10 rounded-md px-2 py-1 text-[11px] font-bold ${
              meta.safety === "A2L"
                ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                : "bg-gray-100 text-gray-600"
            }`}
            title={
              meta.safety === "A2L"
                ? "ASHRAE A2L — mildly flammable, requires A2L-rated equipment"
                : "ASHRAE A1 — lower toxicity, non-flammable"
            }
          >
            {meta.safety}
          </span>
        )}
        <Image
          src={product.local_image}
          alt={product.product_name}
          width={260}
          height={260}
          className={`w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${
            compact ? "h-36" : "h-44"
          }`}
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        {meta.category && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-cyan">
            {meta.category}
          </span>
        )}
        <h3 className="mt-1.5 text-sm font-bold leading-snug text-brand-navy">
          {product.product_name}
        </h3>
        {!compact && meta.application && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-gray-500">
            {meta.application}
          </p>
        )}

        <div className="mt-auto flex items-baseline gap-2 pt-4">
          <span className="text-lg font-extrabold text-brand-navy">
            {product.price}
          </span>
          {!compact && hasCompare && (
            <span className="text-sm text-gray-400 line-through">
              {product.compare_at_price}
            </span>
          )}
          {!compact && weight && (
            <span className="ml-auto text-[11px] font-semibold text-gray-400">
              {weight}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
