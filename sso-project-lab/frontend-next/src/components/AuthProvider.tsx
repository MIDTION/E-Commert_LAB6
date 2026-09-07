"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // List of public routes that don't require login
    const publicRoutes = ["/auth", "/"];
    
    // Check if current path is public
    const isPublicRoute = publicRoutes.includes(pathname);

    // Get token from cookie directly if needed, but Next.js middleware handles redirects.
    // Client-side can just rely on middleware for protection.
    
    // We remove the blocking `isChecking` state to allow SSR to work properly.
    // This prevents the "blank white screen" issue.
  }, [pathname, router]);

  return <>{children}</>;
}
