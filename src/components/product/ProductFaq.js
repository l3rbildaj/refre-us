"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { refrigerantMeta } from "@/data/refrigerant-meta";
import { parseDesignation } from "@/lib/product";

export default function ProductFaq({ product }) {
  const [open, setOpen] = useState(0);
  const meta = refrigerantMeta[product.slug] ?? {};
  const designation = parseDesignation(product.product_name);

  const faqs = [
    {
      q: "How do the quantity discounts work?",
      a: "Pricing is per cylinder and drops as you add more — 5% off at 2, 10% at 4, 15% at 6, and 20% at 10. The discount applies automatically when you pick a tier; there's no code to enter.",
    },
    {
      q: `Is ${designation} genuine and traceable?`,
      a: "Yes — every cylinder ships with batch and lot tagging, and a certificate of analysis to the AHRI 700 purity specification is available on request for any lot.",
    },
    {
      q: "When will it arrive?",
      a: "Orders placed before 2pm ET ship the same business day. Shipping is free anywhere in the continental US with no order minimum. Cylinders ship via ground freight as regulated goods.",
    },
    ...(meta.safety === "A2L"
      ? [
          {
            q: `Is ${designation} flammable?`,
            a: `${designation} is classified ASHRAE A2L — mildly flammable. It requires A2L-rated equipment, leak detection, and handling procedures per ASHRAE 15 and local code. It is not a drop-in for A1 systems unless the equipment is rated for it.`,
          },
        ]
      : []),
    {
      q: "Can I return an unused cylinder?",
      a: "Yes — our 90-day money-back guarantee covers any unopened cylinder in original condition, for a full refund with return shipping covered. Because refrigerant is a regulated good that has to go to reclamation once broached, opened or partially used cylinders can't be accepted back. Damaged or incorrect shipments are always replaced at our cost.",
    },
    {
      q: "Do you offer contractor pricing beyond 10?",
      a: "Yes. If you run pallet volume, get in touch with the grades and quantities you need and we'll quote it directly.",
    },
  ];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-brand-navy">
        Questions about this product
      </h2>

      <div className="mt-5 flex flex-col gap-2.5">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={faq.q}
              className="overflow-hidden rounded-xl border border-gray-200"
            >
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left"
              >
                <span className="text-sm font-bold text-brand-navy">
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-brand-cyan transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <p className="border-t border-gray-100 px-4 py-3.5 text-sm leading-relaxed text-gray-600">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
