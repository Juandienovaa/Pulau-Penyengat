"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <section className="py-32 bg-navy text-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-bold text-5xl md:text-6xl mb-6"
          >
            Melintasi Waktu
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto font-sans text-lg"
          >
            Geser untuk membandingkan wajah Pulau Penyengat di masa lampau dengan kejayaannya saat ini.
          </motion.p>
        </div>

        {/* Slider Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl cursor-ew-resize select-none border border-white/10"
          ref={containerRef}
          onMouseDown={(e) => {
            setIsDragging(true);
            handleMove(e.clientX);
          }}
          onMouseMove={handleMouseMove}
          onTouchStart={(e) => {
            setIsDragging(true);
            handleMove(e.touches[0].clientX);
          }}
          onTouchMove={handleTouchMove}
        >
          {/* Base Image (Modern) */}
          <div className="absolute inset-0">
            <Image 
              src="/images/hero-1.jpg" 
              alt="Modern Pulau Penyengat"
              fill
              className="object-cover"
              draggable={false}
            />
            <div className="absolute top-6 right-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/20 z-10">
              <span className="font-heading font-bold tracking-widest text-sm text-gold">2024</span>
            </div>
          </div>

          {/* Overlay Image (Historical) */}
          <div 
            className="absolute inset-0 right-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            {/* The image inside must be full width of container to align correctly */}
            <div className="absolute inset-0 w-[100vw] max-w-[1152px] h-full"> 
              <Image 
                src="/images/hero-3.jpg" 
                alt="Historical Pulau Penyengat"
                fill
                className="object-cover grayscale sepia-[0.3]"
                draggable={false}
              />
            </div>
            <div className="absolute top-6 left-6 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-black/10 z-10">
              <span className="font-heading font-bold tracking-widest text-sm text-navy">1930</span>
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-gold/80 shadow-[0_0_10px_rgba(212,175,55,0.8)] cursor-ew-resize z-20 transition-transform duration-75"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-gold transition-transform duration-200",
              isDragging ? "scale-90" : "scale-100"
            )}>
              <MoveHorizontal className="w-5 h-5 text-navy" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
