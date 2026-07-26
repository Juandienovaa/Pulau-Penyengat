"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useDigitalHeritageStore } from "@/lib/store/useDigitalHeritageStore";
import { OSMHeritageFeature } from "@/lib/types";
import { CheckCircle2, Volume2, BookOpen, X, Sparkles, MapPin } from "lucide-react";
import Image from "next/image";

interface ArrivalOverlayProps {
  arrivedFeature: OSMHeritageFeature | null;
  onClose: () => void;
}

export function ArrivalOverlay({ arrivedFeature, onClose }: ArrivalOverlayProps) {
  const { addPassportStamp, passportStamps } = useDigitalHeritageStore();
  const [isStampAdded, setIsStampAdded] = useState(false);

  useEffect(() => {
    if (arrivedFeature && !passportStamps.includes(arrivedFeature.osm_id)) {
      // Trigger Haptic Feedback if supported
      if (typeof window !== "undefined" && navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 500]); // Pokemon Go style arrival buzz
      }
      
      // Add to passport
      addPassportStamp(arrivedFeature.osm_id);
      setIsStampAdded(true);

      // Trigger Confetti
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 4000 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);

      return () => clearInterval(interval);
    }
  }, [arrivedFeature, addPassportStamp, passportStamps]);

  if (!arrivedFeature) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[4000] flex items-center justify-center p-4 bg-navy/60 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 50, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-[2.5rem] p-6 w-full max-w-md shadow-2xl relative overflow-hidden"
        >
          {/* Header Graphic */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-gold to-yellow-600 opacity-20" />
          
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/50 backdrop-blur-md rounded-full text-navy/50 hover:text-navy z-10 transition-colors">
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 flex flex-col items-center text-center mt-4">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.2, damping: 15 }}
              className="w-24 h-24 bg-gold rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.4)] mb-6 border-4 border-white"
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </motion.div>

            <span className="text-[10px] font-bold uppercase tracking-widest text-gold mb-2">Anda Telah Tiba</span>
            <h2 className="text-3xl font-bold font-heading text-navy leading-tight mb-2">{arrivedFeature.name}</h2>
            
            <p className="text-sm text-gray-500 mb-6">
              Luar biasa! Cap digital lokasi ini telah ditambahkan ke <span className="font-bold text-navy">Heritage Passport</span> Anda.
            </p>

            {/* Unlockables Section */}
            <div className="w-full bg-navy/5 rounded-3xl p-5 mb-6 text-left space-y-4">
               {arrivedFeature.metadata?.fun_facts && arrivedFeature.metadata.fun_facts.length > 0 && (
                 <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                     <Sparkles className="w-5 h-5 text-gold" />
                   </div>
                   <div>
                     <span className="text-[10px] font-bold uppercase tracking-widest text-navy/50 block">Hidden Story Terbuka</span>
                     <p className="text-sm font-semibold text-navy leading-tight mt-1">{arrivedFeature.metadata.fun_facts[0]}</p>
                   </div>
                 </div>
               )}
               
               <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                     <Volume2 className="w-5 h-5 text-blue-600" />
                   </div>
                   <div className="flex-1 flex items-center justify-between">
                     <div>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-navy/50 block">Audio Guide</span>
                       <p className="text-sm font-semibold text-navy leading-tight mt-1">Dengarkan Sejarah</p>
                     </div>
                     <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-full">Play</button>
                   </div>
               </div>
            </div>

            <button 
              onClick={onClose}
              className="w-full py-4 bg-navy text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-navy/20 active:scale-95 transition-transform"
            >
              Lanjutkan Eksplorasi
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
