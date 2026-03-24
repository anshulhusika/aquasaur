// import Navbar from "@/components/Navbar";
"use client";
import Image from "next/image";
import { useState } from "react";
import QuickView from "@/components/QuickView";
// ..
 
export default function Home() {
 const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    { id: 1, name: "Minimalist Watch", price: "4,999", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30" },
    { id: 2, name: "Linen Shirt", price: "2,499", img: "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8" },
    { id: 3, name: "Premium Tote", price: "1,899", img: "https://images.unsplash.com/photo-1544816155-12df9643f363" },
    { id: 4, name: "Leather Boots", price: "7,999", img: "https://images.unsplash.com/photo-1520639889313-7272170b1c39" },
  ];

  const handleOpenDrawer = (product:any) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };
  return (
    <div className="bg-[#fcfcfc] text-gray-900 selection:bg-black selection:text-white min-h-screen">
      {/* Separated Navbar Component */}
      {/* <Navbar /> */}
{/* Quick View Component Added Here */}
      <QuickView 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        product={selectedProduct} 
      />
      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden">
   <Image
    src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2067&auto=format&fit=crop" 
    alt="Minimalist Hero Background"
    fill
    priority
    className="absolute w-full h-full object-cover scale-105"
  />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />

        <div className="relative z-10 max-w-3xl text-white px-6">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
            New Collection 2026
          </span>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight">
            Elevate Your <br /> Everyday Lifestyle
          </h2>
          <p className="text-lg text-gray-200 mb-8 max-w-lg mx-auto leading-relaxed">
            Discover premium essentials designed for the modern minimalist. Quality meets aesthetic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)]">
              Shop Collection
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all">
              View Lookbook
            </button>
          </div>
        </div>
      </section>

      {/* --- CATEGORIES SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h3 className="text-3xl font-bold tracking-tight">Shop by Category</h3>
            <p className="text-gray-500 mt-2 font-medium">Curated styles for every corner of your life.</p>
          </div>
          <button className="text-sm font-bold border-b-2 border-black pb-1 hover:text-gray-500 transition-all">
            See all categories
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Fashion", img: "https://images.unsplash.com/photo-1521334884684-d80222895322" },
            { name: "Electronics", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
            { name: "Living", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511" },
            { name: "Beauty", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9" },
          ].map((cat) => (
            <div key={cat.name} className="relative aspect-[4/5] rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm">
              <Image
                src={cat.img}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-6 left-6 text-white translate-y-2 group-hover:translate-y-0 transition-all">
                <h4 className="text-xl font-bold">{cat.name}</h4>
                <p className="text-white/70 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Explore Items →</p>
              </div>
            </div>
          ))}
        </div>
      </section>
{/* Trending Section Updated */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-12">Trending Now</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group cursor-pointer"
                onClick={() => handleOpenDrawer(product)} // OPEN DRAWER ON CLICK
              >
                <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gray-50 mb-6">
                  <Image src={product.img} alt={product.name} fill className="object-cover group-hover:scale-105 transition duration-500" />
                  <button className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-white/20 backdrop-blur-xl border border-white/30 text-white py-3 rounded-2xl text-sm font-bold transition-all">
                    Quick View
                  </button>
                </div>
                <h4 className="font-bold text-lg">{product.name}</h4>
                <p className="text-gray-400 font-medium">₹{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* --- FEATURED PRODUCTS --- */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-3xl font-bold tracking-tight">Trending Now</h3>
            <a href="#" className="text-sm font-semibold text-gray-400 hover:text-black transition-colors">View all products</a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gray-50 mb-6">
                  <Image
                    src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f" 
                    alt="product"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  {/* Glassmorphism Quick Add Button */}
                  <button className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-white/20 backdrop-blur-xl border border-white/30 text-white py-3 rounded-2xl text-sm font-bold transition-all duration-300 hover:bg-white hover:text-black">
                    Quick Add +
                  </button>
                </div>
                <h4 className="font-bold text-lg group-hover:text-gray-600 transition-colors">Premium Product {item}</h4>
                <p className="text-gray-400 font-medium">₹2,499.00</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROMO BANNER --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="relative rounded-[3rem] bg-black text-white p-12 md:p-20 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 blur-[80px] rounded-full" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                <div>
                    <span className="text-yellow-400 font-bold tracking-widest text-xs uppercase mb-4 block">Limited Time Offer</span>
                    <h3 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">Summer Sale <br /> is Live.</h3>
                    <p className="text-gray-400 text-lg max-w-sm">Enjoy up to 50% off on all seasonal collections.</p>
                </div>
                <button className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">
                    Shop the Sale
                </button>
            </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black text-white pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-sm">
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-2xl font-bold tracking-tighter mb-6">ShopX</h4>
            <p className="text-gray-500 leading-relaxed">
              Elevating the shopping experience through modern aesthetics and premium quality.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-gray-300 uppercase tracking-widest text-[10px]">Shop</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
                <li className="hover:text-white transition-colors cursor-pointer">Collections</li>
                <li className="hover:text-white transition-colors cursor-pointer">New Arrivals</li>
                <li className="hover:text-white transition-colors cursor-pointer">Best Sellers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-gray-300 uppercase tracking-widest text-[10px]">Support</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
                <li className="hover:text-white transition-colors cursor-pointer">Tracking</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
                <li className="hover:text-white transition-colors cursor-pointer">FAQs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-gray-300 uppercase tracking-widest text-[10px]">Newsletter</h4>
            <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
                <input className="bg-transparent px-4 py-2 w-full outline-none text-xs" placeholder="Email..." />
                <button className="bg-white text-black px-4 py-2 rounded-full font-bold text-xs hover:bg-gray-200">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
            <p>© 2026 ShopX. All rights reserved.</p>
            <div className="flex gap-8">
                <span>Privacy</span>
                <span>Terms</span>
            </div>
        </div>
      </footer>
    </div>
  );
}