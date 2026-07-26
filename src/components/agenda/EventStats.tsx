"use client";

import { motion } from "framer-motion";

export function EventStats() {
  const stats = [
    { label: "Festival Tahunan", value: "18+" },
    { label: "Pengunjung", value: "50K+" },
    { label: "Pelaku UMKM", value: "300+" },
    { label: "Seniman", value: "120+" }
  ];

  return (
    <section className="py-20 bg-navy relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center"
            >
              <span className="text-4xl md:text-6xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-br from-gold to-yellow-200 mb-2">
                {stat.value}
              </span>
              <span className="text-white/60 text-sm font-bold uppercase tracking-widest">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
