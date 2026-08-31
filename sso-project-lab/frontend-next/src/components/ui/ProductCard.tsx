import React from "react";
import Image from "next/image";
import type { Product } from "@/lib/api";

interface ProductCardProps {
  product: Product;
  imageUrl?: string;
  badge?: string;
  badgeColor?: "primary" | "secondary" | "tertiary" | "error";
}

const ProductCard = ({ product, imageUrl, badge, badgeColor = "primary" }: ProductCardProps) => {
  const badgeClasses = {
    primary: "bg-primary-container text-on-primary",
    secondary: "bg-secondary-fixed text-on-secondary-fixed",
    tertiary: "bg-[#F898A4] text-white", // specific brand pink
    error: "bg-error-container text-error",
  };

  const defaultImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuAQhbzY48TkiKNrNw2XlhswIsl8WKngr2hdK_TCoxr3egKRGcGc9ceU-1aIo9xa_mI8i0DHpk690F-TWhmHH89fnraXZYplvmWjLvh6JAHeCGV_MlhAnDZYxYYZy-NBOesrKfgFgFAFjP7vGx_T6ybUs4iBOCzyoDxFg4QjChOrKPDqj4Yg5HJnPBIxEK2XWc6EpuMIlH6MQcVtg5ktet0JYJFZeDwx33y4RGKDw3vP459p1JU44WIqeg";

  return (
    <article className="glass-panel rounded-xl overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden shrink-0">
        <img
          src={imageUrl || defaultImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {badge && (
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`${badgeClasses[badgeColor]} text-xs font-bold px-2 py-1 rounded-full`}>
              {badge}
            </span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h4 className="font-title-lg text-title-lg text-primary mb-1 line-clamp-1">{product.name}</h4>
        <p className="text-outline text-sm mb-4 line-clamp-2 flex-grow">{product.description || product.game_type || "No description available"}</p>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="font-bold text-lg text-primary">${Number(product.price).toFixed(2)}</span>
          <button 
            className="w-10 h-10 rounded-full bg-secondary-container text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Add to cart logic
              const savedCart = localStorage.getItem("cart_items");
              let cart = savedCart ? JSON.parse(savedCart) : [];
              const existingItem = cart.find((item: any) => item.id === product.id);
              if (existingItem) {
                existingItem.quantity += 1;
              } else {
                cart.push({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                  image: imageUrl || defaultImage
                });
              }
              localStorage.setItem("cart_items", JSON.stringify(cart));
              alert(`Added ${product.name} to cart`);
            }}
          >
            <span className="material-symbols-outlined text-sm">add</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
