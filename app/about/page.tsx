"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Heart, Shield, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-4 block">Our Story</span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-black mb-8">Elevating the <br /> Everyday Experience.</h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
            ShopX was born out of a passion for minimalist design and premium quality. We believe that the items you use every day should be both functional and beautiful.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          {[
            { icon: Sparkles, title: "Curated Selection", desc: "Every item in our store is hand-picked for its design and durability." },
            { icon: Heart, title: "Customer First", desc: "Your satisfaction is our priority. We offer 24/7 support for all our customers." },
            { icon: Shield, title: "Quality Guaranteed", desc: "We stand by our products. If you're not happy, we'll make it right." },
            { icon: Zap, title: "Fast Delivery", desc: "Get your premium essentials delivered to your door in record time." },
          ].map((feature, i) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm"
            >
              <feature.icon className="text-black mb-6" size={32} />
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-black text-white p-12 md:p-20 rounded-[4rem] text-center overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">Ready to transform <br /> your lifestyle?</h2>
            <Link href="/shop" className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform inline-block">
              Shop the Collection
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
