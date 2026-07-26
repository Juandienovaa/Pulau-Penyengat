"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet with Next.js
const iconRetinaUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png";
const iconUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png";
const shadowUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const PENYENGAT_CENTER: [number, number] = [0.9255, 104.4215]; // Exact coordinates for Pulau Penyengat

export default function Map() {
  useEffect(() => {
    // Any Leaflet specific init here
  }, []);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative z-0">
      <MapContainer
        center={PENYENGAT_CENTER}
        zoom={16}
        scrollWheelZoom={true}
        zoomControl={false} // Custom control
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" // Premium-looking basemap
        />
        <ZoomControl position="bottomright" />
        
        <Marker position={PENYENGAT_CENTER}>
          <Popup className="font-sans">
            <div className="p-2 text-center">
              <h3 className="font-heading font-bold text-navy text-lg">Pulau Penyengat</h3>
              <p className="text-sm text-navy/70 mt-1">Pusat Kerajaan Melayu Riau-Lingga</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
