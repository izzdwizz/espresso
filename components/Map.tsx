"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
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

  const buildGeoJSON = (list: Event[]): GeoJSON.FeatureCollection => ({
    type: "FeatureCollection",
    features: list.map((ev) => ({
      type: "Feature",
      properties: { id: ev.id, weight: ev.type === "future" ? 2 : 1 },
      geometry: {
        type: "Point",
        coordinates: [ev.coordinates[0], ev.coordinates[1]],
      },
    })),
  });

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

    // Add heatmap source + layers when map is ready
    map.current.on("load", () => {
      if (!map.current) return;
      if (!map.current.getSource("events")) {
        map.current.addSource("events", {
          type: "geojson",
          data: buildGeoJSON(events) as any,
        });

        // Heatmap layer
        map.current.addLayer({
          id: "events-heatmap",
          type: "heatmap",
          source: "events",
          maxzoom: 9,
          paint: {
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", "weight"],
              0,
              0,
              2,
              1,
            ],
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              0.6,
              9,
              2.0,
            ],
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(0,0,0,0)",
              0.2,
              "#3b3b3b",
              0.4,
              "#6e4322",
              0.6,
              "#b67237",
              0.8,
              "#e6a96e",
              1,
              "#fff0d9",
            ],
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              2,
              4,
              10,
              9,
              24,
            ],
            "heatmap-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              0.6,
              9,
              0.2,
            ],
          },
        });

        // Circle layer for points as you zoom in
        map.current.addLayer({
          id: "events-point",
          type: "circle",
          source: "events",
          minzoom: 5,
          paint: {
            "circle-radius": [
              "interpolate",
              ["exponential", 1.5],
              ["zoom"],
              5,
              2,
              12,
              8,
            ],
            "circle-color": [
              "case",
              ["==", ["get", "weight"], 2],
              "#b67237",
              "#948481",
            ],
            "circle-stroke-width": 1,
            "circle-stroke-color": "#ffffff",
            "circle-opacity": 0.9,
          },
        });
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
      el.className = event.type === "future" ? "glow-futures" : "glow-pasta";
      const mugColor = event.type === "future" ? "#b67237" : "#948481";
      const accent = "#ffffff";
      const size = 26;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.cursor = "pointer";
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.justifyContent = "center";
      el.style.transform = "translateY(-2px)";
      el.innerHTML = `
        <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <g fill="none" stroke="${accent}" stroke-width="1.2" stroke-linejoin="round">
            <path fill="${mugColor}" d="M3 8h12v5.5A3.5 3.5 0 0 1 11.5 17h-4A3.5 3.5 0 0 1 4 13.5V8Z"/>
            <path fill="${mugColor}" d="M15 9h2.25a2.75 2.75 0 0 1 0 5.5H15V9Z"/>
            <rect x="5" y="18" width="10" height="1.8" rx="0.9" fill="${accent}" opacity=".8"/>
          </g>
        </svg>
      `;

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

    // Update heatmap source data
    const src = map.current.getSource("events") as
      | mapboxgl.GeoJSONSource
      | undefined;
    if (src) {
      src.setData(buildGeoJSON(events) as any);
    }

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
    <motion.div
      className="relative w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
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
    </motion.div>
  );
};

export default Map;
