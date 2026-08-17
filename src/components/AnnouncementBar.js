"use client";

import { useState, useEffect } from "react";
import { Truck, ShieldCheck, PackageCheck } from "lucide-react";

/**
 * Rotating informational bar.
 *
 * Deliberately not a countdown: the previous implementation reset to midnight
 * every day, so "sale ends in" never actually ended. Perpetual urgency timers
 * are a documented FTC dark pattern — these messages are claims the store can
 * actually stand behind.
 */
const messages = [
  { icon: Truck, text: "Free US shipping on every cylinder — no minimum" },
  { icon: ShieldCheck, text: "90-day money-back guarantee on every order" },
  { icon: PackageCheck, text: "Sealed, DOT-certified cylinders — factory direct" },
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((i) => (i + 1) % messages.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  const Icon = messages[index].icon;

  return (
    <div className="w-full bg-brand-navy px-4 py-2.5 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 text-center text-[13px] font-medium tracking-wide">
        <Icon size={15} className="shrink-0 text-brand-cyan" />
        <span>{messages[index].text}</span>
      </div>
    </div>
  );
}
