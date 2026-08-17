import type { Metadata } from "next";
import Link from "next/link";
import PolicyLayout from "@/components/PolicyLayout";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects your information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy" updated="August 17, 2026">
      <p>
        {site.legalName} (&quot;{site.nameShort}&quot;, &quot;we&quot;,
        &quot;us&quot;) operates {site.domain}. This policy explains what
        information we collect when you use the site or place an order, how
        we use it, and the choices you have.
      </p>

      <h2>Information we collect</h2>
      <h3>Information you give us</h3>
      <ul>
        <li>Name, email address, phone number, and shipping/billing address</li>
        <li>
          EPA Section 608 certification details submitted at checkout —
          certification type and number, and the supporting document you
          upload
        </li>
        <li>Order history and communications with our support team</li>
      </ul>

      <h3>Information collected automatically</h3>
      <p>
        Our hosting and CDN infrastructure logs standard technical data (IP
        address, browser type, pages visited, timestamps) for security and
        performance purposes. If you use our live chat, the chat provider
        collects the messages you send and basic session information to
        deliver support.
      </p>
      <p>
        We do not currently run advertising pixels (e.g. Meta, TikTok) or a
        web analytics platform on this site. If that changes, we will update
        this section before any such tool goes live.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To process and ship your order</li>
        <li>
          To verify your EPA Section 608 certification before releasing a
          regulated order, as required by federal law
        </li>
        <li>To respond to support requests</li>
        <li>To detect and prevent fraud</li>
        <li>To comply with tax, safety and regulatory recordkeeping</li>
      </ul>

      <h2>How we share your information</h2>
      <p>We share information only where necessary to run the business:</p>
      <ul>
        <li>
          <strong>Payment processing</strong> — payment card data is handled
          directly by our payment processor (Stripe); we do not store full
          card numbers on our servers.
        </li>
        <li>
          <strong>Shipping carriers</strong> — your name and address are
          shared with the carrier to deliver your order.
        </li>
        <li>
          <strong>Legal and regulatory</strong> — EPA Section 608
          certification records are retained and may be produced if required
          by regulators, consistent with federal recordkeeping obligations
          for refrigerant sales.
        </li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>Certification records</h2>
      <p>
        Because federal law restricts refrigerant sales in quantities over 2
        lb to EPA Section 608 certified technicians, and places the
        verification burden on the seller, we retain the certification
        information you submit for at least three years from the date of
        sale, as required by that regulation. This retention period applies
        regardless of any shorter deletion request, to the extent required by
        law.
      </p>

      <h2>Cookies</h2>
      <p>
        We use only the cookies necessary for the site and checkout to
        function (e.g. cart state, session security). We do not currently use
        third-party advertising or cross-site tracking cookies.
      </p>

      <h2>Your choices</h2>
      <p>
        You can request access to, correction of, or deletion of your
        personal information by emailing{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. Deletion requests
        are subject to the certification and order-record retention
        described above. Depending on your state of residence, you may have
        additional rights under state privacy law.
      </p>

      <h2>Data security</h2>
      <p>
        We use industry-standard safeguards, including encrypted transport
        (TLS) and a PCI-compliant payment processor, to protect the
        information you share with us. No system is completely secure, and we
        cannot guarantee absolute security.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        This site is intended for licensed HVAC/R professionals and is not
        directed to anyone under 18. We do not knowingly collect information
        from children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Material changes will be
        reflected by an updated date at the top of this page.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy: <a href={`mailto:${site.email}`}>{site.email}</a>.
        See also our{" "}
        <Link href="/terms-of-service">Terms of Service</Link>.
      </p>
    </PolicyLayout>
  );
}
