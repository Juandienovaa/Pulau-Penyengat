"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { TIMELINE_EVENTS } from "@/lib/data/history";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ImmersiveTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // The center line grows as user scrolls
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="py-32 bg-slate-50 dark:bg-navy relative">
      <div className="container mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-bold text-5xl md:text-6xl text-navy dark:text-white"
          >
            Garis Waktu Keemasan
          </motion.h2>
          <p className="mt-6 text-navy/60 dark:text-white/60 max-w-2xl mx-auto font-sans text-lg">
            Saksikan bagaimana pulau kecil ini mengukir sejarah besar dari masa ke masa.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Animated Center Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-navy/10 dark:bg-white/10 -translate-x-1/2" />
          <motion.div 
            style={{ scaleY, transformOrigin: "top" }}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gold -translate-x-1/2 z-0"
          />

          {/* Timeline Items */}
          <div className="flex flex-col gap-32 relative z-10">
            {TIMELINE_EVENTS.map((event, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={event.id} className={cn("flex flex-col md:flex-row items-center gap-12", isEven ? "" : "md:flex-row-reverse")}>
                  
                  {/* Content Side */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className={cn("w-full md:w-1/2 flex flex-col", isEven ? "md:items-end text-left md:text-right" : "md:items-start text-left")}
                  >
                    <span className="text-gold font-heading font-bold text-7xl md:text-8xl opacity-80 mb-4 tracking-tighter">
                      {event.year}
                    </span>
                    <h3 className="font-heading font-bold text-3xl text-navy dark:text-white mb-4">
                      {event.title}
                    </h3>
                    <p className="text-navy/70 dark:text-white/70 text-lg leading-relaxed mb-8">
                      {event.description}
                    </p>
                    
                    {/* Interactive Button */}
                    <Link 
                      href={`/peta?location=${event.id}`}
                      className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-navy dark:text-white hover:text-gold dark:hover:text-gold transition-colors group"
                    >
                      <MapPin className="w-4 h-4 text-gold" />
                      Lihat di Peta
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>

                  {/* Node (Desktop) */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-200px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-navy border-4 border-gold items-center justify-center z-20 shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                  >
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  </motion.div>

                  {/* Image Side */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2"
                  >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
                      <Image 
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/0 transition-colors duration-700" />
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
