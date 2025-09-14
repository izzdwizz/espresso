# Espresso World Map

An interactive web application showcasing Espresso events around the world, built with Next.js, Tailwind CSS, and Mapbox GL JS.

## Features

- **Interactive Map**: Globe and flat map views with smooth transitions
- **Event Markers**: Visual markers for past and future events with different colors
- **Event Details Modal**: Rich modal with image carousel and event information
- **Filtering System**: Filter events by type (past/future) and country
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Smooth Animations**: Enhanced UX with transitions and hover effects

## Event Locations

### Past Events

- **USA**: Denver, San Francisco, New York
- **France**: Cannes
- **Thailand**: Bangkok
- **Belgium**: Brussels
- **Germany**: Berlin

### Future Events

- **Korea**: Seoul
- **Argentina**: Buenos Aires

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Maps**: Mapbox GL JS
- **Icons**: React Icons
- **TypeScript**: Full type safety
- **Images**: Unsplash integration for event photos

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file with your Mapbox access token:

   ```
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles with Espresso theme
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── Map.tsx              # Interactive map component
│   ├── EventModal.tsx       # Event details modal
│   └── EventControls.tsx    # Event filtering controls
├── data/
│   └── events.ts            # Event data and utilities
├── types/
│   └── events.ts            # TypeScript type definitions
└── public/
    └── images/events/       # Event images directory
```

## Design System

The application follows the Espresso brand guidelines with:

- **Primary Color**: Warm brown/orange (#D2691E)
- **Secondary Color**: Dark brown/black (#4B2E2E)
- **Accent Color**: Gold/yellow (#FFD700)
- **Text Color**: White (#FFFFFF)
- **Typography**: Clean, modern sans-serif fonts

## Features in Detail

### Interactive Map

- Toggle between globe and flat map projections
- Smooth fly-to animations when selecting events
- Custom markers for past (gray) and future (dark brown) events
- Popup information on marker hover

### Event Modal

- Full-screen modal with event details
- Image carousel with navigation controls
- Event highlights and venue information
- Responsive design for all screen sizes

### Filtering System

- Filter by event type (all, past, future)
- Filter by country
- Real-time event count display
- Dropdown selection for easy navigation

## Customization

### Adding New Events

Edit `data/events.ts` to add new events:

```typescript
{
  id: 'unique-event-id',
  title: 'Event Title',
  location: 'City',
  country: 'Country',
  coordinates: [longitude, latitude],
  date: 'Month Year',
  type: 'past' | 'future',
  description: 'Event description...',
  images: [
    {
      url: 'image-url',
      alt: 'alt-text',
      caption: 'optional-caption'
    }
  ],
  highlights: ['Highlight 1', 'Highlight 2'],
  venue: 'Venue Name',
  attendees: 150
}
```

### Styling

The application uses Tailwind CSS with custom CSS variables defined in `app/globals.css`. Modify the color scheme by updating the CSS variables:

```css
:root {
  --espresso-primary: #d2691e;
  --espresso-secondary: #4b2e2e;
  --espresso-accent: #ffd700;
  --espresso-text: #ffffff;
}
```

## Deployment

The application is ready for deployment on platforms like Vercel, Netlify, or any static hosting service:

```bash
npm run build
npm start
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is part of the Espresso ecosystem and follows the project's licensing terms.
