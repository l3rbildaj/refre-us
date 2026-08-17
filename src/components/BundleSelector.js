"use client";

import React from "react";
import { track } from "@vercel/analytics";

/**
 * BundleSelector Component
 * 
 * Props:
 * - bundles: Array of bundle objects
 * - selectedBundle: The currently selected bundle object
 * - onSelect: Callback function when a bundle is selected
 */
export default function BundleSelector({ bundles, selectedBundle, onSelect }) {
  return (
    <div className="flex flex-col gap-3">
      {bundles.map((bundle) => {
        const isSelected = selectedBundle.id === bundle.id;

        return (
          <button
            key={bundle.id}
            onClick={() => {
              track('Bundle Selected', {
                bundle: bundle.name,
                price: bundle.price,
                id: bundle.id,
              });
              onSelect(bundle);
            }}
            className="w-full text-left relative group outline-none focus:outline-none"
          >
            {/* Upper Main Card */}
            <div 
              className={`relative z-10 w-full rounded-[14px] transition-all flex flex-col ${bundle.topBadge ? "pt-5 sm:pt-6" : "pt-3 sm:pt-3.5"} bg-white ${
                isSelected ? "border-[2px] border-[#2563EB]" : "border-[2px] border-gray-200 group-hover:border-gray-300"
              }`}
            >
              {/* Top Right Badge */}
              {bundle.topBadge && (
                <div className={`absolute ${isSelected ? "-top-[2px] -right-[2px]" : "top-0 right-0"} bg-[#DBEAFE] text-[#2563EB] text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-bl-[10px] rounded-tr-[12px]`}>
                  {bundle.topBadge}
                </div>
              )}

              {/* Main Content Area */}
              <div className={`px-3 sm:px-4 flex w-full gap-3 items-center ${bundle.topBadge ? "pb-5 sm:pb-6" : "pb-3 sm:pb-4"}`}>
                {/* Radio Button */}
                <div className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center border-[2px] bg-white ${
                  isSelected ? "border-[#2563EB]" : "border-gray-300"
                }`}>
                  {isSelected && <div className="w-2.5 h-2.5 bg-[#2563EB] rounded-full" />}
                </div>

                {/* Center Info */}
                <div className="flex-1 flex flex-col items-start">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[17px] sm:text-[20px] font-bold text-gray-900 leading-tight">
                      {bundle.name}
                    </span>
                    {bundle.saveBadge && (
                      <span className="bg-[#DBEAFE] text-[#2563EB] text-[10px] font-bold px-1.5 py-0 rounded-full whitespace-nowrap">
                        {bundle.saveBadge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Price */}
                <div className="flex flex-col items-end shrink-0 self-center">
                  {bundle.comparePrice && (
                    <span className="text-[14px] sm:text-[16px] text-gray-400 line-through font-medium">
                      £{bundle.comparePrice.toFixed(2)}
                    </span>
                  )}
                  <div className="text-[20px] sm:text-[26px] font-bold text-[#2563EB] leading-none mt-0.5">
                    £{bundle.price.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Red Bottom Row (Slides underneath) */}
            {bundle.bottomRow && (
              <div className="relative z-0 -mt-5 bg-[#2563EB] w-full px-2.5 pt-6 pb-2 sm:pt-7 sm:px-4 sm:pb-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-b-[14px] overflow-hidden">
                {(Array.isArray(bundle.bottomRow) ? bundle.bottomRow : [bundle.bottomRow]).map((item, index) => (
                  <div key={index} className="flex items-center gap-2.5">
                    <img 
                      src={item.image} 
                      alt="Free Gift" 
                      className="w-6 h-6 sm:w-8 sm:h-8 object-cover rounded shrink-0 bg-white" 
                    />
                    <span className="text-white font-black text-sm shrink-0">{item.qty}</span>
                    <span className="text-white text-[11px] sm:text-[12px] font-medium leading-tight">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
