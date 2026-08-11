import Image from "next/image";
import Link from "next/link";
import { UMKM_DATA } from "@/lib/data/umkm";

export function ProductShowcase() {
  // Extract all valid products, select top 2-3 for editorial showcase
  const products = UMKM_DATA.flatMap(u => 
    u.products.map(p => ({ ...p, umkm: u }))
  ).filter(p => p.image).slice(0, 3);

  if (products.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        
        <div className="flex flex-col items-center text-center mb-20">
          <span className="font-heading text-[10px] tracking-widest text-gold uppercase font-bold mb-4 block">
            PRODUK PILIHAN
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-navy">
            Yang Dibawa Pulang
          </h2>
        </div>

        <div className="flex flex-col gap-24">
          {products.map((product, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={product.id} 
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-20 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2 relative aspect-square md:aspect-[4/3] bg-cream overflow-hidden group">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {product.halal && (
                    <div className="absolute top-6 right-6 bg-white/90 px-3 py-1 font-heading text-[10px] font-bold text-green-700 uppercase tracking-widest border border-green-700/20 shadow-sm backdrop-blur-sm">
                      Halal
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <span className="font-heading text-[10px] tracking-widest text-gold uppercase font-bold mb-4 block">
                    {product.umkm.category}
                  </span>
                  
                  <h3 className="font-serif text-4xl md:text-5xl text-navy mb-6">
                    {product.name}
                  </h3>
                  
                  <p className="font-body text-navy/70 text-lg font-light leading-relaxed mb-8">
                    {product.description}
                  </p>
                  
                  <div className="flex flex-col md:flex-row gap-8 mb-10 pb-10 border-b border-black/5">
                    <div>
                      <span className="block font-heading text-[10px] uppercase text-navy/40 mb-1">Oleh</span>
                      <span className="font-serif text-xl text-navy">{product.umkm.name}</span>
                    </div>
                    {product.priceDisplay && (
                      <div>
                        <span className="block font-heading text-[10px] uppercase text-navy/40 mb-1">Harga</span>
                        <span className="font-body text-navy">{product.priceDisplay}</span>
                      </div>
                    )}
                  </div>
                  
                  <Link 
                    href={`/umkm/${product.umkm.slug}`}
                    className="inline-flex items-center justify-center px-8 py-4 bg-navy text-white font-heading text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-navy-light transition-colors w-full sm:w-fit"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
