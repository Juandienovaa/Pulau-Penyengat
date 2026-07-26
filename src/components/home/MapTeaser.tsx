"use client";

import { motion } from "framer-motion";
import { Navigation, MapPin, Compass } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function MapTeaser() {
  return (
    <section className="relative py-32 overflow-hidden bg-white">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-200 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-gold text-sm font-bold tracking-widest uppercase mb-6"
          >
            <Compass className="w-4 h-4" /> Navigasi Digital
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-navy leading-tight mb-6"
          >
            Jelajahi Pulau dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-red-400">Peta Interaktif</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 font-sans mb-10 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
          >
            Jangan sekadar membaca sejarah. Susuri jejak langkah para raja dan pahlawan secara langsung dengan panduan navigasi GPS pintar kami.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link 
              href="/peta" 
              className="inline-flex items-center gap-3 px-8 py-5 bg-gold text-white rounded-2xl font-bold hover:bg-gold-dark hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(225,37,27,0.3)] transition-all"
            >
              <Navigation className="w-5 h-5" /> Mulai Ekspedisi Digital
            </Link>
          </motion.div>
        </div>

        {/* Visual Mockup */}
        <div className="flex-1 w-full relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative w-full aspect-[4/5] max-w-md mx-auto"
          >
            {/* Phone Frame Mockup */}
            <div className="absolute inset-0 bg-white border border-gray-200 rounded-[3rem] p-4 shadow-2xl">
              <div className="w-full h-full bg-slate-50 rounded-[2.25rem] overflow-hidden relative shadow-inner">
                {/* Simplified Map UI Graphic */}
                <div className="absolute inset-0 bg-[#E8F0F2]">
                  {/* Fake Roads */}
                  <div className="absolute top-1/4 left-0 right-1/2 h-12 bg-white transform -rotate-12" />
                  <div className="absolute top-1/3 left-1/3 bottom-0 w-8 bg-white transform rotate-12" />
                  
                  {/* Fake Markers */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>

                  <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-navy rounded-full border-2 border-white opacity-50" />
                  <div className="absolute bottom-1/4 left-1/4 w-6 h-6 bg-gray-400 rounded-full border-2 border-white opacity-50" />

                  {/* UI Overlay Graphic */}
                  <div className="absolute top-6 left-6 right-6 h-12 bg-white rounded-xl shadow-sm border border-gray-100" />
                  <div className="absolute bottom-0 left-0 right-0 h-40 bg-white rounded-t-3xl shadow-[0_-10px_20px_rgba(0,0,0,0.05)] border-t border-gray-100" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
