import { FUN_FACTS } from "@/lib/data/umkm";
import { Info } from "lucide-react";

export function FunFacts() {
  return (
    <section className="py-24 bg-white border-t border-navy/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="font-mono text-sm tracking-widest text-gold uppercase mb-4 block">
            Fakta Menarik
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-navy mb-6">
            Ekonomi Warisan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FUN_FACTS.map((fact, idx) => (
            <div 
              key={idx}
              className="bg-cream p-8 border border-navy/5 relative group hover:border-gold/30 transition-colors duration-300"
            >
              <Info className="w-8 h-8 text-gold/50 mb-6 group-hover:text-gold transition-colors" />
              <p className="font-body text-navy-light/80 text-lg leading-relaxed mb-8">
                "{fact.fact}"
              </p>
              <div className="absolute bottom-8 left-8 right-8 border-t border-navy/10 pt-4">
                <span className="font-mono text-xs uppercase tracking-wider text-navy/40">
                  Sumber: {fact.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
