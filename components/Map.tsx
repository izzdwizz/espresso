"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Event } from "@/types/events";

interface MapProps {
  events: Event[];
  selectedEvent?: Event | null;
  onEventSelect: (event: Event) => void;
  isGlobe: boolean;
  onToggleProjection: () => void;
  hoveredEvent?: Event | null;
}

const Map: React.FC<MapProps> = ({
  events,
  selectedEvent,
  onEventSelect,
  isGlobe,
  onToggleProjection,
  hoveredEvent,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<globalThis.Map<string, mapboxgl.Marker>>(
    new globalThis.Map<string, mapboxgl.Marker>()
  );

  useEffect(() => {
    if (!mapContainer.current) return;

    // Set Mapbox access token
    mapboxgl.accessToken =
      process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
      "pk.eyJ1IjoiemVkZWYwODA4IiwiYSI6ImNtZmdvMnpqMjAyd20yaXNheHQ3b29hNGkifQ.KEhyXFZiR5t2ap1vwdTEnA";

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [0, 20],
      zoom: 1.3,
      projection: isGlobe ? "globe" : "mercator",
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());

    // Add fog effect for globe view
    map.current.on("style.load", () => {
      if (map.current) {
        map.current.setFog({});
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Update projection when isGlobe changes
  useEffect(() => {
    if (map.current) {
      map.current.setProjection(isGlobe ? "globe" : "mercator");
    }
  }, [isGlobe]);

  // Add/update markers when events change
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach((marker) => marker.remove());
    markers.current.clear();

    // Add new markers
    events.forEach((event) => {
      const el = document.createElement("div");
      el.className = event.type === "future" ? "glow-future" : "glow-past";
      const size = 16;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.borderRadius = "50%";
      el.style.background = event.type === "future" ? "#b67237" : "#948481";
      el.style.border = "2px solid rgba(255,255,255,0.9)";
      el.style.boxShadow = "0 0 0 2px rgba(0,0,0,0.25)";
      el.style.cursor = "pointer";

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat(event.coordinates)
        .addTo(map.current!);

      // Create popup content
      const popupContent = `
        <div style="min-width:220px;padding:10px;border-radius:12px;background:#111;color:#fff;box-shadow:0 6px 24px rgba(0,0,0,0.35);">
          <div style="font-weight:700;font-size:14px;line-height:1.2;margin-bottom:6px;">${event.title}</div>
          <div style="font-size:12px;opacity:0.8;margin-bottom:2px;">${event.location}, ${event.country}</div>
          <div style="font-size:12px;opacity:0.8;margin-bottom:8px;">${event.date}</div>
          <button style="background:#b67237;color:#fff;padding:6px 10px;border-radius:9999px;font-size:12px;border:none;cursor:pointer" onclick="window.selectEvent('${event.id}')">View details</button>
        </div>
      `;

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
      }).setHTML(popupContent);

      marker.setPopup(popup);
      markers.current.set(event.id, marker);

      // Add click handler
      marker.getElement().addEventListener("click", () => {
        onEventSelect(event);
      });

      // Hover handlers to show/hide popup
      marker.getElement().addEventListener("mouseenter", () => {
        const p = marker.getPopup();
        if (p && map.current) p.addTo(map.current);
      });
      marker.getElement().addEventListener("mouseleave", () => {
        const p = marker.getPopup();
        if (p) p.remove();
      });
    });

    // Add global function for popup button
    (window as any).selectEvent = (eventId: string) => {
      const event = events.find((e) => e.id === eventId);
      if (event) {
        onEventSelect(event);
      }
    };

    return () => {
      (window as any).selectEvent = undefined;
    };
  }, [events, onEventSelect]);

  // Open popup for hovered event from sidebar
  useEffect(() => {
    if (!map.current) return;
    // Close all popups first
    markers.current.forEach((m) => {
      const p = m.getPopup();
      if (p) p.remove();
    });
    if (hoveredEvent) {
      const m = markers.current.get(hoveredEvent.id);
      const p = m?.getPopup();
      if (m && p) p.addTo(map.current);
    }
  }, [hoveredEvent]);

  // Fly to selected event
  useEffect(() => {
    if (map.current && selectedEvent) {
      map.current.flyTo({
        center: selectedEvent.coordinates,
        zoom: 6,
        essential: true,
        duration: 2000,
        easing: (t) => t * (2 - t), // ease-out easing
      });
    }
  }, [selectedEvent]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />

      {/* Toggle button */}
      <button
        onClick={onToggleProjection}
        className={`absolute bottom-4 left-4 text-espresso-primary ${
          !isGlobe ? "bg-slate-700" : "bg-gray-600/70"
        } px-4 py-3 rounded-[2rem] shadow-lg hover:bg-opacity-90 transition-all duration-500 font-medium transform`}
      >
        {isGlobe ? "Switch to Flat Map" : "Switch to Globe"}
      </button>
    </div>
  );
};

export default Map;
