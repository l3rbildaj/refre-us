import type { Metadata } from "next";
import PolicyLayout from "@/components/PolicyLayout";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Our 90-day money-back guarantee, explained.",
};

export default function RefundPolicyPage() {
  return (
    <PolicyLayout title="Refund Policy" updated="August 17, 2026">
      <h2>90-day money-back guarantee</h2>
      <p>
        Ordered the wrong grade, or the job changed? You can return any{" "}
        <strong>unopened</strong> cylinder, in its original condition, within
        90 days of delivery for a full refund. There&apos;s no restocking
        fee, and we cover return shipping.
      </p>

      <h3>Why &quot;unopened&quot; is the line</h3>
      <p>
        Refrigerant is a regulated substance. Once a cylinder&apos;s valve has
        been broken or product has been withdrawn, it legally can&apos;t be
        resold or returned to general stock — it has to be processed as
        reclaimed refrigerant. That&apos;s a safety and environmental
        requirement, not a store policy, so we&apos;re not able to accept
        opened or partially used cylinders back under this guarantee.
      </p>

      <h3>How to start a return</h3>
      <ol>
        <li>
          Email <a href={`mailto:${site.email}`}>{site.email}</a> with your
          order number and the reason for return.
        </li>
        <li>
          We&apos;ll confirm eligibility and send a prepaid return label
          addressed to {site.legalName}, {site.returnsAddress}, since
          refrigerant cylinders ship as regulated freight and need the
          correct hazmat documentation.
        </li>
        <li>
          Pack the cylinder as received, with the original seal and valve cap
          intact, and hand it to the carrier.
        </li>
        <li>
          Once we receive and inspect the return, we&apos;ll refund your
          original payment method. Refunds typically post within 5–10
          business days of us receiving the item, depending on your bank.
        </li>
      </ol>

      <h2>Damaged or incorrect shipments</h2>
      <p>
        If your order arrives damaged, leaking, or isn&apos;t what you
        ordered, contact us within 7 days of delivery with photos. We&apos;ll
        replace it or refund it in full at our cost — this isn&apos;t subject
        to the unopened-cylinder condition above, since the fault is ours.
      </p>

      <h2>Cancellations</h2>
      <p>
        You can cancel an order for a full refund any time before it ships.
        Once EPA §608 certification has been verified and the order has
        shipped, the standard return process above applies.
      </p>

      <h2>What&apos;s not covered</h2>
      <ul>
        <li>Opened, used, or partially discharged cylinders</li>
        <li>Cylinders returned without their original seal or valve cap</li>
        <li>Damage caused after delivery (e.g. improper storage or handling)</li>
      </ul>

      <h2>Questions</h2>
      <p>
        Reach us at <a href={`mailto:${site.email}`}>{site.email}</a> before
        sending anything back — we&apos;ll confirm eligibility and get a
        label to you.
      </p>
    </PolicyLayout>
  );
}
