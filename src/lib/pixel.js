/**
 * Meta (Facebook) Pixel event helpers.
 *
 * Guarded on `window.fbq` existing rather than assuming it's loaded: ad
 * blockers and privacy extensions routinely strip the pixel script, and a
 * missing `fbq` should never break the buy flow.
 */
export function trackAddToCart({ product, tier }) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }

  window.fbq("track", "AddToCart", {
    content_ids: [product.slug],
    content_name: product.product_name,
    content_type: "product",
    contents: [{ id: product.slug, quantity: tier.qty }],
    currency: "USD",
    value: tier.total,
  });
}
