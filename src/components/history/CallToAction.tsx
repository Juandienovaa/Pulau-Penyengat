"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Navigation } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  return (
    <section className="py-32 bg-white dark:bg-navy-dark relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading font-bold text-5xl md:text-6xl text-navy dark:text-white mb-8 leading-tight"
        >
          Rasakan Langsung Sejarah <span className="text-gold italic">Pulau Penyengat</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-navy/70 dark:text-white/70 font-sans text-xl mb-12 max-w-2xl mx-auto"
        >
          Sejarah tidak hanya untuk dibaca, tetapi untuk dialami. Rencanakan perjalanan Anda sekarang.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link 
            href="/peta"
            className="w-full sm:w-auto px-8 py-4 bg-navy text-white dark:bg-white dark:text-navy font-medium rounded-full hover:bg-navy/90 dark:hover:bg-white/90 transition-all hover:scale-105 flex items-center justify-center gap-2 group shadow-xl"
          >
            <MapPin className="w-5 h-5" />
            Jelajahi Peta Interaktif
          </Link>
          
          <Link 
            href="/guide"
            className="w-full sm:w-auto px-8 py-4 bg-transparent text-navy dark:text-white font-medium rounded-full border border-navy/20 dark:border-white/20 hover:border-gold hover:text-gold dark:hover:border-gold dark:hover:text-gold transition-all flex items-center justify-center gap-2 group"
          >
            <Navigation className="w-5 h-5 group-hover:-rotate-45 transition-transform" />
            Pesan Pemandu Lokal
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
