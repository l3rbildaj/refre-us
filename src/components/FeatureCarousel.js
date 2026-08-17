"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FEATURES = [
  {
    title: "SilentBrew Technology",
    description: "Our industry-leading SilentBrew technology uses soundproofing and quiet grinding for a pleasant coffee experience. Certified by Quiet Mark.",
    image: "https://www.home-appliances.philips/medias/LatteGo-4-en.webp?context=bWFzdGVyfGltYWdlc3w1NjkxNnxpbWFnZS93ZWJwfGFHWTFMMmcwT1M4eE1ERTRNREV5TWpJeE5EUXpNQzlNWVhSMFpVZHZYelJmWlc0dWQyVmljQXw0NzFjOWE5OTg0YjAyNjBmM2MxMDQyYWQwNTBlOTI5N2MxNDFkNWRkZjFlYjEzZGYyNzZlMmRjNjQzMjdiYzk4",
  },
  {
    title: "Enjoy up to 5000 cups without descaling",
    description: "Thanks to the AquaClean water filter, enjoy up to 5,000 cups without descaling. After that, a simple descaling and cleaning of the brew group is necessary – just like with any automatic coffee machine.",
    image: "https://www.home-appliances.philips/medias/LatteGo-5-en.webp?context=bWFzdGVyfGltYWdlc3w1MTM1MnxpbWFnZS93ZWJwfGFEQTRMMmhsWmk4eE1ERTRNREE1TnpZM01URTVPQzlNWVhSMFpVZHZYelZmWlc0dWQyVmljQXw4YWYyNDBhOTViMzQwYWM0ZmY0YWViODNlN2M4NmJhM2JiMTc5ZDY2N2YzMzBhMTI1YmFkZTU1YmFmMzkxYzM0",
  },
  {
    title: "QuickStart",
    description: "Turn on your machine and brew a coffee right away. Your machine heats up based on the selected recipe.",
    image: "https://www.home-appliances.philips/medias/LatteGo-6-en.webp?context=bWFzdGVyfGltYWdlc3wyMzc3OHxpbWFnZS93ZWJwfGFEaGpMMmd3T0M4eE1ERTRNREV6T1RVeE5Ua3pOQzlNWVhSMFpVZHZYelpmWlc0dWQyVmljQXw0ZWIzOTkzMmRlMmVkNzZjN2RkZGYzYjNjMmQzNDkxMDQ2ZjRmY2E3Y2ZlMjQ1NTUyZTlmYTI1MjRiODFjZDli",
  },
  {
    title: "Precise 100% ceramic grinder",
    description: "Get the full aroma out of fresh coffee beans with this sharp-edged grinder with settings from coarse to ultra-fine.",
    image: "https://www.home-appliances.philips/medias/LatteGo-7-en.webp?context=bWFzdGVyfGltYWdlc3wyNzQ5MnxpbWFnZS93ZWJwfGFHWm1MMmhqTXk4eE1ERTRNREUwTlRnM01qa3lOaTlNWVhSMFpVZHZYemRmWlc0dWQyVmljQXwxNGRiNDQ2MzMzOWJlYmMxYjI0MTNmNzgwNGRmZGM2ZDI4NzlmMDA3OGI5OWU5MDUwMjhjZTIxZjE4MWQ2OTQ4",
  },
  {
    title: "Intuitive color touch display",
    description: "Our easy-to-use color display is the place where you select recipes, adjust strength, coffee length, and milk volume, and save your preferences.",
    image: "https://www.home-appliances.philips/medias/LatteGo-8-en.webp?context=bWFzdGVyfGltYWdlc3wzMjY3OHxpbWFnZS93ZWJwfGFHWTFMMmc0TVM4eE1ERTRNREV4TWpNMU1USTJNaTlNWVhSMFpVZHZYemhmWlc0dWQyVmljQXw5NDgxMjJlN2YxYTIzOGI1NGQzYjA2YzNiZmZhZjY0NGI2MGUwYjY3OTcxMGQ3NDNlOWNhYjkyZmQ5ZjhkM2Y2",
  },
  {
    title: "Additional Extra-Shot",
    description: "Enjoy more aroma without bitter aftertastes with our Extra-Shot function. You can add it to any of our coffee recipes (except when using ground coffee).",
    image: "https://www.home-appliances.philips/medias/LatteGo-9-en.webp?context=bWFzdGVyfGltYWdlc3wzNzMxMnxpbWFnZS93ZWJwfGFHUTJMMmd3T1M4eE1ERTRNRE0xT1RRMU5EYzFNQzlNWVhSMFpVZHZYemxmWlc0dWQyVmljQXw0NWU5M2ZlZDE5YWRjODNiY2U0Mjc0ZTY5YTVjMjBkMjNhNzE2NzU3MWY5NGRhMDY4NGM4MzY4ZWNmNDQ0MzZl",
  },
  {
    title: "The fastest-to-clean milk system",
    description: "With just 2 parts and no tubes, our LatteGo milk system can be cleaned in less than 10 seconds – in the dishwasher or under the tap – and stored in the fridge.",
    image: "https://www.home-appliances.philips/medias/LatteGo-10-en.webp?context=bWFzdGVyfGltYWdlc3w1MTkyNnxpbWFnZS93ZWJwfGFEQXhMMmcwWlM4eE1ERTRNRE0zTVRZME5EUTBOaTlNWVhSMFpVZHZYekV3WDJWdUxuZGxZbkF8NzU5MjdhOWUwMzYyZjliYWQ5YzZlMWIwOTllYzA4NzU4ZmY4NGZiN2YwMzNmMzBlNDU3NjY0YjllZjMxNGMyMw",
  },
  {
    title: "Select, personalize, and save drinks",
    description: "Prepare coffee to your taste and save your recipe in the user profiles.",
    image: "https://www.home-appliances.philips/medias/LatteGo-11-en.webp?context=bWFzdGVyfGltYWdlc3wzODIxMHxpbWFnZS93ZWJwfGFERXlMMmhsTVM4eE1ERTRNRGN5TmpFeU9EWTNNQzlNWVhSMFpVZHZYekV4WDJWdUxuZGxZbkF8ZjE5MWQwYjRjZjU4NGY5YmVjMGY4ZGUyZDBjMjY2MzcwYzVjMDhiYThlM2U1YjdmM2Q0MDg1NGU5YzFkZGVlNQ",
  },
];

export default function FeatureCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-6 py-20">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight max-w-[80%]">
          Enjoy aromatic coffee cup after cup with your fully automatic espresso machine
        </h2>
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <button
            onClick={scrollNext}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4 lg:-ml-6">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_25%] pl-4 lg:pl-6"
            >
              <div className="flex flex-col h-full  transition-all">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-gray-100 mb-6 group">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="text-[17px] font-black text-gray-900 mb-3 leading-tight uppercase tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-[14px] text-gray-600 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
