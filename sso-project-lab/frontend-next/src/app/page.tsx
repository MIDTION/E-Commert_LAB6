"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { getProductsAPI, Product } from "@/lib/api";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProductsAPI();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient text-on-surface">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="font-display-lg-mobile md:font-display-lg text-primary">Level Up Your Arsenal</h1>
            <p className="font-body-base text-lg text-on-surface-variant max-w-xl">
              Equip yourself with the best gear in the game. Premium equipment for gamers who demand excellence.
            </p>
            <div className="pt-4 flex gap-4">
              <button className="cta-button font-bold py-3 px-8 rounded-full transition-all">Shop Now</button>
              <button className="glass-panel text-primary font-bold py-3 px-8 rounded-full hover:bg-surface-variant transition-colors">Explore</button>
            </div>
          </div>
          <div className="flex-1 relative hidden md:block">
            <div className="aspect-square bg-secondary-container/50 rounded-full blur-3xl absolute inset-10"></div>
            {/* Replace with actual hero image */}
            <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" alt="Gaming Setup" className="relative z-10 rounded-2xl shadow-2xl floating-layer object-cover aspect-video" />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-headline-md text-primary mb-2">Featured Gear</h2>
            <p className="text-on-surface-variant">Top rated equipment by pro players</p>
          </div>
          <button className="hidden md:flex items-center gap-1 text-primary font-bold hover:text-tertiary transition-colors">
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-[400px] bg-surface-variant animate-pulse rounded-xl"></div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-error-container text-on-error-container p-4 rounded-xl">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                badge={product.stock_status === "sold_out" ? "Sold Out" : undefined}
                badgeColor={product.stock_status === "sold_out" ? "error" : "primary"}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
