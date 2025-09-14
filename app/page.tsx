"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import EventControls from "@/components/EventControls";
import EventModal from "@/components/EventModal";
import EventCarousel from "@/components/EventCarousel";
import { Event, EventFilter } from "@/types/events";
import { events } from "@/data/events";
import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";

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
        <section className="relative h-[80vh] w-full">
          <Map
            events={filteredEvents}
            selectedEvent={selectedEvent}
            onEventSelect={handleEventSelect}
            isGlobe={isGlobe}
            onToggleProjection={handleToggleProjection}
          />

          {/* Search Controls */}
          <EventControls
            events={events}
            selectedEvent={selectedEvent}
            filter={filter}
            onFilterChange={setFilter}
            onEventSelect={handleEventSelect}
          />
        </section>

        {/* Past Events Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
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
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated on Future Events
            </h2>
            <p className="text-espresso-accent mb-8 text-lg">
              Be the first to know about upcoming Espresso events around the
              world
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-espresso-accent focus:outline-none"
              />
              <button className="bg-white text-espresso-primary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200">
                Sign Up
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-espresso-primary rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                  <span className="text-xl font-bold">Espresso</span>
                </div>
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
