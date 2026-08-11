import Link from "next/link";
import { MapPin, Navigation } from "lucide-react";
import { UMKM_DATA } from "@/lib/data/umkm";

export function UMKMMapPreview() {
  // Take top 3 for preview
  const previewLocations = UMKM_DATA.slice(0, 3).filter(u => u.lat && u.lng);

  return (
    <section id="map" className="py-24 bg-navy text-white relative overflow-hidden">
      {/* Abstract Map Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{
             backgroundImage: 'radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}
      />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-cream">Peta Ekonomi Lokal</h2>
          <p className="font-body text-cream/70 max-w-2xl mx-auto text-lg">
            Temukan lokasi tepat UMKM, pengrajin, dan kuliner di sekitar kawasan bersejarah Pulau Penyengat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 relative h-[500px] w-full bg-[#111] border border-white/10 rounded-lg overflow-hidden group">
            {/* Visual mock of a map */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-navy/80 mix-blend-multiply" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <MapPin className="w-16 h-16 text-gold mb-6 animate-bounce" />
              <h3 className="font-serif text-3xl mb-4">Eksplorasi via Peta Interaktif</h3>
              <p className="font-sans text-cream/70 mb-8 max-w-md">
                Gunakan sistem pemetaan cerdas kami untuk menemukan rute berjalan kaki terdekat dari posisi Anda menuju pusat UMKM.
              </p>
              <Link 
                href="/peta"
                className="px-8 py-4 bg-gold text-white font-sans font-medium hover:bg-gold-light transition-all flex items-center gap-3"
              >
                <Navigation className="w-5 h-5" />
                Buka Peta & Petunjuk Arah
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-sans font-medium text-cream/50 uppercase tracking-widest text-xs mb-2">Terdekat & Populer</h4>
            {previewLocations.map((umkm, idx) => (
              <div key={umkm.id} className="bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-xs text-gold uppercase">{umkm.category}</span>
                </div>
                <h5 className="font-serif text-xl mb-1">{umkm.name}</h5>
                <p className="font-sans text-xs text-cream/50 mb-4">{umkm.address}</p>
                <Link 
                  href={`/peta?destination=${umkm.id}`}
                  className="inline-flex items-center gap-2 text-sm text-gold hover:text-white transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  Rute ke Lokasi
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
