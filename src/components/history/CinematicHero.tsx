"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";

export function CinematicHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <Image
          src="/images/hero-1.jpg"
          alt="Pulau Penyengat from above"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center text-white"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white font-sans font-bold tracking-[0.3em] uppercase text-sm mb-6"
        >
          Destinasi Sejarah Nusantara
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-heading font-bold text-6xl md:text-8xl lg:text-9xl mb-6 tracking-tight drop-shadow-2xl"
        >
          Pesona Sejarah <br/> Pulau Penyengat
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-3xl mx-auto text-xl md:text-2xl text-white/90 font-sans font-medium leading-relaxed drop-shadow-md mb-12"
        >
          Eksplorasi jejak kebudayaan Melayu dan bahasa Indonesia di pusat sejarah digital yang mendalam.
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          onClick={scrollToContent}
          className="group flex flex-col items-center gap-4 text-white/80 hover:text-white transition-colors"
        >
          <span className="text-sm font-bold uppercase tracking-widest bg-gold text-white px-6 py-3 rounded-full hover:bg-gold-dark transition-colors shadow-lg">Mulai Menjelajah</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity mt-4" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}
