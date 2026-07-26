"use client";

import { motion } from "framer-motion";
import { EventCMS } from "@/lib/data/agenda";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function EventTimeline({ events }: { events: EventCMS[] }) {
  // Sort events by date ascending
  const sortedEvents = [...events].sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-widest text-gold uppercase block mb-4">Agenda Tahunan</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy">Linimasa Festival</h2>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 transform md:-translate-x-1/2" />

          {sortedEvents.map((evt, idx) => {
            const date = new Date(evt.start_date);
            const isLeft = idx % 2 === 0;

            return (
              <div key={evt.id} className={`relative flex items-center mb-16 md:mb-24 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col md:justify-between`}>
                
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-white border-4 border-gold transform -translate-x-1/2 flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-navy" />
                </div>

                {/* Content Side */}
                <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isLeft ? 'md:text-right' : 'md:text-left'} mt-8 md:mt-0`}>
                  <motion.div 
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="text-gold font-bold mb-2">
                      {date.toLocaleString('id-ID', { month: 'long', year: 'numeric' })}
                    </div>
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 shadow-lg">
                      <Image 
                        src={evt.gallery[1] || evt.cover_image} 
                        alt={evt.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-navy mb-3 group-hover:text-gold transition-colors">{evt.title}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-3">{evt.description}</p>
                    
                    <button className="inline-flex items-center gap-2 text-navy font-bold text-sm hover:text-gold transition-colors">
                      Pelajari Lebih Lanjut <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                </div>

                {/* Spacer Side */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
