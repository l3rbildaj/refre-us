import type { Metadata } from "next";
import Link from "next/link";
import PolicyLayout from "@/components/PolicyLayout";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern purchases from ${site.name}.`,
};

export default function TermsOfServicePage() {
  return (
    <PolicyLayout title="Terms of Service" updated="August 17, 2026">
      <p>
        These terms govern your use of {site.domain} and any order you place
        with {site.legalName} (&quot;{site.nameShort}&quot;, &quot;we&quot;,
        &quot;us&quot;), located at {site.address}. By placing an order, you
        agree to them.
      </p>

      <h2>Who can buy from us</h2>
      <p>
        Every refrigerant we sell ships in a cylinder larger than 2 lb.
        Under the Clean Air Act (40 CFR Part 82, Subpart F), federal law
        restricts sale of refrigerant in that quantity to individuals holding
        valid EPA Section 608 certification (or purchasing on behalf of an
        entity that employs a certified technician), and places the duty to
        verify that on us as the seller.
      </p>
      <p>
        You must submit a valid, verifiable EPA Section 608 certification
        before an order containing regulated refrigerant will be released. We
        may decline, delay, or cancel any order where certification cannot be
        verified, and will refund any payment collected for a cancelled
        order. You must be at least 18 years old to purchase from this site.
      </p>

      <h2>Orders and pricing</h2>
      <p>
        Placing an order is an offer to purchase, which we may accept or
        decline. We make reasonable efforts to ensure pricing and product
        information are accurate, but errors can occur. If we discover a
        pricing or listing error after you&apos;ve ordered, we will contact
        you before charging or shipping, and you may cancel at no cost.
      </p>
      <p>
        Volume pricing tiers shown on product pages apply automatically based
        on quantity at checkout and are subject to change without notice for
        future orders.
      </p>

      <h2>Regulated goods — your responsibilities</h2>
      <p>
        Refrigerant is a regulated substance intended for use by, or under
        the supervision of, certified technicians in accordance with
        applicable federal, state and local law. By purchasing, you represent
        that you hold the certification required for the product you&apos;re
        buying and that you will handle, use, and dispose of it in
        compliance with EPA regulations and any other applicable law. You are
        responsible for venting, recovery, and disposal practices at your
        site.
      </p>

      <h2>Shipping and title</h2>
      <p>
        See our <Link href="/shipping-policy">Shipping Policy</Link> for
        delivery timing. Title and risk of loss pass to you upon delivery to
        the carrier, except where the carrier is acting as our agent under
        applicable law.
      </p>

      <h2>Returns and refunds</h2>
      <p>
        See our <Link href="/refund-policy">Refund Policy</Link> for the full
        terms of our 90-day money-back guarantee.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        Our products are sold for use by qualified, certified technicians. To
        the fullest extent permitted by law, {site.nameShort} is not liable
        for indirect, incidental, or consequential damages arising from use,
        misuse, or handling of any product sold on this site. Our aggregate
        liability for any claim is limited to the amount you paid for the
        product giving rise to the claim. Nothing in these terms limits
        liability that cannot be limited under applicable law.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Site content, including text, graphics and the {site.name} name and
        marks, belongs to us or our licensors and may not be copied or reused
        without permission.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of{" "}
        {site.governingState}, without regard to conflict-of-law principles.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. Continued use of the
        site after changes take effect constitutes acceptance of the revised
        terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </PolicyLayout>
  );
}
