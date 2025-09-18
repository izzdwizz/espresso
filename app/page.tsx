"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import EventControls from "@/components/EventControls";
import EventModal from "@/components/EventModal";
import EventCarousel from "@/components/EventCarousel";
import { Event, EventFilter } from "@/types/events";
import { events } from "@/data/events";
import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";
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
  const [filter, setFilter] = useState<EventFilter>({ type: "all" });
  const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null);

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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative">
        {/* Map Section */}
        <section className="relative h-[92dvh] min-h-[90vh] w-full">
          <Map
            events={filteredEvents}
            selectedEvent={selectedEvent}
            onEventSelect={handleEventSelect}
            isGlobe={isGlobe}
            onToggleProjection={handleToggleProjection}
            hoveredEvent={hoveredEvent}
          />

          {/* Search Controls */}
          <EventControls
            events={events}
            selectedEvent={selectedEvent}
            filter={filter}
            onFilterChange={setFilter}
            onEventSelect={handleEventSelect}
            hoveredEventId={hoveredEvent?.id}
            onHoverEvent={setHoveredEvent}
          />

          <div className="absolute bottom-6 right-6 z-30 fade-in-delay-2">
            <a
              href="#past-events"
              className="w-12 h-12 bg-slate-500/20 border border-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-500 animate-bounce hover:scale-110"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* Past Events Section */}
        <section className="py-16 px-4 bg-gray-50" id="past-events">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-espresso-primary to-espresso-secondary mb-10 pb-4 text-center">
              Explore Past Events
            </h2>
            <EventCarousel
              events={events.filter((event) => event.type === "past")}
              onEventSelect={handleEventSelect}
            />
          </div>
        </section>

        {/* Sign Up Section */}
        <section className="py-16 px-4 bg-espresso-primary">
          <div className="max-w-4xl mx-auto text-center future-events">
            <h2 className="text-4xl font-bold text-white mb-4">
              Stay Updated on Future Events
            </h2>
            <p className="text-white mb-8 text-lg font">
              Be the first to know about upcoming Espresso events around the
              world
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
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4 footer">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                {/* <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-espresso-primary rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                  <span className="text-xl font-bold">Espresso</span>
                </div> */}

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
      </main>

      {/* Event Modal */}
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
