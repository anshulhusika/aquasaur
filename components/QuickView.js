"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/context/CartContext"; 
import { X } from "lucide-react";

export default function QuickView({ isOpen, onClose, product }) {
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
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
            // Use a simple slide-in that works for both X and Y
            initial={{ y: "100%", x: 0 }} 
            animate={{ 
              y: 0, 
              x: 0,
              transition: { type: "spring", damping: 25, stiffness: 200 } 
            }}
            exit={{ y: "100%", x: 0 }}
            // Tailwind handles the desktop/mobile switch:
            // Mobile: Bottom-0, Desktop: Right-0, Top-0
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
// "use client";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";

// export default function QuickView({ isOpen, onClose, product }) {
//   if (!product) return null;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Dark Blurred Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] cursor-crosshair"
//           />

//           {/* Side Drawer */}
//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "spring", damping: 25, stiffness: 200 }}
//             className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl p-8 overflow-y-auto"
//           >
//             {/* Close Button */}
//             <button 
//               onClick={onClose}
//               className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>

//             {/* Product Image Container */}
//             <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-8 bg-gray-50 mt-10">
//               <Image
//                 src={product.img || "https://images.unsplash.com/photo-1512436991641-6745cdb1723f"}
//                 alt={product.name}
//                 fill
//                 className="object-cover"
//               />
//             </div>

//             {/* Product Info */}
//             <div className="space-y-6">
//               <div>
//                 <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Premium Collection</span>
//                 <h3 className="text-3xl font-bold mt-2 tracking-tight">{product.name}</h3>
//                 <p className="text-2xl font-medium text-gray-900 mt-2">₹{product.price}.00</p>
//               </div>

//               <p className="text-gray-500 leading-relaxed">
//                 Handcrafted with premium materials, this essential piece blends timeless aesthetic with modern functionality. Perfect for your everyday lifestyle.
//               </p>

//               {/* Size Selector */}
//               <div>
//                 <h4 className="text-sm font-bold mb-3 uppercase tracking-wider">Select Size</h4>
//                 <div className="flex gap-3">
//                   {["S", "M", "L", "XL"].map((size) => (
//                     <button key={size} className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center font-bold hover:border-black transition-all active:scale-90">
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="pt-6 space-y-4">
//                 <button className="w-full bg-black text-white py-5 rounded-full font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-xl">
//                   Add to Cart
//                 </button>
//                 <button className="w-full bg-white border border-gray-200 text-black py-5 rounded-full font-bold hover:bg-gray-50 transition-all">
//                   Wishlist
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }