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

const Pin: React.FC<{ size?: number; time?: string }> = ({
  size = 18,
  time = "past",
}) => {
  const ICON =
    "M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9  C20.1,15.8,20.2,15.8,20.2,15.7z";
  return (
    <svg
      height={size}
      viewBox="0 0 24 24"
      style={{
        cursor: "pointer",
        fill: time === "past" ? "#d00" : "#1cb7ff",
        stroke: "none",
      }}
      className={time === "past" ? "glow-past" : "glow-future"}
    >
      <path d={ICON} />
    </svg>
  );
};

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
          <Pin time={ev.type} />
        </Marker>
      )),
    [events, onEventSelect]
  );

  return (
    <div className="relative w-full h-full">
      <MapGL
        {...viewState}
        onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
        mapStyle={mapStyle || "mapbox://styles/mapbox/dark-v11"}
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
