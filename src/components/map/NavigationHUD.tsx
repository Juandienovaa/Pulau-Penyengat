"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Navigation, Compass, X, Footprints, Clock, Zap } from "lucide-react";
import { useDigitalHeritageStore } from "@/lib/store/useDigitalHeritageStore";

interface NavigationHUDProps {
  speed: number | null; // m/s
  accuracy: number | null;
  heading: number | null;
  distanceMeters: number | null;
  durationSeconds: number | null;
  nextInstruction: string | null;
}

export function NavigationHUD({ speed, accuracy, heading, distanceMeters, durationSeconds, nextInstruction }: NavigationHUDProps) {
  const { appMode, setAppMode, activeFeature, setActiveRoute } = useDigitalHeritageStore();

  if (appMode !== 'navigate' || !activeFeature) return null;

  const speedKmH = speed ? (speed * 3.6).toFixed(1) : "0.0";
  const etaMinutes = durationSeconds ? Math.ceil(durationSeconds / 60) : 0;
  const displayHeading = heading ? Math.round(heading) : 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute top-0 left-0 right-0 z-[2000] pointer-events-none p-4 md:p-6"
      >
        {/* Top Bar - Next Turn & ETA */}
        <div className="bg-navy/95 backdrop-blur-xl rounded-3xl p-5 shadow-2xl border border-white/10 pointer-events-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center border border-gold/50 shrink-0">
              <Navigation className="w-6 h-6 text-gold" style={{ transform: `rotate(${displayHeading}deg)`, transition: 'transform 0.3s ease-out' }} />
            </div>
            <div>
              <span className="text-[11px] font-bold text-gold uppercase tracking-widest block mb-1">
                Navigasi Menuju {activeFeature.name}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white font-heading">
                {nextInstruction || "Ikuti Rute Biru"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-6 md:gap-8 bg-black/20 rounded-2xl p-3 md:p-4 border border-white/5 w-full md:w-auto justify-between">
            <div className="text-center">
              <span className="text-white text-xl font-bold block">{distanceMeters ? (distanceMeters > 1000 ? (distanceMeters/1000).toFixed(1) + 'km' : distanceMeters + 'm') : '-'}</span>
              <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Jarak</span>
            </div>
            <div className="text-center">
              <span className="text-white text-xl font-bold block">{etaMinutes} mnt</span>
              <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">ETA</span>
            </div>
            <div className="text-center hidden md:block">
              <span className="text-white text-xl font-bold block">{speedKmH}</span>
              <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">km/h</span>
            </div>
          </div>
          
          <button 
            onClick={() => {
              setAppMode('discover');
              setActiveRoute(null);
            }}
            className="w-full md:w-auto py-3 px-6 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold text-xs uppercase tracking-widest rounded-xl transition-colors border border-red-500/30"
          >
            Akhiri
          </button>
        </div>

        {/* Floating Side Widgets (Mobile Bottom/Desktop Side) */}
        <div className="absolute right-4 top-36 md:right-6 md:top-36 flex flex-col gap-3 pointer-events-auto">
          <div className="w-12 h-12 bg-white/95 backdrop-blur-xl rounded-full shadow-xl flex items-center justify-center border border-navy/10 relative overflow-hidden">
             <Compass className="w-6 h-6 text-navy" style={{ transform: `rotate(${-displayHeading}deg)`, transition: 'transform 0.3s ease-out' }} />
          </div>
          <div className="w-12 h-12 bg-white/95 backdrop-blur-xl rounded-full shadow-xl flex flex-col items-center justify-center border border-navy/10 relative overflow-hidden">
             <span className="text-navy font-bold text-sm leading-none">{accuracy ? `±${accuracy}` : '-'}</span>
             <span className="text-[8px] font-bold text-navy/50 uppercase">GPS</span>
          </div>
        </div>

      </motion.div>
    </AnimatePresence>
  );
}
