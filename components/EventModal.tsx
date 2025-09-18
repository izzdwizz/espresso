"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/75 bg-opacity-50 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-[#1a1a1a] text-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden mx-4 border border-white/10"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold truncate">
                {event.title}
              </h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-white/70">
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
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <IoClose className="w-6 h-6 text-white/80" />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row max-h-[calc(90vh-120px)]">
            {/* Image Carousel */}
            {event.images.length > 0 && (
              <div className="lg:w-1/2 relative">
                <div className="relative h-64 lg:h-full bg-black overflow-hidden">
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
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 text-white p-2 rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-200"
                      >
                        <IoChevronBack className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 text-white p-2 rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-200"
                      >
                        <IoChevronForward className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Image counter */}
                  {event.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
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
                              ? "border-espresso-primary"
                              : "border-transparent hover:border-white/40"
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
                  <div className="p-3 bg-white/5 text-sm text-white/70">
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
                <h3 className="text-lg font-semibold mb-3">About this Event</h3>
                <p className="text-white/80 leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Venue */}
              {event.venue && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Venue</h3>
                  <div className="flex items-center gap-2 text-white/80">
                    <IoGlobe className="w-5 h-5" />
                    <span>{event.venue}</span>
                  </div>
                </div>
              )}

              {/* Highlights */}
              {event.highlights && event.highlights.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">
                    Event Highlights
                  </h3>
                  <ul className="space-y-2">
                    {event.highlights.map((highlight, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-white/80"
                      >
                        <div className="w-2 h-2 bg-espresso-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              {event.link && (
                <div className="flex items-center gap-2">
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      event.type === "future"
                        ? "bg-espresso-primary text-black hover:brightness-95"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {event.type === "future" ? "Register" : "View Recap"}
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EventModal;
