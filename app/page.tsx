"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import EventModal from "@/components/EventModal";
import EventCarousel from "@/components/EventCarousel";
import { Event, EventFilter } from "@/types/events";
import { events } from "@/data/events";
import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";
import { FiMaximize2 } from "react-icons/fi";
import { motion } from "framer-motion";
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

  // Get unique countries for filter dropdown based on selected event type
  const countries = Array.from(
    new Set(
      events
        .filter((event) => {
          if (filter.type === "all") return true;
          return event.type === filter.type;
        })
        .map((event) => event.country)
    )
  );

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
              <Logo fill="" className="" />
              <h1 className="text-6xl font-bold text-white mt-8 mb-8 leading-tight">
                The Espresso Event Map
              </h1>

              {/* Feature List */}
              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-white"></div>
                  <span className="text-white text-lg">01</span>
                  <span className="text-white text-lg">
                    Seamless Event Discovery
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-white"></div>
                  <span className="text-white text-lg">02</span>
                  <span className="text-white text-lg">
                    Cross-Event Connectivity
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-white"></div>
                  <span className="text-white text-lg">03</span>
                  <span className="text-white text-lg">
                    Future-Proof Access
                  </span>
                </div>
              </div>
            </div>

            {/* Filter Inputs */}
            <div className="space-y-6">
              <div className="relative">
                <select
                  value={filter.type}
                  onChange={(e) => {
                    const newType = e.target.value as "all" | "past" | "future";
                    setFilter({
                      ...filter,
                      type: newType,
                      country: undefined, // Reset country filter when type changes
                    });
                  }}
                  className="w-full bg-transparent text-white border-l-[0.5px] border-b-[0.5px] border-white border-r-0 border-t-0 px-4 py-3 focus:outline-none text-lg"
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
                  className="w-full bg-transparent text-white border-l-[0.5px] border-b-[0.5px] border-white border-r-0 border-t-0 px-4 py-3 focus:outline-none text-lg"
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
                  className="w-full bg-transparent text-white border-l-[0.5px] border-b-[0.5px] border-white border-r-0 border-t-0 px-4 py-3 focus:outline-none text-lg"
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

        {/* Right Column - Map (fade in from left) */}

        <motion.div
          className={`${
            isExpanded ? "w-full" : "w-1/2"
          } relative transition-all duration-500 !rounded-br-lg !rounded-tr-lg overflow-hidden relative right-4`}
          initial={{ x: -505, opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeIn" }}
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
            {!isGlobe ? "Flat Map" : "Globe View"}
          </button>
        </motion.div>
      </div>

      {/* Fullscreen Map Modal */}
      {isMapFullscreen && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="relative w-full h-full">
            <Map
              events={filteredEvents}
              // mapStyle="mapbox://styles/mapbox/dark-v11"
              mapStyle="mapbox://styles/mapbox/dark-v9"
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

      {/* Past Events Section (fade up on enter) */}
      <motion.section
        className="py-16 px-4 bg-gray-50"
        id="past-events"
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl py-12 mx-auto">
          <h2 className="text-5xl font-bold w-full text-transparent bg-clip-text bg-gradient-to-r from-espresso-primary to-espresso-secondary mb-10 pb-4 text-center">
            Explore Past Events
          </h2>
          <EventCarousel
            events={events.filter((event) => event.type === "past")}
            onEventSelect={handleEventSelect}
          />
        </div>
      </motion.section>

      {/* Sign Up Section (fade up on enter) */}
      <motion.section
        className="py-16 px-4 bg-espresso-primary"
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-4xl mx-auto text-center future-events">
          <h2 className="text-4xl font-bold text-white mb-4">
            Stay Updated on Future Events
          </h2>
          <p className="text-white mb-8 text-lg">
            Be the first to know about upcoming Espresso events around the world
          </p>
          <div className="relative max-w-md mx-auto">
            <div className="relative bg-transparent border-[0.5px] border-[#fefefe] rounded-full px-6 py-4 flex items-center">
              <input
                type="email"
                placeholder="Subscribe to our newsletter"
                className="flex-1 bg-transparent text-[#fefefe] placeholder-[#fefefe] focus:outline-none text-sm"
              />
              <button className="absolute right-1 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-lg">
                <svg
                  className="w-4 h-4 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer (rounded container, two rows) - fade up on enter */}
      <motion.footer
        className="py-8"
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="w-full mx-auto rounded-3xl bg-[#3e1f1a] text-white p-6 sm:p-8">
          {/* Row 1: three columns spaced-between */}
          <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-[#fff7ef66]">
            {/* Left: CTA */}
            <div className="w-full">
              <button
                className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Build on Espresso"
              >
                Build on Espresso
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </button>
            </div>
            {/* Middle: social links */}
            <div className="flex w-full justify-center items-center gap-6">
              <a
                href="https://discord.gg/espresso"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Discord"
              >
                <FaDiscord className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/espressosys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/EspressoSystems"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </div>

            {/* Right: other links (dummy) */}
            <div className="hidden w-full md:flex items-center gap-6 text-white/80">
              <a href="#" className="hover:text-white transition-colors">
                Careers
              </a>
              <a href="#" className="hover:text-white transition-colors">
                HotShot Paper
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Espresso Docs
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Row 2: centered logo */}
          <div className="py-16 flex items-center justify-center">
            <Logo fill="#dd9e67" className="w-60 h-40 md:w-56 md:h-56" />
          </div>
        </div>
      </motion.footer>

      {/* Event Modal */}
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
