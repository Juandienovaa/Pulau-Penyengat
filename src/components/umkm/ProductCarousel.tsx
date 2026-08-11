"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { UMKM_DATA } from "@/lib/data/umkm";

export function ProductCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Flatten all products
  const allProducts = UMKM_DATA.flatMap(umkm => 
    umkm.products.map(product => ({
      ...product,
      umkmName: umkm.name,
      umkmSlug: umkm.slug,
      category: umkm.category,
      address: umkm.address
    }))
  ).filter(p => p.image); // only those with images

  if (allProducts.length === 0) return null;

  return (
    <section className="py-24 bg-navy text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl mb-4 text-cream">Produk Pilihan</h2>
            <p className="font-body text-cream/70 max-w-xl text-lg">
              Rekomendasi karya dan kuliner unggulan dari masyarakat Pulau Penyengat yang wajib Anda coba dan bawa pulang.
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Previous product"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button 
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Next product"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8"
        >
          {allProducts.map((product) => (
            <div 
              key={product.id} 
              className="flex-none w-[300px] sm:w-[400px] bg-navy-light border border-white/10 snap-start group"
            >
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-navy-dark">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-light via-transparent to-transparent" />
                
                {product.halal && (
                  <div className="absolute top-4 left-4 bg-green-900/80 backdrop-blur-sm px-3 py-1 text-xs font-bold text-green-300 uppercase tracking-wide border border-green-700">
                    Halal
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-xs tracking-wider text-gold uppercase">
                    {product.category}
                  </span>
                  <span className="font-sans text-sm text-cream/80">
                    {product.availability}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-cream mb-2">
                  {product.name}
                </h3>
                <p className="font-body text-sm text-cream/60 line-clamp-2 mb-6 h-10">
                  {product.description}
                </p>
                
                <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-cream/50 mb-1">Oleh</p>
                    <p className="font-medium text-cream">{product.umkmName}</p>
                  </div>
                  <Link 
                    href={`/umkm/${product.umkmSlug}`}
                    className="text-gold font-sans text-sm font-medium hover:text-gold-light transition-colors"
                  >
                    Kunjungi Toko
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
