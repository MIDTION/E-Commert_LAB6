"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createOrderAPI } from "@/lib/api";

export default function CartPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Read cart items from localStorage
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart_items");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart items", e);
      }
    }
  }, []);

  const saveCart = (items: any[]) => {
    setCartItems(items);
    localStorage.setItem("cart_items", JSON.stringify(items));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    
    try {
      const items = cartItems.map(item => ({ product_id: item.id, quantity: item.quantity }));
      await createOrderAPI(items);
      setSuccess(true);
      saveCart([]); // Clear cart on success
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Checkout failed. Please ensure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = (id: number) => {
    saveCart(cartItems.filter(item => item.id !== id));
  };

  if (success) {
    return (
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-surface-container-high p-8 rounded-3xl text-center max-w-md shadow-xl border border-primary/20">
          <span className="material-symbols-outlined text-6xl text-primary mb-4">check_circle</span>
          <h2 className="font-display-lg-mobile text-primary mb-2">Order Successful!</h2>
          <p className="text-on-surface-variant mb-6">Your order has been placed. Redirecting to your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10">
      <h1 className="font-display-lg text-primary mb-8 border-b border-primary/10 pb-4">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cart Items */}
        <div className="w-full lg:w-2/3">
          {cartItems.length === 0 ? (
            <div className="glass-panel p-10 rounded-2xl text-center">
              <span className="material-symbols-outlined text-4xl opacity-50 mb-4 block">shopping_cart</span>
              <p className="font-title-lg text-on-surface-variant">Your cart is empty</p>
              <button onClick={() => router.push("/")} className="mt-4 cta-button px-6 py-2 rounded-full font-bold">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="glass-panel p-4 rounded-2xl flex items-center gap-4 border border-primary/10">
                  <div className="w-24 h-24 bg-surface-variant rounded-xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-primary text-lg">{item.name}</h3>
                    <p className="text-on-surface-variant font-bold">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button onClick={() => removeItem(item.id)} className="text-error hover:bg-error-container p-2 rounded-full transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                    <div className="flex items-center gap-2 bg-surface-variant rounded-full px-3 py-1">
                      <span className="text-sm font-bold">Qty:</span>
                      <span className="font-bold text-primary">{item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="glass-panel p-6 rounded-3xl sticky top-24 border border-primary/20 shadow-xl">
            <h3 className="font-title-lg text-primary font-bold mb-6">Order Summary</h3>
            
            <div className="flex justify-between items-center mb-3">
              <span className="text-on-surface-variant text-sm">Subtotal</span>
              <span className="font-bold text-primary">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-on-surface-variant text-sm">Tax (0%)</span>
              <span className="font-bold text-primary">$0.00</span>
            </div>
            
            <div className="h-px bg-primary/10 w-full mb-4"></div>
            
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-lg text-primary">Total</span>
              <span className="font-display-lg-mobile text-2xl text-primary">${subtotal.toFixed(2)}</span>
            </div>

            {error && (
              <div className="mb-4 bg-error-container text-error p-3 rounded-xl text-sm font-bold">
                {error}
              </div>
            )}

            <button 
              onClick={handleCheckout} 
              disabled={loading || cartItems.length === 0}
              className="w-full cta-button py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {loading ? "Processing..." : (
                <>
                  Checkout <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </>
              )}
            </button>
            <p className="text-xs text-center text-outline mt-4 flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              Secure checkout provided by SSO
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
