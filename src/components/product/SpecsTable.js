import { buildSpecs } from "@/lib/product";

export default function SpecsTable({ product }) {
  const specs = buildSpecs(product);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-brand-navy">
        Specifications
      </h2>

      <dl className="mt-5 divide-y divide-gray-100">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3"
          >
            <dt className="text-sm text-gray-500">{spec.label}</dt>
            <dd className="text-sm font-semibold text-brand-navy">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
