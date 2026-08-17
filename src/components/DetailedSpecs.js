"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, ShoppingCart, Lock } from "lucide-react";
import { track } from "@vercel/analytics";

export default function DetailedSpecs() {
  const [livePrice, setLivePrice] = useState("69.00");
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!buttonRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsAnimationActive(true);
    }, { threshold: 0.1 });
    observer.observe(buttonRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleBundleChange = (e) => {
      if (e.detail && e.detail.price) {
        setLivePrice(e.detail.price.toFixed(2));
      }
    };
    window.addEventListener('bundleChanged', handleBundleChange);
    return () => window.removeEventListener('bundleChanged', handleBundleChange);
  }, []);
  const specGroups = [
    {
      title: "Country of Origin",
      content: "Designed in Europe, manufactured to high quality standards.",
    },
    {
      title: "Customization",
      content: [
        "Multi-level coffee strength setting",
        "Individual cup volume",
        "Savelable user profiles",
      ],
    },
    {
      title: "Variety",
      content:
        "Up to 12 coffee specialties, including espresso, coffee, cappuccino, latte macchiato and more.",
    },
    {
      title: "Additional Features",
      content: [
        "Hot water function",
        "Fast heat-up system",
        "Automatic rinsing and cleaning program",
      ],
    },
    {
      title: "Accessories",
      content:
        "Milk carafe, water filter, measuring spoon, cleaning accessories – included (depending on model).",
    },
    {
      title: "Technical Specifications",
      content: [
        "Power: approx. 1,500 W (depending on model)",
        "Water tank: approx. 1.8 l",
        "Bean container: approx. 250 g",
      ],
    },
    {
      title: "General Specifications",
      content:
        "Premium look front, compact design, intuitive touch display and quiet operation.",
    },
    {
      title: "Service",
      content: "1-year manufacturer's warranty included and customer support within the EU.",
    },
    {
      title: "Sustainability",
      content:
        "Energy saving mode, automatic shut-off and durable components to reduce waste.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto lg:px-0 px-2 mb-10">
      <div className="bg-white rounded-2xl p-6 lg:p-10 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Intro & CTA */}
          <div className="lg:w-1/3">
            <div className="mb-6 overflow-hidden rounded-xl border border-gray-100">
              <img 
                src="https://www.seattlecoffeegear.com/cdn/shop/files/Philips5500LattegoSuperautomaticEspressoMachinenew.jpg?v=1752685380&width=800" 
                alt="LatteGo Series 5500" 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h2 className="text-[24px] lg:text-[28px] font-black uppercase tracking-tight text-gray-900 leading-tight mb-6">
              Your perfect cup thanks to 4 user profiles
            </h2>
            <p className="text-[15px] text-gray-600 leading-relaxed mb-8">
              Enjoy exactly the coffee you love, every time, with four user profiles. Your individual settings for strength, volume, and temperature are saved so every cup is perfect. With an additional guest profile, your guests can also enjoy their favorite coffee – without you having to change your personal settings.
            </p>

            <div className="flex flex-col gap-4">
              <button 
                ref={buttonRef}
                onClick={() => document.getElementById('main-cart-button')?.click()}
                className="relative overflow-hidden bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors rounded-lg flex flex-col items-center justify-center py-2.5 w-full text-white px-6 group max-w-md"
              >
                <div className={`absolute top-0 -left-full h-full w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none -skew-x-[20deg] ${isAnimationActive ? 'animate-shine' : 'hidden'}`} />
                <div className="relative z-10 flex flex-col items-center justify-center w-full">
                  <span className="font-bold text-[18px] sm:text-[20px] leading-tight flex items-center justify-center gap-2">
                    <Lock size={18} strokeWidth={2.5} />
                    BUY NOW - £{livePrice}
                  </span>
                  <span className="text-[12px] sm:text-[13px] font-semibold text-blue-100 tracking-wide mt-0.5">90-Day Money-Back Guarantee</span>
                </div>
              </button>
              <button className="flex items-center justify-center gap-2 text-gray-900 font-bold text-sm uppercase tracking-widest hover:underline py-2">
                Check specifications
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Column: Spec List */}
          <div className="lg:w-2/3">
            <div className="flex flex-col border-t border-gray-100">
              {specGroups.map((group, index) => (
                <div
                  key={index}
                  className="py-5 border-b border-gray-100 group cursor-pointer hover:bg-gray-50 transition-colors px-4 -mx-4 rounded-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <h4 className="text-[13px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors">
                        {group.title}
                      </h4>
                      <div className="text-[15px] text-gray-800 font-medium leading-relaxed">
                        {Array.isArray(group.content) ? (
                          <ul className="list-disc list-inside lg:list-none lg:flex lg:flex-wrap lg:gap-x-4 lg:gap-y-1">
                            {group.content.map((item, i) => (
                              <li key={i} className="lg:after:content-['•'] lg:after:ml-4 lg:last:after:content-['']">
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>{group.content}</p>
                        )}
                      </div>
                    </div>
                    <ChevronRight
                      size={20}
                      className="text-gray-300 group-hover:text-gray-900 transition-colors shrink-0 mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
