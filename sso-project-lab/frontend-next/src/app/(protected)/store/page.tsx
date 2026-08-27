'use client';

import { useState } from 'react';
import { Gamepad2, Search, Sparkles } from 'lucide-react';
import Image from 'next/image';
import CheckoutModal from '@/components/CheckoutModal';

// Mocked products since backend is not ready
const MOCK_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Valorant Premium Account',
    description: 'Rank: Ascendant | Skins: 40+ Premium including Elderflame & Reaver',
    price: 850,
    game: 'Valorant',
    image: 'https://images.unsplash.com/photo-1629858547285-80f4f9f6e1f0?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'prod-2',
    name: 'Genshin Impact Starter',
    description: 'AR 10 | 5-Star: Raiden Shogun, Nahida | 100+ wishes ready',
    price: 300,
    game: 'Genshin Impact',
    image: 'https://images.unsplash.com/photo-1662998782012-9c16223298a2?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'prod-3',
    name: 'Steam Global Account',
    description: 'Includes CS:GO Prime, Rust, GTA V, and Cyberpunk 2077',
    price: 1200,
    game: 'Steam',
    image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'prod-4',
    name: 'Minecraft Java Edition',
    description: 'Full Access | No Bans | Optifine Cape Included',
    price: 450,
    game: 'Minecraft',
    image: 'https://images.unsplash.com/photo-1607513746994-51f738a4c147?q=80&w=600&auto=format&fit=crop'
  },
];

export default function StorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<typeof MOCK_PRODUCTS[0] | null>(null);

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.game.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-2">
            Game Store
          </h1>
          <p className="text-slate-400 text-lg">
            Discover premium game accounts with instant delivery.
          </p>
        </div>
        
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-inner"
            placeholder="Search by game or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div 
            key={product.id}
            className="group relative bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 flex flex-col"
          >
            {/* Image Container */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-800">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
              {/* Using standard img tag for external mockup URLs without configuring next.config.js domains */}
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 z-20 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-indigo-300 border border-indigo-500/20 flex items-center gap-1">
                <Gamepad2 className="w-3 h-3" />
                {product.game}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-indigo-400 transition-colors">
                {product.name}
              </h3>
              <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Price</span>
                  <span className="text-2xl font-black text-emerald-400 flex items-center gap-1">
                    {product.price.toLocaleString()} <span className="text-sm font-bold text-emerald-500/70">฿</span>
                  </span>
                </div>
                
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="relative overflow-hidden bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-indigo-600/20 active:scale-95 group/btn"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-200 group-hover/btn:text-white" />
                    Buy Now
                  </span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-4">
            <Search className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-xl font-medium text-slate-300 mb-1">No products found</h3>
          <p className="text-slate-500">Try adjusting your search terms.</p>
        </div>
      )}

      {/* Checkout Modal */}
      {selectedProduct && (
        <CheckoutModal 
          product={selectedProduct} 
          isOpen={!!selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}
