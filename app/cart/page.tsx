"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart() as any; 
  const [isCheckout, setIsCheckout] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const SHIPPING_THRESHOLD = 5000;
  const subtotal = cart.reduce((acc: any, item: any) => {
    const numericPrice = parseInt(item.price.replace(/,/g, ""), 10) || 0;
    return acc + numericPrice * item.quantity;
  }, 0);

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "FIRST10") setDiscount(subtotal * 0.1);
    else alert("Invalid Promo Code");
  };

  const total = subtotal - discount;
  const progressToFreeShipping = Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100);

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* LEFT SECTION */}
          <div className="flex-[2]">
            {!isCheckout ? (
              <>
                <header className="flex justify-between items-end mb-10 border-b border-gray-200 pb-6">
                  <h1 className="text-4xl font-bold tracking-tight text-[#1a1a1a]">Bag</h1>
                  <p className="text-gray-500 font-semibold">{cart.length} Items</p>
                </header>

                {cart.length === 0 ? (
                  <div className="py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-gray-200">
                    <p className="text-gray-500 mb-6 font-medium">Your bag is empty.</p>
                    <Link href="/" className="bg-black text-white px-10 py-4 rounded-full font-bold inline-block">Explore Collection</Link>
                  </div>
                ) : (
                  <div className="space-y-10">
                    {cart.map((item: any) => (
                      <div key={item.id} className="flex gap-8 group">
                        <div className="relative w-32 h-40 rounded-3xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-50">
                          <Image src={item.img} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex flex-col justify-between py-2 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-xl text-[#1a1a1a] mb-1">{item.name}</h3>
                              <p className="text-gray-500 text-sm font-medium">Standard Edition</p>
                            </div>
                            <p className="font-bold text-lg text-[#1a1a1a]">₹{item.price}</p>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            {/* QUANTITY CONTROLS */}
                            <div className="flex items-center border border-gray-200 rounded-full px-4 py-1.5 gap-4 text-sm font-bold text-[#1a1a1a]">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="text-gray-400 hover:text-black transition-colors px-1"
                              >-</button>
                              <span className="w-4 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="text-gray-400 hover:text-black transition-colors px-1"
                              >+</button>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-red-500"
                            >Remove</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              /* ADDRESS FORM SECTION */
              <div className="animate-slide-up">
                <button onClick={() => setIsCheckout(false)} className="text-sm font-bold text-gray-400 mb-6 flex items-center gap-2">
                  ← Back to Bag
                </button>
                <h2 className="text-3xl font-bold mb-8 tracking-tight">Shipping Details</h2>
                <div className="grid grid-cols-2 gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-400 uppercase px-2">First Name</label>
                    <input type="text" className="bg-gray-50 border-none rounded-2xl px-6 py-4 text-[#1a1a1a] focus:ring-2 focus:ring-black outline-none" placeholder="John" />
                  </div>
                  <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-400 uppercase px-2">Last Name</label>
                    <input type="text" className="bg-gray-50 border-none rounded-2xl px-6 py-4 text-[#1a1a1a] focus:ring-2 focus:ring-black outline-none" placeholder="Doe" />
                  </div>
                  <div className="col-span-2 flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-400 uppercase px-2">Street Address</label>
                    <input type="text" className="bg-gray-50 border-none rounded-2xl px-6 py-4 text-[#1a1a1a] focus:ring-2 focus:ring-black outline-none" placeholder="123 Luxury Lane" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-400 uppercase px-2">City</label>
                    <input type="text" className="bg-gray-50 border-none rounded-2xl px-6 py-4 text-[#1a1a1a] focus:ring-2 focus:ring-black outline-none" placeholder="Mumbai" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-400 uppercase px-2">Pincode</label>
                    <input type="text" className="bg-gray-50 border-none rounded-2xl px-6 py-4 text-[#1a1a1a] focus:ring-2 focus:ring-black outline-none" placeholder="400001" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SUMMARY (Remains largely the same, but button changes) */}
          <div className="flex-1">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 sticky top-32">
              <div className="mb-8">
                <div className="flex justify-between text-sm font-bold mb-3">
                  <span className="text-gray-600">Free Shipping Progress</span>
                  <span className={subtotal >= SHIPPING_THRESHOLD ? "text-green-600" : "text-[#1a1a1a]"}>
                    {subtotal >= SHIPPING_THRESHOLD ? "Unlocked" : `₹${SHIPPING_THRESHOLD - subtotal} more to go`}
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-black transition-all duration-1000" style={{ width: `${progressToFreeShipping}%` }} />
                </div>
              </div>

              <h4 className="font-bold text-2xl mb-8 text-[#1a1a1a] tracking-tight">Summary</h4>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600 font-semibold">
                  <span>Subtotal</span>
                  <span className="text-[#1a1a1a]">₹{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Discount (FIRST10)</span>
                    <span>- ₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600 font-semibold">
                  <span>Estimated Shipping</span>
                  <span className="text-[#1a1a1a]">{subtotal >= SHIPPING_THRESHOLD ? "Free" : "₹150"}</span>
                </div>
              </div>

              {!isCheckout && (
                <div className="relative mb-8">
                  <input 
                    type="text" 
                    placeholder="Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-[#1a1a1a] outline-none"
                  />
                  <button onClick={applyPromo} className="absolute right-2 top-2 bottom-2 px-4 bg-black text-white rounded-xl text-xs font-bold">Apply</button>
                </div>
              )}

              <div className="border-t border-gray-100 pt-8 flex justify-between items-center mb-10">
                <span className="font-bold text-xl text-gray-600">Total</span>
                <span className="font-bold text-3xl tracking-tighter text-[#1a1a1a]">₹{total.toLocaleString()}</span>
              </div>

              <button 
                onClick={() => setIsCheckout(true)}
                className="w-full bg-[#1a1a1a] text-white py-5 rounded-[1.5rem] font-bold hover:shadow-xl transition-all active:scale-95 text-lg"
              >
                {isCheckout ? "Complete Purchase" : "Go to Checkout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}