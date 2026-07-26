"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function IntroStory() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Text */}
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h2 className="font-heading text-4xl md:text-5xl text-navy font-bold leading-tight mb-8">
                Lebih Dari Sekadar <span className="text-gold italic block mt-2">Pulau Kecil</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600 font-sans leading-relaxed font-medium">
                <p>
                  Pulau Penyengat bukan sekadar destinasi wisata biasa. Ini adalah sebuah mahakarya sejarah hidup, tempat di mana fondasi kebudayaan Melayu dan Bahasa Indonesia modern diletakkan.
                </p>
                <p>
                  Di pulau berukuran hanya 2 x 1 kilometer ini, para cendekiawan masa lalu menulis karya-karya sastra besar, menyusun tata bahasa, dan membangun peradaban Islam yang gilang-gemilang.
                </p>
                <p>
                  Kini, pulau ini menjadi nominator Situs Warisan Dunia UNESCO, mengundang Anda untuk menapaktilasi kejayaan sejarah nusantara.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
            >
              <Image 
                src="/images/heru-2.jpg" 
                alt="Keindahan Pulau Penyengat"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </motion.div>
            
            {/* Decorative Element */}
            <motion.div 
              initial={{ opacity: 0, rotate: -45 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -bottom-8 -left-8 w-48 h-48 border border-gray-200 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-md shadow-xl"
            >
              <span className="font-heading text-gold font-bold text-lg uppercase tracking-widest text-center px-4">
                Warisan<br/>Dunia
              </span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
