"use client";

import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

export function GurindamSpotlight() {
  return (
    <section className="py-32 bg-[#Fdfbf7] relative overflow-hidden">
      {/* Texture & Ornaments */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="w-16 h-16 mx-auto mb-6 bg-gold/20 rounded-full flex items-center justify-center border border-gold/40 text-gold">
            <span className="font-heading text-2xl font-bold">XII</span>
          </div>
          <span className="text-sm font-bold uppercase tracking-widest text-gold block mb-4">Gurindam Dua Belas</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-navy mb-10 leading-relaxed">
            "Barang siapa tiada memegang agama, <br className="hidden md:block"/> Sekali-kali tiada boleh dibilangkan nama."
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-gray-100 text-left"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h4 className="text-lg font-bold text-navy mb-2">Makna Falsafah</h4>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Agama adalah fondasi utama bagi seseorang untuk dihargai dan diakui eksistensinya dalam masyarakat. Tanpa panduan spiritual, kehormatan seseorang tidak memiliki dasar yang kuat.
              </p>
              
              <h4 className="text-lg font-bold text-navy mb-2">Konteks Festival</h4>
              <p className="text-gray-600 leading-relaxed">
                Menjadi tema sentral dalam setiap perayaan budaya Melayu di Pulau Penyengat, memastikan bahwa setiap atraksi dan karya seni yang ditampilkan tetap berpegang teguh pada nilai-nilai keislaman sejarah Riau-Lingga.
              </p>
            </div>
            
            <div className="w-full md:w-auto flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-gray-100">
              <button className="w-16 h-16 bg-gold rounded-full flex items-center justify-center text-navy hover:scale-110 transition-transform shadow-lg shadow-gold/30 mb-4">
                <PlayCircle className="w-8 h-8" />
              </button>
              <span className="text-sm font-bold text-navy">Dengarkan Bait</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
