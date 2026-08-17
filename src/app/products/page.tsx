import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Truck, PackageCheck } from "lucide-react";
import products from "@/data/products.json";
import CatalogueBrowser from "@/components/catalogue/CatalogueBrowser";

export const metadata: Metadata = {
  title: "All refrigerants",
  description: `Browse all ${products.length} refrigerant grades — R-410A, R-134a, R-454B, R-22 retrofits and more. Factory-direct cylinders, free US shipping, volume pricing up to 20% off.`,
};

const highlights = [
  { icon: Truck, label: "Free US shipping" },
  { icon: PackageCheck, label: "Sealed DOT cylinders" },
  { icon: ShieldCheck, label: "AHRI 700 purity" },
];

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          <nav className="text-[11px] font-medium tracking-tight text-white/50">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            {" / "}
            <span className="text-white">Refrigerants</span>
          </nav>

          <h1 className="font-display mt-4 text-4xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            All refrigerants
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
            Every grade we stock, from residential A/C and heat pumps to
            commercial refrigeration, automotive and R-22 retrofit blends.
            Volume pricing applies on every one — up to 20% off at 10 cylinders.
          </p>

          <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-8">
            {highlights.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm text-white/70"
              >
                <Icon size={16} className="text-brand-cyan" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CatalogueBrowser initialCategory={category} />
    </main>
  );
}
