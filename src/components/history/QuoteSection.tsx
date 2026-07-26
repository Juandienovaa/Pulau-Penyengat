"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function QuoteSection() {
  return (
    <section className="py-40 bg-navy text-white relative overflow-hidden flex items-center justify-center">
      {/* Subtle animated background */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent pointer-events-none"
      />

      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Quote className="w-16 h-16 text-gold/30 mx-auto mb-12 rotate-180" />
        </motion.div>

        <h2 className="font-heading font-bold text-6xl md:text-8xl lg:text-9xl leading-tight tracking-tight mb-8">
          <motion.span 
            className="inline-block"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            "Takkan Melayu
          </motion.span>
          <br/>
          <motion.span 
            className="inline-block text-gold"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Hilang di Bumi"
          </motion.span>
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="text-white/50 font-sans tracking-[0.3em] uppercase text-sm md:text-base"
        >
          — Laksamana Hang Tuah
        </motion.p>
      </div>
    </section>
  );
}
