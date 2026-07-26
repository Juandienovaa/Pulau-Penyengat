"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FONT_CYCLES = [
  { font: "'Playfair Display', serif", weight: "900", style: "normal" },
  { font: "'Cormorant Garamond', serif", weight: "300", style: "italic" },
  { font: "var(--font-montserrat), sans-serif", weight: "800", style: "normal" },
  { font: "'Playfair Display', serif", weight: "700", style: "italic" },
  { font: "var(--font-montserrat), sans-serif", weight: "300", style: "normal" },
  { font: "'Cormorant Garamond', serif", weight: "600", style: "normal" },
  { font: "var(--font-jetbrains), monospace", weight: "400", style: "normal" },
];

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [fontIndex, setFontIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startTime = useRef<number>(Date.now());
  const DURATION = 2800; // ms total

  useEffect(() => {
    // Font cycling interval
    const fontInterval = setInterval(() => {
      setFontIndex((prev) => (prev + 1) % FONT_CYCLES.length);
    }, 300);

    // Progress animation using RAF
    const animate = () => {
      const elapsed = Date.now() - startTime.current;
      const raw = elapsed / DURATION;
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - Math.min(raw, 1), 3);
      const val = Math.floor(eased * 100);
      setProgress(val);

      if (elapsed < DURATION) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setProgress(100);
        clearInterval(fontInterval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => setIsDone(true), 900);
        }, 300);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      clearInterval(fontInterval);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isDone) return null;

  const currentFont = FONT_CYCLES[fontIndex];

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#0A0A0A" }}
        >
          {/* Grain / Noise Texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "200px",
            }}
          />

          {/* Top line accent */}
          <motion.div
            className="absolute top-0 left-0 h-[1px] bg-white/20"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0 }}
          />

          {/* Center Content */}
          <div className="relative z-10 flex flex-col items-center gap-0 select-none px-6 text-center">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/40 text-xs tracking-[0.4em] uppercase mb-8 font-light"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Kepulauan Riau — Indonesia
            </motion.p>

            {/* Main Font-Cycling Text — font changes instantly, no flicker */}
            <h1
              className="text-white leading-none"
              style={{
                fontFamily: currentFont.font,
                fontWeight: currentFont.weight,
                fontStyle: currentFont.style,
                fontSize: "clamp(2.8rem, 8vw, 7rem)",
                letterSpacing: currentFont.style === "italic" ? "-0.01em" : "-0.02em",
                transition: "clip-path 0.25s ease",
              }}
            >
              Pulau Penyengat
            </h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-12 h-[1px] bg-[#E1251B] my-8 origin-left"
            />

            {/* Progress Counter */}
            <div className="flex items-end gap-1">
              <motion.span
                className="text-white font-light tabular-nums"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  lineHeight: 1,
                }}
              >
                {String(progress).padStart(2, "0")}
              </motion.span>
              <span
                className="text-white/30 text-xl mb-2"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                %
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-48 h-[1px] bg-white/10 mt-6 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#E1251B]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Loading label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-white/25 text-[10px] tracking-[0.5em] uppercase mt-6"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Memuat Pengalaman
            </motion.p>
          </div>

          {/* Corner accents */}
          <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-white/10" />
          <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-white/10" />
          <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-white/10" />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-white/10" />

          {/* Exit slide-up overlay */}
          <AnimatePresence>
            {isExiting && (
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 bg-white"
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
