"use client";

import { useState } from "react";
import { Event, EventFilter } from "@/types/events";
import { getCountries } from "@/data/events";
import { IoSearch, IoClose } from "react-icons/io5";

interface EventControlsProps {
  events: Event[];
  selectedEvent: Event | null;
  filter: EventFilter;
  onFilterChange: (filter: EventFilter) => void;
  onEventSelect: (event: Event) => void;
}

const EventControls: React.FC<EventControlsProps> = ({
  events,
  selectedEvent,
  filter,
  onFilterChange,
  onEventSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const countries = getCountries();
  const filteredEvents = events.filter((event) => {
    if (filter.type !== "all" && event.type !== filter.type) return false;
    if (filter.country && event.country !== filter.country) return false;
    return true;
  });

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
    <div className="absolute top-4 left-4 z-30">
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/80 shadow-lg rounded-[2rem] px-4 py-3 flex items-center gap-2 hover:shadow-xl transition-all duration-200 font-medium text-gray-700"
      >
        <IoSearch className="w-5 h-5" />
        <span>Search Events</span>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white/70 rounded-lg shadow-xl border border-gray-200 overflow-hidden animate-in slide-in-from-top-2 duration-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg  font-semibold text-transparent bg-clip-text bg-gradient-to-r from-espresso-primary to-espresso-secondary">
                Filter Events
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 bg-black text-white rounded-full transition-colors"
              >
                <IoClose className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Event Type Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Type
              </label>
              <select
                value={filter.type}
                onChange={(e) =>
                  handleEventTypeChange(
                    e.target.value as "all" | "past" | "future"
                  )
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-espresso-primary focus:border-transparent"
              >
                <option value="all">All Events</option>
                <option value="future">Future Events</option>
                <option value="past">Past Events</option>
              </select>
            </div>

            {/* Country Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <select
                value={filter.country || "all"}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-espresso-primary focus:border-transparent"
              >
                <option value="all">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Event List */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Event
              </label>
              <select
                value={selectedEvent?.id || ""}
                onChange={(e) => handleEventSelect(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-espresso-primary focus:border-transparent"
              >
                <option value="" disabled>
                  Choose an event
                </option>
                {filteredEvents.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title} (
                    {event.type === "future" ? "Upcoming" : "Past"})
                  </option>
                ))}
              </select>
            </div>

            {/* Event Count */}
            <div className="text-sm text-gray-600 mb-4">
              {filteredEvents.length} event
              {filteredEvents.length !== 1 ? "s" : ""} found
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventControls;
