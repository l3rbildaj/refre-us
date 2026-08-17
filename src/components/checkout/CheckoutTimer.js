'use client';

import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

export default function CheckoutTimer({ initialMinutes = 10 }) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    // Check if we have a saved end time in localStorage
    const savedEndTime = localStorage.getItem('checkoutTimerEnd');
    
    if (savedEndTime) {
      const remaining = Math.floor((parseInt(savedEndTime, 10) - Date.now()) / 1000);
      if (remaining > 0) {
        setTimeLeft(remaining);
      } else {
        setTimeLeft(0);
      }
    } else {
      const endTime = Date.now() + initialMinutes * 60 * 1000;
      localStorage.setItem('checkoutTimerEnd', endTime.toString());
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialMinutes]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center justify-between bg-blue-50 border border-[#2563EB] rounded-xl p-3 mb-6 w-full shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-[#2563EB] w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
          <Lock className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-blue-900 text-[15px] leading-tight">Ihr Warenkorb ist reserviert!</span>
          <span className="text-blue-800 text-[13px] leading-tight mt-0.5">Schließen Sie Ihre Bestellung ab, bevor die Zeit abläuft.</span>
        </div>
      </div>
      
      <div className="flex flex-col items-center flex-shrink-0 ml-2">
        <div className="bg-[#2563EB] rounded-md px-3 py-1">
          <span className="text-white font-bold text-xl tabular-nums tracking-wider">
            {minutes.toString().padStart(2, '0')} : {seconds.toString().padStart(2, '0')}
          </span>
        </div>
        <span className="text-blue-900 text-[9px] font-bold mt-1 tracking-widest uppercase">Minuten</span>
      </div>
    </div>
  );
}
