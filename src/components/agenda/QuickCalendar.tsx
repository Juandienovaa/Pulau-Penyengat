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
    <section className="py-16 bg-white border-b border-gray-100 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold text-navy flex items-center gap-3">
            <CalendarIcon className="w-8 h-8 text-gold" /> Kalender Budaya
          </h2>
          <p className="text-gray-500 mt-2">Jadwal festival dan acara terdekat di Pulau Penyengat.</p>
        </div>
        <button className="hidden md:flex items-center gap-2 text-gold font-bold hover:text-navy transition-colors">
          Lihat Semua <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Horizontal Scroll Area */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 px-6 pb-8 md:pl-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
      >
        {events.map((evt, idx) => {
          const dateObj = new Date(evt.start_date);
          const day = dateObj.getDate();
          const month = dateObj.toLocaleString('id-ID', { month: 'short' });

          return (
            <motion.div 
              key={evt.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="min-w-[300px] md:min-w-[400px] snap-start bg-slate-50 rounded-3xl p-6 border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center text-navy border border-gray-100">
                  <span className="text-sm font-bold text-red-500 uppercase">{month}</span>
                  <span className="text-2xl font-bold font-heading">{day}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(evt.status)}`}>
                  {getStatusLabel(evt.status)}
                </span>
              </div>
              
              <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">{evt.category}</span>
              <h3 className="text-xl font-heading font-bold text-navy mb-2 group-hover:text-gold transition-colors line-clamp-1">{evt.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{evt.subtitle}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
