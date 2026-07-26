"use client";

import { motion } from "framer-motion";
import { FUN_FACTS } from "@/lib/data/history";
import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function FunFacts() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="py-32 bg-slate-50 dark:bg-navy relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="flex flex-col md:flex-row gap-12 md:items-end justify-between mb-20">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold font-sans font-medium uppercase tracking-widest mb-4"
            >
              Tahukah Kamu?
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading font-bold text-5xl md:text-6xl text-navy dark:text-white max-w-2xl"
            >
              Fakta Unik yang Jarang Diketahui
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FUN_FACTS.map((fact, i) => {
            const isExpanded = expandedId === fact.id;
            
            return (
              <motion.div
                key={fact.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={cn(
                  "relative p-8 rounded-3xl transition-all duration-500 cursor-pointer overflow-hidden border",
                  isExpanded 
                    ? "bg-navy text-white border-navy shadow-2xl dark:bg-navy-dark dark:border-navy-dark scale-[1.02] z-10" 
                    : "bg-white text-navy border-gray-100 shadow-xl hover:shadow-2xl dark:bg-navy-light dark:text-white dark:border-navy-light hover:-translate-y-1"
                )}
                onClick={() => setExpandedId(isExpanded ? null : fact.id)}
              >
                {/* Decorative floating icon */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: i }}
                  className="text-6xl mb-8 opacity-80"
                >
                  {fact.icon}
                </motion.div>

                <h3 className="font-heading font-bold text-2xl mb-4 pr-12">
                  {fact.fact}
                </h3>

                {/* Expand Toggle Button */}
                <button 
                  className={cn(
                    "absolute top-8 right-8 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300",
                    isExpanded ? "bg-white/20 rotate-45" : "bg-navy/5 text-navy dark:bg-white/10 dark:text-white"
                  )}
                >
                  <Plus className="w-5 h-5" />
                </button>

                <motion.div
                  initial={false}
                  animate={{ 
                    height: isExpanded ? "auto" : 0, 
                    opacity: isExpanded ? 1 : 0,
                    marginTop: isExpanded ? 24 : 0
                  }}
                  className="overflow-hidden"
                >
                  <p className={cn(
                    "font-sans leading-relaxed",
                    isExpanded ? "text-white/80" : "text-navy/70 dark:text-white/70"
                  )}>
                    {fact.details}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
