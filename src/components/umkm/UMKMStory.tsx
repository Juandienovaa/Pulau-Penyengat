import Image from "next/image";
import { UMKM_DATA } from "@/lib/data/umkm";
import Link from "next/link";

export function UMKMStorySection() {
  return (
    <section id="story" className="py-24 md:py-32 bg-cream overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left: Big Image */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative aspect-[3/4] w-full max-w-lg mx-auto lg:mx-0 overflow-hidden">
            <Image
              src="/images/umkm/artisan-story.jpg" // We'll assume this exists or use a generic one like hero
              alt="Masyarakat Pulau Penyengat sedang berkarya"
              fill
              className="object-cover transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-navy/10 mix-blend-multiply" />
          </div>
          {/* Accent square */}
          <div className="absolute -bottom-8 -right-8 w-1/2 aspect-square border border-gold/40 -z-10 hidden md:block" />
        </div>
        
        {/* Right: Editorial Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-8 bg-gold" />
            <span className="font-heading text-[10px] md:text-[11px] tracking-[0.28em] text-gold uppercase font-bold">
              CERITA MASYARAKAT
            </span>
          </div>
          
          <h2 
            className="font-serif text-navy leading-tight mb-8"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", textWrap: "balance" }}
          >
            Dibuat dengan tangan.<br className="hidden lg:block"/> Dibawa pulang dengan cerita.
          </h2>
          
          <div className="prose prose-lg prose-navy max-w-xl font-body text-navy-light/80 font-light leading-relaxed mb-10">
            <p>
              Setiap ukiran kayu, setiap tetes malam pada kain batik, dan setiap racikan bumbu kuliner di Pulau Penyengat tidak hanya lahir dari keterampilan teknis, melainkan dari memori kolektif masyarakat Melayu.
            </p>
            <p>
              Mendukung UMKM lokal berarti turut merawat nafas tradisi agar tetap hidup di tengah arus zaman, memberikan penghidupan bagi keluarga setempat, dan membawa sebagian dari identitas kebesaran masa lalu kembali ke rumah Anda.
            </p>
          </div>
          
          <Link 
            href="/sejarah" 
            className="inline-flex items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-navy hover:text-gold transition-colors duration-300 group w-fit"
          >
            Pelajari Sejarah Mereka 
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
