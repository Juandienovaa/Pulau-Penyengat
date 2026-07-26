"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Bookmark, Share2, Copy, Download } from "lucide-react";
import { GURINDAM_VERSES } from "@/lib/data/history";
import { cn } from "@/lib/utils";

type TabType = "originalRumi" | "originalJawi" | "meaningIndonesian" | "meaningEnglish";

export function GurindamExperience() {
  const [activeTab, setActiveTab] = useState<TabType>("originalRumi");
  const [activePasal, setActivePasal] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const verse = GURINDAM_VERSES[activePasal];

  const tabs: { id: TabType; label: string }[] = [
    { id: "originalRumi", label: "Original (Melayu)" },
    { id: "meaningIndonesian", label: "Bahasa Indonesia" },
    { id: "meaningEnglish", label: "English" },
    { id: "originalJawi", label: "Huruf Jawi" },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-navy-dark text-white">
      {/* Decorative Traditional Ornament Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold font-sans tracking-[0.2em] uppercase text-sm mb-4"
          >
            Masterpiece of Raja Ali Haji
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-heading font-bold text-5xl md:text-7xl drop-shadow-lg"
          >
            Gurindam Dua Belas
          </motion.h2>
        </div>

        {/* Main Experience Container */}
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 bg-navy/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl">
          
          {/* Left Column - Navigation & Tools */}
          <div className="lg:w-1/3 flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-12">
            
            {/* Pasal Selector */}
            <div className="mb-12">
              <h3 className="text-sm font-medium text-white/50 uppercase tracking-widest mb-6">Pilih Pasal</h3>
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-4 gap-3">
                {GURINDAM_VERSES.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setActivePasal(i)}
                    className={cn(
                      "w-full aspect-square rounded-xl font-heading text-xl transition-all duration-300 border flex items-center justify-center",
                      activePasal === i 
                        ? "bg-gold border-gold text-navy shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
                        : "border-white/20 text-white/70 hover:border-gold/50 hover:text-white"
                    )}
                  >
                    {v.pasal}
                  </button>
                ))}
              </div>
            </div>

            {/* Audio Player & Tools */}
            <div className="mt-auto space-y-6">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-full flex items-center justify-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-navy group-hover:scale-105 transition-transform">
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                </div>
                <div className="text-left">
                  <p className="font-medium">Dengarkan Pasal {verse.pasal}</p>
                  <p className="text-sm text-white/50">Audio Narration</p>
                </div>
              </button>

              <div className="flex justify-between items-center px-2">
                <button className="text-white/50 hover:text-gold transition-colors p-2" title="Bookmark"><Bookmark className="w-5 h-5" /></button>
                <button className="text-white/50 hover:text-gold transition-colors p-2" title="Copy"><Copy className="w-5 h-5" /></button>
                <button className="text-white/50 hover:text-gold transition-colors p-2" title="Share"><Share2 className="w-5 h-5" /></button>
                <button className="text-white/50 hover:text-gold transition-colors p-2" title="Download PDF"><Download className="w-5 h-5" /></button>
              </div>
            </div>

          </div>

          {/* Right Column - Reading Area */}
          <div className="lg:w-2/3 flex flex-col">
            
            {/* Tabs */}
            <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-12 border-b border-white/10 pb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                    activeTab === tab.id
                      ? "bg-white/10 text-gold"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 min-h-[300px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTab}-${activePasal}`}
                  initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <p 
                    className={cn(
                      "leading-relaxed whitespace-pre-wrap",
                      activeTab === "originalJawi" 
                        ? "font-heading text-4xl md:text-5xl text-right leading-loose tracking-wide" 
                        : "font-heading text-3xl md:text-4xl text-left"
                    )}
                    dir={activeTab === "originalJawi" ? "rtl" : "ltr"}
                  >
                    {verse[activeTab]}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Historical Explanation */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-sm text-gold font-medium uppercase tracking-widest mb-4">Konteks Sejarah & Makna</p>
              <p className="text-white/70 font-sans leading-relaxed text-lg">
                {verse.explanation}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
