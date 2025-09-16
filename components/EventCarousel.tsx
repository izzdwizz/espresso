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
        {duplicatedEvents.map((event, index) => {
          const variant = index % 3;
          const bgCard = [
            "bg-[#F4E8DC]",
            "bg-espresso-primary",
            "bg-[#6B3F23]",
          ][variant];
          const borderCard = [
            "border border-[#E8DACC]",
            "border border-[#c5894e]",
            "border border-[#6B3F23]",
          ][variant];
          const titleColor = ["text-gray-900", "text-white", "text-white"][
            variant
          ];
          const metaColor = ["text-gray-700", "text-white/80", "text-white/80"][
            variant
          ];
          const accentColor = [
            "text-espresso-primary",
            "text-espresso-accent",
            "text-espresso-accent",
          ][variant];
          const imageOverlay = [
            "bg-black/0",
            "bg-espresso-primary/25",
            "bg-black/10",
          ][variant];

          return (
            <div
              key={`${event.id}-${index}`}
              className="flex-shrink-0 w-72 sm:w-80 mr-4 sm:mr-6 cursor-pointer group"
              onClick={() => onEventSelect(event)}
            >
              <div
                className={`${bgCard} ${borderCard} rounded-2xl shadow-lg overflow-hidden min-h-64 md:min-h-96  transition-all duration-300 hover:shadow-xl`}
              >
                <div className="h-48 relative">
                  {event.images.length > 0 ? (
                    <img
                      src={event.images[0]?.url}
                      alt={event.images[0]?.alt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">
                        {event.location}
                      </span>
                    </div>
                  )}
                  <div className={`absolute inset-0 ${imageOverlay}`} />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3
                      className={`font-semibold text-xl ${titleColor} line-clamp-2`}
                    >
                      {event.title}
                    </h3>
                    <span
                      className={`inline-flex items-center justify-center w-max-content min-w-7 h-7 rounded-full border ${titleColor} border-current opacity-80 group-hover:opacity-100 transition-opacity`}
                    >
                      <svg
                        className="w-3.5 h-3.5"
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
                    </span>
                  </div>
                  <p className={`text-sm ${metaColor} mb-2`}>
                    {event.location}, {event.country}
                  </p>
                  <p className={`text-sm ${accentColor} font-medium`}>
                    {event.date}
                  </p>
                  {event.attendees && (
                    <p className={`text-xs ${metaColor} mt-1`}>
                      {event.attendees} attendees
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
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
