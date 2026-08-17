import { MousePointerClick, FileCheck, Truck } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    step: "01",
    title: "Pick your quantity",
    copy: "Volume pricing applies automatically — up to 20% off per cylinder at 10 units. No codes, no minimum order.",
  },
  {
    icon: FileCheck,
    step: "02",
    title: "Check out in minutes",
    copy: "Enter payment and shipping details — takes under a minute. Save your info for even faster reorders.",
  },
  {
    icon: Truck,
    step: "03",
    title: "Ships same day",
    copy: "Orders placed before 2pm ET go out the same business day, free anywhere in the continental US.",
  },
];

export default function HowItWorks() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-brand-navy">
        How ordering works
      </h2>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {steps.map(({ icon: Icon, step, title, copy }) => (
          <div
            key={step}
            className="rounded-xl border border-gray-200 bg-gray-50 p-5"
          >
            <div className="flex items-center justify-between">
              <Icon size={22} className="text-brand-cyan" />
              <span className="font-display text-3xl font-extrabold text-brand-navy/10">
                {step}
              </span>
            </div>
            <h3 className="mt-4 text-sm font-bold text-brand-navy">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
              {copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
