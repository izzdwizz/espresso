"use client";

import { useState, useEffect } from "react";
import { Event } from "@/types/events";

interface EventCarouselProps {
  events: Event[];
  onEventSelect: (event: Event) => void;
}

const EventCarousel: React.FC<EventCarouselProps> = ({
  events,
  onEventSelect,
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
        const nextIndex = prevIndex + 1;
        return nextIndex >= events.length ? 0 : nextIndex;
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [events.length, isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * cardWidth}px)`,
        }}
      >
        {duplicatedEvents.map((event, index) => (
          <div
            key={`${event.id}-${index}`}
            className="flex-shrink-0 w-72 sm:w-80 mr-4 sm:mr-6 cursor-pointer"
            onClick={() => onEventSelect(event)}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover transition-all duration-300">
              <div className="h-48 bg-gray-200 relative">
                {event.images.length > 0 ? (
                  <img
                    src={event.images[0].url}
                    alt={event.images[0].alt}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-espresso-primary to-espresso-primary-dark flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      {event.location}
                    </span>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.type === "future"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {event.type === "future" ? "Upcoming" : "Past"}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {event.location}, {event.country}
                </p>
                <p className="text-sm text-espresso-primary font-medium">
                  {event.date}
                </p>
                {event.attendees && (
                  <p className="text-xs text-gray-500 mt-1">
                    {event.attendees} attendees
                  </p>
                )}
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
    </div>
  );
};

export default EventCarousel;
