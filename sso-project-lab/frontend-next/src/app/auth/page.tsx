"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAPI, registerAPI } from "@/lib/api";
import Link from "next/link";

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginAPI(username, password);
      // On success, redirect to profile or home
      router.push("/profile");
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4 min-h-[calc(100vh-140px)] relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2165&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
      
      {/* Login Container */}
      <div className="relative w-full max-w-md h-[450px] z-10">
        <div className="w-full h-full glass-panel-mint rounded-3xl p-8 flex flex-col shadow-2xl border border-primary/20">
          <div className="text-center mb-8">
            <h2 className="font-display-lg-mobile text-primary mb-2">SSO Login</h2>
            <p className="text-on-surface-variant font-label-sm">Enter your university credentials (FreeRADIUS) to access your account.</p>
          </div>

          {error && (
            <div className="p-3 rounded-xl mb-4 text-sm bg-error-container text-on-error-container">
              {error}
            </div>
          )}

          <form onSubmit={handleAuth} className="flex flex-col gap-6 flex-grow">
            <div>
              <label className="block text-sm font-bold text-primary mb-2">Username</label>
              <input 
                type="text" 
                required 
                className="w-full glass-input px-4 py-3 rounded-lg focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. student66000001"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-bold text-primary">Password</label>
              </div>
              <input 
                type="password" 
                required 
                className="w-full glass-input px-4 py-3 rounded-lg focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="mt-auto w-full cta-button py-4 rounded-xl font-bold text-lg disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Sign In with SSO"}
            </button>
          </form>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </div>
  );
}
