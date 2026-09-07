"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // List of public routes that don't require login
    const publicRoutes = ["/auth"];
    
    // Check if current path is public
    const isPublicRoute = publicRoutes.includes(pathname);

    // Get token from localStorage
    const token = localStorage.getItem("access_token");

    if (!token && !isPublicRoute) {
      // If no token and trying to access private route, redirect to login
      router.push("/auth");
    } else if (token && isPublicRoute) {
      // If has token and trying to access login, redirect to home
      router.push("/");
    } else {
      // Otherwise, allow access
      setIsChecking(false);
    }
  }, [pathname, router]);

  // While checking auth state on the client, you can show a loading state 
  // or just render nothing to prevent a flash of unauthenticated content.
  if (isChecking && pathname !== "/auth") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
