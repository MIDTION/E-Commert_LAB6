import { Gamepad2, ChevronRight, Zap } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <div 
      className="group relative bg-white dark:bg-[#151821] border border-slate-200/60 dark:border-slate-800/60 rounded-3xl overflow-hidden hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(99,102,241,0.15)] hover:-translate-y-1.5 flex flex-col cursor-pointer" 
      onClick={() => onSelect(product)}
    >
      
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100 dark:bg-[#1a1d27]">
        {/* Sleek Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
        
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Category Tag (Top Right) */}
        <div className="absolute top-3 right-3 z-20 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-white shadow-sm border border-white/10 flex items-center gap-1.5">
          <Gamepad2 className="w-3 h-3 text-indigo-400" />
          <span className="uppercase tracking-wider">{product.category || product.game}</span>
        </div>

        {/* Floating Title (Inside Image) */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-xl font-bold text-white leading-tight mb-2 drop-shadow-md line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            <span className="flex items-center gap-1 text-[10px] font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 rounded uppercase tracking-wider">
              <Zap className="w-3 h-3 fill-current" /> Instant
            </span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-5 py-4 flex flex-col flex-1 bg-white dark:bg-[#151821]">
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-widest mb-0.5">Start From</span>
            <span className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-1">
              <span className="text-emerald-500 dark:text-emerald-400">฿</span>{product.price.toLocaleString()}
            </span>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-indigo-500/30 group-hover:scale-110">
            <ChevronRight className="w-5 h-5 ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
