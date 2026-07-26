"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

const GALLERY_IMAGES = [
  { id: 1, src: "/images/hero-1.jpg", alt: "Masjid Raya", category: "Architecture", span: "md:col-span-2 md:row-span-2" },
  { id: 2, src: "/images/heru-2.jpg", alt: "Istana", category: "Historical", span: "md:col-span-1 md:row-span-1" },
  { id: 3, src: "/images/hero-3.jpg", alt: "Makam", category: "Culture", span: "md:col-span-1 md:row-span-2" },
  { id: 4, src: "/images/hero-1.jpg", alt: "Pompong", category: "People", span: "md:col-span-1 md:row-span-1" },
  { id: 5, src: "/images/heru-2.jpg", alt: "Benteng", category: "Historical", span: "md:col-span-2 md:row-span-1" },
];

export function MasonryGallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section className="py-32 bg-slate-50 dark:bg-navy-dark relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-bold text-5xl md:text-6xl text-navy dark:text-white mb-6"
          >
            Galeri Memori
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn("relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg", img.span)}
              onClick={() => setSelectedImg(img.src)}
            >
              <Image 
                src={img.src} 
                alt={img.alt} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                <Maximize2 className="w-8 h-8 text-white mb-2" />
                <span className="text-white font-medium tracking-wider uppercase text-sm">{img.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImg && (
        <div className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12">
          <button 
            onClick={() => setSelectedImg(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-6xl aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
            <Image src={selectedImg} alt="Enlarged" fill className="object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}
