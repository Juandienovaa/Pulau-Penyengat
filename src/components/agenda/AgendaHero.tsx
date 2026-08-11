"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { EventCMS } from "@/lib/data/agenda";
import Link from "next/link";

interface AgendaHeroProps {
  featuredEvents: EventCMS[];
}

export function AgendaHero({ featuredEvents }: AgendaHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredEvents.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [featuredEvents.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % featuredEvents.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);

  if (!featuredEvents.length) return null;
  const currentEvent = featuredEvents[currentIndex];

  const formatDate = (isoStr: string) => {
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(isoStr));
  };

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-navy">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={currentEvent.cover_image}
            alt={currentEvent.title}
            fill
            className="object-cover object-center"
            priority
          />
          {/* Cinematic Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-transparent to-transparent opacity-80" />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center text-center pb-12 relative z-10">
        <div className="max-w-[1000px] w-full mt-24">
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
                  {currentEvent.category} • <span className="text-white/60">{formatDate(currentEvent.start_date)}</span>
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
                >
                  {currentEvent.title}
                </h1>
              </div>
              
              <div className="min-h-[80px] md:min-h-[60px] flex items-start justify-center">
                <p className="font-body text-base md:text-lg text-white/70 max-w-2xl font-light leading-relaxed mb-10 text-balance flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold" /> {currentEvent.location}
                  <span className="mx-2 opacity-50">•</span>
                  {currentEvent.subtitle}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link 
                  href={`#event-${currentEvent.id}`} 
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden border border-gold text-white"
                >
                  <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] bg-gold" />
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300 flex items-center gap-2">
                    Lihat Agenda <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
                {currentEvent.registration_link && (
                  <a 
                    href={currentEvent.registration_link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/50 hover:text-gold transition-colors duration-300 py-4"
                  >
                    Daftar Sekarang ↓
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-between items-end max-w-[1400px] mx-auto px-6 lg:px-10 pointer-events-none">
        
        {/* Progress indicator */}
        <div className="flex gap-2 pointer-events-auto">
          {featuredEvents.map((_, idx) => (
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
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextSlide}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
