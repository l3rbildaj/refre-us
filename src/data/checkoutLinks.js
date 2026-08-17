/**
 * Shopify checkout redirect targets, one per bundle quantity tier.
 *
 * All 16 products share the same price, so the store owner provided one set
 * of Shopify Buy Button variant links reused across every product — there is
 * no per-product mapping. Buy buttons redirect straight here; this app has no
 * cart or checkout of its own.
 */
export const checkoutLinks = {
  1: "https://ivkxru-fb.myshopify.com/cart/56824165695828:1?channel=buy_button",
  2: "https://ivkxru-fb.myshopify.com/cart/56824165728596:1?channel=buy_button",
  4: "https://ivkxru-fb.myshopify.com/cart/56824165761364:1?channel=buy_button",
  6: "https://ivkxru-fb.myshopify.com/cart/56824165794132:1?channel=buy_button",
  10: "https://ivkxru-fb.myshopify.com/cart/56824165826900:1?channel=buy_button",
};

export function getCheckoutUrl(qty) {
  return checkoutLinks[qty] || "#";
}
