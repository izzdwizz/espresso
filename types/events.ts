export interface EventImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface Event {
  id: string;
  title: string;
  location: string;
  country: string;
  coordinates: [number, number]; // [longitude, latitude]
  date: string;
  type: "past" | "future";
  description: string;
  images: EventImage[];
  highlights?: string[];
  venue?: string;
  attendees?: number;
}

export interface EventFilter {
  type: "all" | "past" | "future";
  country?: string;
}
