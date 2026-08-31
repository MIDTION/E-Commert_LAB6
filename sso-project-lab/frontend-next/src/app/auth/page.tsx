"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAPI } from "@/lib/api";
import Link from "next/link";

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginAPI(username, password);
      // On success, redirect to profile
      router.push("/profile");
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] flex items-center justify-center p-4 md:p-10 overflow-hidden text-on-surface">
      {/* Ambient Background Graphic */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex items-center justify-center">
        <div className="w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-primary to-secondary blur-[120px] mix-blend-multiply"></div>
      </div>

      {/* Main 2-Column Content Container */}
      <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 z-10 items-center">
        
        {/* Left Side: Branding / Visual (Hidden on mobile) */}
        <div className="hidden md:flex flex-col justify-center h-full pr-6">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">sports_esports</span>
            <h1 className="font-headline-md text-2xl text-primary font-extrabold tracking-tight">TPEJ Gaming</h1>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-on-surface mb-6 leading-tight font-display-lg">
            Enter Your Digital Sanctuary.
          </h2>
          <p className="text-base text-on-surface-variant max-w-md leading-relaxed">
            Join the premium e-commerce experience designed for gamers. Discover curated titles, exclusive accessories, and unbeatable deals authenticated seamlessly with university SSO.
          </p>
          
          <div className="mt-8 flex items-center gap-4 text-xs font-semibold text-primary bg-primary/10 w-fit px-4 py-2 rounded-full border border-primary/20">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <span>FreeRADIUS SSO Enterprise Security Enabled</span>
          </div>
        </div>

        {/* Right Side: Auth Card */}
        <div className="glass-card rounded-2xl p-8 md:p-10 w-full max-w-md mx-auto shadow-2xl border border-primary/20 bg-white/70 backdrop-blur-xl">
          
          {/* Mobile Brand Logo */}
          <div className="md:hidden text-center mb-6">
            <h1 className="text-2xl font-extrabold text-primary tracking-tight">TPEJ Gaming</h1>
            <p className="text-xs text-on-surface-variant mt-1">Single Sign-On Authentication</p>
          </div>

          {/* Header Title */}
          <div className="border-b border-primary/20 pb-4 mb-6 text-center">
            <h3 className="text-xl font-bold text-primary">SSO Account Login</h3>
            <p className="text-xs text-on-surface-variant mt-1">Enter your FreeRADIUS student credentials</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3 rounded-xl mb-6 text-sm bg-error-container text-on-error-container border border-error/20 flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-error">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleAuth} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-2" htmlFor="username-login">
                Username / Student ID
              </label>
              <input
                id="username-login"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. student66000001"
                className="w-full bg-[#D0F4DE]/70 border-0 border-b-2 border-[#006064] px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:ring-0 focus:border-primary focus:bg-white/90 transition-all rounded-t-lg outline-none font-medium"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface" htmlFor="password-login">
                  Password
                </label>
                <a href="#" className="text-xs text-primary font-bold hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <input
                  id="password-login"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#D0F4DE]/70 border-0 border-b-2 border-[#006064] px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:ring-0 focus:border-primary focus:bg-white/90 transition-all rounded-t-lg outline-none font-medium pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary focus:outline-none"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center text-xs text-on-surface-variant cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-primary/30 text-primary focus:ring-primary bg-surface mr-2 accent-primary"
                />
                Remember this device
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cta-gradient text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:opacity-95 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 mt-2 text-base flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                  <span>Verifying with FreeRADIUS...</span>
                </>
              ) : (
                <>
                  <span>Sign In with SSO</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Info footer */}
          <div className="mt-8 pt-6 border-t border-primary/10 text-center">
            <p className="text-xs text-on-surface-variant">
              Centralized Authentication powered by <strong className="text-primary">FreeRADIUS 3.2</strong>
            </p>
          </div>

        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .glass-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .cta-gradient {
          background: linear-gradient(135deg, #d84315 0%, #bf360c 100%);
        }
      `}} />
    </div>
  );
}
