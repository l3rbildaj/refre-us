"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, ShieldCheck } from "lucide-react";
import Logo from "@/components/Logo";

// Category links deep-link into the catalogue via ?category=, which the page
// validates server-side before seeding the browser's filter state.
const navLinks = [
  { name: "All Refrigerants", href: "/products" },
  {
    name: "Residential A/C",
    href: `/products?category=${encodeURIComponent("Residential A/C")}`,
  },
  {
    name: "Commercial",
    href: `/products?category=${encodeURIComponent("Commercial Refrigeration")}`,
  },
  {
    name: "Automotive",
    href: `/products?category=${encodeURIComponent("Automotive")}`,
  },
  { name: "FAQ", href: "/#faq" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-brand-navy transition-colors hover:bg-gray-100 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Logo size="md" className="shrink-0" />

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-navy"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full bg-brand-navy/5 px-3 py-1.5 text-xs font-semibold text-brand-navy xl:flex">
            <ShieldCheck size={14} className="text-brand-cyan" />
            Secure Checkout
          </span>

          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-md text-brand-navy transition-colors hover:bg-gray-100"
            aria-label="Shopping cart"
          >
            <ShoppingCart size={21} strokeWidth={1.8} />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-cyan text-[10px] font-bold text-white">
              0
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-gray-100 bg-white px-4 py-3 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-brand-navy"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
