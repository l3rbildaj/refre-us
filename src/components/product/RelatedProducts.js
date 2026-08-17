import Link from "next/link";
import { ArrowRight } from "lucide-react";
import products from "@/data/products.json";
import { refrigerantMeta } from "@/data/refrigerant-meta";
import ProductCard from "@/components/ProductCard";

/**
 * Cross-sell: prefer same-category grades (a tech sourcing an R-22 retrofit is
 * usually comparing across the retrofit blends), then backfill to fill the row.
 */
export default function RelatedProducts({ product }) {
  const category = refrigerantMeta[product.slug]?.category;
  const others = products.filter((p) => p.slug !== product.slug);
  const sameCategory = others.filter(
    (p) => refrigerantMeta[p.slug]?.category === category
  );
  const related = [
    ...sameCategory,
    ...others.filter((p) => !sameCategory.includes(p)),
  ].slice(0, 4);

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-brand-navy">
          Technicians also order
        </h2>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-cta hover:underline"
        >
          View full catalogue
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {related.map((item) => (
          <ProductCard key={item.slug} product={item} compact />
        ))}
      </div>
    </section>
  );
}
