"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCart, Product } from "@/context/CartContext"; 
import { useToast } from "@/context/ToastContext";
import { X } from "lucide-react";

interface QuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function QuickView({ isOpen, onClose, product }: QuickViewProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`${product.name} added to bag!`);
    onClose(); 
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ y: "100%", x: 0 }} 
            animate={{ 
              y: 0, 
              x: 0,
              transition: { type: "spring", damping: 25, stiffness: 200 } 
            }}
            exit={{ y: "100%", x: 0 }}
            className="fixed bottom-0 left-0 right-0 md:left-auto md:top-0 md:bottom-0 md:right-0 
                       h-[85vh] md:h-full w-full md:max-w-md bg-white z-[101] shadow-2xl 
                       rounded-t-[2.5rem] md:rounded-t-none md:rounded-l-[2.5rem] 
                       p-8 overflow-y-auto flex flex-col"
          >
            {/* Mobile Handle Bar */}
            <div className="md:hidden w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 shrink-0" />

            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-20"
            >
              <X size={24} />
            </button>

            {/* Product Content Area */}
            <div className="flex-1">
              {/* Product Image */}
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-8 bg-gray-50 mt-4 shadow-sm">
                <Image 
                  src={product.img} 
                  alt={product.name} 
                  fill 
                  className="object-cover"
                  priority 
                />
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Premium Selection</span>
                  <h3 className="text-3xl font-bold tracking-tight mt-1">{product.name}</h3>
                  <p className="text-2xl font-semibold text-black mt-2">₹{product.price}</p>
                </div>

                <p className="text-gray-500 leading-relaxed text-sm">
                  Tailored for a modern silhouette, this piece features high-quality breathable fabric and minimalist detailing.
                </p>
              </div>
            </div>

            {/* Fixed Action Buttons at the bottom of drawer */}
            <div className="pt-6 space-y-3 mt-auto">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-5 rounded-full font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-xl flex items-center justify-center gap-2"
              >
                Add to Cart
              </button>
              <button 
                onClick={onClose}
                className="w-full bg-white border border-gray-100 text-black py-4 rounded-full font-bold hover:bg-gray-50 transition-all text-sm"
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
