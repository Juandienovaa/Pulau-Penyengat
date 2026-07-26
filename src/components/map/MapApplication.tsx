"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { OSMHeritageFeature, OSRMRouteResult } from "@/lib/types";
import { fetchOSMFeatures, fetchOSRMRoute } from "@/lib/services/osmService";
import { useDigitalHeritageStore } from "@/lib/store/useDigitalHeritageStore";
import { Search, MapPin, X, Navigation, LocateFixed, Compass } from "lucide-react";
import { AppleBottomSheet } from "./AppleBottomSheet";
import { motion, AnimatePresence } from "framer-motion";

// Helper: Haversine distance
function getDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Custom Icons
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const categoryColors: Record<string, string> = {
  Masjid: '#059669', Makam: '#7C3AED', Istana: '#D4AF37',
  Benteng: '#DC2626', Gedung: '#2563EB', Balai: '#0284C7',
  Perigi: '#0EA5E9', Museum: '#9333EA', Pelabuhan: '#0284C7', Lainnya: '#0F172A'
};

const userIcon = L.divIcon({
  className: "user-live-marker",
  html: `<div style="background-color: #3B82F6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.3);"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => { map.flyTo(center, 17, { duration: 1.2 }); }, [center, map]);
  return null;
}

export function MapApplication() {
  const defaultCenter: [number, number] = [0.927351, 104.417154];
  const { setActiveFeature, activeFeature, setAppMode, activeRoute, setActiveRoute } = useDigitalHeritageStore();
  
  const [activeCenter, setActiveCenter] = useState<[number, number]>(defaultCenter);
  const [osmFeatures, setOsmFeatures] = useState<OSMHeritageFeature[]>([]);
  
  // GPS State
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [gpsAccuracy, setGpsAccuracy] = useState<number | null>(null);
  const watchIdRef = useRef<number | null>(null);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [showWelcome, setShowWelcome] = useState(true); // Welcome popup
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetchOSMFeatures().then(setOsmFeatures);
    return () => { if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current); };
  }, []);

  const requestLocation = () => {
    setShowWelcome(false);
    if (!navigator.geolocation) return alert("Geolokasi tidak didukung.");
    
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        setGpsAccuracy(Math.round(pos.coords.accuracy));
        if (!activeFeature) setActiveCenter([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => alert("Gagal mengambil lokasi: " + err.message),
      { enableHighAccuracy: true }
    );
  };

  const handleCalculateRoute = async () => {
    if (!activeFeature) return;
    const startPoint = userLocation || defaultCenter;
    const result = await fetchOSRMRoute(startPoint[0], startPoint[1], activeFeature.lat, activeFeature.lng);
    
    if (result) {
      setActiveRoute(result);
    } else {
      // Fallback straight line
      const dist = getDistanceMeters(startPoint[0], startPoint[1], activeFeature.lat, activeFeature.lng);
      setActiveRoute({
        coordinates: [startPoint, [activeFeature.lat, activeFeature.lng]],
        distanceMeters: dist,
        durationSeconds: Math.round(dist / 1.2),
        steps: [{ instruction: `Menuju ${activeFeature.name}`, distanceMeters: dist, durationSeconds: Math.round(dist / 1.2) }]
      });
    }
    setAppMode("navigate");
  };

  const filteredFeatures = useMemo(() => {
    return osmFeatures.filter(f => {
      const matchQ = f.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchC = selectedCategory === "ALL" || f.category === selectedCategory;
      return matchQ && matchC;
    });
  }, [osmFeatures, searchQuery, selectedCategory]);

  return (
    <div className="w-full h-[100dvh] relative overflow-hidden bg-slate-100">
      
      {/* Full Width Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 z-[6000] bg-navy flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <span className="text-white font-heading font-bold text-xl">Pulau Penyengat</span>
              <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8 p-6">
              <a href="/" className="text-3xl font-heading font-bold text-white hover:text-gold transition-colors text-center w-full">Beranda</a>
              <a href="/sejarah" className="text-3xl font-heading font-bold text-white hover:text-gold transition-colors text-center w-full">Jelajah Sejarah</a>
              <a href="/cagar-budaya" className="text-3xl font-heading font-bold text-white hover:text-gold transition-colors text-center w-full">Cagar Budaya</a>
            </div>
            <div className="p-8 text-center text-white/50 text-xs">
              <p>Platform Digital Pariwisata Terpadu</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome Popup Overlay */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-[5000] bg-navy/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
                <Compass className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-navy mb-4">Siapkah Anda menjelajahi pulau seribu sejarah ini?</h2>
              <p className="text-sm text-gray-500 mb-8">Aktifkan lokasi Anda untuk mendapatkan panduan navigasi interaktif selama berada di Pulau Penyengat.</p>
              
              <div className="flex flex-col gap-3">
                <button onClick={requestLocation} className="w-full bg-navy text-white py-4 rounded-xl font-bold active:scale-95 transition-transform">
                  Ya, Aktifkan Lokasi
                </button>
                <button onClick={() => setShowWelcome(false)} className="w-full bg-gray-100 text-gray-600 py-4 rounded-xl font-bold active:scale-95 transition-transform">
                  Nanti Saja
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Top UI (Search & Categories) */}
      <div className="absolute top-0 left-0 right-0 z-[1000] p-4 md:p-6 pointer-events-none flex justify-center">
        <div className="w-full max-w-md pointer-events-auto flex flex-col gap-3">
          {/* Search Bar & Menu */}
          <div className="flex gap-2">
            <div className="relative bg-white shadow-lg rounded-2xl flex-1 flex items-center px-4 py-3 border border-gray-100">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Cari cagar budaya..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none pl-3 text-sm text-navy placeholder:text-gray-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}>
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
            
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="bg-navy text-white shadow-lg rounded-2xl w-12 h-12 flex items-center justify-center shrink-0 active:scale-95 transition-transform"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>
          
          {/* Categories Horizontal Scroll */}
          <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-2 pb-3 pt-1 px-1 -mx-1">
            {["ALL", "Masjid", "Makam", "Istana", "Benteng", "Gedung"].map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-sm transition-colors ${
                  selectedCategory === cat ? "bg-navy text-white" : "bg-white text-navy hover:bg-gray-50"
                }`}
              >
                {cat === "ALL" ? "Semua" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GPS FAB Button */}
      <button 
        onClick={requestLocation}
        className="absolute bottom-32 right-4 z-[1000] w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-navy hover:text-gold transition-colors"
      >
        <LocateFixed className="w-5 h-5" />
      </button>

      {/* Map Canvas */}
      <MapContainer center={activeCenter} zoom={16} className="w-full h-full z-0" zoomControl={false}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
        <MapUpdater center={activeCenter} />

        {/* User Location */}
        {userLocation && (
          <>
            <Marker position={userLocation} icon={userIcon} />
            {gpsAccuracy && <Circle center={userLocation} radius={gpsAccuracy} pathOptions={{ color: "#3B82F6", weight: 1, fillOpacity: 0.1 }} />}
          </>
        )}

        {/* Active Route */}
        {activeRoute && <Polyline positions={activeRoute.coordinates} color="#3B82F6" weight={5} dashArray="8,8" />}

        {/* Features */}
        {filteredFeatures.map(feat => (
          <Marker 
            key={feat.osm_id} 
            position={[feat.lat, feat.lng]} 
            icon={createCustomIcon(categoryColors[feat.category] || categoryColors.Lainnya)}
            eventHandlers={{
              click: () => {
                setActiveFeature(feat);
                setActiveCenter([feat.lat, feat.lng]);
              }
            }}
          />
        ))}
      </MapContainer>

      {/* Bottom Sheet for Location List & Details */}
      <AppleBottomSheet 
        features={filteredFeatures} 
        userLocation={userLocation} 
        onNavigate={handleCalculateRoute} 
      />

    </div>
  );
}
