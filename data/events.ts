import { Event } from "@/types/events";

export const events: Event[] = [
  // Past Events
  {
    id: "denver-2024",
    title: "Composability Day ETHDenver",
    location: "Denver",
    country: "USA",
    coordinates: [-104.9903, 39.7392],
    date: "March 2024",
    type: "past",
    description:
      "An exciting gathering of blockchain developers and enthusiasts in the Mile High City, exploring the future of rollup technology.",
    images: [
      {
        url: "images/esp-composD.png",
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
    attendees: 575,
    link: "https://luma.com/o2446knk",
  },
  {
    id: "san-francisco-2024",
    title: "Ethereum 10Y Anniversary San Francisco",
    location: "San Francisco",
    country: "USA",
    coordinates: [-122.4194, 37.7749],
    date: "April 2024",
    type: "past",
    description:
      "A comprehensive summit featuring the latest developments in Espresso technology and its impact on the blockchain ecosystem.",
    images: [
      {
        url: "images/esp-ethSF.png",
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
    attendees: 971,
    link: "https://luma.com/ethereum-10y-sanfrancisco",
  },
  {
    id: "new-york-2024",
    title: "Espresso Brews Permissionless",
    location: "New York",
    country: "USA",
    coordinates: [-74.006, 40.7128],
    date: "May 2024",
    type: "past",
    description:
      "The financial capital of the world hosted our largest event, showcasing Espresso's potential in traditional finance integration.",
    images: [
      {
        url: "images/esp-nyc.webp",
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
    attendees: 300,
    link: "https://luma.com/yb17pn9g",
  },
  {
    id: "cannes-2024",
    title: "Ethereum United: Pétanque",
    location: "Cannes",
    country: "France",
    coordinates: [7.0174, 43.5528],
    date: "June 2024",
    type: "past",
    description:
      "A glamorous event on the French Riviera, combining technology innovation with the artistic spirit of Cannes.",
    images: [
      {
        url: "images/esp-cannes.png",
        alt: "Cannes festival venue",
        caption: "Beachside venue in Cannes",
      },
    ],
    highlights: [
      "Art and technology fusion discussions",
      "European developer community meetup",
      "Innovation showcase",
    ],
    venue: "Allée de la Liberté Charles de Gaulle",
    attendees: 701,
    link: "https://luma.com/h0lmohx9",
  },
  {
    id: "bangkok-2024",
    title: "Sequencing Day",
    location: "Bangkok",
    country: "Thailand",
    coordinates: [100.5018, 13.7563],
    date: "July 2024",
    type: "past",
    description:
      "An immersive workshop in Southeast Asia, focusing on practical implementation and developer education.",
    images: [
      {
        url: "images/esp-sqdBangK.png",
        alt: "Bangkok workshop session",
        caption: "Hands-on workshop session",
      },
    ],
    highlights: [
      "Hands-on coding workshops",
      "Southeast Asian developer community building",
      "Local ecosystem partnerships",
    ],
    venue: "Krung Thep Maha Nakhon",
    attendees: 2237,
    link: "https://luma.com/sequencing_day",
  },
  {
    id: "brussels-2024",
    title: "Ethereum United: EURO 2024 Semi-Finals Pub Nights",
    location: "Brussels",
    country: "Belgium",
    coordinates: [4.3517, 50.8503],
    date: "August 2024",
    type: "past",
    description:
      "A policy-focused event in the heart of Europe, addressing regulatory frameworks and compliance in the blockchain space.",
    images: [
      {
        url: "images/esp-ethBruss.png",
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
    attendees: 1101,
    link: "https://luma.com/ud8p6oww",
  },
  {
    id: "berlin-2024",
    title: "Crypto x Badminton",
    location: "Berlin",
    country: "Germany",
    coordinates: [13.405, 52.52],
    date: "September 2024",
    type: "past",
    description:
      "A vibrant tech meetup in Berlin's startup ecosystem, exploring the intersection of innovation and blockchain technology.",
    images: [
      {
        url: "images/esp-crbBerlin.png",
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
    attendees: 13,
    link: "https://luma.com/u407uyxp",
  },

  // Future Events
  {
    id: "seoul-2025",
    title: "Espresso & Partner Brews | KBW",
    location: "Seoul",
    country: "Korea",
    coordinates: [126.978, 37.5665],
    date: "March 2025",
    type: "future",
    description: `Espresso Systems is coming to Seoul for KBW, and what better way to kick things off than with coffee on us?

​Together with our ecosystem partners DSRV, Celo, Polygon Labs & CoinEasy we’re excited to bring you Espresso & Partner Brews.

​Come enjoy a fresh cup, pick up our latest swag, get a personal color analysis, snap your Espresso-branded pic, and even unbox a blind box on the spot!

`,
    images: [
      {
        url: "images/esp-brews.png",
        alt: "Seoul event",
        caption: "Seoul event",
      },
    ],
    highlights: [
      "Korean market integration strategies",
      "Innovation showcase",
      "Regional partnership announcements",
    ],
    venue: "Mtl cafe & bakery Hannam",
    attendees: 250,
    link: "https://luma.com/h9uxi7c1",
  },
  {
    id: "buenos-aires-2025",
    title: "Espresso Buenos Aires Conference",
    location: "Buenos Aires",
    country: "Argentina",
    coordinates: [-58.3816, -34.6037],
    date: "April 2025",
    type: "future",
    description: `Espresso Systems is coming to Buenos Aires for the first time!

​We’re excited to bring you Espresso & Partner Brews.

​Come enjoy a fresh cup, pick up our latest swag, get a personal color analysis, snap your Espresso-branded pic, and even unbox a blind box on the spot!

`,
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
