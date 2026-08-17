import { Check } from "lucide-react";
import { refrigerantMeta } from "@/data/refrigerant-meta";
import { parseDesignation } from "@/lib/product";

export default function ProductDescription({ product }) {
  const meta = refrigerantMeta[product.slug] ?? {};
  const designation = parseDesignation(product.product_name);

  if (!meta.description) return null;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-brand-navy">
        About {designation}
      </h2>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
        <p className="text-sm leading-relaxed text-gray-600">
          {meta.description}
        </p>

        {meta.highlights?.length > 0 && (
          <ul className="flex flex-col gap-2.5 rounded-xl bg-gray-50 p-5">
            {meta.highlights.map((point) => (
              <li key={point} className="flex gap-2.5">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-emerald-600">
                  <Check size={9} strokeWidth={4} className="text-emerald-600" />
                </span>
                <span className="text-[13px] leading-snug text-gray-700">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {(meta.gwp || meta.composition) && (
        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-4">
          {meta.gwp && (
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                GWP (AR4)
              </dt>
              <dd className="mt-1 text-lg font-extrabold text-brand-navy">
                {meta.gwp.toLocaleString?.() ?? meta.gwp}
              </dd>
            </div>
          )}
          {meta.safety && (
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                Safety class
              </dt>
              <dd className="mt-1 text-lg font-extrabold text-brand-navy">
                {meta.safety}
              </dd>
            </div>
          )}
          {meta.oil && (
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                Lubricant
              </dt>
              <dd className="mt-1 text-lg font-extrabold text-brand-navy">
                {meta.oil}
              </dd>
            </div>
          )}
          {meta.type && (
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                Class
              </dt>
              <dd className="mt-1 text-lg font-extrabold text-brand-navy">
                {meta.type}
              </dd>
            </div>
          )}
        </dl>
      )}
    </section>
  );
}
