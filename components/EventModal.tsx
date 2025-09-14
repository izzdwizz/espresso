"use client";

import { useState } from "react";
import { Event } from "@/types/events";
import {
  IoClose,
  IoChevronBack,
  IoChevronForward,
  IoLocation,
  IoCalendar,
  IoPeople,
  IoGlobe,
} from "react-icons/io5";

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !event) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === event.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? event.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 bg-opacity-50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden mx-4 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
              {event.title}
            </h2>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <IoLocation className="w-4 h-4" />
                <span>
                  {event.location}, {event.country}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <IoCalendar className="w-4 h-4" />
                <span>{event.date}</span>
              </div>
              {event.attendees && (
                <div className="flex items-center gap-1">
                  <IoPeople className="w-4 h-4" />
                  <span>{event.attendees} attendees</span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoClose className="w-6 h-6 text-espresso-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row max-h-[calc(90vh-120px)]">
          {/* Image Carousel */}
          {event.images.length > 0 && (
            <div className="lg:w-1/2 relative">
              <div className="relative h-64 lg:h-full bg-gray-100 overflow-hidden">
                <img
                  src={event.images[currentImageIndex].url}
                  alt={event.images[currentImageIndex].alt}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />

                {/* Navigation arrows */}
                {event.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 hover:scale-110 transition-all duration-200"
                    >
                      <IoChevronBack className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 hover:scale-110 transition-all duration-200"
                    >
                      <IoChevronForward className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                {event.images.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    {currentImageIndex + 1} / {event.images.length}
                  </div>
                )}

                {/* Image thumbnails */}
                {event.images.length > 1 && (
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {event.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-12 h-12 rounded overflow-hidden border-2 transition-all duration-200 hover:scale-110 ${
                          index === currentImageIndex
                            ? "border-blue-500"
                            : "border-transparent hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Image caption */}
              {event.images[currentImageIndex].caption && (
                <div className="p-3 bg-gray-50 text-sm text-gray-600">
                  {event.images[currentImageIndex].caption}
                </div>
              )}
            </div>
          )}

          {/* Event Details */}
          <div
            className={`${
              event.images.length > 0 ? "lg:w-1/2" : "w-full"
            } p-6 overflow-y-auto`}
          >
            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                About this Event
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Venue */}
            {event.venue && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Venue
                </h3>
                <div className="flex items-center gap-2 text-gray-600">
                  <IoGlobe className="w-5 h-5" />
                  <span>{event.venue}</span>
                </div>
              </div>
            )}

            {/* Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Event Highlights
                </h3>
                <ul className="space-y-2">
                  {event.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-600"
                    >
                      <div className="w-2 h-2 bg-espresso-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Event Type Badge */}
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  event.type === "future"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {event.type === "future" ? "Upcoming Event" : "Past Event"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
