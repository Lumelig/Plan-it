# App Architecture Documentation

## Overview

CampusSwipe is a React Native mobile application built with Expo for discovering and managing campus events. The app follows a modular architecture with clear separation of concerns.

## Technology Stack

- **Frontend Framework**: React Native 0.81.4
- **Language**: TypeScript 5.9.2
- **Build Tool**: Expo SDK 54
- **Navigation**: React Navigation (Stack Navigator)
- **State Management**: React Hooks (useState, useMemo, useCallback)
- **Animations**: React Native Reanimated 3.x
- **Gestures**: React Native Gesture Handler 2.x
- **Styling**: StyleSheet API (inline styles)

## Project Structure

```
campus-swipe-mobile/
│
├── assets/                      # Static assets
│   ├── icon.png                # App icon
│   ├── splash-icon.png         # Splash screen
│   ├── adaptive-icon.png       # Android adaptive icon
│   └── favicon.png             # Web favicon
│
├── src/                        # Source code
│   ├── components/             # Reusable UI components
│   │   ├── EventCard.tsx       # Event display card
│   │   └── SwipeCard.tsx       # Swipeable event card with gestures
│   │
│   ├── screens/                # App screens
│   │   ├── SwipeScreen.tsx     # Main swipe interface
│   │   ├── SearchScreen.tsx    # Event search and filtering
│   │   ├── FriendsScreen.tsx   # Friends and their likes
│   │   └── ProfileScreen.tsx   # User profile and settings
│   │
│   ├── data/                   # Data layer
│   │   └── mockData.ts         # Mock events and friends data
│   │
│   ├── types/                  # TypeScript definitions
│   │   └── index.ts            # Type definitions for Event, Friend, etc.
│   │
│   └── utils/                  # Utility functions
│       └── helpers.ts          # Helper functions (filtering, animations)
│
├── App.tsx                     # Root component with navigation
├── index.ts                    # App entry point
├── app.json                    # Expo configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── babel.config.js             # Babel configuration
├── eas.json                    # EAS Build configuration
├── README.md                   # Main documentation
├── BUILD.md                    # Build and deployment guide
└── test-app.sh                 # Validation script
```

## Screen Flow

```
┌──────────────┐
│  HomeScreen  │  (Landing page with navigation menu)
└──────┬───────┘
       │
       ├──────────────────────┬──────────────────┬──────────────────┐
       │                      │                  │                  │
       ▼                      ▼                  ▼                  ▼
┌─────────────┐      ┌──────────────┐   ┌──────────────┐  ┌──────────────┐
│SwipeScreen  │      │SearchScreen  │   │FriendsScreen │  │ProfileScreen │
└─────────────┘      └──────────────┘   └──────────────┘  └──────────────┘
  Swipe cards         Search & filter    Friends' likes    Settings & stats
```

## Component Hierarchy

```
App
├── NavigationContainer
│   └── Stack.Navigator
│       ├── HomeScreen
│       │   └── Navigation Menu
│       │       ├── Swipe Button
│       │       ├── Search Button
│       │       ├── Friends Button
│       │       └── Profile Button
│       │
│       ├── SwipeScreen
│       │   ├── Header (with like count)
│       │   ├── Card Stack
│       │   │   ├── Next Card Preview (EventCard)
│       │   │   └── Top Card (SwipeCard)
│       │   │       └── EventCard
│       │   └── Action Buttons (Like/Pass)
│       │
│       ├── SearchScreen
│       │   ├── Header
│       │   ├── Search Input
│       │   ├── Club Filters
│       │   └── Event List
│       │       └── Event Items
│       │
│       ├── FriendsScreen
│       │   ├── Header
│       │   └── Friends List
│       │       └── Friend Cards
│       │           └── Event Likes
│       │
│       └── ProfileScreen
│           ├── Header
│           ├── Statistics
│           ├── Categories
│           ├── Notifications Info
│           └── Data Export/Clear
```

## Data Flow

### State Management

Each screen manages its own local state using React hooks:

- **SwipeScreen**: `liked`, `passed` arrays
- **SearchScreen**: `query`, `selectedClubs`, `liked`, `joined` arrays
- **FriendsScreen**: `joined` array
- **ProfileScreen**: `liked`, `joined` arrays

### Data Sources

```typescript
// Mock Data (src/data/mockData.ts)
MOCK_EVENTS: Event[]      // Array of campus events
MOCK_FRIENDS: Friend[]    // Array of friends with their likes
CLUBS: string[]           // Available club categories

// Type Definitions (src/types/index.ts)
interface Event {
  id: number
  title: string
  date: string
  location: string
  tags: string[]
  img: string
  description: string
}

interface Friend {
  id: string
  name: string
  avatar: string
  likes: number[]
}
```

## Key Features Implementation

### 1. Swipe Gestures (SwipeCard.tsx)

