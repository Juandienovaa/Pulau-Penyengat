"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Ship, Bike, Info } from "lucide-react";

export function AgendaTransport() {
  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gold uppercase block mb-4">Panduan Akses</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy">Transportasi Acara</h2>
          <p className="font-body text-navy/70 mt-6 max-w-2xl mx-auto">
            Pulau Penyengat adalah kawasan bebas mobil. Nikmati perjalanan melintasi ombak dan rasakan semilir angin dengan transportasi ikonik yang akan menemani kunjungan Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Pompong */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-black/5 hover:border-gold/30 transition-all flex flex-col"
          >
            <div className="relative h-64 md:h-80 w-full bg-navy overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2000&auto=format&fit=crop" 
                alt="Perahu Pompong"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-navy shadow-lg">
                  <Ship className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white drop-shadow-md">Pompong</h3>
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <p className="font-body text-navy/70 leading-relaxed mb-6 flex-grow">
                Perahu motor kayu tradisional yang menjadi transportasi utama penyeberangan dari Pelabuhan Sri Bintan Pura, Tanjungpinang ke Pulau Penyengat. Perjalanan memakan waktu sekitar 15 menit melintasi laut yang tenang.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-black/5 flex items-start gap-3">
                <Info className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-xs uppercase tracking-wider text-navy mb-1">Info Penting</span>
                  <p className="text-sm text-navy/70 font-body">Beroperasi dari jam 06:00 hingga 20:00. Tiket dapat dibeli langsung di pelabuhan tanpa reservasi.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Becak Motor */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-black/5 hover:border-gold/30 transition-all flex flex-col"
          >
            <div className="relative h-64 md:h-80 w-full bg-navy overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1558284560-f47ce5dfa657?q=80&w=2000&auto=format&fit=crop" 
                alt="Becak Motor"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-navy shadow-lg">
                  <Bike className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white drop-shadow-md">Becak Motor</h3>
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <p className="font-body text-navy/70 leading-relaxed mb-6 flex-grow">
                Moda transportasi ikonik di dalam pulau. Karena mobil dilarang masuk ke Penyengat, becak motor (bentor) adalah cara terbaik untuk berpindah dari satu lokasi festival ke lokasi lainnya dengan santai.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-black/5 flex items-start gap-3">
                <Info className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-xs uppercase tracking-wider text-navy mb-1">Tarif & Kapasitas</span>
                  <p className="text-sm text-navy/70 font-body">Maksimal 2-3 orang per becak. Anda bisa menyewanya untuk sekali jalan atau sewa per jam untuk berkeliling pulau.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
