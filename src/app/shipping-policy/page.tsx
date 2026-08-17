import type { Metadata } from "next";
import PolicyLayout from "@/components/PolicyLayout";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Dispatch times, carriers, and shipping coverage.",
};

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout title="Shipping Policy" updated="August 17, 2026">
      <h2>Free shipping, no minimum</h2>
      <p>
        Every order ships free within the continental United States — one
        cylinder or a full pallet, same price. We currently do not ship to
        Alaska, Hawaii, US territories, or outside the US; if that changes
        we&apos;ll update this page.
      </p>

      <h2>Certification comes before dispatch</h2>
      <p>
        Because our products are regulated refrigerant, federal law requires
        us to verify your EPA Section 608 certification before an order
        ships — this applies even to orders paid in full. Orders with
        certification already on file from a prior purchase clear
        automatically; first-time orders are verified as soon as your
        certification is submitted at checkout.
      </p>

      <h2>Dispatch and transit time</h2>
      <ul>
        <li>
          Verified orders placed before 2pm ET ship the same business day.
        </li>
        <li>
          Orders placed after 2pm ET, or awaiting certification verification,
          ship the next business day.
        </li>
        <li>
          Refrigerant cylinders are classified as hazardous materials for
          transport and ship by ground freight only — they cannot legally
          move by air. Typical transit is 3–7 business days depending on
          distance from our fulfillment point.
        </li>
        <li>We don&apos;t ship on weekends or federal holidays.</li>
      </ul>

      <h2>Packaging</h2>
      <p>
        Cylinders ship sealed, in DOT-compliant packaging appropriate for
        ground hazmat transport, with the required shipping documentation.
        Please inspect your shipment on arrival — see our{" "}
        <a href="/refund-policy">Refund Policy</a> for what to do if
        anything arrives damaged.
      </p>

      <h2>Delivery signature</h2>
      <p>
        Depending on carrier and order size, an adult signature may be
        required on delivery. If no one is available, the carrier will leave
        a redelivery notice.
      </p>

      <h2>Order tracking</h2>
      <p>
        You&apos;ll receive tracking information by email as soon as your
        order ships.
      </p>

      <h2>Contractor and bulk orders</h2>
      <p>
        Orders beyond our standard 10-cylinder tier are quoted directly and
        may ship via freight carrier with adjusted lead times — we&apos;ll
        confirm dispatch timing when we send your quote.
      </p>

      <h2>Questions</h2>
      <p>
        Contact <a href={`mailto:${site.email}`}>{site.email}</a> for
        shipping questions on a specific order.
      </p>
    </PolicyLayout>
  );
}
