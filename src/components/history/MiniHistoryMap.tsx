"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Use the existing Map component but we can pass props later to filter for historical sites
const Map = dynamic(() => import("@/components/map/Map"), { 
  ssr: false,
  loading: () => <Skeleton className="w-full h-full min-h-[400px] rounded-3xl" />
});

export function MiniHistoryMap() {
  return (
    <section className="py-32 bg-white dark:bg-navy-dark relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3"
          >
            <h2 className="font-heading font-bold text-5xl md:text-6xl text-navy dark:text-white mb-6 leading-tight">
              Peta Warisan Sejarah
            </h2>
            <p className="text-navy/70 dark:text-white/70 font-sans text-lg mb-8 leading-relaxed">
              Jelajahi lokasi-lokasi bersejarah di Pulau Penyengat. Setiap titik menyimpan cerita kejayaan masa lalu yang menanti untuk diungkap.
            </p>
            <Link 
              href="/peta"
              className="inline-flex items-center gap-2 text-gold font-medium uppercase tracking-wider hover:text-navy dark:hover:text-white transition-colors group"
            >
              Buka Peta Interaktif Penuh
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/3 w-full h-[500px] relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-navy-light"
          >
            <Map />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
