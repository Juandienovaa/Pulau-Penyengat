import Link from "next/link";
import { UMKM_DATA } from "@/lib/data/umkm";

export function UMKMMap() {
  // Use umkm with locations
  const umkmWithLocation = UMKM_DATA.filter(u => u.lat && u.lng);

  return (
    <section id="map" className="py-24 bg-navy text-white overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row gap-12 items-center">
        
        <div className="w-full md:w-5/12 z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-8 bg-gold" />
            <span className="font-heading text-[10px] md:text-[11px] tracking-[0.28em] text-gold uppercase font-bold">
              JELAJAHI PULAU
            </span>
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            Temukan Cerita di Setiap Sudut
          </h2>
          
          <p className="font-body text-white/70 text-lg font-light leading-relaxed mb-10">
            Terhubung dengan Sistem Navigasi Cagar Budaya. Jelajahi UMKM terdekat, cagar budaya, dan cerita sejarah Pulau Penyengat dalam satu peta cerdas.
          </p>
          
          <Link 
            href="/peta"
            className="inline-flex items-center gap-3 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border border-gold text-white hover:bg-gold hover:text-navy group"
          >
            Buka Peta Interaktif
          </Link>
        </div>

        {/* Abstract Map Graphic / Points */}
        <div className="w-full md:w-7/12 relative min-h-[400px] flex items-center justify-center">
          {/* We use a stylized map background or points here to match the editorial look */}
          <div className="absolute inset-0 border border-white/10 rounded-full w-[120%] aspect-square -right-[10%] top-1/2 -translate-y-1/2 opacity-20" />
          <div className="absolute inset-0 border border-gold/20 rounded-full w-[80%] aspect-square right-[10%] top-1/2 -translate-y-1/2 opacity-40 animate-pulse" />
          
          <div className="grid grid-cols-2 gap-4 relative z-10 p-8 w-full">
            {umkmWithLocation.slice(0, 4).map((umkm, i) => (
              <div key={umkm.id} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 flex flex-col items-start gap-4">
                <span className="font-heading text-[10px] tracking-widest text-gold uppercase font-bold">{umkm.category}</span>
                <h4 className="font-serif text-xl text-white">{umkm.name}</h4>
                <Link 
                  href={`/peta?destination=${umkm.id}`}
                  className="font-heading text-[10px] uppercase font-bold text-white hover:text-gold transition-colors flex items-center gap-1 mt-2"
                >
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  Navigasi ke Sini
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
