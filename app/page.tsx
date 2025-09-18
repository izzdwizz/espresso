"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import EventModal from "@/components/EventModal";
import EventCarousel from "@/components/EventCarousel";
import { Event, EventFilter } from "@/types/events";
import { events } from "@/data/events";
import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";
import { IoCalendar, IoLocation } from "react-icons/io5";
import { FiMaximize2 } from "react-icons/fi";
import Logo from "@/public/images/Logo";

// Dynamically import Map to avoid SSR issues
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-espresso-primary-dark">
      <div className="text-espresso-text text-lg">Loading map...</div>
    </div>
  ),
});

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGlobe, setIsGlobe] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [filter, setFilter] = useState<EventFilter>({ type: "all" });

  // Filter events based on current filter
  const filteredEvents = events.filter((event) => {
    if (filter.type !== "all" && event.type !== filter.type) return false;
    if (filter.country && event.country !== filter.country) return false;
    return true;
  });

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleToggleProjection = () => {
    setIsGlobe(!isGlobe);
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const openFullscreenMap = () => setIsMapFullscreen(true);
  const closeFullscreenMap = () => setIsMapFullscreen(false);

  // Get unique countries for filter dropdown
  const countries = Array.from(new Set(events.map((event) => event.country)));

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Main Layout */}
      <div
        className={`flex h-screen transition-all duration-500 ${
          isExpanded ? "flex-col" : "flex-row"
        }`}
      >
        {/* Left Column - Header and Filters */}
        {!isExpanded && (
          <div className="w-1/2 p-12 flex flex-col justify-between shadow-2xl rounded-2xl bg-espresso-primary relative left-4 !z-[10]">
            {/* Header Section */}
            <div>
              <Logo />
              <h1 className="text-6xl font-bold text-white mt-8 mb-8 leading-tight">
                The Espresso Event Map
              </h1>

              {/* Feature List */}
              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-white"></div>
                  <span className="text-white text-lg">01</span>
                  <span className="text-white text-lg">Real-time finality</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-white"></div>
                  <span className="text-white text-lg">02</span>
                  <span className="text-white text-lg">
                    Crosschain composability
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-white"></div>
                  <span className="text-white text-lg">03</span>
                  <span className="text-white text-lg">
                    Ethereum compatibility
                  </span>
                </div>
              </div>
            </div>

            {/* Filter Inputs */}
            <div className="space-y-6">
              <div className="relative">
                <select
                  value={filter.type}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      type: e.target.value as "all" | "past" | "future",
                    })
                  }
                  className="w-full bg-transparent text-white border-l-2 border-b-2 border-white border-r-0 border-t-0 px-4 py-3 focus:outline-none text-lg"
                >
                  <option
                    value="all"
                    className="bg-espresso-primary text-white"
                  >
                    All Events
                  </option>
                  <option
                    value="past"
                    className="bg-espresso-primary text-white"
                  >
                    Past Events
                  </option>
                  <option
                    value="future"
                    className="bg-espresso-primary text-white"
                  >
                    Future Events
                  </option>
                </select>
              </div>

              <div className="relative">
                <select
                  value={filter.country || ""}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      country: e.target.value || undefined,
                    })
                  }
                  className="w-full bg-transparent text-white border-l-2 border-b-2 border-white border-r-0 border-t-0 px-4 py-3 focus:outline-none text-lg"
                >
                  <option value="" className="bg-espresso-primary text-white">
                    All Countries
                  </option>
                  {countries.map((country) => (
                    <option
                      key={country}
                      value={country}
                      className="bg-espresso-primary text-white"
                    >
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <select
                  value={selectedEvent?.id || ""}
                  onChange={(e) => {
                    const event = events.find((ev) => ev.id === e.target.value);
                    if (event) handleEventSelect(event);
                  }}
                  className="w-full bg-transparent text-white border-l-2 border-b-2 border-white border-r-0 border-t-0 px-4 py-3 focus:outline-none text-lg"
                >
                  <option value="" className="bg-espresso-primary text-white">
                    Select an Event
                  </option>
                  {filteredEvents.map((event) => (
                    <option
                      key={event.id}
                      value={event.id}
                      className="bg-espresso-primary text-white"
                    >
                      {event.title} - {event.country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Right Column - Map */}
        <div
          className={`${
            isExpanded ? "w-full" : "w-1/2"
          } relative transition-all duration-500 !rounded-br-lg !rounded-tr-lg overflow-hidden relative right-4`}
        >
          <Map
            events={filteredEvents}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            selectedEvent={selectedEvent}
            onEventSelect={handleEventSelect}
            isGlobe={!isGlobe}
            onToggleProjection={handleToggleProjection}
          />

          {/* Fullscreen Icon Button */}
          <button
            onClick={openFullscreenMap}
            aria-label="Open fullscreen map"
            className="absolute top-6 right-6 z-30 bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-all duration-200"
          >
            <FiMaximize2 className="w-5 h-5" />
          </button>

          {/* Globe Toggle Button */}
          <button
            onClick={handleToggleProjection}
            className="absolute bottom-6 right-6 z-30 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-200"
          >
            {isGlobe ? "Flat Map" : "Globe View"}
          </button>
        </div>
      </div>

      {/* Fullscreen Map Modal */}
      {isMapFullscreen && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="relative w-full h-full">
            <Map
              events={filteredEvents}
              mapStyle="mapbox://styles/mapbox/dark-v11"
              selectedEvent={selectedEvent}
              onEventSelect={handleEventSelect}
              isGlobe={false}
              onToggleProjection={handleToggleProjection}
            />
            <button
              onClick={closeFullscreenMap}
              aria-label="Close fullscreen map"
              className="absolute top-6 right-6 z-50 bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      <section className="py-12 mt-[5rem] px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative flex items-center gap-3 mb-6">
            <div className="absolute -top-12 w-4 h-4">
              <span className="absolute left-0 top-2.5 w-6 h-[2px] bg-gray-400 rounded" />
              <span className="absolute left-0 top-0 w-[2px] h-3 bg-gray-400 rounded" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Upcoming Events
            </h2>
          </div>
          <div className="space-y-4">
            {events
              .filter((e) => e.type === "future")
              .map((event) => (
                <button
                  key={event.id}
                  onClick={() => handleEventSelect(event)}
                  className="w-full text-left bg-[slate-200]/10 rounded-xl border border-gray-200 shadow-sm p-4 md:p-5 md:py-7 hover:shadow-md transition"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    {/* Title + meta */}
                    <div>
                      <div className="font-mono text-[15px] md:text-base espresso-text font-semibold text-gray-900">
                        {event.title}
                      </div>
                      <div className="mt-2 flex flex-col items-start gap-4 text-xs espresso-text">
                        <span className="inline-flex items-center gap-1">
                          <IoCalendar className="w-4 h-4" />
                          {event.date}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <IoLocation className="w-4 h-4" />
                          {event.venue || `${event.location}, ${event.country}`}
                        </span>
                      </div>
                    </div>
                    {/* Description */}
                    <div className="text-xs md:text-sm text-gray-600 md:col-span-2">
                      {event.description}
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 px-4 bg-white" id="past-events">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6 relative">
            <div className="absolute -top-12 w-4 h-4">
              <span className="absolute left-0 top-2.5 w-6 h-[2px] bg-gray-400 rounded" />
              <span className="absolute left-0 top-0 w-[2px] h-3 bg-gray-400 rounded" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Past Events
            </h2>
          </div>
          <div className="space-y-4">
            {events
              .filter((e) => e.type === "past")
              .map((event) => (
                <button
                  key={event.id}
                  onClick={() => handleEventSelect(event)}
                  className="w-full text-left bg-slate-200/10 rounded-xl border border-gray-200 p-4 md:p-5 md:py-7 hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="font-mono text-[15px] md:text-base espresso-text font-semibold">
                      {event.title}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span className="inline-flex items-center gap-1">
                        <IoCalendar className="w-4 h-4" />
                        {event.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <IoLocation className="w-4 h-4" />
                        {event.venue || `${event.location}, ${event.country}`}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 footer">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Logo />
              <p className="text-gray-400 mb-4">
                The base layer for rollups. Real-time finality, crosschain
                composability, and Ethereum compatibility.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://discord.gg/espresso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaDiscord className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/espressosys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/EspressoSystems"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Events</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Past Events
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Upcoming Events
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Event Calendar
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Developer Tools
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Espresso Systems. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Event Modal */}
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
