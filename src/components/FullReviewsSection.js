"use client";

import React from "react";
import { Star, Search, ChevronDown, ThumbsUp, Flag } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    rating: 5,
    title: "Easy to use, makes excellent drinks",
    author: "Christopher H",
    date: "Apr 8, 2026",
    content: `I bought this machine because I love espresso, but didn't want to take the time to learn all the nuances of pulling the "perfect" cup. This machine is fantastic and I highly recommend it. My wife and I use it for espresso, coffee, cappuccino, and café latte. All the results are outstanding and the machine is easy to use and clean.\n\nSomeday, when I have more time, I will get a semi-automatic espresso machine, but right now this machine is all I need, and it makes excellent hot beverages.`,
    helpful: 0,
    unhelpful: 0,
  },
  {
    id: 2,
    rating: 5,
    title: "So easy to use!",
    author: "Leimarie3",
    date: "Dec 8, 2025",
    content: "I received an upgrade to this automatic coffee machine model for the holidays and I couldn't be more thankful! I love all the different drinks I can make, and how easy it is. I don't even have to froth the milk myself because the LatteGo feature does it for me! I especially love that I can use beans or ground coffee. It's not bulky or loud and it's really easy to clean. I'm honestly in love with my new machine!",
    promotion: true,
    helpful: 0,
    unhelpful: 0,
  },
  {
    id: 3,
    rating: 5,
    title: "BEST MACHINE EVER",
    author: "Gracecol",
    date: "Dec 8, 2025",
    content: "I love this automatic coffee machine!! It is incredible. It looks so elegant and premium on my countertop and I love how easy it is to make coffee every morning. Plus, I'll save money in the long run because I don't have to buy expensive capsules anymore, just coffee beans! I can't recommend this machine enough – it's fast, simple, and most importantly, the coffee tastes fantastic!",
    promotion: true,
    helpful: 0,
    unhelpful: 0,
  },
  {
    id: 4,
    rating: 5,
    title: "Money Saver",
    author: "GDee",
    date: "Aug 25, 2025",
    content: "I absolutely love my LatteGo! It makes barista-quality lattes and cappuccinos in minutes at home and saves me so much money on going to cafes. Setup is easy, the design is elegant, and the taste is fantastic. Every cup feels like a little luxury and I couldn't imagine my mornings without it!",
    promotion: true,
    helpful: 0,
    unhelpful: 0,
  },
  {
    id: 5,
    rating: 5,
    title: "A bit of a learning curve at first, but now I love it!",
    author: "homeliving-Tester",
    date: "Dec 8, 2025",
    content: "I'll admit: In the beginning, there was a bit of a learning curve between me and the LatteGo Series 5500. But once I found my perfect ratio (less milk for a stronger kick), this machine officially turned me into the person who says, 'Don't talk to me before I've had my espresso'.",
    promotion: true,
    helpful: 0,
    unhelpful: 0,
  },
];

export default function FullReviewsSection() {
  return (
    <section className="max-w-7xl mx-auto lg:px-0 px-2 mb-10">
      <div className="bg-white rounded-2xl p-6 lg:p-10 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar: Summary */}
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Customer Reviews</h2>
            
            <div className="flex items-center gap-4 mb-2">
              <div className="text-5xl font-black text-gray-900">5.0</div>
              <div>
                <div className="flex gap-0.5 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} fill="currentColor" size={20} />)}
                </div>
                <p className="text-sm text-gray-500 font-medium mt-1">5 Reviews</p>
              </div>
            </div>
            
            <button className="w-full mt-6 py-3 border-2 border-gray-900 text-gray-900 font-bold rounded-lg hover:bg-gray-900 hover:text-white transition-all uppercase text-sm tracking-wider">
              Write a Review
            </button>

            <div className="mt-10 space-y-4">
              <p className="text-sm font-bold text-gray-900">Rated 5 stars by 100% of reviewers</p>
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-4 text-sm">
                  <span className="w-2 font-bold hover:underline cursor-pointer">{star}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gray-900" 
                      style={{ width: star === 5 ? "100%" : "0%" }}
                    />
                  </div>
                  <span className="w-10 text-gray-400 text-right">{star === 5 ? "100%" : "0%"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content: Review List */}
          <div className="lg:w-2/3">
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2 cursor-pointer group">
                  <span className="text-sm font-bold text-gray-500 group-hover:text-gray-900">Sort</span>
                  <span className="text-sm font-bold text-gray-900">Highest Rating</span>
                  <ChevronDown size={16} />
                </div>
                <div className="flex items-center gap-2 cursor-pointer group">
                  <span className="text-sm font-bold text-gray-500 group-hover:text-gray-900">Filter</span>
                  <span className="text-sm font-bold text-gray-900">Star Rating</span>
                  <ChevronDown size={16} />
                </div>
              </div>
              
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search reviews..." 
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-gray-400"
                />
              </div>
            </div>

            <p className="text-sm font-bold text-gray-900 mb-8">5 Reviews</p>

            <div className="space-y-12">
              {REVIEWS.map((review) => (
                <div key={review.id} className="group">
                  <div className="flex gap-0.5 text-amber-400 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} fill="currentColor" size={16} />)}
                  </div>
                  
                  <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-tight">{review.title}</h3>
                  
                  {review.promotion && (
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                      This review was collected as part of a promotion
                    </p>
                  )}

                  <p className="text-[15px] text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                    {review.content}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-black text-gray-900">{review.author}</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-500 font-medium">{review.date}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-bold text-gray-500">
                      <span className="text-gray-400 font-medium">Was this helpful?</span>
                      <button className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                        <ThumbsUp size={16} />
                        {review.helpful}
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                        <ThumbsUp size={16} className="rotate-180" />
                        {review.unhelpful}
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-gray-900 transition-colors ml-2">
                        <Flag size={16} />
                        <span className="hidden sm:inline">Report</span>
                      </button>
                    </div>
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
