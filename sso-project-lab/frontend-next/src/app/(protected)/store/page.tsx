'use client';

import { useState, useEffect } from 'react';
import { Search, Gamepad, Zap, Flame, Smartphone, Monitor, ChevronLeft, ChevronRight, Crown } from 'lucide-react';
import CheckoutModal from '@/components/store/CheckoutModal';
import ProductCard from '@/components/store/ProductCard';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { Product } from '@/types';

const PROMO_BANNERS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2000&auto=format&fit=crop',
    title: 'Level Up Your Gaming Experience',
    subtitle: 'Get the best premium accounts instantly.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2000&auto=format&fit=crop',
    title: 'Flash Sale: 50% Off Top Games',
    subtitle: 'Limited time offer on selected premium titles.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2000&auto=format&fit=crop',
    title: 'Exclusive In-Game Currency',
    subtitle: 'Top up fast and securely with our new system.'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Games', icon: Gamepad },
  { id: 'mobile', label: 'Mobile Games', icon: Smartphone },
  { id: 'pc', label: 'PC Games', icon: Monitor },
  { id: 'premium', label: 'Premium', icon: Crown },
];

export default function StorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-playing carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PROMO_BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % PROMO_BANNERS.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + PROMO_BANNERS.length) % PROMO_BANNERS.length);

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.game.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory || (activeCategory === 'premium' && p.price > 300);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      
      {/* Hero Carousel Section */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden mb-12 shadow-2xl shadow-blue-500/10 group border-4 border-white">
        {PROMO_BANNERS.map((banner, index) => (
          <div 
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img 
              src={banner.image} 
              alt={banner.title}
              className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-3000 ease-out"
            />
            {/* Bright Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/40 to-transparent mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent"></div>
            
            <div className="absolute inset-0 flex items-center p-8 md:p-16">
              <div className="max-w-2xl transform transition-transform duration-700 translate-y-0 opacity-100">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500 text-white text-sm font-bold tracking-wide mb-6 shadow-lg shadow-orange-500/30">
                  <Flame className="w-4 h-4" />
                  HOT PROMOTION
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-4 drop-shadow-xl">
                  {banner.title.split(':').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-300">:</span>}
                      {i === 0 && arr.length > 1 && <br />}
                    </span>
                  ))}
                  {banner.title.indexOf(':') === -1 && banner.title}
                </h1>
                <p className="text-blue-50 text-lg md:text-2xl max-w-xl font-medium drop-shadow-md">
                  {banner.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/30 hover:bg-white backdrop-blur-md text-white hover:text-blue-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/30 hover:bg-white backdrop-blur-md text-white hover:text-blue-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {PROMO_BANNERS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 shadow-sm ${
                index === currentSlide ? 'w-10 bg-orange-400' : 'w-2 bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Categories & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        
        {/* Category Pills */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black whitespace-nowrap transition-all duration-300 shadow-sm ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105 border-transparent' 
                    : 'bg-white border-2 border-slate-100 text-slate-500 hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-orange-500'}`} />
                {cat.label}
              </button>
            );
          })}
        </div>
        
        {/* Search Bar */}
        <div className="relative max-w-md w-full shrink-0">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-blue-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium shadow-sm hover:border-slate-200"
            placeholder="ค้นหาเกม หรือ สินค้า..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">
          {activeCategory === 'all' ? (
            <>กำลังฮิต <Flame className="w-8 h-8 text-orange-500 animate-pulse" /></>
          ) : (
            CATEGORIES.find(c => c.id === activeCategory)?.label
          )}
        </h2>
        <div className="h-1 flex-1 bg-gradient-to-r from-blue-100 via-orange-100 to-transparent rounded-full"></div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onSelect={setSelectedProduct} 
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-slate-100 border-dashed mt-4 shadow-sm">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-orange-50 mb-6 shadow-inner border border-orange-100">
            <Search className="w-10 h-10 text-orange-400" />
          </div>
          <h3 className="text-3xl font-black text-slate-800 mb-3">ไม่พบสินค้า</h3>
          <p className="text-slate-500 text-lg max-w-md mx-auto font-medium">
            เราไม่พบสินค้าที่ตรงกับ "{searchTerm}" ลองค้นหาด้วยคำอื่นดูสิ
          </p>
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
