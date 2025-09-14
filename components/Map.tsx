"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Event } from "@/types/events";

interface MapProps {
  events: Event[];
  selectedEvent?: Event | null;
  onEventSelect: (event: Event) => void;
  isGlobe: boolean;
  onToggleProjection: () => void;
}

const Map: React.FC<MapProps> = ({
  events,
  selectedEvent,
  onEventSelect,
  isGlobe,
  onToggleProjection,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Set Mapbox access token
    mapboxgl.accessToken =
      process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
      "pk.eyJ1IjoiemVkZWYwODA4IiwiYSI6ImNtZmdvMnpqMjAyd20yaXNheHQ3b29hNGkifQ.KEhyXFZiR5t2ap1vwdTEnA";

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
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
    markers.current = [];

    // Add new markers
    events.forEach((event) => {
      const markerColor = event.type === "future" ? "#b67237" : "#948481";

      const marker = new mapboxgl.Marker({
        color: markerColor,
        scale: 1.2,
      })
        .setLngLat(event.coordinates)
        .addTo(map.current!);

      // Create popup content
      const popupContent = `
        <div class="p-3 min-w-[200px]">
          <h3 class="font-bold text-lg text-gray-800 mb-2">${event.title}</h3>
          <p class="text-sm text-gray-600 mb-2">${event.location}, ${event.country}</p>
          <p class="text-sm text-gray-500 mb-3">${event.date}</p>
          <button 
            class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
            onclick="window.selectEvent('${event.id}')"
          >
            View Details
          </button>
        </div>
      `;

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
      }).setHTML(popupContent);

      marker.setPopup(popup);
      markers.current.push(marker);

      // Add click handler
      marker.getElement().addEventListener("click", () => {
        onEventSelect(event);
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
        className="absolute bottom-4 left-4 text-espresso-primary bg-gray-600/70 px-4 py-3 rounded-[2rem] shadow-lg hover:bg-opacity-90 transition-all duration-500 font-medium transform"
      >
        {isGlobe ? "Switch to Flat Map" : "Switch to Globe"}
      </button>
    </div>
  );
};

export default Map;
