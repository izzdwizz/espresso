import { Event } from "@/types/events";

export const events: Event[] = [
  // Past Events
  {
    id: "denver-2024",
    title: "Espresso Denver Meetup",
    location: "Denver",
    country: "USA",
    coordinates: [-104.9903, 39.7392],
    date: "March 2024",
    type: "past",
    description:
      "An exciting gathering of blockchain developers and enthusiasts in the Mile High City, exploring the future of rollup technology.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
        alt: "Denver meetup attendees",
        caption: "Networking session at Denver event",
      },
      {
        url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
        alt: "Presentation stage",
        caption: "Technical presentation on Espresso architecture",
      },
    ],
    highlights: [
      "Technical deep-dive on Espresso architecture",
      "Networking with local developers",
      "Live demo of crosschain composability",
    ],
    venue: "Denver Convention Center",
    attendees: 150,
  },
  {
    id: "san-francisco-2024",
    title: "Espresso San Francisco Summit",
    location: "San Francisco",
    country: "USA",
    coordinates: [-122.4194, 37.7749],
    date: "April 2024",
    type: "past",
    description:
      "A comprehensive summit featuring the latest developments in Espresso technology and its impact on the blockchain ecosystem.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
        alt: "San Francisco summit stage",
        caption: "Main stage presentation",
      },
    ],
    highlights: [
      "Keynote on real-time finality",
      "Panel discussion on Ethereum compatibility",
      "Workshop on building with Espresso",
    ],
    venue: "Moscone Center",
    attendees: 300,
  },
  {
    id: "new-york-2024",
    title: "Espresso New York Conference",
    location: "New York",
    country: "USA",
    coordinates: [-74.006, 40.7128],
    date: "May 2024",
    type: "past",
    description:
      "The financial capital of the world hosted our largest event, showcasing Espresso's potential in traditional finance integration.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
        alt: "New York conference hall",
        caption: "Main conference hall",
      },
    ],
    highlights: [
      "Financial sector integration discussions",
      "Regulatory compliance workshops",
      "Enterprise adoption case studies",
    ],
    venue: "Javits Center",
    attendees: 500,
  },
  {
    id: "cannes-2024",
    title: "Espresso Cannes Festival",
    location: "Cannes",
    country: "France",
    coordinates: [7.0174, 43.5528],
    date: "June 2024",
    type: "past",
    description:
      "A glamorous event on the French Riviera, combining technology innovation with the artistic spirit of Cannes.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
        alt: "Cannes festival venue",
        caption: "Beachside venue in Cannes",
      },
    ],
    highlights: [
      "Art and technology fusion discussions",
      "European developer community meetup",
      "Innovation showcase",
    ],
    venue: "Palais des Festivals",
    attendees: 200,
  },
  {
    id: "bangkok-2024",
    title: "Espresso Bangkok Workshop",
    location: "Bangkok",
    country: "Thailand",
    coordinates: [100.5018, 13.7563],
    date: "July 2024",
    type: "past",
    description:
      "An immersive workshop in Southeast Asia, focusing on practical implementation and developer education.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
        alt: "Bangkok workshop session",
        caption: "Hands-on workshop session",
      },
    ],
    highlights: [
      "Hands-on coding workshops",
      "Southeast Asian developer community building",
      "Local ecosystem partnerships",
    ],
    venue: "Bangkok International Trade & Exhibition Centre",
    attendees: 120,
  },
  {
    id: "brussels-2024",
    title: "Espresso Brussels Policy Forum",
    location: "Brussels",
    country: "Belgium",
    coordinates: [4.3517, 50.8503],
    date: "August 2024",
    type: "past",
    description:
      "A policy-focused event in the heart of Europe, addressing regulatory frameworks and compliance in the blockchain space.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
        alt: "Brussels policy forum",
        caption: "Policy discussion panel",
      },
    ],
    highlights: [
      "EU regulatory framework discussions",
      "Compliance and governance workshops",
      "Policy maker engagement",
    ],
    venue: "European Parliament",
    attendees: 80,
  },
  {
    id: "berlin-2024",
    title: "Espresso Berlin Tech Meetup",
    location: "Berlin",
    country: "Germany",
    coordinates: [13.405, 52.52],
    date: "September 2024",
    type: "past",
    description:
      "A vibrant tech meetup in Berlin's startup ecosystem, exploring the intersection of innovation and blockchain technology.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
        alt: "Berlin tech meetup",
        caption: "Startup ecosystem networking",
      },
    ],
    highlights: [
      "Startup ecosystem integration",
      "German developer community building",
      "Innovation showcase",
    ],
    venue: "Factory Berlin",
    attendees: 180,
  },

  // Future Events
  {
    id: "seoul-2025",
    title: "Espresso Seoul Innovation Summit",
    location: "Seoul",
    country: "Korea",
    coordinates: [126.978, 37.5665],
    date: "March 2025",
    type: "future",
    description:
      "An upcoming innovation summit in Seoul, showcasing the latest in blockchain technology and its applications in the Korean market.",
    images: [],
    highlights: [
      "Korean market integration strategies",
      "Innovation showcase",
      "Regional partnership announcements",
    ],
    venue: "COEX Convention Center",
    attendees: 250,
  },
  {
    id: "buenos-aires-2025",
    title: "Espresso Buenos Aires Conference",
    location: "Buenos Aires",
    country: "Argentina",
    coordinates: [-58.3816, -34.6037],
    date: "April 2025",
    type: "future",
    description:
      "A groundbreaking conference in South America, bringing Espresso technology to the Latin American blockchain community.",
    images: [],
    highlights: [
      "Latin American market expansion",
      "Spanish-speaking developer community",
      "Regional ecosystem development",
    ],
    venue: "La Rural Convention Center",
    attendees: 200,
  },
];

export const getEventsByType = (type: "all" | "past" | "future"): Event[] => {
  if (type === "all") return events;
  return events.filter((event) => event.type === type);
};

export const getEventById = (id: string): Event | undefined => {
  return events.find((event) => event.id === id);
};

export const getCountries = (): string[] => {
  const countries = events.map((event) => event.country);
  return [...new Set(countries)].sort();
};