Uses React Native Reanimated and Gesture Handler for smooth swipe animations:

```typescript
// Gesture handling
const panGesture = Gesture.Pan()
  .onStart(() => { /* capture start position */ })
  .onUpdate((event) => { /* update card position */ })
  .onEnd((event) => { /* evaluate swipe threshold */ })

// Animated styles
- Card rotation based on drag distance
- Opacity transitions for like/nope overlays
- Spring animations for card reset
```

### 2. Event Filtering (SearchScreen.tsx)

Implements smart filtering with multiple criteria:

```typescript
eventMatches(event, query, clubs)
  - Text search in title, location, tags
  - Club category filtering
  - Combined AND logic
```

### 3. Friend Integration (FriendsScreen.tsx)

Shows social features:
- Friend avatars and names
- Events they've liked
- Quick join functionality
- Visual indicators for joined events

### 4. Profile Management (ProfileScreen.tsx)

User data management:
- Statistics display (likes, joins)
- Category preferences
- Data export (JSON format)
- Clear data functionality

## Navigation Implementation

Stack-based navigation with React Navigation:

```typescript
<Stack.Navigator>
  - Screens defined with route names
  - Custom header styling
  - Screen-specific options
  - Type-safe navigation props
```

## Styling Approach

- **StyleSheet API**: All styles defined using React Native's StyleSheet
- **Design System**: Consistent colors, spacing, and typography
- **Responsive**: Adapts to different screen sizes
- **Platform-specific**: Uses platform defaults where appropriate

### Color Palette

```
Primary Dark:   #0f172a
Primary Light:  #1e293b
Accent Blue:    #3b82f6
Success Green:  #4ade80
Error Red:      #ef4444
Background:     #f8fafc
Card BG:        #ffffff
Text Primary:   #1a1a1a
Text Secondary: #666666
Border:         #e5e7eb
```

## Performance Optimizations

1. **Memoization**: 
   - `useMemo` for filtered event lists
   - `useCallback` for gesture handlers

2. **Lazy Loading**:
   - Images loaded on demand
   - Screen components loaded on navigation

3. **Gesture Performance**:
   - Animations run on UI thread (Reanimated)
   - No JavaScript bridge bottleneck

## Build Targets

### iOS
- Minimum iOS version: 13.4
- Supports iPhone and iPad
- App Store ready with proper bundle identifier

### Android
- Minimum SDK: 23 (Android 6.0)
- Target SDK: 34 (Android 14)
- Google Play ready with adaptive icons

### Web
- PWA-capable (if web manifest added)
- Responsive design
- Fallback gestures for non-touch devices

## Future Enhancements

### Planned Features
- [ ] Real backend integration (REST API)
- [ ] User authentication (OAuth, email/password)
- [ ] Push notifications for friend events
- [ ] Calendar integration
- [ ] Event RSVP with backend sync
- [ ] Dark mode support
- [ ] Offline mode with local storage
- [ ] Share events via social media
- [ ] Event creation interface
- [ ] Advanced filtering (date range, distance)

### Technical Improvements
- [ ] Redux or Zustand for global state
- [ ] React Query for API caching
- [ ] Unit tests (Jest)
- [ ] E2E tests (Detox)
- [ ] Performance monitoring (Sentry)
- [ ] Analytics integration (Firebase, Mixpanel)
- [ ] Error boundary components
- [ ] Loading states and skeletons

## Testing Strategy

### Current Tests
- TypeScript type checking
- Build validation script
- Manual testing guide

### Recommended Tests
```typescript
// Component tests
- EventCard renders correctly
- SwipeCard handles gestures
- Screen navigation works

// Integration tests
- Event filtering logic
- Like/join state management
- Friend event sync

// E2E tests
- Complete user flows
- Cross-platform compatibility
```

## Deployment Strategy

### Development
1. Run locally with Expo Go
2. Test on simulators/emulators
3. Test on physical devices

### Staging
1. Build preview APK/IPA with EAS
2. Distribute to testers via TestFlight/Internal Testing
3. Collect feedback

### Production
1. Build production bundles with EAS
2. Submit to App Store / Play Store
3. Monitor crash reports and analytics
4. Release updates as needed

## Security Considerations

- API keys stored in environment variables
- No sensitive data in code
- HTTPS for all API calls
- Input validation for user data
- Secure storage for user tokens
- Proper error handling (no data leaks)

## Accessibility

- Screen reader support
- Touch target sizes (44x44 minimum)
- Color contrast ratios
- Alternative text for images
- Keyboard navigation (web)

## Documentation

- **README.md**: Getting started guide
- **BUILD.md**: Detailed build instructions
- **ARCHITECTURE.md**: This file
- Inline code comments for complex logic
- TypeScript types as documentation

---

**Last Updated**: October 2025  
**Version**: 1.0.0  
**Maintainer**: Plan-it Team
