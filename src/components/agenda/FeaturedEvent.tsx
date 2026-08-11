"use client";

import { motion } from "framer-motion";
import { EventCMS } from "@/lib/data/agenda";
import Image from "next/image";
import { MapPin, Users, Ticket, Clock, ExternalLink } from "lucide-react";

export function FeaturedEvent({ event }: { event: EventCMS }) {
  // Simple countdown logic (mock)
  const calculateDaysLeft = () => {
    const diff = new Date(event.start_date).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 3600 * 24)));
  };

  const daysLeft = calculateDaysLeft();

  return (
    <section className="py-24 bg-cream relative overflow-hidden" id={`event-${event.id}`}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-navy/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Image Left */}
          <div className="flex-1 w-full">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] md:aspect-square w-full rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <Image 
                src={event.gallery[0]} 
                alt={event.title} 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
              
              {/* Glass Countdown Card */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex justify-between items-center">
                <div>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gold block mb-1">Mulai Dalam</span>
                  <div className="text-3xl md:text-4xl font-serif font-bold">{daysLeft} Hari</div>
                </div>
                {event.registration_link && (
                  <a href={event.registration_link} className="px-6 py-3 bg-white text-navy font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2">
                    Daftar <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {/* Content Right */}
          <div className="flex-1 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-xl"
            >
              <span className="inline-block px-4 py-1.5 bg-navy text-white text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                Sorotan Utama
              </span>
              
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6 leading-tight">
                {event.title}
              </h2>
              
              <p className="text-lg text-navy/70 font-body font-light mb-8 leading-relaxed">
                {event.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase">Waktu</span>
                    <p className="font-bold text-navy">
                      {new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date(event.start_date))}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase">Lokasi</span>
                    <p className="font-bold text-navy">{event.location}</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                    <Ticket className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase">Tiket</span>
                    <p className="font-bold text-navy">{event.ticket_price}</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase">Kapasitas</span>
                    <p className="font-bold text-navy">{event.capacity.toLocaleString('id-ID')} Orang</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
                <h4 className="font-bold text-navy mb-4">Diselenggarakan Oleh</h4>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full" />
                  <div>
                    <p className="font-bold text-sm text-navy">{event.organizer}</p>
                    <p className="text-xs text-gray-500">{event.speaker || "Menampilkan budayawan lokal"}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
