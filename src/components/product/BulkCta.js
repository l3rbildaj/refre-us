import { ArrowRight } from "lucide-react";
import { site } from "@/data/site";

export default function BulkCta() {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
      <div className="flex flex-col items-start gap-5 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-brand-navy sm:text-3xl">
            Buying past 10 cylinders?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            Shops running pallet volume get quoted directly. Send the grades and
            quantities you go through in a typical month and we&apos;ll price it
            — plus keep your certification on file so reorders ship same day.
          </p>
        </div>

        <a
          href={`mailto:${site.email}?subject=Contractor%20pricing%20enquiry`}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand-navy px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-blue"
        >
          Request contractor pricing
          <ArrowRight size={17} />
        </a>
      </div>
    </section>
  );
}
