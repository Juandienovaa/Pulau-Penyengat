"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowDown } from "lucide-react";
import { UMKM_DATA } from "@/lib/data/umkm";

const SLIDES = [
  {
    id: 1,
    eyebrow: "KARYA & RASA LOKAL",
    title: "Belanja Cerita<br/>dari Pulau Penyengat",
    subtitle: "Temukan rasa, karya, dan cerita yang tumbuh dari tangan masyarakat Pulau Penyengat.",
    image: "/images/hero-3.jpg", // From existing homepage
    ctaPrimary: "Jelajahi UMKM",
    ctaPrimaryHref: "#explore",
    ctaSecondary: "Lihat Cerita Lokal ↓",
    ctaSecondaryHref: "#story",
  },
  {
    id: 2,
    eyebrow: "WARISAN KULINER",
    title: "Rasa yang Diwariskan",
    subtitle: "Nikmati Deram-deram, Epok-epok, dan sajian autentik lainnya langsung dari pembuatnya.",
    image: "/images/hero-3.jpg",
    ctaPrimary: "Lihat Kuliner",
    ctaPrimaryHref: "#explore",
    ctaSecondary: "Temukan Lokasi ↓",
    ctaSecondaryHref: "#map",
  },
  {
    id: 3,
    eyebrow: "EKONOMI BUDAYA",
    title: "Karya Tangan Masyarakat",
    subtitle: "Batik motif Bunga Raya dan kerajinan khas Melayu yang dikerjakan dengan cinta dan tradisi.",
    image: "/images/hero-3.jpg",
    ctaPrimary: "Jelajahi Karya",
    ctaPrimaryHref: "#explore",
    ctaSecondary: "Dukung Lokal ↓",
    ctaSecondaryHref: "#story",
  }
];

export function UMKMHeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(nextSlide, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, currentIndex]);

  return (
    <section 
      className="relative w-full h-[75svh] md:h-[85vh] min-h-[600px] overflow-hidden bg-navy flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = offset.x;
            if (swipe < -50) nextSlide();
            else if (swipe > 50) prevSlide();
          }}
        >
          <Image
            src={SLIDES[currentIndex].image}
            alt={SLIDES[currentIndex].title.replace('<br/>', ' ')}
            fill
            className="object-cover object-center"
            priority={currentIndex === 0}
            quality={90}
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-90" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col items-center text-center mt-12 md:mt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 md:w-16 bg-gold/80" />
              <span className="font-heading text-[10px] md:text-[11px] tracking-[0.28em] text-gold uppercase font-semibold">
                {SLIDES[currentIndex].eyebrow}
              </span>
              <div className="h-[1px] w-8 md:w-16 bg-gold/80" />
            </div>

            <div className="min-h-[140px] md:min-h-[180px] flex items-center justify-center">
              <h1 
                className="font-serif text-white drop-shadow-2xl"
                style={{
                  fontSize: "clamp(3rem, 7vw, 6rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  textWrap: "balance"
                }}
                dangerouslySetInnerHTML={{ __html: SLIDES[currentIndex].title }}
              />
            </div>

            <div className="min-h-[80px] md:min-h-[60px] flex items-start justify-center">
              <p className="font-body text-base md:text-lg text-white/70 max-w-2xl font-light leading-relaxed mb-10 text-balance">
                {SLIDES[currentIndex].subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href={SLIDES[currentIndex].ctaPrimaryHref}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden border border-gold text-white"
              >
                <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] bg-gold" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                  {SLIDES[currentIndex].ctaPrimary}
                </span>
              </Link>
              <Link
                href={SLIDES[currentIndex].ctaSecondaryHref}
                className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/50 hover:text-gold transition-colors duration-300 py-4"
              >
                {SLIDES[currentIndex].ctaSecondary}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-between items-end max-w-[1400px] mx-auto px-6 lg:px-10 pointer-events-none">
        
        {/* Progress indicator */}
        <div className="flex gap-2 pointer-events-auto">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className="group py-2"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div className={`h-[2px] transition-all duration-300 ${currentIndex === idx ? 'w-8 bg-gold' : 'w-4 bg-white/30 group-hover:bg-white/60'}`} />
            </button>
          ))}
        </div>


        {/* Arrow Controls */}
        <div className="flex gap-3 pointer-events-auto">
          <button 
            onClick={prevSlide}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextSlide}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
