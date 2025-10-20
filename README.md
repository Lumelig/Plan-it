# Plan-it - Campus Event Swiper

A Tinder-style swipe interface for discovering and joining campus events. Built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

![Plan-it Logo](public/logo_Plan_it.png)

## Features

- 🎯 **Swipe Interface**: Swipe right to like events, left to pass
- 🔍 **Search & Filter**: Search events by title, location, or tags with club filters
- 👥 **Friend Activity**: See what events your friends are interested in
- 📱 **PWA Support**: Install as a Progressive Web App on your device
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📊 **Export Data**: Export your likes and joins to JSON or send to n8n webhook
- ♿ **Accessible**: Built with accessibility in mind using semantic HTML and ARIA labels

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3 with custom design tokens
- **Animation**: Framer Motion for smooth swipe interactions
- **UI Components**: Custom components built with Radix UI primitives
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Lumelig/Plan-it.git
cd Plan-it
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Plan-it/
├── public/
│   ├── logo_Plan_it.png       # App logo and PWA icon
│   ├── manifest.webmanifest   # PWA manifest
│   └── sw.js                  # Service worker for offline support
├── src/
│   ├── components/
│   │   └── ui/                # Reusable UI components
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── sheet.tsx
│   │       └── tabs.tsx
│   ├── lib/
│   │   └── utils.ts           # Utility functions
│   ├── App.tsx                # Main app component
│   ├── CampusSwipe.tsx        # Core swipe functionality
│   ├── index.css              # Global styles and Tailwind imports
│   └── main.tsx               # App entry point
├── index.html                 # HTML template
├── package.json
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite configuration
```

## Usage

### Swiping Events

- **Swipe Right** or click the "Ja" button to like an event
- **Swipe Left** or click the "Nein" button to pass on an event
- The next event will automatically appear

### Searching Events

1. Use the search bar to find events by title, location, or tags
2. Click on club badges to filter events by specific interests
3. Click the "zurücksetzen" button to clear filters

### Joining Events

- Click "Beitreten" on any event to join it
- Joining an event automatically adds it to your likes
- View all your joined events in the "Meine Zusagen" tab

### Viewing Friend Activity

- The Friends panel shows what events your friends have liked
- Click "Beitreten" to join events your friends are interested in

### Dark Mode

Click the sun/moon icon in the top-right corner to toggle between light and dark themes.

### Exporting Data

In the footer tabs:
- **Export / n8n**: Export your data to JSON or send to an n8n webhook
- **Analytics**: Information about integrating with Grafana/Prometheus

## PWA Installation

When you visit the app in a supported browser, you'll see an "App installieren" button. Click it to install Plan-it as a standalone app on your device.

## Development

### Running Tests

The application includes inline development tests that run automatically. Check the browser console for test results.

### Linting

```bash
npm run lint
```

## Integration with n8n

To send your event data to n8n:

1. Set up an n8n webhook trigger
2. In the browser console, set: `window.__N8N_WEBHOOK__ = "https://your-n8n-url.com/webhook/..."`
3. Click "An n8n senden" in the Export tab

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Event images from [Unsplash](https://unsplash.com)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com)
