import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

const points = [
  "16 refrigerant grades in stock",
  "Ships same day before 2pm ET",
  "Bulk pricing for contractors",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-navy text-white">
      {/* Cold-tone glow behind the cylinder */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-brand-cyan/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-ice">
            <ShieldCheck size={14} />
            Factory-Direct Pricing
          </span>

          <h1 className="font-display mt-6 text-5xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Certified refrigerants,
            <span className="block text-brand-cyan">factory-direct.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Sealed cylinders of R-410A, R-134a, R-454B and more — sourced direct
            and priced without the wholesaler markup. Built for licensed HVAC/R
            technicians who need the right charge, on time.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-cyan px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-brand-navy transition-colors hover:bg-brand-ice"
            >
              Shop all refrigerants
              <ArrowRight size={17} />
            </Link>
            <Link
              href="/#faq"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
            >
              Common questions
            </Link>
          </div>

          <ul className="mt-9 flex flex-col gap-2.5 text-sm text-white/60 sm:flex-row sm:gap-7">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          {/* Product PNGs ship with an opaque white background, so the image sits
              on a deliberate white plinth rather than floating on the navy. */}
          <div className="rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-white/10 sm:p-8">
            <Image
              src="/images/08-r-410a-refrigerant-25-lb.png"
              alt="R-410A refrigerant cylinder"
              width={520}
              height={520}
              priority
              className="h-auto w-[220px] object-contain sm:w-[300px] lg:w-[340px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
