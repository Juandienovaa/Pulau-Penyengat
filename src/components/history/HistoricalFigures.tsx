"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HISTORICAL_FIGURES } from "@/lib/data/history";
import { X, ArrowRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export function HistoricalFigures() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const selectedFigure = HISTORICAL_FIGURES.find(f => f.id === selectedId);

  return (
    <section className="py-32 bg-white dark:bg-navy-dark relative">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-bold text-5xl md:text-6xl text-navy dark:text-white mb-6"
          >
            Tokoh Sejarah
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-navy/60 dark:text-white/60 max-w-2xl mx-auto font-sans text-lg"
          >
            Mengenal lebih dekat para cendekiawan, ulama, dan pemimpin yang membentuk peradaban di Pulau Penyengat.
          </motion.p>
        </div>

        {/* Figures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HISTORICAL_FIGURES.map((figure, i) => (
            <motion.div
              key={figure.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => setSelectedId(figure.id)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl mb-6">
                <Image 
                  src={figure.imageUrl} 
                  alt={figure.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-heading font-bold text-3xl text-white mb-2 drop-shadow-md">
                    {figure.name}
                  </h3>
                  <p className="text-gold font-medium text-sm uppercase tracking-wider mb-4 drop-shadow-md">
                    {figure.title}
                  </p>
                  
                  {/* Hover Reveal Button */}
                  <div className="flex items-center gap-2 text-white/0 group-hover:text-white transition-colors duration-500">
                    <span className="text-sm font-medium">Lihat Profil</span>
                    <ArrowRight className="w-4 h-4 -translate-x-4 group-hover:translate-x-0 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal - Apple Style Sheet */}
      <AnimatePresence>
        {selectedId && selectedFigure && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50"
            />
            
            <motion.div
              initial={{ opacity: 0, y: "100%", scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: "100%", scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 w-full md:w-[800px] max-h-[90vh] md:max-h-[80vh] bg-white dark:bg-navy-dark rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex justify-end p-4 md:p-6 absolute right-0 top-0 z-10">
                <button 
                  onClick={() => setSelectedId(null)}
                  className="w-10 h-10 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/40 backdrop-blur-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto hide-scrollbar flex-1">
                <div className="relative h-64 md:h-80 w-full">
                  <Image 
                    src={selectedFigure.imageUrl}
                    alt={selectedFigure.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent dark:from-navy-dark" />
                </div>

                <div className="p-8 md:p-12 -mt-20 relative z-10">
                  <h3 className="font-heading font-bold text-4xl md:text-5xl text-navy dark:text-white mb-2">
                    {selectedFigure.name}
                  </h3>
                  <p className="text-gold font-medium uppercase tracking-widest text-sm mb-8">
                    {selectedFigure.title}
                  </p>

                  <div className="prose prose-lg dark:prose-invert text-navy/80 dark:text-white/80 font-sans leading-relaxed mb-12">
                    <p>{selectedFigure.biography}</p>
                  </div>

                  {selectedFigure.quote && (
                    <div className="bg-slate-50 dark:bg-navy p-8 rounded-2xl relative mb-12 border border-navy/5 dark:border-white/5">
                      <Quote className="absolute top-6 left-6 w-8 h-8 text-gold/20" />
                      <p className="font-heading text-2xl md:text-3xl italic text-navy dark:text-white text-center leading-snug">
                        "{selectedFigure.quote}"
                      </p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-heading font-bold text-2xl text-navy dark:text-white mb-6">Kontribusi Utama</h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedFigure.contributions.map(contrib => (
                        <span key={contrib} className="px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-medium border border-gold/20">
                          {contrib}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
