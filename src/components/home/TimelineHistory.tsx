"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const TIMELINE_DATA = [
  {
    year: "1803",
    title: "Mahar Kerajaan",
    description: "Pulau Penyengat dijadikan maskawin oleh Sultan Mahmud Syah kepada Engku Putri Raja Hamidah.",
    image: "/images/hero-3.jpg",
  },
  {
    year: "1832",
    title: "Masjid Raya Sultan Riau",
    description: "Pembangunan Masjid Raya yang konon menggunakan putih telur sebagai bahan perekat bangunannya.",
    image: "/images/heru-2.jpg",
  },
  {
    year: "1847",
    title: "Pusat Kebudayaan Melayu",
    description: "Menjadi pusat ilmu pengetahuan agama Islam dan kebudayaan Melayu dengan lahirnya karya Gurindam Dua Belas oleh Raja Ali Haji.",
    image: "/images/hero-1.jpg",
  },
  {
    year: "1900s",
    title: "Akhir Kerajaan Riau-Lingga",
    description: "Penghapusan Kesultanan Riau-Lingga oleh pemerintah kolonial Belanda.",
    image: "/images/hero-3.jpg",
  }
];

export function TimelineHistory() {
  const containerRef = useRef(null);

  return (
    <section className="py-32 bg-cream relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="text-sm font-bold tracking-widest text-gold uppercase block mb-4">
            Jejak Masa Lalu
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-bold text-4xl md:text-5xl text-navy mb-4"
          >
            Sejarah Panjang
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {TIMELINE_DATA.map((item, index) => (
            <motion.div 
              key={item.year}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col md:flex-row gap-8 mb-24 last:mb-0 group"
            >
              <div className="md:w-1/3 flex flex-col md:items-end text-left md:text-right pt-4">
                <span className="text-gold font-heading font-bold text-5xl md:text-6xl mb-2 group-hover:scale-105 transition-transform origin-right">
                  {item.year}
                </span>
                <h3 className="font-heading font-bold text-2xl text-navy">
                  {item.title}
                </h3>
              </div>

              <div className="relative md:w-2/3">
                <div className="absolute left-[-2rem] md:left-[-2rem] top-8 bottom-[-8rem] w-px bg-gray-300 hidden md:block group-last:hidden" />
                <div className="absolute left-[-2.25rem] md:left-[-2.25rem] top-8 w-2 h-2 rounded-full bg-gold hidden md:block group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(225,37,27,0.5)]" />
                
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group-hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  <div className="p-8">
                    <p className="text-gray-600 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
