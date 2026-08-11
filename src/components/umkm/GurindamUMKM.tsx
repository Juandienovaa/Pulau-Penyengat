import Link from "next/link";
import { GURINDAM_VERSES } from "@/lib/data/history";

export function GurindamUMKM() {
  // Take a relevant verse, e.g., pasal 5 or general about hard work / honesty
  const verse = GURINDAM_VERSES.find(v => v.pasal === 5) || GURINDAM_VERSES[0];

  return (
    <section className="py-24 bg-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 bg-[url('/images/pattern-melayu.png')] bg-repeat opacity-5" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center flex flex-col items-center">
        <span className="font-mono text-sm tracking-widest text-gold uppercase mb-8 block">
          Gurindam & Karya Lokal
        </span>
        
        <blockquote className="font-serif text-3xl md:text-5xl lg:text-6xl text-gold mb-10 leading-normal italic font-medium drop-shadow-sm whitespace-pre-wrap">
          "{verse.originalRumi}"
        </blockquote>
        
        <p className="font-sans text-sm md:text-base text-cream/60 uppercase tracking-widest mb-12">
          — Pasal Ke-{verse.pasal}, Gurindam Dua Belas
        </p>
        
        <div className="w-24 h-px bg-white/20 mb-12" />
        
        <p className="font-body text-lg text-cream/90 max-w-2xl leading-relaxed mb-8">
          Nilai-nilai kejujuran, kerja keras, dan budi pekerti yang tertuang dalam Gurindam Dua Belas terus hidup dalam denyut ekonomi masyarakat Pulau Penyengat. Setiap transaksi bukan sekadar jual beli, melainkan silaturahmi.
        </p>
      </div>
    </section>
  );
}
