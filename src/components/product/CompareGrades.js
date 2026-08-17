import Link from "next/link";
import products from "@/data/products.json";
import { refrigerantMeta } from "@/data/refrigerant-meta";
import { parseDesignation, parseWeight } from "@/lib/product";

/**
 * Side-by-side against the other grades a tech would realistically weigh for the
 * same job — i.e. others in the same system category. Hidden when this grade has
 * no in-category peers, rather than padding the table with irrelevant rows.
 */
export default function CompareGrades({ product }) {
  const category = refrigerantMeta[product.slug]?.category;
  if (!category) return null;

  const peers = products.filter(
    (p) => refrigerantMeta[p.slug]?.category === category
  );
  if (peers.length < 2) return null;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-brand-navy">
        Compare {category.toLowerCase()} grades
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Other grades we stock for the same class of equipment.
      </p>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-brand-navy">
              <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-brand-navy">
                Grade
              </th>
              <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-brand-navy">
                Class
              </th>
              <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-brand-navy">
                Safety
              </th>
              <th className="py-3 pr-4 text-xs font-bold uppercase tracking-wider text-brand-navy">
                Size
              </th>
              <th className="py-3 text-xs font-bold uppercase tracking-wider text-brand-navy">
                From
              </th>
            </tr>
          </thead>
          <tbody>
            {peers.map((peer) => {
              const meta = refrigerantMeta[peer.slug] ?? {};
              const isCurrent = peer.slug === product.slug;

              return (
                <tr
                  key={peer.slug}
                  className={`border-b border-gray-100 ${
                    isCurrent ? "bg-brand-cyan/5" : ""
                  }`}
                >
                  <td className="py-3 pr-4">
                    {isCurrent ? (
                      <span className="text-sm font-bold text-brand-navy">
                        {parseDesignation(peer.product_name)}
                        <span className="ml-2 rounded bg-brand-cyan px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                          Viewing
                        </span>
                      </span>
                    ) : (
                      <Link
                        href={`/products/${peer.slug}`}
                        className="text-sm font-bold text-brand-navy underline-offset-4 hover:text-brand-cyan hover:underline"
                      >
                        {parseDesignation(peer.product_name)}
                      </Link>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-sm text-gray-600">
                    {meta.type ?? "—"}
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[11px] font-bold ${
                        meta.safety === "A2L"
                          ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {meta.safety ?? "—"}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-sm text-gray-600">
                    {parseWeight(peer.product_name) ?? "—"}
                  </td>
                  <td className="py-3 text-sm font-bold text-brand-navy">
                    {peer.price}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
