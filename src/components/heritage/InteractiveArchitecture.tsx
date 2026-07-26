"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
}

interface Props {
  imageUrl: string;
  hotspots: Hotspot[];
}

export function InteractiveArchitecture({ imageUrl, hotspots }: Props) {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  return (
    <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl bg-navy-dark mt-12 group">
      
      {/* Base Architectural Image */}
      <Image 
        src={imageUrl}
        alt="Architecture Explorer"
        fill
        className={cn(
          "object-cover transition-all duration-1000",
          activeHotspot ? "scale-105 brightness-50 blur-sm" : "scale-100 brightness-100 blur-0"
        )}
      />

      {/* Instructional Overlay */}
      <div className={cn(
        "absolute inset-x-0 top-6 text-center transition-opacity duration-300",
        activeHotspot ? "opacity-0" : "opacity-100"
      )}>
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-white text-sm font-medium tracking-wider border border-white/20">
          <Info className="w-4 h-4" />
          Klik titik untuk mengeksplorasi arsitektur
        </span>
      </div>

      {/* Hotspots */}
      {hotspots.map((hotspot, i) => (
        <motion.button
          key={hotspot.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.2 + 0.5, type: "spring" }}
          onClick={() => setActiveHotspot(hotspot)}
          className={cn(
            "absolute w-8 h-8 md:w-10 md:h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10",
            activeHotspot?.id === hotspot.id 
              ? "bg-gold border-white scale-125 z-20" 
              : "bg-white/20 border-white/50 hover:bg-gold hover:border-white hover:scale-110 backdrop-blur-sm"
          )}
          style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
        >
          <div className={cn("w-2 h-2 md:w-3 md:h-3 rounded-full", activeHotspot?.id === hotspot.id ? "bg-white" : "bg-white")} />
          
          {/* Radar ripple effect */}
          {!activeHotspot && (
            <motion.div 
              animate={{ scale: [1, 2, 2.5], opacity: [0.5, 0, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
              className="absolute inset-0 rounded-full border border-white"
            />
          )}
        </motion.button>
      ))}

      {/* Active Information Panel */}
      <AnimatePresence>
        {activeHotspot && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-6 left-6 right-6 md:left-auto md:right-8 md:bottom-8 md:w-[400px] bg-white/90 dark:bg-navy-dark/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 z-30"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-gold text-xs font-bold uppercase tracking-widest mb-1 block">Detail Arsitektur</span>
                <h4 className="font-heading font-bold text-2xl text-navy dark:text-white">{activeHotspot.title}</h4>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveHotspot(null); }}
                className="p-1 rounded-full bg-navy/10 dark:bg-white/10 hover:bg-navy/20 dark:hover:bg-white/20 transition-colors text-navy dark:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-navy/70 dark:text-white/70 font-sans leading-relaxed text-sm">
              {activeHotspot.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
