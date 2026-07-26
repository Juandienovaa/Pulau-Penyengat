"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { OSMHeritageFeature } from "@/lib/types";
import { fetchOSMFeatures } from "@/lib/services/osmService";
import { Map, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useDigitalHeritageStore } from "@/lib/store/useDigitalHeritageStore";

const defaultMarkerIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="background-color: #D4AF37; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

export function MiniPreviewMap() {
  const [osmFeatures, setOsmFeatures] = useState<OSMHeritageFeature[]>([]);
  const { setActiveFeature } = useDigitalHeritageStore();

  useEffect(() => {
    // Only load basic features for the preview
    fetchOSMFeatures().then(setOsmFeatures);
  }, []);

  const defaultCenter: [number, number] = [0.927351, 104.417154];

  return (
    <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl my-12 border border-navy/5 bg-navy-dark">
      <MapContainer 
        center={defaultCenter} 
        zoom={15} 
        className="w-full h-full z-0"
        zoomControl={false}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {osmFeatures.slice(0, 15).map(feat => (
          <Marker 
            key={feat.osm_id} 
            position={[feat.lat, feat.lng]}
            icon={defaultMarkerIcon}
          />
        ))}
      </MapContainer>

      {/* Map Overlay & CTA */}
      <div className="absolute inset-0 z-[1000] bg-gradient-to-t from-navy/80 via-transparent to-transparent pointer-events-none flex flex-col justify-end p-8">
        <h3 className="text-white font-heading font-bold text-3xl mb-2 drop-shadow-lg">
          Jelajahi Peta Interaktif
        </h3>
        <p className="text-white/90 font-sans mb-6 max-w-md drop-shadow-md">
          Gunakan Digital Heritage Navigation System dengan GPS Live untuk memandu perjalanan Anda di Pulau Penyengat.
        </p>
        <Link 
          href="/peta"
          className="pointer-events-auto inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy px-8 py-4 rounded-full font-bold transition-all w-fit group shadow-xl"
        >
          <Map className="w-5 h-5" />
          Buka Peta Interaktif
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
