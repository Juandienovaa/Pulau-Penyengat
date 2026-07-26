"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HERITAGE_SITES } from "@/lib/data/heritage";
import { X, ArrowRight, MapPin, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { InteractiveArchitecture } from "./InteractiveArchitecture";

export function HeritageGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedSite = HERITAGE_SITES.find(s => s.id === selectedId);

  return (
    <section className="py-32 bg-cream relative">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading font-bold text-5xl md:text-6xl text-navy mb-4"
            >
              Koleksi Cagar Budaya
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 font-sans text-lg max-w-2xl font-medium"
            >
              Setiap sudut pulau menyimpan mahakarya arsitektur yang merekam jejak kejayaan peradaban Melayu Nusantara.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200"
          >
            <Search className="w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari situs warisan..." 
              className="bg-transparent border-none outline-none text-navy placeholder:text-gray-400 font-sans"
            />
          </motion.div>
        </div>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HERITAGE_SITES.map((site, i) => (
            <motion.div
              layoutId={`card-container-${site.id}`}
              key={site.id}
              onClick={() => setSelectedId(site.id)}
              className="group cursor-pointer flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-gold/30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <motion.div layoutId={`card-image-${site.id}`} className="relative aspect-[4/3] w-full overflow-hidden">
                <Image 
                  src={site.heroImage}
                  alt={site.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/20">
                  <span className="text-xs font-medium tracking-wider text-white uppercase">{site.category}</span>
                </div>
              </motion.div>
              
              <div className="p-8 flex-1 flex flex-col">
                <motion.div layoutId={`card-meta-${site.id}`} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gold mb-3">
                  <span>{site.constructionYear}</span>
                  <span className="w-1 h-1 rounded-full bg-gold/50" />
                  <span>{site.architectureStyle}</span>
                </motion.div>
                
                <motion.h3 layoutId={`card-title-${site.id}`} className="font-heading font-bold text-3xl text-navy mb-4 group-hover:text-gold transition-colors">
                  {site.name}
                </motion.h3>
                
                <motion.p layoutId={`card-desc-${site.id}`} className="text-gray-600 font-sans line-clamp-2 mb-6 flex-1 font-medium">
                  {site.shortDescription}
                </motion.p>
                
                <div className="flex items-center gap-2 text-navy text-sm font-bold uppercase tracking-wider group-hover:text-gold transition-colors mt-auto">
                  <span>Eksplorasi</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded View (Apple-Style) */}
      <AnimatePresence>
        {selectedId && selectedSite && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 cursor-pointer"
            />
            
            <motion.div
              layoutId={`card-container-${selectedSite.id}`}
              className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 w-full md:w-[900px] h-[90vh] md:h-[85vh] bg-white md:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header Image */}
              <div className="relative h-[40vh] w-full shrink-0">
                <motion.div layoutId={`card-image-${selectedSite.id}`} className="absolute inset-0">
                  <Image 
                    src={selectedSite.heroImage}
                    alt={selectedSite.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                </motion.div>
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 w-12 h-12 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors z-10"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto hide-scrollbar bg-cream">
                <div className="p-8 md:p-12 -mt-20 relative z-10">
                  
                  <motion.div layoutId={`card-meta-${selectedSite.id}`} className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-gold mb-4 drop-shadow-md">
                    <span>{selectedSite.constructionYear}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span>{selectedSite.architectureStyle}</span>
                  </motion.div>

                  <motion.h3 layoutId={`card-title-${selectedSite.id}`} className="font-heading font-bold text-4xl md:text-5xl text-white mb-12 drop-shadow-lg">
                    {selectedSite.name}
                  </motion.h3>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-12"
                  >
                    <div className="md:col-span-2 space-y-8 text-gray-700 font-sans font-medium leading-relaxed text-lg">
                      <p>{selectedSite.fullDescription}</p>
                      <p>{selectedSite.culturalSignificance}</p>
                      
                      <div className="p-6 bg-white rounded-2xl border border-gray-100 mt-8 shadow-sm">
                        <h4 className="font-heading font-bold text-2xl text-navy mb-4">Riwayat Restorasi</h4>
                        <p className="text-base text-gray-600">{selectedSite.restorationHistory}</p>
                      </div>
                    </div>

                    <div className="md:col-span-1 space-y-8">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Kategori</h4>
                        <span className="inline-block px-4 py-2 bg-white rounded-full text-sm font-bold text-navy border border-gray-100 shadow-sm">
                          {selectedSite.category}
                        </span>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Tokoh Terkait</h4>
                        <div className="flex flex-col gap-3">
                          {selectedSite.historicalFigures.map((fig: string) => (
                            <span key={fig} className="text-sm font-bold text-navy flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-100 shadow-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                              {fig}
                            </span>
                          ))}
                        </div>
                      </div>


                      <div className="pt-8 border-t border-gray-200">
                        <button className="w-full py-4 bg-navy text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gold transition-colors shadow-lg">
                          <MapPin className="w-4 h-4" />
                          Navigasi ke Lokasi
                        </button>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Architecture Explorer (only if data exists) */}
                  {selectedSite.architectureBlueprint && selectedSite.architectureHotspots && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-16"
                    >
                      <h4 className="font-heading font-bold text-3xl text-navy mb-6">Eksplorasi Arsitektur</h4>
                      <InteractiveArchitecture 
                        imageUrl={selectedSite.architectureBlueprint} 
                        hotspots={selectedSite.architectureHotspots} 
                      />
                    </motion.div>
                  )}
                  
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
