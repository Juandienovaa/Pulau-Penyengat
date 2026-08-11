"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { EventCMS } from "@/lib/data/agenda";
import { Calendar as CalendarIcon, ChevronRight } from "lucide-react";

export function QuickCalendar({ events }: { events: EventCMS[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const getStatusColor = (status: EventCMS['status']) => {
    switch (status) {
      case 'Today': return 'bg-red-500 text-white';
      case 'Upcoming': return 'bg-navy text-white';
      case 'Completed': return 'bg-gray-200 text-gray-500';
    }
  };

  const getStatusLabel = (status: EventCMS['status']) => {
    switch (status) {
      case 'Today': return 'Hari Ini';
      case 'Upcoming': return 'Akan Datang';
      case 'Completed': return 'Selesai';
    }
  };

  return (
    <section className="py-24 bg-white border-b border-black/5 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif text-navy flex items-center gap-4 mb-4">
            <CalendarIcon className="w-8 h-8 md:w-10 md:h-10 text-gold" /> Kalender Budaya
          </h2>
          <p className="font-body text-navy/60 text-lg font-light max-w-xl">
            Jadwal festival dan acara terdekat di Pulau Penyengat.
          </p>
        </div>
        <button className="flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-xs hover:text-navy transition-colors group">
          Lihat Semua <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Bento Grid Area */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {events.map((evt, idx) => {
            const dateObj = new Date(evt.start_date);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleString('id-ID', { month: 'short' });

            // Bento logic for mobile: first item full width, next two half width
            const isFeaturedMobile = idx % 3 === 0;

            return (
              <motion.div 
                key={evt.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`group bg-slate-50 hover:bg-white rounded-xl p-6 md:p-8 border border-black/5 hover:border-gold/30 hover:shadow-xl transition-all cursor-pointer flex flex-col ${
                  isFeaturedMobile ? "col-span-2 md:col-span-1" : "col-span-1 md:col-span-1"
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-xl shadow-sm flex flex-col items-center justify-center text-navy border border-black/5 group-hover:border-gold/50 transition-colors">
                    <span className="text-[10px] md:text-xs font-bold text-red-500 uppercase tracking-wider">{month}</span>
                    <span className="text-xl md:text-2xl font-serif">{day}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${getStatusColor(evt.status)}`}>
                    {getStatusLabel(evt.status)}
                  </span>
                </div>
                
                <span className="text-[9px] md:text-[10px] font-bold text-gold uppercase tracking-[0.2em] block mb-3">
                  {evt.category}
                </span>
                
                <h3 className={`font-serif text-navy mb-3 group-hover:text-gold transition-colors ${
                  isFeaturedMobile ? 'text-2xl' : 'text-lg md:text-2xl line-clamp-2'
                }`}>
                  {evt.title}
                </h3>
                
                <p className={`font-body text-xs md:text-sm text-navy/60 font-light flex-grow ${
                  isFeaturedMobile ? 'line-clamp-2' : 'hidden md:flex line-clamp-2'
                }`}>
                  {evt.subtitle}
                </p>
                
                <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
                  <span className={`font-heading text-[10px] uppercase font-bold text-navy group-hover:text-gold transition-colors flex items-center gap-1 w-full ${!isFeaturedMobile && 'justify-between'}`}>
                    Detail <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
