"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  if (pathname === "/auth") return null;

  return (
    <footer className="w-full mt-auto bg-surface-container-lowest border-t border-primary/5 text-on-surface font-body-base text-body-base hidden md:block">
      <div className="w-full px-margin-desktop py-12 max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div>
          <span className="font-headline-md text-headline-md font-extrabold text-primary block mb-4">TPEJ Gaming</span>
          <p className="text-on-surface-variant text-sm mb-4">Your digital sanctuary for immersive gaming experiences.</p>
          <p className="text-on-surface-variant text-sm">© 2024 TPEJ Gaming. All rights reserved.</p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-primary mb-2">Help</h4>
          <Link href="#" className="text-on-surface-variant hover:text-tertiary transition-colors cursor-pointer w-fit">Support</Link>
          <Link href="#" className="text-on-surface-variant hover:text-tertiary transition-colors cursor-pointer w-fit">Shipping</Link>
          <Link href="#" className="text-on-surface-variant hover:text-tertiary transition-colors cursor-pointer w-fit">Returns</Link>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-primary mb-2">Legal</h4>
          <Link href="#" className="text-on-surface-variant hover:text-tertiary transition-colors cursor-pointer w-fit">Privacy Policy</Link>
          <Link href="#" className="text-on-surface-variant hover:text-tertiary transition-colors cursor-pointer w-fit">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
