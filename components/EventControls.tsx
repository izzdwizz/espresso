"use client";

import { useMemo } from "react";
import { Event, EventFilter } from "@/types/events";
import { getCountries } from "@/data/events";
import { IoCalendar, IoLocation } from "react-icons/io5";
import { motion } from "framer-motion";

interface EventControlsProps {
  events: Event[];
  selectedEvent: Event | null;
  filter: EventFilter;
  onFilterChange: (filter: EventFilter) => void;
  onEventSelect: (event: Event) => void;
  hoveredEventId?: string | null;
  onHoverEvent?: (event: Event | null) => void;
}

const EventControls: React.FC<EventControlsProps> = ({
  events,
  selectedEvent,
  filter,
  onFilterChange,
  onEventSelect,
  hoveredEventId,
  onHoverEvent,
}) => {
  const countries = getCountries();
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (filter.type !== "all" && event.type !== filter.type) return false;
      if (filter.country && event.country !== filter.country) return false;
      return true;
    });
  }, [events, filter]);

  const handleEventTypeChange = (type: "all" | "past" | "future") => {
    onFilterChange({ ...filter, type });
  };

  const handleCountryChange = (country: string) => {
    onFilterChange({
      ...filter,
      country: country === "all" ? undefined : country,
    });
  };

  const handleEventSelect = (eventId: string) => {
    const event = events.find((e) => e.id === eventId);
    if (event) {
      onEventSelect(event);
    }
  };

  return (
    <motion.aside
      className="absolute top-4 left-4 bottom-4 z-30 w-[320px] max-w-[85vw] bg-white/85 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/40 overflow-hidden"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="p-4 border-b border-white/40">
        <h3 className="text-xl font-bold text-gray-900">Espresso Events</h3>
        <p className="text-xs text-gray-600 mt-1">
          Explore past and upcoming happenings
        </p>
      </div>
      <div className="p-4 space-y-4">
        {/* Event Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            {["all", "future", "past"].map((type) => (
              <button
                key={type}
                onClick={() =>
                  handleEventTypeChange(type as "all" | "future" | "past")
                }
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  filter.type === type
                    ? "bg-black text-white"
                    : "bg-white/70 text-gray-800 hover:bg-white"
                }`}
              >
                {type === "all"
                  ? "All"
                  : type === "future"
                  ? "Upcoming"
                  : "Past"}
              </button>
            ))}
          </div>
        </div>

        {/* Country Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            value={filter.country || "all"}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-espresso-primary focus:border-transparent bg-white/80"
          >
            <option value="all">All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Event Count */}
        <div className="text-xs text-gray-600">
          {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* List */}
      <div
        className="px-2 pb-2 overflow-y-auto"
        style={{ maxHeight: "calc(100% - 190px)" }}
      >
        <ul className="space-y-2">
          {filteredEvents.map((event) => {
            const isActive = selectedEvent?.id === event.id;
            const isHovered = hoveredEventId === event.id;
            return (
              <li key={event.id}>
                <button
                  onClick={() => onEventSelect(event)}
                  // onMouseEnter={() => onHoverEvent && onHoverEvent(event)}
                  // onMouseLeave={() => onHoverEvent && onHoverEvent(null)}
                  className={`w-full text-left rounded-xl p-3 transition-all border ${
                    isActive
                      ? "bg-black text-white border-black"
                      : isHovered
                      ? "bg-white border-gray-200 shadow"
                      : "bg-white/80 border-white/60 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{event.title}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        event.type === "future"
                          ? "bg-espresso-primary/10 text-espresso-primary border-espresso-primary/30"
                          : "bg-gray-100 text-gray-700 border-gray-300"
                      }`}
                    >
                      {event.type === "future" ? "Upcoming" : "Past"}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-gray-600">
                    <span className="inline-flex items-center gap-1">
                      <IoLocation className="w-3 h-3" />
                      {event.location}, {event.country}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <IoCalendar className="w-3 h-3" />
                      {event.date}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.aside>
  );
};

export default EventControls;
