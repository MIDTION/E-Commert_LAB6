"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  if (pathname === "/auth") return null;

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-primary/20 shadow-sm text-primary font-headline-md text-headline-md" id="top-app-bar">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 w-full max-w-container-max mx-auto">
        <div className="flex items-center gap-4 cursor-pointer active:scale-95 transition-transform hover:opacity-80 transition-opacity text-on-surface-variant md:hidden">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>menu</span>
        </div>
        
        <Link href="/" className="font-headline-md text-headline-md font-bold text-primary flex items-center justify-center">
          TPEJ Gaming
        </Link>

        <nav className="hidden md:flex gap-6 mr-6 items-center">
          <Link href="/" className="text-on-surface-variant hover:opacity-80 transition-opacity cursor-pointer">Store</Link>
          <Link href="/products" className="text-on-surface-variant hover:opacity-80 transition-opacity cursor-pointer">Search</Link>
          <Link href="/cart" className="text-on-surface-variant hover:opacity-80 transition-opacity cursor-pointer">Cart</Link>
          <Link href="/profile" className="text-tertiary-container font-bold hover:opacity-80 transition-opacity cursor-pointer">Profile</Link>
        </nav>

        <div className="flex items-center gap-4 cursor-pointer active:scale-95 transition-transform hover:opacity-80 transition-opacity text-on-surface-variant">
          <Link href="/cart">
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 0" }}>shopping_cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
