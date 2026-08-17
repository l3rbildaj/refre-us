import { Package, Tag, FileText, ShieldAlert } from "lucide-react";
import { parseWeight, parseDesignation } from "@/lib/product";

export default function WhatsIncluded({ product }) {
  const weight = parseWeight(product.product_name);
  const designation = parseDesignation(product.product_name);

  const items = [
    {
      icon: Package,
      title: `1 × ${weight ?? ""} ${designation} cylinder`.replace(/\s+/g, " ").trim(),
      copy: "Factory-sealed disposable cylinder with intact tamper seal and valve cap.",
    },
    {
      icon: Tag,
      title: "Batch and lot tagging",
      copy: "Every cylinder carries its fill batch and lot number for traceability on your job records.",
    },
    {
      icon: FileText,
      title: "Certificate of analysis",
      copy: "Purity documentation to the AHRI 700 specification, available on request for any lot.",
    },
    {
      icon: ShieldAlert,
      title: "Safety data sheet",
      copy: "Current SDS ships with the order and is available for download before you buy.",
    },
  ];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-brand-navy">
        What ships
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
