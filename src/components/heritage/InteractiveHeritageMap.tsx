"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { OSMHeritageFeature, OSRMRouteResult } from "@/lib/types";
import { fetchOSMFeatures, fetchOSRMRoute } from "@/lib/services/osmService";
import { 
  MapPin, Navigation, Compass, Layers, Coffee, Store, Users, Map as MapIcon, 
  Search, X, Info, ShieldAlert, ArrowRight, Clock, Footprints, Building2, Landmark,
  BookOpen, Sparkles, CheckCircle2, ChevronRight
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Helper: Haversine distance in meters
function getDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

// Custom SVG Icons Generator per Category
const createCustomIcon = (color: string, labelIconSvg: string) => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background-color: ${color};
        width: 42px;
        height: 42px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 14px rgba(0,0,0,0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        transition: transform 0.2s ease;
      ">
        ${labelIconSvg}
      </div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 42],
    popupAnchor: [0, -42],
  });
};

const categoryIcons: Record<string, L.DivIcon> = {
  Masjid: createCustomIcon('#059669', '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a4 4 0 0 0-4 4v2H4v14h16V8h-4V6a4 4 0 0 0-4-4z"/><path d="M12 18v-4"/></svg>'),
  Makam: createCustomIcon('#7C3AED', '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"/><path d="M17 7H7"/><path d="M19 12H5"/></svg>'),
  Istana: createCustomIcon('#D4AF37', '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-4a3 3 0 0 1 6 0v4"/></svg>'),
  Benteng: createCustomIcon('#DC2626', '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 21h16"/><path d="M5 21V5l3-2 4 2 4-2 3 2v16"/><path d="M9 10h6v11H9z"/></svg>'),
  Gedung: createCustomIcon('#2563EB', '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/></svg>'),
  Balai: createCustomIcon('#0284C7', '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10l9-7 9 7v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10z"/></svg>'),
  Perigi: createCustomIcon('#0EA5E9', '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v10"/></svg>'),
  Museum: createCustomIcon('#9333EA', '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 22h20"/><path d="M4 18v-8"/><path d="M12 2L2 7h20L12 2z"/></svg>'),
  Pelabuhan: createCustomIcon('#0284C7', '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20h20"/><path d="M5 17l2-7h10l2 7"/><path d="M12 3v7"/></svg>'),
  Lainnya: createCustomIcon('#0F172A', '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>')
};

const userIcon = L.divIcon({
  className: "user-live-marker",
  html: `
    <div style="
      background-color: #3B82F6;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: 4px solid white;
      box-shadow: 0 0 0 10px rgba(59, 130, 246, 0.35);
    " class="animate-pulse"></div>
  `,
  iconSize: [26, 26],
  iconAnchor: [13, 13],
});

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 17, { duration: 1.2 });
  }, [center, map]);
  return null;
}

