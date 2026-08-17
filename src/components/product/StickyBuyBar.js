"use client";

import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { track } from "@vercel/analytics";
import { formatUSD } from "@/data/bundles";
import { getCheckoutUrl } from "@/data/checkoutLinks";
import { trackAddToCart } from "@/lib/pixel";

/**
 * Mobile purchase bar. Stays hidden until the in-page CTA has scrolled out of
 * view, so it reinforces rather than competes with the main buy box.
 */
export default function StickyBuyBar({ product, tier }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!tier) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-gray-500">
            {tier.qty} × {formatUSD(tier.unit)}
            {tier.savings > 0 && (
              <span className="ml-1.5 text-emerald-700">
                save {formatUSD(tier.savings)}
              </span>
            )}
          </p>
          <p className="text-lg font-extrabold leading-tight text-brand-navy">
            {formatUSD(tier.total)}
          </p>
        </div>

        <a
          href={getCheckoutUrl(tier.qty)}
          onClick={() => {
            track("add_to_cart", {
              product: product.slug,
              qty: tier.qty,
              value: tier.total,
              source: "sticky_bar",
            });
            trackAddToCart({ product, tier });
          }}
          className="flex shrink-0 items-center gap-2 rounded-xl bg-brand-cta px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition-colors hover:bg-brand-cta-hover"
        >
          <Lock size={15} strokeWidth={2.6} />
          Add to cart
        </a>
      </div>
    </div>
  );
}
