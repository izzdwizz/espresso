"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Event } from "@/types/events";

interface EventCarouselProps {
  events: Event[];
  onEventSelect: (event: Event) => void;
  direction?: "left" | "right"; // auto-scroll direction
  variant?: "light" | "dark"; // color styling variant
}

const EventCarousel: React.FC<EventCarouselProps> = ({
  events,
  onEventSelect,
  direction = "left",
  variant = "light",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(320);

  // Duplicate events for infinite scroll
  const duplicatedEvents = [...events, ...events];

  useEffect(() => {
    const updateCardWidth = () => {
      setCardWidth(window.innerWidth < 640 ? 304 : 320);
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);

    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const delta = direction === "left" ? 1 : -1;
        const nextIndex = (prevIndex + delta + events.length) % events.length;
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [events.length, isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <motion.div
      className="relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform:
            direction === "left"
              ? `translateX(-${currentIndex * cardWidth}px)`
              : `translateX(${currentIndex * cardWidth}px)`,
        }}
      >
        {duplicatedEvents.map((event, index) => (
          <div
            key={`${event.id}-${index}`}
            className="flex-shrink-0 w-72 sm:w-80 mr-4 sm:mr-6 cursor-pointer"
            onClick={() => onEventSelect(event)}
          >
            <div
              className={`rounded-xl shadow-md overflow-hidden card-hover transition-all duration-300 border ${
                variant === "dark"
                  ? "bg-[#1a1a1a] border-white/10 text-white"
                  : "bg-white border-gray-100"
              }`}
            >
              <div className="h-48 bg-gray-200 relative">
                {event.images.length > 0 ? (
                  <img
                    src={event.images[0].url}
                    alt={event.images[0].alt}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full pb-4 bg-gradient-to-br from-espresso-primary to-espresso-primary-dark flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      {event.location}
                    </span>
                  </div>
                )}
                {/* <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.type === "future"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {event.type === "future" ? "Upcoming" : "Past"}
                  </span>
                </div> */}
              </div>
              <div className="p-4">
                <h3
                  className={`font-semibold text-lg mb-1 line-clamp-2 ${
                    variant === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {event.title}
                </h3>
                <p
                  className={`text-xs mb-1 ${
                    variant === "dark" ? "text-white/70" : "text-gray-600"
                  }`}
                >
                  {event.location}, {event.country}
                </p>
                <p className="text-sm text-espresso-primary font-medium">
                  {event.date}
                </p>
                {event.attendees && (
                  <p
                    className={`text-xs mt-1 ${
                      variant === "dark" ? "text-white/60" : "text-gray-500"
                    }`}
                  >
                    {event.attendees} attendees
                  </p>
                )}
                <div className="mt-3">
                  {event.link ? (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold transition-colors ${
                        event.type === "future"
                          ? "bg-black text-white hover:bg-gray-800"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {event.type === "future" ? "Register" : "View Recap"}
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? "bg-espresso-primary w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default EventCarousel;