export function InteractiveHeritageMap() {
  const defaultCenter: [number, number] = [0.927351, 104.417154]; // Masjid Raya Sultan Riau (OSM Coordinates)
  const [activeCenter, setActiveCenter] = useState<[number, number]>(defaultCenter);
  const [osmFeatures, setOsmFeatures] = useState<OSMHeritageFeature[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<OSMHeritageFeature | null>(null);

  // GPS watchPosition State
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [gpsAccuracy, setGpsAccuracy] = useState<number | null>(null);
  const [isWatchActive, setIsWatchActive] = useState(false);
  const watchIdRef = useRef<number | null>(null);

  // OSRM Routing State
  const [osrmRoute, setOsrmRoute] = useState<OSRMRouteResult | null>(null);
  const [isRoutingLoading, setIsRoutingLoading] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Fetch OSM features on mount
    fetchOSMFeatures().then(features => {
      setOsmFeatures(features);
    });
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Continuous watchPosition GPS Engine
  const startGpsWatch = () => {
    if (!navigator.geolocation) {
      showToast("Geolokasi tidak didukung pada browser Anda.");
      return;
    }

    if (isWatchActive) {
      // Toggle off
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      setIsWatchActive(false);
      showToast("Pelacakan GPS dihentikan.");
      return;
    }

    showToast("Mengaktifkan pelacakan GPS live (watchPosition)...");

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(coords);
        setGpsAccuracy(Math.round(pos.coords.accuracy));
        setIsWatchActive(true);
      },
      (err) => {
        setIsWatchActive(false);
        if (err.code === err.PERMISSION_DENIED) {
          showToast("Akses GPS Ditolak! Harap izinkan lokasi pada pengaturan browser Anda.");
        } else {
          showToast("Gagal mengambil posisi GPS live.");
        }
      },
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 10000 }
    );

    watchIdRef.current = id;
  };

  // Trigger OSRM Road-Snapped Navigation Route
  const handleCalculateRoute = async (feature: OSMHeritageFeature) => {
    const startPoint = userLocation || defaultCenter;
    setIsRoutingLoading(true);
    showToast(`Menghitung rute jalan kaki OSRM menuju ${feature.name}...`);

    try {
      const result = await fetchOSRMRoute(startPoint[0], startPoint[1], feature.lat, feature.lng);
      setIsRoutingLoading(false);

      if (result) {
        setOsrmRoute(result);
        setActiveCenter([feature.lat, feature.lng]);
        showToast(`Rute terpasang! Jarak: ${result.distanceMeters}m (~${Math.round(result.durationSeconds/60)} mnt)`);
      } else {
        // Fallback straight line
        const dist = getDistanceMeters(startPoint[0], startPoint[1], feature.lat, feature.lng);
        setOsrmRoute({
          coordinates: [startPoint, [feature.lat, feature.lng]],
          distanceMeters: dist,
          durationSeconds: Math.round(dist / 1.2),
          steps: [{ instruction: `Jalan menuju ${feature.name}`, distanceMeters: dist, durationSeconds: Math.round(dist / 1.2) }]
        });
        showToast("Rute langsung (OSRM Server Offline).");
      }
    } catch (err) {
      setIsRoutingLoading(false);
      const dist = getDistanceMeters(startPoint[0], startPoint[1], feature.lat, feature.lng);
      setOsrmRoute({
        coordinates: [startPoint, [feature.lat, feature.lng]],
        distanceMeters: dist,
        durationSeconds: Math.round(dist / 1.2),
        steps: [{ instruction: `Jalan menuju ${feature.name}`, distanceMeters: dist, durationSeconds: Math.round(dist / 1.2) }]
      });
      showToast("Rute langsung (Jaringan Terbatas).");
    }
  };

  // Filter Features sorted by distance if GPS active
  const filteredFeatures = useMemo(() => {
    return osmFeatures
      .filter(feat => {
        const matchesQuery = feat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             (feat.metadata?.shortDescription || "").toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCat = selectedCategory === "ALL" || feat.category === selectedCategory;
        return matchesQuery && matchesCat;
      })
      .map(feat => {
        const dist = userLocation ? getDistanceMeters(userLocation[0], userLocation[1], feat.lat, feat.lng) : undefined;
        return { ...feat, dist };
      })
      .sort((a, b) => (a.dist ?? 999999) - (b.dist ?? 999999));
  }, [osmFeatures, searchQuery, selectedCategory, userLocation]);

  if (!isClient) return <div className="h-[750px] w-full bg-navy/5 animate-pulse rounded-3xl" />;

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">OpenStreetMap Single Source of Truth</span>
            <h2 className="font-heading font-bold text-5xl text-navy">Peta GIS & Navigasi Jalan Kaki</h2>
          </div>
          <div className="flex items-center gap-3">
            {isWatchActive && gpsAccuracy && (
              <span className="px-3.5 py-1.5 bg-green-500/10 border border-green-500/30 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                GPS Live (±{gpsAccuracy}m)
              </span>
            )}
          </div>
        </div>

        {/* GIS Map Canvas Container */}
        <div className="relative h-[80vh] min-h-[680px] w-full rounded-3xl overflow-hidden shadow-2xl border border-navy/10 flex flex-col md:flex-row">
          
          {/* Left Panel - Search & Sidebar */}
          <div className="w-full md:w-96 bg-white/95 backdrop-blur-xl border-r border-navy/10 z-[1000] p-6 flex flex-col gap-6 shadow-2xl order-2 md:order-1 relative overflow-y-auto">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari objek OSM (Masjid, Raja Ali, Benteng)..."
                className="w-full pl-12 pr-10 py-3.5 bg-navy/5 rounded-2xl text-sm font-sans text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-gold transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy/40 hover:text-navy">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-navy/50 block mb-3">Kategori Objek OSM</span>
              <div className="flex flex-wrap gap-2">
                {["ALL", "Masjid", "Makam", "Istana", "Benteng", "Gedung", "Balai", "Perigi"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedCategory === cat 
                        ? "bg-navy text-white shadow-md" 
                        : "bg-navy/5 text-navy/70 hover:bg-navy/10"
                    }`}
                  >
                    {cat === "ALL" ? "Semua Objek" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sorted List of Matched Features */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-navy/50">
                <span>Objek OSM ({filteredFeatures.length})</span>
                {userLocation && <span className="text-gold">Diurutkan Jarak</span>}
              </div>
              
              {filteredFeatures.map((feat) => (
                <div 
                  key={feat.osm_id}
                  onClick={() => {
                    setSelectedFeature(feat);
                    setActiveCenter([feat.lat, feat.lng]);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                    selectedFeature?.osm_id === feat.osm_id 
                      ? "bg-gold/10 border-gold shadow-sm" 
                      : "bg-white border-navy/5 hover:border-navy/20 hover:shadow-md"
                  }`}
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-navy/10 flex items-center justify-center">
                    {feat.metadata?.heroImage ? (
                      <Image src={feat.metadata.heroImage} alt={feat.name} fill className="object-cover" />
                    ) : (
                      <Landmark className="w-6 h-6 text-navy/40" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gold block">{feat.category}</span>
                      {feat.dist !== undefined && (
                        <span className="text-[10px] font-bold text-navy/60 bg-navy/5 px-2 py-0.5 rounded-full">{feat.dist}m</span>
                      )}
                    </div>
                    <h4 className="font-heading font-bold text-sm text-navy truncate">{feat.name}</h4>
                    <p className="text-xs text-navy/60 truncate font-sans">{feat.metadata?.shortDescription || `OSM Feature (${feat.osm_id})`}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* GPS Watch Button */}
            <div className="pt-4 border-t border-navy/10">
              <button 
                onClick={startGpsWatch}
                className={`w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-xl ${
                  isWatchActive 
                    ? "bg-green-600 text-white hover:bg-green-700 shadow-green-600/30" 
                    : "bg-gold text-white hover:bg-gold/90 shadow-gold/30"
                }`}
              >
                <Navigation className={`w-4 h-4 ${isWatchActive ? "animate-pulse" : ""}`} />
                <span>{isWatchActive ? "Hentikan Live GPS" : "Aktifkan Live GPS (watchPosition)"}</span>
              </button>
            </div>
          </div>

          {/* Map Leaflet View */}
          <div className="flex-1 h-full z-0 order-1 md:order-2 relative">
            
            <MapContainer 
              center={activeCenter} 
              zoom={17} 
              className="w-full h-full"
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              <MapUpdater center={activeCenter} />

              {/* Live User Location & Accuracy Ring */}
              {userLocation && (
                <>
                  <Marker position={userLocation} icon={userIcon}>
                    <Popup>
                      <div className="p-2 text-center">
                        <span className="font-bold text-sm text-navy block">Posisi Anda (Live)</span>
                        <span className="text-xs text-navy/70">Akurasi: ±{gpsAccuracy || 0} meter</span>
                      </div>
                    </Popup>
                  </Marker>
                  {gpsAccuracy && (
                    <Circle 
                      center={userLocation} 
                      radius={gpsAccuracy} 
                      pathOptions={{ color: "#3B82F6", fillColor: "#3B82F6", fillOpacity: 0.15, weight: 1 }} 
                    />
                  )}
                </>
              )}

              {/* OSRM Road Polyline */}
              {osrmRoute && (
                <Polyline 
                  positions={osrmRoute.coordinates} 
                  color="#3B82F6" 
                  weight={6} 
                  dashArray="10, 10" 
                />
              )}

              {/* OSM Feature Markers */}
              {filteredFeatures.map((feat) => {
                const icon = categoryIcons[feat.category] || categoryIcons.Lainnya;
                return (
                  <Marker 
                    key={feat.osm_id} 
                    position={[feat.lat, feat.lng]} 
                    icon={icon}
                    eventHandlers={{
                      click: () => {
                        setSelectedFeature(feat);
                        setActiveCenter([feat.lat, feat.lng]);
                      }
                    }}
                  />
                );
              })}

            </MapContainer>

            {/* OSRM Step-By-Step Banner */}
            {osrmRoute && osrmRoute.steps.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-6 left-6 right-6 md:left-8 md:w-[400px] bg-navy-dark/95 text-white backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20 z-[1000] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Footprints className="w-5 h-5 text-gold shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-gold uppercase tracking-widest block">Petunjuk Jalan Kaki OSRM</span>
                    <span className="text-xs font-sans">{osrmRoute.steps[0].instruction} ({osrmRoute.steps[0].distanceMeters}m)</span>
                  </div>
                </div>
                <button onClick={() => setOsrmRoute(null)} className="text-white/60 hover:text-white p-1">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* Apple Maps Style Floating Popup / Bottom Sheet */}
            <AnimatePresence>
              {selectedFeature && (
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  className="absolute bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-[440px] max-h-[80vh] overflow-y-auto hide-scrollbar bg-white/95 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/40 z-[1000]"
                >
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 shadow-md bg-navy/10">
                    {selectedFeature.metadata?.heroImage ? (
                      <Image src={selectedFeature.metadata.heroImage} alt={selectedFeature.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-navy text-white font-heading font-bold text-xl">
                        {selectedFeature.name}
                      </div>
                    )}
                    <button 
                      onClick={() => setSelectedFeature(null)}
                      className="absolute top-3 right-3 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-md transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/20">
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">{selectedFeature.category}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-navy/40 block">
                        OSM ID: {selectedFeature.osm_id} {selectedFeature.metadata?.officialRegNo ? `| Reg: ${selectedFeature.metadata.officialRegNo}` : ""}
                      </span>
                      <h3 className="font-heading font-bold text-2xl text-navy leading-tight mt-1">{selectedFeature.name}</h3>
                    </div>

                    <p className="text-xs text-navy/70 font-sans leading-relaxed">
                      {selectedFeature.metadata?.fullDescription || `Objek cagar budaya resmi terdaftar pada OpenStreetMap (${selectedFeature.lat.toFixed(6)}, ${selectedFeature.lng.toFixed(6)}).`}
                    </p>

                    {/* Fun Facts Section if available */}
                    {selectedFeature.metadata?.fun_facts && selectedFeature.metadata.fun_facts.length > 0 && (
                      <div className="p-4 bg-gold/10 rounded-2xl border border-gold/30">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold flex items-center gap-1.5 mb-2">
                          <Sparkles className="w-3.5 h-3.5" />
                          Tahukah Anda? (Verified Fun Fact)
                        </span>
                        <p className="text-xs text-navy/80 italic font-sans">
                          "{selectedFeature.metadata.fun_facts[0]}"
                        </p>
                      </div>
                    )}

                    {/* Distance readout if location available */}
                    {userLocation && (
                      <div className="flex items-center gap-4 py-2.5 px-3.5 bg-navy/5 rounded-xl text-xs font-medium text-navy">
                        <div className="flex items-center gap-1.5">
                          <Footprints className="w-4 h-4 text-gold" />
                          <span>{getDistanceMeters(userLocation[0], userLocation[1], selectedFeature.lat, selectedFeature.lng)} meter</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-gold" />
                          <span>~{Math.round(getDistanceMeters(userLocation[0], userLocation[1], selectedFeature.lat, selectedFeature.lng) / 75)} mnt jalan kaki</span>
                        </div>
                      </div>
                    )}

                    {/* Navigation Button */}
                    <div className="pt-2">
                      <button 
                        onClick={() => handleCalculateRoute(selectedFeature)}
                        disabled={isRoutingLoading}
                        className="w-full py-3.5 bg-navy text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-navy/90 transition-all shadow-lg disabled:opacity-50"
                      >
                        <Navigation className={`w-4 h-4 text-gold ${isRoutingLoading ? "animate-spin" : ""}`} />
                        <span>{isRoutingLoading ? "Kalkulasi Rute..." : "Kalkulasi Rute OSRM"}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* Floating Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[2000] px-6 py-3.5 bg-navy/95 text-white backdrop-blur-xl rounded-full shadow-2xl border border-white/20 flex items-center gap-3 text-sm font-medium"
            >
              <Info className="w-4 h-4 text-gold shrink-0" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
