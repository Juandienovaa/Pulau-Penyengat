"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, ChevronRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Beranda", href: "/" },
  { name: "Sejarah", href: "/sejarah" },
  { name: "Peta Interaktif", href: "/peta" },
  { name: "Cagar Budaya", href: "/cagar-budaya" },
  { name: "Agenda", href: "/agenda" },
  { name: "UMKM", href: "/umkm" },
];

const GOLD = "#D4AF37";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-[#0A0A0A] border-b border-white/5"
            : "bg-transparent"
        )}
        style={
          !isScrolled
            ? {
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 100%)",
              }
            : {}
        }
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <MapPin
              className="w-5 h-5 transition-transform group-hover:scale-110"
              style={{ color: GOLD }}
              strokeWidth={2.5}
            />
            <span
              className="text-[1.15rem] text-white tracking-wide"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              Penyengat
            </span>
          </Link>

          {/* ── Desktop Nav — center ── */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-200 py-1 group",
                    isActive ? "text-[#D4AF37]" : "text-white/75"
                  )}
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  <span
                    className={cn(
                      "transition-colors duration-200",
                      !isActive && "group-hover:text-[#D4AF37]"
                    )}
                  >
                    {link.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-gold-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-[1.5px]"
                      style={{ backgroundColor: GOLD }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── CTA ── */}
          <div className="hidden lg:block shrink-0">
            <Link
              href="/peta"
              className="inline-flex items-center gap-2 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-200 hover:opacity-85"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                backgroundColor: GOLD,
                color: "#0A0A0A",
                borderRadius: "2px",
              }}
            >
              Mulai Eksplorasi
            </Link>
          </div>

          {/* ── Mobile burger ── */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:text-[#D4AF37] transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
      </motion.header>

      {/* ── Full-Screen Mobile Menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] flex flex-col"
            style={{ backgroundColor: "#080808" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 h-[72px] border-b"
              style={{ borderColor: "rgba(212,175,55,0.15)" }}
            >
              <span
                className="text-white text-base tracking-[0.08em] uppercase"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontWeight: 700,
                }}
              >
                Penyengat
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col justify-center px-8 gap-0">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.08 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center justify-between py-5 border-b group"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span
                      className="text-white text-2xl group-hover:text-[#D4AF37] transition-colors"
                      style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {link.name}
                    </span>
                    <ChevronRight
                      className="w-4 h-4 text-white/20 group-hover:text-[#D4AF37] transition-colors"
                      strokeWidth={1.5}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="px-8 pb-12">
              <Link
                href="/peta"
                className="w-full flex items-center justify-center py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-85"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  backgroundColor: GOLD,
                  color: "#0A0A0A",
                  borderRadius: "2px",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Mulai Eksplorasi
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
