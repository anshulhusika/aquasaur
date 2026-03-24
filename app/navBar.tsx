"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const categories = [
  { name: "Men's Fashion", href: "/category/men" },
  { name: "Women's Fashion", href: "/category/women" },
  { name: "Electronics", href: "/category/electronics" },
  { name: "Home Decor", href: "/category/home-decor" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  
  // 1. Hook into your Global Cart State
  const { cart } = useCart() as { cart: any[] }; 
  
  // 2. Calculate the total number of items in the bag
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled ? "top-6 px-6" : "top-0 px-0"
      }`}
    >
      <nav
        className={`mx-auto flex items-center justify-between transition-all duration-500 ease-in-out ${
          scrolled
            ? "max-w-5xl rounded-full bg-white/70 backdrop-blur-lg  shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] px-8 py-3"
            : "max-w-full bg-transparent px-10 py-6"
        }`}
      >
        {/* Logo */}
        <Link href="/">
          <h1 className={`font-bold tracking-tighter transition-all duration-300 cursor-pointer ${
            scrolled ? "text-xl text-black" : "text-2xl text-white"
          }`}>
            ShopX
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className={`hidden md:flex items-center gap-10 text-sm font-medium transition-colors duration-300 ${
          scrolled ? "text-gray-600" : "text-white/90"
        }`}>
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>

          {/* --- CATEGORIES WITH SUB-MENU --- */}
          <div className="relative group py-2">
            <button className="flex items-center gap-1 hover:text-black transition-colors outline-none">
              Categories
              <svg className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Sub-menu Dropdown */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="w-48 bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-2 overflow-hidden">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-black hover:text-white rounded-xl transition-all"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/about" className="hover:text-black transition-colors">About</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <Link href="/cart">
            <button className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 shadow-sm flex items-center gap-2 ${
              scrolled 
              ? "bg-black text-white hover:bg-gray-800" 
              : "bg-white text-black hover:bg-gray-100"
            }`}>
              {/* Added a Bag Icon for better UI */}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Bag ({itemCount})
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}