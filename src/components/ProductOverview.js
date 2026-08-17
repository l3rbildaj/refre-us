"use client";

import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

export default function ProductOverview() {
  const [livePrice, setLivePrice] = useState("69.00");

  useEffect(() => {
    const handleBundleChange = (e) => {
      if (e.detail && e.detail.price) {
        setLivePrice(e.detail.price.toFixed(2));
      }
    };
    window.addEventListener('bundleChanged', handleBundleChange);
    return () => window.removeEventListener('bundleChanged', handleBundleChange);
  }, []);

  const specs = [
    { label: "Maintenance", value: "Medium" },
    { label: "Milk System", value: "Carafe" },
    { label: "Customization", value: "High" },
    { label: "Learning Curve", value: "Short" },
    { label: "Size", value: "Compact" },
    { label: "Programmability", value: "Moderate" },
  ];

  return (
    <section className="max-w-7xl mx-auto lg:px-0 px-2 mb-10">
      <div className="bg-white rounded-2xl p-6 lg:p-10 border border-gray-100">
        {/* Overview */}
        <div className="mb-8">
          <h2 className="text-[20px] font-black uppercase tracking-tight text-gray-900 mb-4">
            Overview
          </h2>
          <p className="text-[15px] text-gray-800 leading-relaxed font-semibold mb-3">
            An automatic coffee machine for discerning coffee lovers – with over 20 coffee specialties at the touch of a button.
          </p>
          <ul className="list-disc pl-5 text-[15px] text-gray-600 leading-relaxed space-y-1.5">
            <li>Integrated grinder & LatteGo milk system</li>
            <li>Extra-Shot function for more intensity</li>
            <li>Quiet Mark certified, quiet operation</li>
            <li>Color display for easy beverage customization</li>
          </ul>
        </div>

        {/* Quick Specs */}
        <div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-3 flex-wrap">
            <h3 className="text-[20px] font-black uppercase tracking-tight text-gray-900 shrink-0">
              Quick Specs:
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {specs.map((spec, i) => (
                <div
                  key={i}
                  className="bg-[#f2f4f6] text-[#1a1c1d] px-4 py-2 rounded-lg text-[14px] font-bold"
                >
                  <span className="text-gray-600 font-semibold">
                    {spec.label}:
                  </span>{" "}
                  {spec.value}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional CTA Button */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center">
          <button
            onClick={() => document.getElementById('main-cart-button')?.click()}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors rounded-lg flex flex-col items-center justify-center py-2.5 w-full text-white px-6 max-w-md mx-auto"
          >
            <span className="font-bold text-[18px] sm:text-[20px] leading-tight flex items-center justify-center gap-2">
              <Lock size={18} strokeWidth={2.5} />
              BUY NOW - £{livePrice}
            </span>
            <span className="text-[12px] sm:text-[13px] font-semibold text-blue-100 tracking-wide mt-0.5">90-Day Money-Back Guarantee</span>
          </button>
        </div>
      </div>
    </section>
  );
}
