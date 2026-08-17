"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import products from "@/data/products.json";
import { refrigerantMeta, categories } from "@/data/refrigerant-meta";
import ProductCard from "@/components/ProductCard";

export default function ProductGrid() {
  const [active, setActive] = useState("All");

  const visible = useMemo(() => {
    if (active === "All") return products;
    return products.filter((p) => refrigerantMeta[p.slug]?.category === active);
  }, [active]);

  return (
    <section id="catalog" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight text-brand-navy sm:text-5xl">
            Shop refrigerants
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-gray-500">
            Every cylinder ships sealed and factory-direct. Filter by the system
            you&apos;re charging.
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex shrink-0 items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-cta hover:underline"
        >
          View full catalogue
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              active === category
                ? "bg-brand-navy text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
