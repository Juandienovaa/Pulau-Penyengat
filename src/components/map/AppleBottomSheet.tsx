"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useDigitalHeritageStore } from "@/lib/store/useDigitalHeritageStore";
import { X, Navigation, Image as ImageIcon, Headphones, Sparkles, Footprints, Clock, Landmark } from "lucide-react";
import Image from "next/image";
import { getDistanceMeters } from "@/hooks/useLiveGPS";
import { OSMHeritageFeature } from "@/lib/types";

interface AppleBottomSheetProps {
  features: OSMHeritageFeature[];
  userLocation: [number, number] | null;
  onNavigate: () => void;
}

export function AppleBottomSheet({ features, userLocation, onNavigate }: AppleBottomSheetProps) {
  const { appMode, activeFeature, setActiveFeature, setAppMode } = useDigitalHeritageStore();
  const controls = useAnimation();
  const [sheetState, setSheetState] = useState<'peek' | 'half' | 'full'>('half');
  const sheetRef = useRef<HTMLDivElement>(null);

  // Snap thresholds (Screen coordinates from TOP)
  const SNAP_PEEK = typeof window !== "undefined" ? window.innerHeight * 0.8 : 800;
  const SNAP_HALF = typeof window !== "undefined" ? window.innerHeight * 0.5 : 500;
  const SNAP_FULL = typeof window !== "undefined" ? window.innerHeight * 0.12 : 100;

  useEffect(() => {
    // Both states open at HALF by default
    controls.start({ y: SNAP_HALF, transition: { type: "spring", damping: 25, stiffness: 200 } });
    setSheetState('half');
  }, [activeFeature, controls, SNAP_HALF]);

  const handleDragEnd = (e: any, info: any) => {
    // info.point.y is the absolute screen coordinate from TOP
    const currentY = info.point.y;
    const velocityY = info.velocity.y;

    let targetY = SNAP_HALF;
    let targetState: 'peek' | 'half' | 'full' = 'half';

    if (velocityY > 500 || currentY > SNAP_HALF + (SNAP_PEEK - SNAP_HALF) / 2) {
      targetY = SNAP_PEEK;
      targetState = 'peek';
    } else if (velocityY < -500 || currentY < SNAP_HALF - (SNAP_HALF - SNAP_FULL) / 2) {
      targetY = SNAP_FULL;
      targetState = 'full';
    }

    controls.start({ y: targetY, transition: { type: "spring", damping: 25, stiffness: 200 } });
    setSheetState(targetState);
  };

  return (
    <motion.div
      ref={sheetRef}
      initial={{ y: typeof window !== "undefined" ? window.innerHeight : 800 }}
      animate={controls}
      drag="y"
      dragConstraints={{ top: SNAP_FULL, bottom: SNAP_PEEK }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      className="fixed left-0 right-0 top-0 z-[3000] bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col md:hidden h-[100dvh]"
    >
      {/* Drag Handle */}
      <div className="w-full flex justify-center pt-4 pb-2 cursor-grab active:cursor-grabbing touch-none shrink-0 bg-white">
        <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
      </div>

      <div className={`px-6 pb-[30dvh] overflow-y-auto flex-1 hide-scrollbar ${sheetState === 'peek' ? 'overflow-hidden' : ''}`}>
        
        {!activeFeature ? (
          /* List View (Explore Nearby) */
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg text-navy mb-4">Eksplorasi Sekitar</h3>
            {features.slice(0, 15).map(feat => {
              const dist = userLocation ? getDistanceMeters(userLocation[0], userLocation[1], feat.lat, feat.lng) : null;
              return (
                <div 
                  key={feat.osm_id} 
                  onClick={() => setActiveFeature(feat)}
                  className="flex gap-4 items-center p-3 rounded-2xl hover:bg-gray-50 active:bg-gray-100 transition-colors border border-transparent hover:border-gray-100 cursor-pointer"
                >
                  <div className="w-14 h-14 bg-navy/5 rounded-xl shrink-0 flex items-center justify-center relative overflow-hidden">
                    {feat.metadata?.heroImage ? (
                      <Image src={feat.metadata.heroImage} alt={feat.name} fill className="object-cover" />
                    ) : (
                      <Landmark className="w-6 h-6 text-navy/40" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-navy truncate">{feat.name}</h4>
                    <p className="text-xs text-gray-500 truncate">{feat.metadata?.shortDescription || feat.category}</p>
                  </div>
                  {dist !== null && (
                    <div className="shrink-0 text-right">
                      <span className="text-[10px] font-bold text-navy bg-navy/5 px-2 py-1 rounded-lg block">{dist}m</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Detail View */
          <div className="flex flex-col h-full">
            <button 
              onClick={() => setActiveFeature(null)}
              className="absolute top-4 right-6 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex gap-4 mb-6 pt-2">
              <div className="w-20 h-20 rounded-2xl bg-navy/10 overflow-hidden relative shrink-0">
                 {activeFeature.metadata?.heroImage ? (
                    <Image src={activeFeature.metadata.heroImage} alt={activeFeature.name} fill className="object-cover" />
                 ) : (
                    <div className="w-full h-full flex items-center justify-center bg-navy"><Landmark className="w-8 h-8 text-white" /></div>
                 )}
              </div>
              <div className="pt-1 pr-8">
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest block mb-1">{activeFeature.category}</span>
                <h2 className="text-xl font-bold font-heading text-navy leading-tight">{activeFeature.name}</h2>
                {userLocation && (
                  <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-gray-500">
                    <span className="flex items-center gap-1"><Footprints className="w-3.5 h-3.5" /> {getDistanceMeters(userLocation[0], userLocation[1], activeFeature.lat, activeFeature.lng)}m</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> ~{Math.round(getDistanceMeters(userLocation[0], userLocation[1], activeFeature.lat, activeFeature.lng)/75)}mnt</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <button onClick={onNavigate} className="flex-1 bg-navy text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-navy/20 active:scale-95 transition-transform">
                <Navigation className="w-4 h-4" /> Navigasi
              </button>
              <button className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600 active:scale-95 transition-transform">
                <Headphones className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600 active:scale-95 transition-transform">
                 <ImageIcon className="w-5 h-5" />
              </button>
            </div>

            <motion.div animate={{ opacity: sheetState === 'peek' ? 0 : 1 }} className="space-y-6 flex-1 pb-10">
               <p className="text-sm text-gray-600 leading-relaxed font-sans">
                 {activeFeature.metadata?.fullDescription || activeFeature.metadata?.shortDescription || "Deskripsi objek bersejarah ini sedang dalam penyusunan oleh Dinas Kebudayaan."}
               </p>

               {activeFeature.metadata?.fun_facts && activeFeature.metadata.fun_facts.length > 0 && (
                  <div className="p-4 bg-gold/10 rounded-2xl border border-gold/30">
                     <span className="text-xs font-bold uppercase tracking-widest text-gold flex items-center gap-1.5 mb-2">
                        <Sparkles className="w-4 h-4" /> Fun Fact
                     </span>
                     <p className="text-sm text-gray-800 italic font-sans">{activeFeature.metadata.fun_facts[0]}</p>
                  </div>
               )}
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
