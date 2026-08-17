import { Check } from "lucide-react";
import { refrigerantMeta } from "@/data/refrigerant-meta";
import { parseDesignation } from "@/lib/product";

/**
 * Equipment this grade is typically charged into, by system category.
 * Keeps the copy specific enough to be useful to a tech scoping a job.
 */
const systemsByCategory = {
  "Residential A/C": [
    "Split-system air conditioners",
    "Air-source heat pumps",
    "Ductless mini-split and multi-split systems",
    "Packaged rooftop units (light commercial)",
  ],
  "Commercial Refrigeration": [
    "Walk-in coolers and freezers",
    "Reach-in display cases",
    "Supermarket rack systems",
    "Ice machines and blast chillers",
  ],
  Automotive: [
    "Passenger vehicle A/C systems",
    "Light truck and van A/C",
    "Fleet and service-bay recharging",
    "Mobile refrigeration units",
  ],
  "Legacy / Retrofit": [
    "Existing R-22 residential split systems",
    "Legacy commercial A/C and heat pumps",
    "Direct-expansion retrofit conversions",
    "Service work on pre-2010 equipment",
  ],
};

export default function CompatibleSystems({ product }) {
  const meta = refrigerantMeta[product.slug] ?? {};
  const systems = systemsByCategory[meta.category];
  const designation = parseDesignation(product.product_name);

  if (!systems) return null;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-brand-navy">
        Where {designation} is used
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        {meta.application}. Always confirm the grade against the equipment
        nameplate before charging.
      </p>

      <ul className="mt-5 flex flex-col gap-3">
        {systems.map((system) => (
          <li key={system} className="flex items-center gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-emerald-600">
              <Check size={11} strokeWidth={3.5} className="text-emerald-600" />
            </span>
            <span className="text-sm text-gray-700">{system}</span>
          </li>
        ))}
      </ul>

      {meta.safety === "A2L" && (
        <p className="mt-5 rounded-xl bg-amber-50 p-3.5 text-xs leading-relaxed text-amber-900 ring-1 ring-amber-200">
          <strong>A2L — mildly flammable.</strong> Only charge into equipment
          rated for A2L refrigerants, with leak detection and handling per
          ASHRAE 15 and local code. Not a drop-in for A1 systems.
        </p>
      )}
    </section>
  );
}
