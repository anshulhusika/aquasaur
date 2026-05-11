"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { CATEGORIES } from "@/lib/products";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);

  const { cart } = useCart();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:4001/api/auth/me", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:4001/api/auth/logout", { method: "POST", credentials: "include" });
      if (res.ok) {
        setUser(null);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileCatOpen(false);
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-[60] transition-all duration-500 ease-in-out pointer-events-none ${
          scrolled ? "top-4 px-4 md:top-6 md:px-6" : "top-0 px-0"
        }`}
      >
        <nav
          className={`pointer-events-auto mx-auto flex items-center justify-between transition-all duration-500 ease-in-out ${
            scrolled
              ? "max-w-5xl rounded-full bg-white/70 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] px-5 py-2.5 md:px-8 md:py-3"
              : "max-w-full bg-transparent px-5 py-4 md:px-10 md:py-6"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <h1
              className={`font-bold tracking-tighter transition-all duration-300 cursor-pointer ${
                scrolled ? "text-lg md:text-xl text-black" : "text-xl md:text-2xl text-white"
              }`}
            >
              ShopX
            </h1>
          </Link>

          {/* Desktop Navigation Links */}
          <div
            className={`hidden md:flex items-center gap-10 text-sm font-medium transition-colors duration-300 ${
              scrolled ? "text-gray-600" : "text-white/90"
            }`}
          >
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>

            {/* Categories Dropdown */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 hover:text-black transition-colors outline-none">
                Categories
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="w-48 bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-2 overflow-hidden">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
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

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5">
            {user ? (
              <div className="flex items-center gap-3">
                <span className={`text-sm ${scrolled ? "text-gray-600" : "text-white/90"}`}>
                  Welcome, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 shadow-sm ${
                    scrolled
                      ? "bg-gray-200 text-black hover:bg-gray-300"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login">
                <button
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 shadow-sm ${
                    scrolled
                      ? "bg-gray-200 text-black hover:bg-gray-300"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  Login
                </button>
              </Link>
            )}
            <Link href="/cart">
              <button
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 shadow-sm flex items-center gap-2 ${
                  scrolled
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Bag ({itemCount})
              </button>
            </Link>
          </div>

          {/* Mobile: Bag + Hamburger */}
          <div className="flex md:hidden items-center gap-3 relative z-10">
            <Link href="/cart">
              <button
                className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                  scrolled
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {itemCount}
              </button>
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2.5 rounded-full transition-all active:scale-90 ${
                scrolled
                  ? "text-black bg-gray-100"
                  : "text-white bg-white/20 backdrop-blur-sm"
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-white"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <Link href="/" onClick={closeMobile}>
                  <h1 className="text-xl font-bold tracking-tighter">ShopX</h1>
                </Link>
                <button onClick={closeMobile} className="p-2" aria-label="Close menu">
                  <X size={22} />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="space-y-1">
                  <Link href="/" onClick={closeMobile} className="block py-4 text-2xl font-bold tracking-tight text-gray-900 border-b border-gray-50">
                    Home
                  </Link>
                  <Link href="/shop" onClick={closeMobile} className="block py-4 text-2xl font-bold tracking-tight text-gray-900 border-b border-gray-50">
                    Shop
                  </Link>

                  {/* Categories Accordion */}
                  <div className="border-b border-gray-50">
                    <button
                      onClick={() => setMobileCatOpen(!mobileCatOpen)}
                      className="flex items-center justify-between w-full py-4 text-2xl font-bold tracking-tight text-gray-900"
                    >
                      Categories
                      <ChevronDown
                        size={20}
                        className={`transition-transform duration-300 ${mobileCatOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileCatOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-4 space-y-1">
                            {CATEGORIES.map((cat) => (
                              <Link
                                key={cat.slug}
                                href={`/category/${cat.slug}`}
                                onClick={closeMobile}
                                className="flex items-center gap-3 py-3 text-lg font-medium text-gray-500 hover:text-black transition-colors"
                              >
                                <ChevronRight size={16} />
                                {cat.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link href="/about" onClick={closeMobile} className="block py-4 text-2xl font-bold tracking-tight text-gray-900 border-b border-gray-50">
                    About
                  </Link>
                </div>
              </div>

              {/* Mobile Footer Actions */}
              <div className="px-6 py-6 border-t border-gray-100 space-y-3">
                {user ? (
                  <>
                    <p className="text-sm text-gray-500 font-medium mb-2">Signed in as <span className="text-black font-bold">{user.name}</span></p>
                    <button
                      onClick={() => { handleLogout(); closeMobile(); }}
                      className="w-full py-4 rounded-2xl bg-gray-100 text-black font-bold text-sm hover:bg-gray-200 transition-all"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link href="/login" onClick={closeMobile} className="block">
                    <button className="w-full py-4 rounded-2xl bg-black text-white font-bold text-sm hover:bg-gray-800 transition-all">
                      Login / Sign Up
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}