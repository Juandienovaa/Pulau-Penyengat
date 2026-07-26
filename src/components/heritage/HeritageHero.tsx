"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const TAGS = [
  { label: "04", separator: "—", text: "CAGAR BUDAYA" },
];

export function HeritageHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden flex items-end"
      style={{ backgroundColor: "#080808" }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />

      {/* Background photo — right half */}
      <motion.div
        style={{ y: imageY }}
        className="absolute top-0 right-0 w-full md:w-[52%] h-full z-0"
      >
        <Image
          src="/images/hero-1.jpg"
          alt="Cagar Budaya Pulau Penyengat"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient fade to the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/60 to-transparent" />
        {/* Gradient fade bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/30" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-20 w-full container mx-auto px-6 md:px-12 pb-20 md:pb-28 pt-40"
      >
        <div className="max-w-3xl">
          {/* Eyebrow tag — like the reference image "04 — LAYANAN WISATA" */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-3 mb-8"
          >
            <span
              className="text-[#E1251B] text-xs tracking-[0.3em]"
              style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500 }}
            >
              04
            </span>
            <span className="text-white/30 text-xs">—</span>
            <span
              className="text-white/50 text-xs tracking-[0.3em]"
              style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500 }}
            >
              CAGAR BUDAYA
            </span>
          </motion.div>

          {/* Headline — Editorial bold serif */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1
              className="text-white leading-[0.92] mb-2"
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 900,
                fontSize: "clamp(3.5rem, 9vw, 9rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Menjelajah
            </h1>
            {/* Italic gold line — like "Tanpa Batas" in the reference */}
            <h1
              className="leading-[0.92]"
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: "clamp(3.5rem, 9vw, 9rem)",
                letterSpacing: "-0.02em",
                color: "#C9A84C",
              }}
            >
              Waktu
            </h1>
          </motion.div>

          {/* Thin divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="w-16 h-[1px] bg-white/20 my-8 origin-left"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-white/50 text-sm md:text-base leading-relaxed max-w-sm"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
          >
            Koleksi situs bersejarah yang merangkum kejayaan peradaban Melayu. Arsitektur, budaya, dan waktu — tersimpan dalam setiap batu.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center gap-10 mt-12"
          >
            {[
              { val: "34+", label: "Situs Warisan" },
              { val: "1803", label: "Tahun Berdiri" },
              { val: "UNESCO", label: "Kandidat" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span
                  className="text-white text-xl md:text-2xl"
                  style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}
                >
                  {s.val}
                </span>
                <span
                  className="text-white/30 text-[10px] tracking-[0.25em] uppercase"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom left vertical line accent */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "4rem" }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-12 w-[1px] bg-white/15 z-20 hidden md:block"
      />

      {/* Bottom right page indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 right-12 z-20 hidden md:flex items-center gap-3"
      >
        <span className="w-8 h-[1px] bg-white/20" />
        <span
          className="text-white/30 text-[10px] tracking-widest uppercase"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
