"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ALL_PRODUCTS, CATEGORIES } from "@/lib/products";
import { Product } from "@/context/CartContext";
import QuickView from "@/components/QuickView";

export default function ShopPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProducts = activeCategory === "all" 
    ? ALL_PRODUCTS 
    : ALL_PRODUCTS.filter(p => p.category === activeCategory);

  const handleOpenDrawer = (product: Product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-32 pb-20 px-6 md:px-12">
      <QuickView 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        product={selectedProduct} 
      />

      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-black mb-6">Our Shop</h1>
          <p className="text-gray-500 max-w-lg font-medium">Browse our full collection of premium essentials.</p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button 
            onClick={() => setActiveCategory("all")}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
              activeCategory === "all" ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All Products
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat.slug ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-gray-50 mb-6 shadow-sm">
                <Image
                  src={product.img} 
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <button 
                  onClick={() => handleOpenDrawer(product)}
                  className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-white/20 backdrop-blur-xl border border-white/30 text-white py-3 rounded-2xl text-sm font-bold transition-all duration-300 hover:bg-white hover:text-black"
                >
                  Quick View
                </button>
              </div>
              <h4 className="font-bold text-lg group-hover:text-gray-600 transition-colors">{product.name}</h4>
              <p className="text-gray-400 font-medium">₹{product.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
