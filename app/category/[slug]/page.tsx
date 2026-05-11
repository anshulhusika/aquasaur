"use client";
import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ALL_PRODUCTS, CATEGORIES } from "@/lib/products";
import { Product } from "@/context/CartContext";
import QuickView from "@/components/QuickView";
import { ChevronLeft } from "lucide-react";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products = ALL_PRODUCTS.filter((p) => p.category === slug);
  const meta = CATEGORIES.find(c => c.slug === slug) || { name: "Category", description: "Explore our collection.", hero: "" };

  const handleOpenDrawer = (product: Product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-gray-900 selection:bg-black selection:text-white">
      <QuickView 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        product={selectedProduct} 
      />

      {/* Category Hero Banner */}
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        {meta.hero && (
          <Image
            src={meta.hero}
            alt={meta.name}
            fill
            priority
            className="object-cover scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Link href="/" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-bold uppercase tracking-widest mb-6 transition-colors group">
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-[1]">{meta.name}</h1>
            <p className="text-white/60 mt-4 max-w-lg font-medium">{meta.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="flex justify-between items-center mb-12">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{products.length} Products</p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
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
        ) : (
          <div className="py-24 text-center bg-white rounded-[3rem] border border-dashed border-gray-200">
            <p className="text-gray-400 font-bold tracking-tight text-xl mb-2">No products yet.</p>
            <p className="text-gray-300 text-sm mb-8">Check back soon for new arrivals.</p>
            <Link href="/" className="bg-black text-white px-10 py-4 rounded-full font-bold hover:shadow-xl transition-all inline-block">
              Explore Home
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
