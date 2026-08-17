import { refrigerantMeta } from "@/data/refrigerant-meta";

/**
 * Product names follow "R-410A Refrigerant 25 lb" (spacing around the unit
 * varies, e.g. "25LB"), so the designation and net weight are derived from the
 * name rather than duplicated into another data file.
 */
export function parseDesignation(name = "") {
  const match = name.match(/^(R-?[0-9]+[A-Za-z]*)/);
  return match ? match[1].toUpperCase() : name.split(" ")[0];
}

export function parseWeight(name = "") {
  const match = name.match(/(\d+)\s*lb/i);
  return match ? `${match[1]} lb` : null;
}

/** Net weight as a number, for sorting. Returns 0 when absent. */
export function parseWeightLb(name = "") {
  const match = name.match(/(\d+)\s*lb/i);
  return match ? Number(match[1]) : 0;
}

/** Assemble the spec rows shown on the product page. Omits anything unknown. */
export function buildSpecs(product) {
  const meta = refrigerantMeta[product.slug] ?? {};
  const weight = parseWeight(product.product_name);

  return [
    { label: "Refrigerant", value: parseDesignation(product.product_name) },
    { label: "Net weight", value: weight },
    { label: "Composition", value: meta.composition },
    { label: "Chemical class", value: meta.type },
    { label: "ASHRAE safety group", value: meta.safety },
    { label: "GWP (AR4, 100-yr)", value: meta.gwp?.toLocaleString?.() ?? meta.gwp },
    { label: "Compatible lubricant", value: meta.oil },
    {
      label: "Replaces",
      value: meta.replaces === "—" ? null : meta.replaces,
    },
    { label: "Typical application", value: meta.application },
    { label: "System category", value: meta.category },
    { label: "Cylinder", value: "Disposable, DOT-certified" },
    { label: "Purity", value: "AHRI 700 compliant" },
  ].filter((row) => Boolean(row.value));
}
