"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import products from "@/data/products.json";
import { refrigerantMeta, categories } from "@/data/refrigerant-meta";
import { parseWeightLb } from "@/lib/product";
import ProductCard from "@/components/ProductCard";

const SAFETY_CLASSES = ["All", "A1", "A2L"];

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "az", label: "Name A–Z" },
  { id: "size-desc", label: "Cylinder size: large to small" },
  { id: "size-asc", label: "Cylinder size: small to large" },
];

/** Count of products matching a category, for the sidebar counts. */
const countFor = (category) =>
  category === "All"
    ? products.length
    : products.filter((p) => refrigerantMeta[p.slug]?.category === category)
        .length;

export default function CatalogueBrowser({ initialCategory }) {
  // Validated against the known list so a bad ?category= falls back to "All".
  const [category, setCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : "All"
  );
  const [safety, setSafety] = useState("All");
  const [sort, setSort] = useState("featured");
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = products.filter((p) => {
      const meta = refrigerantMeta[p.slug] ?? {};
      if (category !== "All" && meta.category !== category) return false;
      if (safety !== "All" && meta.safety !== safety) return false;
      if (
        q &&
        !p.product_name.toLowerCase().includes(q) &&
        !(meta.application ?? "").toLowerCase().includes(q) &&
        !(meta.category ?? "").toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });

    const sorted = [...filtered];
    if (sort === "az") {
      sorted.sort((a, b) => a.product_name.localeCompare(b.product_name));
    } else if (sort === "size-desc") {
      sorted.sort(
        (a, b) => parseWeightLb(b.product_name) - parseWeightLb(a.product_name)
      );
    } else if (sort === "size-asc") {
      sorted.sort(
        (a, b) => parseWeightLb(a.product_name) - parseWeightLb(b.product_name)
      );
    }
    return sorted;
  }, [category, safety, sort, query]);

  const isFiltered = category !== "All" || safety !== "All" || query.trim();

  const reset = () => {
    setCategory("All");
    setSafety("All");
    setQuery("");
  };

  const filterPanel = (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-navy">
          System type
        </h2>
        <ul className="flex flex-col gap-1">
          {categories.map((item) => (
            <li key={item}>
              <button
                onClick={() => setCategory(item)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                  category === item
                    ? "bg-brand-navy font-semibold text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item}
                <span
                  className={
                    category === item ? "text-white/60" : "text-gray-400"
                  }
                >
                  {countFor(item)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-navy">
          Safety class
        </h2>
        <div className="flex flex-wrap gap-2">
          {SAFETY_CLASSES.map((item) => (
            <button
              key={item}
              onClick={() => setSafety(item)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                safety === item
                  ? "bg-brand-navy text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-gray-500">
          A2L grades are mildly flammable and need A2L-rated equipment. A1 are
          non-flammable.
        </p>
      </div>

      {isFiltered && (
        <button
          onClick={reset}
          className="flex items-center gap-1.5 self-start text-sm font-semibold text-brand-cyan hover:underline"
        >
          <X size={15} />
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-12">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">{filterPanel}</aside>

        <div>
          {/* Search + sort */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by grade, e.g. 410A or retrofit"
                aria-label="Search refrigerants"
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-brand-navy outline-none transition-colors placeholder:text-gray-400 focus:border-brand-cyan"
              />
            </div>

            <label className="sr-only" htmlFor="catalogue-sort">
              Sort products
            </label>
            <select
              id="catalogue-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-brand-navy outline-none focus:border-brand-cyan"
            >
              {SORTS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-brand-navy lg:hidden"
              aria-expanded={filtersOpen}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>

          {/* Mobile filter panel */}
          {filtersOpen && (
            <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5 lg:hidden">
              {filterPanel}
            </div>
          )}

          <p className="mt-5 text-sm text-gray-500">
            Showing <strong className="text-brand-navy">{visible.length}</strong>{" "}
            of {products.length} refrigerants
            {category !== "All" && ` in ${category}`}
          </p>

          {visible.length > 0 ? (
            <div className="mt-5 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
              <p className="font-display text-2xl font-extrabold uppercase text-brand-navy">
                No matches
              </p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
                Nothing matches those filters. Try a different grade, or clear
                the filters to see all {products.length} refrigerants.
              </p>
              <button
                onClick={reset}
                className="mt-5 rounded-lg bg-brand-cta px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-cta-hover"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
