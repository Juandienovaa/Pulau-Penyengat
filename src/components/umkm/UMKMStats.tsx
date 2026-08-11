import { UMKM_STATS } from "@/lib/data/umkm";

export function UMKMStats() {
  return (
    <section className="bg-cream py-20 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="font-serif text-4xl md:text-5xl text-navy mb-6">
            Menghidupkan Ekonomi Berbasis Budaya
          </h2>
          <p className="font-body text-navy-light/80 text-lg">
            Masyarakat Pulau Penyengat terus berinovasi menghasilkan karya dan kuliner berkualitas yang mencerminkan kekayaan sejarah Melayu.
          </p>
        </div>
        
        <div className="md:w-1/2 flex justify-center md:justify-end w-full">
          <div className="bg-white p-8 md:p-12 shadow-sm border border-navy/5 flex flex-col items-center justify-center text-center max-w-sm w-full">
            <span className="font-sans text-6xl md:text-7xl font-light text-gold mb-4">
              {UMKM_STATS.halalCertified}
            </span>
            <span className="font-body text-navy text-xl font-medium block mb-2">
              Produk UMKM Bersertifikat Halal
            </span>
            <span className="font-mono text-xs text-navy/40 uppercase tracking-wider">
              Sumber: {UMKM_STATS.halalSource}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
