"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export function GurindamSplitSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="min-h-screen w-full flex flex-col md:flex-row overflow-hidden"
    >
      {/* ══════════════════════════════════════════
          LEFT — Cinematic Image Panel
      ══════════════════════════════════════════ */}
      <div className="relative w-full md:w-1/2 min-h-[60vw] md:min-h-screen overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/hero-3.jpg"
          alt="Interior Balai Adat Pulau Penyengat"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Dark sepia overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,6,2,0.35) 0%, rgba(20,10,3,0.55) 100%)",
            mixBlendMode: "multiply",
          }}
        />
        {/* Extra warm sepia tint */}
        <div
          className="absolute inset-0"
          style={{
            background: "rgba(62, 35, 8, 0.28)",
          }}
        />

        {/* Vertical scan-line texture for depth */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 3px)",
          }}
        />

        {/* Badge — bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-8 left-8 flex items-center gap-3 px-5 py-3 rounded-md"
          style={{
            background: "rgba(5, 3, 1, 0.72)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(197, 168, 88, 0.45)",
          }}
        >
          {/* Gold dot accent */}
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: "#C5A858" }}
          />
          <span
            className="text-[11px] tracking-[0.22em] uppercase leading-none"
            style={{
              color: "#D4B97A",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 600,
            }}
          >
            Balai Adat &bull; Pulau Penyengat
          </span>
        </motion.div>

        {/* Top-left corner frame accent */}
        <div
          className="absolute top-8 left-8 w-10 h-10 pointer-events-none"
          style={{
            borderTop: "1.5px solid rgba(197,168,88,0.35)",
            borderLeft: "1.5px solid rgba(197,168,88,0.35)",
          }}
        />
        {/* Bottom-right corner frame accent */}
        <div
          className="absolute bottom-8 right-8 w-10 h-10 pointer-events-none"
          style={{
            borderBottom: "1.5px solid rgba(197,168,88,0.2)",
            borderRight: "1.5px solid rgba(197,168,88,0.2)",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════
          RIGHT — Parchment Content Panel
      ══════════════════════════════════════════ */}
      <div
        className="relative w-full md:w-1/2 flex flex-col justify-center px-10 py-16 md:px-16 lg:px-20 xl:px-24 overflow-hidden"
        style={{
          backgroundColor: "#f4ebd0",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        }}
      >
        {/* Subtle left border — aged paper edge */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(180,140,60,0.4) 20%, rgba(180,140,60,0.4) 80%, transparent)",
          }}
        />

        <div className="relative z-10 max-w-lg">
          {/* ① Gold accent bar */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="origin-left mb-10 h-[3px] w-14 rounded-full"
            style={{ backgroundColor: "#B8960C" }}
          />

          {/* ② Gurindam quote — serif italic */}
          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.35 }}
          >
            <p
              className="leading-[1.35] mb-6"
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                color: "#1C1008",
                letterSpacing: "-0.01em",
              }}
            >
              &ldquo;Barang siapa mengenal diri,
              <br />
              maka telah mengenal Tuhan
              <br />
              yang bahri.&rdquo;
            </p>
          </motion.blockquote>

          {/* ③ Author attribution */}
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-[11px] font-bold tracking-[0.2em] uppercase mb-8"
            style={{
              color: "#9A7B2A",
              fontFamily: "var(--font-montserrat), sans-serif",
            }}
          >
            — Gurindam Dua Belas, Raja Ali Haji
          </motion.p>

          {/* ④ Thin divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="origin-left mb-8 h-px w-32"
            style={{ backgroundColor: "rgba(154, 123, 42, 0.3)" }}
          />

          {/* ⑤ Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="text-base leading-[1.85]"
            style={{
              color: "#4A3520",
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 400,
            }}
          >
            Karya sastra agung yang lahir di Pulau Penyengat pada{" "}
            <span style={{ color: "#7A5C18", fontWeight: 600 }}>1847</span>,
            menjadi tonggak peradaban sastra Melayu yang diakui dunia dan
            ditetapkan sebagai{" "}
            <span style={{ color: "#7A5C18", fontWeight: 600 }}>
              Warisan Budaya Tak Benda UNESCO
            </span>
            .
          </motion.p>

          {/* ⑥ Meta tag row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex items-center gap-4 mt-10"
          >
            {["Sastra Melayu", "Warisan Dunia", "1847"].map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full border"
                style={{
                  color: "#9A7B2A",
                  borderColor: "rgba(154, 123, 42, 0.35)",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontWeight: 600,
                  backgroundColor: "rgba(184, 150, 12, 0.07)",
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ⑦ Quill & inkwell illustration — absolute bottom-right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1.1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-6 right-6 md:bottom-10 md:right-10 pointer-events-none select-none"
        >
          <Image
            src="/images/quill-inkwell.png"
            alt="Pena bulu dan wadah tinta"
            width={160}
            height={160}
            className="opacity-25"
            style={{ filter: "sepia(80%) saturate(0.6) brightness(0.7)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
