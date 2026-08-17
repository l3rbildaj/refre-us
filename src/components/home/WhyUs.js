import { Check, Minus } from "lucide-react";
import { site } from "@/data/site";

const rows = [
  { label: "Factory-direct pricing", us: true, wholesaler: false, bigBox: false },
  { label: "Free US shipping, no minimum", us: true, wholesaler: false, bigBox: true },
  { label: "90-day money-back guarantee", us: true, wholesaler: false, bigBox: false },
  { label: "Full line incl. A2L and retrofit blends", us: true, wholesaler: true, bigBox: false },
  { label: "Volume pricing up to 20% off", us: true, wholesaler: false, bigBox: false },
  { label: "No counter trip, no will-call hours", us: true, wholesaler: false, bigBox: true },
];

function Cell({ value }) {
  return (
    <td className="px-4 py-4 text-center">
      {value ? (
        <Check size={19} className="mx-auto text-emerald-600" strokeWidth={2.6} />
      ) : (
        <Minus size={19} className="mx-auto text-gray-300" />
      )}
    </td>
  );
}

export default function WhyUs() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="text-center">
        <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight text-brand-navy sm:text-5xl">
          Why buy from us
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-500">
          How we compare to the local supply house counter and the big-box aisle.
        </p>
      </div>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="border-b-2 border-brand-navy">
              <th className="px-4 py-4 text-left text-sm font-bold text-brand-navy">
                &nbsp;
              </th>
              <th className="px-4 py-4 text-center">
                <span className="font-display text-lg font-extrabold uppercase text-brand-navy">
                  {site.nameShort}
                </span>
              </th>
              <th className="px-4 py-4 text-center text-sm font-semibold text-gray-500">
                Local wholesaler
              </th>
              <th className="px-4 py-4 text-center text-sm font-semibold text-gray-500">
                Big-box retail
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-gray-100">
                <td className="px-4 py-4 text-sm font-medium text-gray-700">
                  {row.label}
                </td>
                <Cell value={row.us} />
                <Cell value={row.wholesaler} />
                <Cell value={row.bigBox} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
