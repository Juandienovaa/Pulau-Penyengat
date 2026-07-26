"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";

const GOLD = "#D4AF37";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(
        [
          ".hero-overline-line",
          ".hero-overline",
          ".hero-title",
          ".hero-subtitle",
          ".hero-actions",
          ".hero-scroll",
        ],
        { opacity: 0, y: 30 }
      );

      // Cinematic entrance stagger
      const tl = gsap.timeline({ delay: 0.3 });
      tl.to(".hero-overline-line", {
        opacity: 1,
        y: 0,
        scaleX: 1,
        duration: 0.6,
        ease: "power2.out",
      })
        .to(
          ".hero-overline",
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        )
        .to(
          ".hero-title",
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.3"
        )
        .to(
          ".hero-subtitle",
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        )
        .to(
          ".hero-actions",
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        )
        .to(
          ".hero-scroll",
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );

      // Parallax on scroll
      const onScroll = () => {
        if (!bgRef.current) return;
        gsap.set(bgRef.current, { y: window.scrollY * 0.28 });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[680px] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* ── Background image with parallax ── */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/hero-3.jpg"
          alt="Masjid Raya Sultan Riau, Pulau Penyengat"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Primary dark overlay */}
        <div className="absolute inset-0 bg-black/65" />
        {/* Radial vignette for depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        {/* Warm historical tint — very subtle */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 50% 60%, rgba(212,175,55,0.18) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Grain texture ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />

      {/* ── Main content — center aligned ── */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center">

        {/* Overline row: line + text + line */}
        <div className="hero-overline-line flex items-center gap-5 mb-5">
          <div
            className="h-[1px] w-12 md:w-20"
            style={{ backgroundColor: `${GOLD}80` }}
          />
          <p
            className="hero-overline text-[10px] md:text-[11px] tracking-[0.28em] uppercase"
            style={{
              color: GOLD,
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 600,
            }}
          >
            Eksplorasi Jejak Kebudayaan Melayu
          </p>
          <div
            className="h-[1px] w-12 md:w-20"
            style={{ backgroundColor: `${GOLD}80` }}
          />
        </div>

        {/* Main headline — serif */}
        <h1
          className="hero-title text-white leading-[1.07] mb-7"
          style={{
            fontFamily: "'Playfair Display', 'Georgia', serif",
            fontWeight: 700,
            fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
            letterSpacing: "-0.02em",
            textShadow: "0 4px 32px rgba(0,0,0,0.6)",
          }}
        >
          Pesona Sejarah<br />
          <span style={{ color: "#FFFDF5" }}>Pulau Penyengat</span>
        </h1>

        {/* Subtitle */}
        <p
          className="hero-subtitle text-base md:text-lg leading-[1.85] mb-10 max-w-2xl"
          style={{
            color: "rgba(255,255,255,0.65)",
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 300,
          }}
        >
          Pusat sejarah digital yang mendalam. Menyelami keindahan arsitektur masa lampau dan warisan bahasa Indonesia di pulau yang penuh keajaiban.
        </p>

        {/* Action buttons */}
        <div className="hero-actions flex flex-col sm:flex-row items-center gap-4">
          {/* Ghost gold border button */}
          <Link
            href="/peta"
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden"
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              border: `1px solid ${GOLD}`,
              color: "white",
              borderRadius: "1px",
            }}
          >
            {/* Fill on hover */}
            <span
              className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ backgroundColor: GOLD }}
            />
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
              Mulai Menjelajah
            </span>
          </Link>

          {/* Text link */}
          <Link
            href="/sejarah"
            className="text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-200"
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              color: "rgba(255,255,255,0.45)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = GOLD)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
            }
          >
            Jelajahi Sejarah →
          </Link>
        </div>
      </div>

      {/* ── Corner frame accents ── */}
      <div
        className="absolute top-[88px] left-8 w-10 h-10 pointer-events-none hidden md:block"
        style={{
          borderTop: `1px solid ${GOLD}40`,
          borderLeft: `1px solid ${GOLD}40`,
        }}
      />
      <div
        className="absolute top-[88px] right-8 w-10 h-10 pointer-events-none hidden md:block"
        style={{
          borderTop: `1px solid ${GOLD}40`,
          borderRight: `1px solid ${GOLD}40`,
        }}
      />
      <div
        className="absolute bottom-20 left-8 w-10 h-10 pointer-events-none hidden md:block"
        style={{
          borderBottom: `1px solid ${GOLD}40`,
          borderLeft: `1px solid ${GOLD}40`,
        }}
      />
      <div
        className="absolute bottom-20 right-8 w-10 h-10 pointer-events-none hidden md:block"
        style={{
          borderBottom: `1px solid ${GOLD}40`,
          borderRight: `1px solid ${GOLD}40`,
        }}
      />

      {/* ── Scroll indicator ── */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <span
          className="text-[9px] uppercase tracking-[0.35em]"
          style={{
            color: "rgba(255,255,255,0.3)",
            fontFamily: "var(--font-montserrat), sans-serif",
          }}
        >
          Scroll
        </span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <ChevronDown
            className="w-5 h-5 animate-bounce"
            style={{ color: `${GOLD}80` }}
            strokeWidth={1.5}
          />
        </div>
      </div>
    </section>
  );
}
