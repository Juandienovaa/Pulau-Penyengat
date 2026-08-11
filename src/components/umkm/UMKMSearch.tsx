"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { UMKM_DATA } from "@/lib/data/umkm";

export function UMKMSearch() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Simple client-side search logic
  const results = query.length > 1 
    ? UMKM_DATA.filter(u => 
        u.name.toLowerCase().includes(query.toLowerCase()) || 
        u.category.toLowerCase().includes(query.toLowerCase()) ||
        u.products.some(p => p.name.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <section className="bg-cream py-12 px-6 lg:px-10 border-b border-black/5 relative z-40">
      <div className="max-w-3xl mx-auto relative">
        <div 
          className={`relative flex items-center w-full transition-all duration-300 bg-white ${
            isFocused ? 'ring-1 ring-gold shadow-lg shadow-gold/5' : 'ring-1 ring-black/5 shadow-sm'
          } rounded-none`}
        >
          <div className="pl-6 text-navy/40">
            <Search className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <input
            type="text"
            placeholder="Cari makanan, kerajinan, atau cerita lokal..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="w-full py-4 px-4 outline-none font-body text-navy placeholder:text-navy/40 placeholder:font-light bg-transparent"
          />
          {query && (
            <button 
              onClick={() => setQuery("")}
              className="pr-6 text-navy/40 hover:text-navy transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* Dropdown Results */}
        {query.length > 1 && isFocused && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-2xl border border-black/5 z-50 rounded-sm">
            {results.length > 0 ? (
              <ul className="max-h-96 overflow-y-auto">
                {results.map((result) => (
                  <li key={result.id}>
                    <Link 
                      href={`/umkm/${result.slug}`}
                      className="flex items-center px-6 py-4 hover:bg-cream transition-colors border-b border-black/5 last:border-0 group"
                    >
                      <div className="flex-grow">
                        <h4 className="font-serif text-xl text-navy mb-1 group-hover:text-gold transition-colors">{result.name}</h4>
                        <span className="font-heading text-[10px] uppercase tracking-widest text-navy/40 font-bold">{result.category}</span>
                      </div>
                      <div className="text-navy/20 group-hover:text-gold group-hover:translate-x-1 transition-all">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-navy/60 font-body font-light">
                Tidak ditemukan hasil untuk "{query}".
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
