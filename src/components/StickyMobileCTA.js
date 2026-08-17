"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { track } from "@vercel/analytics";

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      const mainButton = document.getElementById("main-cart-button");
      if (!mainButton) return;
      
      const rect = mainButton.getBoundingClientRect();
      // If the bottom of the main CTA has scrolled completely past the top curve of the screen:
      if (rect.bottom < 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll(); // Init instantly
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      className={`fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-gray-100 z-[100] lg:hidden transition-all duration-500 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <button 
        onClick={() => document.getElementById('main-cart-button')?.click()}
        className="relative overflow-hidden bg-[#2563EB] active:scale-[0.98] transition-all rounded-lg flex flex-col items-center justify-center py-2.5 w-full text-white px-6 group"
      >
        <div className={`absolute top-0 -left-full h-full w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none -skew-x-[20deg] ${isVisible ? 'animate-shine' : 'hidden'}`} />
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          <span className="font-bold text-[18px] sm:text-[20px] leading-tight flex items-center justify-center gap-2">
            <Lock size={18} strokeWidth={2.5} />
            BUY NOW - £{livePrice}
          </span>
          <span className="text-[12px] sm:text-[13px] font-semibold text-blue-100 tracking-wide mt-0.5">90-Day Money-Back Guarantee</span>
        </div>
      </button>
    </div>
  );
}
