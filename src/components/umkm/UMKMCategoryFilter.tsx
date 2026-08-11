"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { UMKM_DATA, UMKMCategory } from "@/lib/data/umkm";

const CATEGORIES: { label: string; value: UMKMCategory | "Semua" }[] = [
  { label: "Semua", value: "Semua" },
  { label: "🍪 Kuliner", value: "Kuliner" },
  { label: "🎁 Oleh-Oleh", value: "Oleh-Oleh" },
  { label: "🧵 Kerajinan", value: "Kerajinan" },
  { label: "☕ Kopi & Minuman", value: "Kopi & Minuman" },
  { label: "🏠 Homestay", value: "Homestay" },
];

export function UMKMCategoryFilter() {
  const [activeCategory, setActiveCategory] = useState<UMKMCategory | "Semua">("Semua");

  const filteredUMKM = UMKM_DATA.filter((umkm) => 
    activeCategory === "Semua" ? true : umkm.category === activeCategory
  );

  return (
    <section id="explore" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-navy mb-6">Jelajahi Karya Lokal</h2>
          <p className="font-body text-navy-light/70 max-w-2xl mx-auto">
            Dari kuliner warisan hingga penginapan bernuansa Melayu, temukan pilihan terbaik dari masyarakat Pulau Penyengat.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-6 py-3 rounded-full font-body text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.value
                  ? "bg-gold text-white shadow-md shadow-gold/20"
                  : "bg-cream text-navy hover:bg-navy/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence>
            {filteredUMKM.map((umkm) => (
              <motion.div
                key={umkm.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative flex flex-col bg-white border border-navy/10 overflow-hidden hover:shadow-xl transition-shadow duration-500"
              >
                <Link href={`/umkm/${umkm.slug}`} className="absolute inset-0 z-10">
                  <span className="sr-only">Lihat {umkm.name}</span>
                </Link>
                
                <div className="relative h-64 w-full overflow-hidden bg-cream">
                  <Image
                    src={umkm.coverImage}
                    alt={umkm.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {umkm.halalCertified && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-green-700 uppercase tracking-wide border border-green-200 shadow-sm">
                      Halal
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <span className="font-mono text-xs tracking-wider text-gold uppercase mb-2">
                    {umkm.category}
                  </span>
                  <h3 className="font-serif text-2xl text-navy mb-3 line-clamp-1">
                    {umkm.name}
                  </h3>
                  <p className="font-body text-sm text-navy/70 line-clamp-2 mb-4 flex-grow">
                    {umkm.description}
                  </p>
                  
                  <div className="pt-4 border-t border-navy/5 flex items-center justify-between text-sm text-navy/60">
                    <span className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {umkm.address?.split(",")[0] || "Pulau Penyengat"}
                    </span>
                    <span className="font-medium text-gold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Profil 
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredUMKM.length === 0 && (
          <div className="text-center py-20 text-navy/50 font-body">
            Belum ada UMKM yang terdaftar di kategori ini.
          </div>
        )}
      </div>
    </section>
  );
}
