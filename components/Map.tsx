"use client";

import { useMemo, useState, useEffect } from "react";
import MapGL, { Marker, type ViewStateChangeEvent } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Event } from "@/types/events";

interface MapProps {
  events: Event[];
  selectedEvent?: Event | null;
  onEventSelect: (event: Event) => void;
  isGlobe: boolean;
  onToggleProjection: () => void;
  mapStyle?: string;
}

const Map: React.FC<MapProps> = ({
  events,
  selectedEvent,
  onEventSelect,
  isGlobe,
  // onToggleProjection,
  mapStyle,
}) => {
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 20,
    zoom: 1.3,
    bearing: 0,
    pitch: 0,
  });

  // Fly to event when selected
  useEffect(() => {
    if (!selectedEvent) return;
    setViewState((vs) => ({
      ...vs,
      longitude: selectedEvent.coordinates[0],
      latitude: selectedEvent.coordinates[1],
      zoom: 6,
    }));
  }, [selectedEvent]);

  const pins = useMemo(
    () =>
      events.map((ev) => (
        <Marker
          key={ev.id}
          longitude={ev.coordinates[0]}
          latitude={ev.coordinates[1]}
          anchor="bottom"
          onClick={(e: any) => {
            e.originalEvent.stopPropagation();
            onEventSelect(ev);
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: ev.type === "future" ? "#1cb7ff" : "#b67237",
              border: "2px solid #ffffff",
              boxShadow: "0 0 0 1px rgba(182, 114, 55, 0.4)",
              cursor: "pointer",
            }}
          />
        </Marker>
      )),
    [events, onEventSelect]
  );

  return (
    <div className="relative w-full h-full sepia-map">
      <MapGL
        {...viewState}
        onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
        mapStyle={mapStyle || "mapbox://styles/mapbox/light-v11"}
        projection={{ name: isGlobe ? "globe" : "mercator" }}
        style={{ width: "100%", height: "100%" }}
        mapboxAccessToken={
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
          "pk.eyJ1IjoiemVkZWYwODA4IiwiYSI6ImNtZmdvMnpqMjAyd20yaXNheHQ3b29hNGkifQ.KEhyXFZiR5t2ap1vwdTEnA"
        }
        attributionControl={false}
      >
        {pins}
      </MapGL>

      {/* <button
        onClick={onToggleProjection}
        aria-label="Toggle projection"
        className="absolute bottom-4 right-4 z-10 bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 text-xs"
      >
        {isGlobe ? "Flat Map" : "Globe View"}
      </button> */}
    </div>
  );
};

export default Map;
