"use client";

import { useState, useEffect, useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { Check, Truck, Lock, ShieldCheck, BadgeCheck } from "lucide-react";
import { track } from "@vercel/analytics";
import { buildTiers, parsePrice, formatUSD } from "@/data/bundles";
import { getCheckoutUrl } from "@/data/checkoutLinks";
import { refrigerantMeta } from "@/data/refrigerant-meta";
import { parseDesignation } from "@/lib/product";
import { trackAddToCart } from "@/lib/pixel";
import BundlePicker from "./BundlePicker";
import PaymentIcons from "./PaymentIcons";

const benefits = [
  "Free US shipping — no order minimum",
  "90-day money-back guarantee",
  "Sealed, DOT-certified disposable cylinder",
  "AHRI 700 purity specification",
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function addBusinessDays(date, days) {
  const result = new Date(date);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay();
    if (day !== 0 && day !== 6) added += 1;
  }
  return result;
}

/**
 * Delivery estimate is client-only: the server and client can straddle
 * midnight, which would otherwise hydrate a mismatched date. The server
 * snapshot returns null so the estimate simply appears after mount.
 */
const subscribeNever = () => () => {};
const getDeliveryEstimate = () => {
  const d = addBusinessDays(new Date(), 5);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}`;
};

export default function ProductBuyBox({ product, onQtyChange }) {
  const [qty, setQty] = useState(4); // default to the "Most popular" tier
  const deliveryDate = useSyncExternalStore(
    subscribeNever,
    getDeliveryEstimate,
    () => null
  );

  const unitPrice = parsePrice(product.price);
  const tiers = useMemo(() => buildTiers(unitPrice), [unitPrice]);
  const selected = tiers.find((t) => t.qty === qty) ?? tiers[0];
  const meta = refrigerantMeta[product.slug] ?? {};

  useEffect(() => {
    onQtyChange?.(selected);
  }, [selected, onQtyChange]);

  const handleChange = (nextQty) => {
    setQty(nextQty);
    track("bundle_selected", { product: product.slug, qty: nextQty });
  };

  return (
    <div className="flex flex-col gap-5 p-5 sm:p-6">
      <nav className="text-[11px] font-medium tracking-tight text-gray-400">
        <Link href="/" className="hover:text-brand-navy">Home</Link>
        {" / "}
        <Link href="/#catalog" className="hover:text-brand-navy">Refrigerants</Link>
        {" / "}
        <span className="text-brand-navy">{parseDesignation(product.product_name)}</span>
      </nav>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {meta.category && (
            <span className="rounded-full bg-brand-navy/5 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-cyan">
              {meta.category}
            </span>
          )}
          {meta.safety && (
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                meta.safety === "A2L"
                  ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              ASHRAE {meta.safety}
            </span>
          )}
        </div>

        <h1 className="font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-brand-navy sm:text-5xl">
          {product.product_name}
        </h1>

        {meta.application && (
          <p className="text-sm leading-relaxed text-gray-600">
            {meta.application}. Sealed factory-direct cylinder, shipped free
            anywhere in the continental US.
          </p>
        )}
      </div>

      {/* Price reflects the selected tier so the anchor updates as they ladder up */}
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-4xl font-extrabold tracking-tight text-brand-navy">
          {formatUSD(selected.unit)}
        </span>
        <span className="text-sm font-semibold text-gray-500">per cylinder</span>
        {selected.savings > 0 && (
          <span className="rounded bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
            {selected.percentOff}% off — save {formatUSD(selected.savings)}
          </span>
        )}
      </div>

      <ul className="flex flex-col gap-2">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-center gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-emerald-600">
              <Check size={11} strokeWidth={3.5} className="text-emerald-600" />
            </span>
            <span className="text-sm text-gray-700">{benefit}</span>
          </li>
        ))}
      </ul>

      <BundlePicker tiers={tiers} value={qty} onChange={handleChange} />

      <div className="flex flex-col gap-3">
        {/* Plain <a>, not next/link: this redirects straight out to the
            Shopify checkout — there's no internal cart/checkout route to
            navigate to. */}
        <a
          href={getCheckoutUrl(selected.qty)}
          onClick={() => {
            track("add_to_cart", {
              product: product.slug,
              qty: selected.qty,
              value: selected.total,
            });
            trackAddToCart({ product, tier: selected });
          }}
          className="group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-brand-cta py-3.5 text-white transition-colors hover:bg-brand-cta-hover"
        >
          <span className="flex items-center gap-2 text-lg font-extrabold uppercase tracking-wide">
            <Lock size={17} strokeWidth={2.6} />
            Add {selected.qty} {selected.qty === 1 ? "cylinder" : "cylinders"} —{" "}
            {formatUSD(selected.total)}
          </span>
          {/* Full white, not white/80: at 80% opacity this composites to 3.69:1
              over the button, under the 4.5:1 AA floor for text this size. */}
          <span className="mt-0.5 text-[12px] font-semibold text-white">
            Free shipping · 90-day money-back guarantee
          </span>
        </a>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] font-medium text-gray-500">
          <span className="flex items-center gap-1.5">
            <Truck size={15} />
            {deliveryDate ? `Free delivery by ${deliveryDate}` : "Free delivery"}
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={15} className="text-emerald-600" />
            Secure checkout
          </span>
        </div>

        <PaymentIcons />
      </div>

      <div className="flex gap-3 rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
        <BadgeCheck size={20} className="mt-0.5 shrink-0 text-emerald-600" />
        <p className="text-xs leading-relaxed text-gray-600">
          <strong className="text-emerald-800">
            90-Day Money-Back Guarantee.
          </strong>{" "}
          Ordered the wrong grade, or the job changed? Send any unopened cylinder
          back within 90 days for a full refund — no restocking fee, return
          shipping on us.
        </p>
      </div>
    </div>
  );
}
