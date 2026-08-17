import { Truck, RotateCcw, FileCheck, Flame } from "lucide-react";
import { refrigerantMeta } from "@/data/refrigerant-meta";

export default function ShippingReturns({ product }) {
  const meta = refrigerantMeta[product.slug] ?? {};

  const items = [
    {
      icon: Truck,
      title: "Free ground shipping",
      copy: "Orders placed before 2pm ET ship the same business day, free anywhere in the continental US.",
    },
    {
      icon: FileCheck,
      title: "Certificate of analysis",
      copy: "AHRI 700 purity documentation available on request for any lot.",
    },
    {
      icon: RotateCcw,
      title: "90-day money-back guarantee",
      copy: "Unopened cylinders in original condition can be returned within 90 days for a full refund, return shipping covered. Damaged or incorrect shipments are replaced at our cost.",
    },
    ...(meta.safety === "A2L"
      ? [
          {
            icon: Flame,
            title: "A2L handling",
            copy: "Classified mildly flammable. Requires A2L-rated equipment, leak detection and handling per ASHRAE 15 and local code.",
          },
        ]
      : []),
  ];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-brand-navy">
        Ordering &amp; returns
      </h2>

      <div className="mt-5 flex flex-col gap-5">
        {items.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="flex gap-3.5">
            <Icon size={20} className="mt-0.5 shrink-0 text-brand-cyan" />
            <div>
              <h3 className="text-sm font-bold text-brand-navy">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
