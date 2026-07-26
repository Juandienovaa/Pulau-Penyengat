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

      <div className="container mx-auto px-6 h-full flex flex-col justify-end pb-32 relative z-10">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentIndex}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-gold/20 border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest rounded-full">
                  {currentEvent.category}
                </span>
                <span className="flex items-center gap-1.5 text-white/80 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-gold" /> {currentEvent.location}
                </span>
                <span className="flex items-center gap-1.5 text-white/80 text-sm font-medium hidden md:flex">
                  <Calendar className="w-4 h-4 text-gold" /> {formatDate(currentEvent.start_date)}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight">
                {currentEvent.title}
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 font-sans mb-10 max-w-2xl line-clamp-2">
                {currentEvent.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  href={`#event-${currentEvent.id}`} 
                  className="px-8 py-4 bg-gold text-navy font-bold rounded-2xl hover:bg-white hover:-translate-y-1 transition-all flex items-center gap-2 shadow-[0_10px_40px_rgba(212,175,55,0.3)]"
                >
                  Lihat Agenda <ArrowRight className="w-5 h-5" />
                </Link>
                {currentEvent.registration_link && (
                  <a 
                    href={currentEvent.registration_link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-colors"
                  >
                    Daftar Sekarang
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-6 md:right-12 z-20 flex items-center gap-4">
        <div className="text-white/60 font-medium text-sm mr-4 hidden md:block">
          <span className="text-white font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="mx-2">/</span>
          <span>{String(featuredEvents.length).padStart(2, '0')}</span>
        </div>
        <button 
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-navy transition-colors backdrop-blur-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-navy transition-colors backdrop-blur-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
