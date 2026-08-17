import { BadgeCheck, Truck, Headset } from "lucide-react";

const pillars = [
  {
    icon: BadgeCheck,
    title: "90-day money-back guarantee",
    copy: "Send any unopened cylinder back within 90 days for a full refund. No restocking fee, return shipping covered.",
  },
  {
    icon: Truck,
    title: "Free shipping, no minimum",
    copy: "Every cylinder ships free in the continental US — one unit or a full pallet, same price.",
  },
  {
    icon: Headset,
    title: "Talk to a real tech",
    copy: "Questions on grade selection or retrofit compatibility? Our team answers before you buy, not after.",
  },
];

export default function GuaranteeBanner() {
  return (
    <section className="overflow-hidden rounded-2xl bg-brand-navy text-white">
      <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-3 md:gap-8">
        {pillars.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="flex gap-3.5">
            <Icon size={24} className="mt-0.5 shrink-0 text-brand-cyan" />
            <div>
              <h3 className="text-sm font-bold leading-snug">{title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-white/60">
                {copy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
