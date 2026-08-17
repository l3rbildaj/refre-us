"use client";

import { Check } from "lucide-react";
import { formatUSD } from "@/data/bundles";

/**
 * Controlled tier selector. The parent owns the selected quantity so the sticky
 * buy bar and the CTA stay in sync with whatever is highlighted here.
 */
export default function BundlePicker({ tiers, value, onChange }) {
  return (
    <fieldset className="flex flex-col gap-2.5">
      <legend className="mb-3 flex w-full items-center justify-between">
        <span className="text-sm font-bold uppercase tracking-wide text-brand-navy">
          Choose your quantity
        </span>
        <span className="text-xs font-semibold text-emerald-700">
          Save up to 20%
        </span>
      </legend>

      {tiers.map((tier) => {
        const selected = tier.qty === value;

        return (
          <label
            key={tier.qty}
            className={`relative flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3.5 transition-all sm:gap-4 sm:p-4 ${
              selected
                ? "border-brand-cyan bg-brand-cyan/5"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="bundle-qty"
              value={tier.qty}
              checked={selected}
              onChange={() => onChange(tier.qty)}
              className="sr-only"
            />

            {/* Radio dot */}
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                selected
                  ? "border-brand-cyan bg-brand-cyan"
                  : "border-gray-300 bg-white"
              }`}
            >
              {selected && (
                <Check size={12} strokeWidth={3.5} className="text-white" />
              )}
            </span>

            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-sm font-bold text-brand-navy sm:text-base">
                  {tier.label}
                </span>
                {tier.badge && (
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      tier.badge === "Best value"
                        ? "bg-brand-navy text-white"
                        : "bg-brand-amber text-white"
                    }`}
                  >
                    {tier.badge}
                  </span>
                )}
              </span>
              <span className="mt-0.5 block text-xs text-gray-500">
                {tier.note}
                {tier.savings > 0 && (
                  <>
                    {" · "}
                    <span className="font-semibold text-emerald-700">
                      Save {formatUSD(tier.savings)}
                    </span>
                  </>
                )}
              </span>
            </span>

            <span className="shrink-0 text-right">
              <span className="block text-base font-extrabold text-brand-navy sm:text-lg">
                {formatUSD(tier.unit)}
                <span className="text-xs font-semibold text-gray-400">/ea</span>
              </span>
              <span className="mt-0.5 block text-xs text-gray-500">
                {tier.savings > 0 && (
                  <span className="mr-1.5 text-gray-400 line-through">
                    {formatUSD(tier.listTotal)}
                  </span>
                )}
                <span className="font-semibold text-gray-700">
                  {formatUSD(tier.total)}
                </span>
              </span>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
