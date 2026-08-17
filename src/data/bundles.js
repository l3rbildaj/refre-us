/**
 * Volume pricing tiers.
 *
 * Techs commonly buy a full van/shop load at once (observed up to 10 cylinders),
 * so tiers ladder 1 → 10 with a real per-unit discount at each step. All figures
 * on the product page are derived from `buildTiers()` rather than hardcoded, so
 * the per-unit price, total and savings can never drift out of sync.
 */
export const TIERS = [
  { qty: 1, discount: 0, label: "Single cylinder", note: "One job" },
  { qty: 2, discount: 0.05, label: "2 cylinders", note: "Callback stock" },
  {
    qty: 4,
    discount: 0.1,
    label: "4 cylinders",
    note: "Van stock",
    badge: "Most popular",
  },
  { qty: 6, discount: 0.15, label: "6 cylinders", note: "Crew supply" },
  {
    qty: 10,
    discount: 0.2,
    label: "10 cylinders",
    note: "Shop / pallet",
    badge: "Best value",
  },
];

export const formatUSD = (n) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

/** Parse "$99.99" → 99.99. Returns 0 for missing/unparseable input. */
export function parsePrice(value) {
  if (!value) return 0;
  const n = Number.parseFloat(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

/**
 * Expand TIERS against a unit price into fully-computed rows.
 * Rounds the per-unit price to cents first, then derives total and savings from
 * that rounded figure so the displayed numbers always add up exactly.
 */
export function buildTiers(unitPrice) {
  return TIERS.map((tier) => {
    const unit = Math.round(unitPrice * (1 - tier.discount) * 100) / 100;
    const total = Math.round(unit * tier.qty * 100) / 100;
    const listTotal = Math.round(unitPrice * tier.qty * 100) / 100;
    return {
      ...tier,
      unit,
      total,
      listTotal,
      savings: Math.round((listTotal - total) * 100) / 100,
      percentOff: Math.round(tier.discount * 100),
    };
  });
}
