"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProfileAPI, getMyOrdersAPI, logoutAPI, User, Order } from "@/lib/api";
import OrderCard from "@/components/ui/OrderCard";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      try {
        const userData = await getUserProfileAPI();
        setUser(userData);
        
        try {
          const ordersData = await getMyOrdersAPI();
          setOrders(ordersData);
        } catch (err) {
          console.error("Failed to load orders", err);
        }
      } catch (err: any) {
        // If unauthorized, redirect to login
        if (err.message && err.message.toLowerCase().includes("unauthorized")) {
          router.push("/auth");
        } else {
          setError(err.message || "Failed to load profile");
        }
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [router]);

  const handleLogout = () => {
    logoutAPI();
    router.push("/auth");
  };

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-error-container text-on-error-container p-6 rounded-2xl max-w-md text-center shadow-lg">
          <span className="material-symbols-outlined text-4xl mb-2">error</span>
          <h3 className="font-title-lg mb-2">Authentication Error</h3>
          <p className="mb-4">{error || "Please log in to view your profile."}</p>
          <button onClick={() => router.push("/auth")} className="cta-button px-6 py-2 rounded-full font-bold">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar / Profile Card */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="glass-panel p-8 rounded-3xl sticky top-24 border border-primary/10 shadow-xl flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-secondary-container text-primary flex items-center justify-center text-3xl font-display-lg mb-4 shadow-inner">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <h2 className="font-display-lg-mobile text-primary mb-1">{user.username}</h2>
            <p className="text-on-surface-variant font-label-sm mb-6">{user.email}</p>
            
            <div className="w-full bg-surface-variant rounded-xl p-4 mb-6 flex justify-between items-center">
              <span className="font-bold text-sm text-on-surface-variant">Credit Balance</span>
              <span className="font-display-lg-mobile text-xl text-primary font-bold">
                ${Number(user.credit_balance || 0).toFixed(2)}
              </span>
            </div>

            <button className="w-full glass-panel-mint text-primary font-bold py-3 rounded-xl mb-3 hover:bg-primary-container hover:text-white transition-colors flex justify-center items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
              Top Up
            </button>
            <button 
              onClick={handleLogout}
              className="w-full bg-error-container text-error font-bold py-3 rounded-xl hover:bg-error hover:text-white transition-colors flex justify-center items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              Log Out
            </button>
          </div>
        </div>

        {/* Main Content / Orders */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <div className="bg-surface/50 rounded-3xl p-6 md:p-8">
            <h3 className="font-display-lg-mobile text-primary mb-6 flex items-center gap-2 border-b border-primary/10 pb-4">
              <span className="material-symbols-outlined text-3xl">receipt_long</span>
              Order History
            </h3>
            
            {orders.length === 0 ? (
              <div className="text-center py-12 glass-panel rounded-2xl border border-primary/10">
                <span className="material-symbols-outlined text-6xl text-on-surface-variant opacity-50 mb-4 block">inbox</span>
                <p className="text-on-surface-variant font-title-lg">You haven't placed any orders yet.</p>
                <button onClick={() => router.push("/")} className="mt-6 cta-button px-6 py-2 rounded-full font-bold">
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
