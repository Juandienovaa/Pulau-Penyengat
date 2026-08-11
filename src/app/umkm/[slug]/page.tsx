import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { UMKM_DATA } from "@/lib/data/umkm";
import { Navigation, MapPin, Clock, ShieldCheck, ChevronLeft, MessageCircle } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

// Generate static params for all slugs
export function generateStaticParams() {
  return UMKM_DATA.map((umkm) => ({
    slug: umkm.slug,
  }));
}

export default async function UMKMProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const umkm = UMKM_DATA.find((u) => u.slug === slug);

  if (!umkm) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Back Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-navy/80 to-transparent">
        <Link 
          href="/umkm"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-sans font-medium">Kembali ke Marketplace</span>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full bg-navy">
        <Image
          src={umkm.coverImage}
          alt={umkm.name}
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-7xl mx-auto">
          <span className="font-mono text-sm tracking-widest text-gold uppercase mb-4 block">
            {umkm.category}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">
            {umkm.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 font-sans text-cream/80">
            {umkm.address && (
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold" />
                {umkm.address}
              </span>
            )}
            {umkm.halalCertified && (
              <span className="flex items-center gap-2 bg-green-900/50 text-green-300 px-3 py-1 rounded border border-green-700/50">
                <ShieldCheck className="w-4 h-4" />
                Sertifikasi Halal
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col lg:flex-row gap-16">
        {/* Main Content */}
        <div className="lg:w-2/3">
          <section className="mb-16">
            <h2 className="font-serif text-3xl text-navy mb-6">Cerita Kami</h2>
            <p className="font-body text-lg text-navy-light/80 leading-relaxed mb-6">
              {umkm.story || umkm.description}
            </p>
            {umkm.verifiedSource && (
              <div className="bg-navy/5 p-4 border-l-2 border-gold text-sm font-sans text-navy/60">
                Data terverifikasi berdasarkan: {umkm.verifiedSource}
              </div>
            )}
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-3xl text-navy mb-8">Katalog Produk</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {umkm.products.map(product => (
                <div key={product.id} className="bg-white border border-navy/10 overflow-hidden flex flex-col group">
                  <div className="relative h-64 w-full bg-cream">
                    {product.image && (
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    )}
                    {product.halal && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold text-green-700 uppercase tracking-wide border border-green-200">
                        Halal
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-serif text-2xl text-navy mb-2">{product.name}</h3>
                    <p className="font-body text-sm text-navy/70 mb-4 flex-grow">{product.description}</p>
                    
                    {product.ingredients && product.ingredients.length > 0 && (
                      <div className="mb-4">
                        <span className="text-xs text-navy/50 font-bold uppercase tracking-wider mb-1 block">Komposisi:</span>
                        <p className="font-body text-sm text-navy/70">{product.ingredients.join(', ')}</p>
                      </div>
                    )}

                    <div className="flex items-end justify-between mt-auto pt-4 border-t border-navy/5">
                      <div>
                        <span className="block text-xs text-navy/50 mb-1">Status</span>
                        <span className={`text-sm font-medium ${product.availability === 'Tersedia' ? 'text-green-600' : 'text-gold'}`}>
                          {product.availability}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="block text-xs text-navy/50 mb-1">Harga</span>
                        <span className="font-medium text-navy">
                          {product.priceDisplay || "Hubungi Penjual"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {umkm.gallery && umkm.gallery.length > 0 && (
            <section>
              <h2 className="font-serif text-3xl text-navy mb-8">Galeri</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {umkm.gallery.map((img, i) => (
                  <div key={i} className="relative aspect-square bg-navy/5">
                    <Image src={img} alt={`Gallery ${i+1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:w-1/3">
          <div className="sticky top-24 flex flex-col gap-8">
            
            {/* Visit Card */}
            <div className="bg-white border border-navy/10 p-8 shadow-sm">
              <h3 className="font-serif text-2xl text-navy mb-6">Kunjungi Toko</h3>
              
              <ul className="flex flex-col gap-4 font-body text-navy/80 mb-8">
                {umkm.address && (
                  <li className="flex gap-3">
                    <MapPin className="w-5 h-5 text-gold shrink-0" />
                    <span>{umkm.address}</span>
                  </li>
                )}
                <li className="flex gap-3 text-navy/60">
                  <Clock className="w-5 h-5 shrink-0" />
                  <span>Jadwal operasional belum tersedia secara spesifik, harap hubungi penjual.</span>
                </li>
              </ul>
              
              <Link 
                href={`/peta?destination=${umkm.id}`}
                className="w-full flex items-center justify-center gap-2 bg-navy text-white px-6 py-4 hover:bg-navy-light transition-colors font-medium mb-4"
              >
                <Navigation className="w-5 h-5" />
                Petunjuk Arah
              </Link>
              
              <div className="flex gap-4">
                {umkm.whatsapp && (
                  <a href={`https://wa.me/${umkm.whatsapp}`} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 border border-green-600 text-green-700 hover:bg-green-50 px-4 py-3 transition-colors font-medium text-sm">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                )}
                {umkm.instagram && (
                  <a href={`https://instagram.com/${umkm.instagram}`} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 border border-pink-600 text-pink-700 hover:bg-pink-50 px-4 py-3 transition-colors font-medium text-sm">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> Instagram
                  </a>
                )}
              </div>
            </div>

            {/* Local Context */}
            <div className="bg-cream border border-navy/10 p-8">
              <h3 className="font-serif text-xl text-navy mb-4">Dukung Ekonomi Lokal</h3>
              <p className="font-body text-sm text-navy/70 leading-relaxed mb-6">
                Setiap transaksi yang Anda lakukan secara langsung memberikan dampak positif pada perekonomian masyarakat Pulau Penyengat dan menjaga warisan kebudayaan tetap hidup.
              </p>
            </div>

          </div>
        </aside>
      </div>

      <Footer />
    </main>
  );
}
