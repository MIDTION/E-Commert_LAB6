"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const pathname = usePathname();
  if (pathname === "/auth") return null;

  return (
    <nav className="fixed bottom-0 w-full rounded-t-xl z-50 md:hidden bg-surface/60 backdrop-blur-xl border-t border-primary/10 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] text-primary font-label-sm text-label-sm-mobile">
      <div className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 pb-safe">
        <Link href="/" className="flex flex-col items-center justify-center text-tertiary font-bold scale-110 active:scale-90 transition-transform duration-200 hover:text-primary transition-colors">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
          <span className="mt-1 font-label-sm">Store</span>
        </Link>
        <Link href="/products" className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 active:scale-90 transition-transform duration-200 hover:text-primary transition-colors">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
          <span className="mt-1 font-label-sm">Search</span>
        </Link>
        <Link href="/cart" className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 active:scale-90 transition-transform duration-200 hover:text-primary transition-colors">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>shopping_cart</span>
          <span className="mt-1 font-label-sm">Cart</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 active:scale-90 transition-transform duration-200 hover:text-primary transition-colors">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>person_outline</span>
          <span className="mt-1 font-label-sm">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
