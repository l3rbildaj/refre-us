import { Truck, ShieldCheck, BadgeDollarSign, PackageCheck } from "lucide-react";

const items = [
  {
    icon: Truck,
    title: "Free US shipping",
    copy: "On every cylinder, no order minimum.",
  },
  {
    icon: ShieldCheck,
    title: "90-day guarantee",
    copy: "Full refund on any unopened cylinder.",
  },
  {
    icon: BadgeDollarSign,
    title: "Factory-direct pricing",
    copy: "No wholesaler markup between us and you.",
  },
  {
    icon: PackageCheck,
    title: "DOT-certified cylinders",
    copy: "Sealed, tagged and pressure-tested.",
  },
];

export default function TrustBar() {
  return (
    <section className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 sm:px-6 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="flex items-start gap-3">
            <Icon size={22} className="mt-0.5 shrink-0 text-brand-cyan" />
            <div>
              <h3 className="text-sm font-bold text-brand-navy">{title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
