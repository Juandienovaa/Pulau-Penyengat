"use client";

import Image from "next/image";
import Link from "next/link";

const CATEGORY_CARDS = [
  {
    title: "RASA",
    description: "Nikmati warisan rasa kuliner turun-temurun khas Melayu.",
    image: "/images/umkm/deram-deram-cover.jpg",
    filter: "Kuliner",
  },
  {
    title: "KARYA",
    description: "Kain tenun, motif batik, dan anyaman buah tangan pengrajin lokal.",
    image: "/images/umkm/batik-cover.jpg",
    filter: "Kerajinan",
  },
  {
    title: "CERITA",
    description: "Berbaur dengan penduduk setempat di penginapan dan kedai kopi.",
    image: "/images/umkm/nabila-cover.jpg",
    filter: "Homestay",
  },
];

export function UMKMCategories() {
  return (
    <section className="py-24 bg-white border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl md:text-5xl text-navy mb-6">
              Lebih dari Sekadar Oleh-Oleh
            </h2>
            <p className="font-body text-navy/70 text-lg font-light leading-relaxed">
              Setiap produk membawa cerita tentang keterampilan, tradisi, dan kehidupan masyarakat Pulau Penyengat yang otentik.
            </p>
          </div>
        </div>

        {/* CSS-only snap scrolling container for mobile, grid for desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8 md:grid md:grid-cols-3 md:gap-8 md:pb-0">
          {CATEGORY_CARDS.map((card, i) => (
            <Link 
              href={`#featured-umkm`} 
              key={i}
              className="flex-none w-[85vw] md:w-auto snap-start group relative flex flex-col h-[450px] overflow-hidden rounded-sm"
              onClick={() => {
                // simple hack to scroll to list and maybe set filter state if we have a global state, 
                // but for now it just scrolls
              }}
            >
              <div className="absolute inset-0 bg-navy">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
              </div>
              
              <div className="relative z-10 flex flex-col justify-end h-full p-8 text-white">
                <span className="font-heading text-xs tracking-[0.2em] text-gold uppercase font-bold mb-3 block">
                  Kategori
                </span>
                <h3 className="font-serif text-4xl mb-4 group-hover:-translate-y-1 transition-transform duration-500">
                  {card.title}
                </h3>
                <p className="font-body text-white/80 font-light opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
