"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What refrigerant grades do you carry?",
    a: "16 grades across residential A/C, commercial refrigeration, automotive and R-22 retrofit blends — from R-410A and R-454B to R-404A and retrofit options like R-438A. Browse the full catalogue to filter by system type.",
  },
  {
    q: "Is R-22 still legal to buy?",
    a: "Production and import of new R-22 ended January 1, 2020 under the Clean Air Act. It remains legal to buy and use existing supply for servicing, and any R-22 sold today is reclaimed or pre-2020 stock.",
  },
  {
    q: "What's the difference between A1 and A2L refrigerants?",
    a: "A1 refrigerants are non-flammable. A2L grades — including R-32, R-454B and R-1234yf — are mildly flammable and require A2L-rated equipment, leak detection and handling procedures. A2L cylinders are marked on their product page and on the cylinder itself.",
  },
  {
    q: "How fast do orders ship?",
    a: "Orders placed before 2pm ET ship the same business day. Shipping is free within the continental US on every cylinder, with no order minimum.",
  },
  {
    q: "Can I return a cylinder if I ordered the wrong one?",
    a: "Yes — any unopened cylinder in original condition can be returned within 90 days for a full refund. No restocking fee, and we cover return shipping.",
  },
  {
    q: "Do you offer contractor or bulk pricing?",
    a: "Yes. Volume pricing applies automatically — up to 20% off per cylinder at 10 units. Running pallet volume beyond that? Reach out with your grades and quantities and we'll quote it directly.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
        <h2 className="font-display text-center text-4xl font-extrabold uppercase tracking-tight text-brand-navy sm:text-5xl">
          Common questions
        </h2>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
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
                  <p className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-600">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
