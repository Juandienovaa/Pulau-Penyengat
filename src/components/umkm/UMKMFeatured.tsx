"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES: { label: string; value: string }[] = [
  { label: "Semua", value: "Semua" },
  { label: "Kuliner", value: "Kuliner" },
  { label: "Oleh-Oleh", value: "Oleh-Oleh" },
  { label: "Kerajinan", value: "Kerajinan" },
  { label: "Kopi & Minuman", value: "Kopi & Minuman" },
  { label: "Homestay", value: "Homestay" },
];

export function UMKMFeatured({ initialData }: { initialData: any[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("Semua");

  const filteredUMKM = initialData.filter((umkm) => 
    activeCategory === "Semua" ? true : umkm.category === activeCategory
  );

  return (
    <section id="featured-umkm" className="py-24 bg-cream relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-navy mb-4">Temukan Pelaku Lokal</h2>
            <p className="font-body text-navy/60 max-w-xl text-lg font-light">
              Mengenal lebih dekat mereka yang menjaga warisan dan menghidupkan ekonomi Pulau Penyengat.
            </p>
          </div>
          
          {/* Category Filter Desktop */}
          <div className="hidden md:flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300 border ${
                  activeCategory === cat.value
                    ? "bg-navy text-white border-navy"
                    : "bg-transparent text-navy hover:bg-navy/5 border-navy/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Mobile (Scrollable) */}
        <div className="md:hidden flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`flex-none px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat.value
                  ? "bg-navy text-white border-navy"
                  : "bg-transparent text-navy border-navy/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* The UMKM Bento Grid */}
        {filteredUMKM.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 pb-8 md:pb-0"
          >
            <AnimatePresence>
              {filteredUMKM.map((umkm, index) => {
                // Bento logic: first item full width on mobile, next two half width, etc.
                const isFeaturedMobile = index % 3 === 0;
                
                return (
                  <motion.div
                    key={umkm.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={`group bg-white border border-black/5 overflow-hidden rounded-[4px] hover:shadow-xl transition-shadow duration-500 flex flex-col ${
                      isFeaturedMobile ? "col-span-2 md:col-span-1" : "col-span-1 md:col-span-1"
                    }`}
                  >
                    <div className={`relative w-full overflow-hidden bg-navy/5 ${isFeaturedMobile ? 'h-56 md:h-60' : 'h-36 md:h-60'}`}>
                      <Image
                        src={umkm.cover_image || "/images/umkm/deram-deram-cover.jpg"}
                        alt={umkm.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    
                    <div className={`p-4 md:p-8 flex flex-col flex-grow`}>
                      <div className="flex justify-between items-start mb-2 md:mb-4">
                        <span className="font-heading text-[9px] md:text-[10px] tracking-widest text-gold uppercase font-bold">
                          {umkm.category}
                        </span>
                      </div>
                      
                      <h3 className={`font-serif text-navy mb-2 md:mb-3 ${isFeaturedMobile ? 'text-2xl' : 'text-lg md:text-2xl'}`}>
                        {umkm.name}
                      </h3>
                      
                      {/* Only show description on large screens or featured mobile cards */}
                      <p className={`font-body text-xs md:text-sm text-navy/70 line-clamp-2 md:line-clamp-3 flex-grow font-light ${isFeaturedMobile ? 'mb-4 md:mb-6' : 'hidden md:flex mb-6'}`}>
                        {umkm.description}
                      </p>
                      
                      <div className="pt-3 md:pt-5 border-t border-black/5 flex items-center justify-between mt-auto">
                        <span className={`font-body text-[10px] md:text-xs text-navy/50 items-center gap-1.5 ${isFeaturedMobile ? 'flex' : 'hidden md:flex'}`}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="md:w-[14px] md:h-[14px]">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          Buka
                        </span>
                        <Link 
                          href={`/umkm/${umkm.slug}`}
                          className={`font-heading text-[9px] md:text-[10px] uppercase font-bold text-navy group-hover:text-gold transition-colors flex items-center gap-1 ${!isFeaturedMobile && 'w-full justify-between'}`}
                        >
                          Lihat <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-24 text-center">
            <h3 className="font-serif text-2xl text-navy mb-2">Belum ada cerita yang ditambahkan.</h3>
            <p className="font-body text-navy/60 mb-8">Kategori ini sedang dalam proses pembaruan data.</p>
            <Link href="/cagar-budaya" className="px-8 py-3 bg-navy text-white font-heading text-[11px] uppercase tracking-widest font-bold inline-block hover:bg-navy-light transition-colors">
              Jelajahi Cagar Budaya
            </Link>
          </div>
        )}
        
      </div>
    </section>
  );
}
