# CampusSwipe Mobile App (Plan-it)

A React Native mobile application built with Expo for discovering and managing campus events through an intuitive swipe interface.

## Features

- 🔥 **Swipe Interface**: Tinder-style swipe cards for event discovery
- 🔍 **Smart Search**: Filter events by title, location, tags, and clubs
- 👥 **Friends**: See what events your friends like and join them
- ⚙️ **Profile**: Manage your preferences and export data
- 📱 **Cross-Platform**: Works on iOS, Android, and Web
- 🎨 **Modern UI**: Clean, intuitive interface with smooth animations

## Tech Stack

- **React Native** with TypeScript
- **Expo** for cross-platform development
- **React Navigation** for screen navigation
- **React Native Gesture Handler** & **Reanimated** for smooth swipe animations
- **Expo Linear Gradient** for beautiful UI effects

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (installed automatically)

For iOS development:
- macOS with Xcode
- iOS Simulator or physical iOS device

For Android development:
- Android Studio
- Android Emulator or physical Android device

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Lumelig/Plan-it.git
cd Plan-it/campus-swipe-mobile
```

2. Install dependencies:
```bash
npm install
```

## Running the App

### Development Mode

Start the Expo development server:
```bash
npm start
```

This will open the Expo DevTools in your browser. From there you can:
- Press `i` to open iOS Simulator
- Press `a` to open Android Emulator
- Scan the QR code with the Expo Go app on your physical device

### Platform-Specific Commands

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

**Web:**
```bash
npm run web
```

## Building for Production

### Building with EAS (Expo Application Services)

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Login to your Expo account:
```bash
eas login
```

3. Configure your project:
```bash
eas build:configure
```

4. Build for Android:
```bash
eas build --platform android
```

5. Build for iOS:
```bash
eas build --platform ios
```

### Building Locally

**Android APK:**
```bash
expo build:android
```

**iOS IPA (requires macOS):**
```bash
expo build:ios
```

## Project Structure

```
campus-swipe-mobile/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── EventCard.tsx
│   │   └── SwipeCard.tsx
│   ├── screens/          # App screens
│   │   ├── SwipeScreen.tsx
│   │   ├── SearchScreen.tsx
│   │   ├── FriendsScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── data/             # Mock data and constants
│   │   └── mockData.ts
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   └── utils/            # Helper functions
│       └── helpers.ts
├── assets/               # Images, fonts, and other assets
├── App.tsx              # Main app component with navigation
├── app.json             # Expo configuration
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## App Screens

### 1. Home Screen
- Landing page with navigation to all main features
- Quick access to Swipe, Search, Friends, and Profile

### 2. Swipe Screen
- Swipe right to like events
- Swipe left to pass
- See preview of next event in the deck
- Manual like/pass buttons

### 3. Search Screen
- Search events by text
- Filter by club categories
- View all events in a scrollable list
- Quick join and like actions

### 4. Friends Screen
- See what events your friends have liked
- Join events directly from friends' likes
- Visual representation with friend avatars

### 5. Profile Screen
- View statistics (likes, joined events)
- Manage notification preferences
- Export data as JSON
- Clear all data option

## Configuration

### Customizing App Metadata

Edit `app.json` to change:
- App name and slug
- Bundle identifier (iOS) and package name (Android)
- Icon and splash screen
- App orientation and UI style

### Adding Custom Events

Edit `src/data/mockData.ts` to modify:
- `MOCK_EVENTS`: Event data
- `MOCK_FRIENDS`: Friend data
- `CLUBS`: Available club categories

## Features in Development

- 🔔 Push notifications for friend events
- 🌐 Backend integration with real event data
- 📊 Analytics dashboard
- 🔗 n8n webhook integration for automation
- 💾 Local storage persistence
- 🌙 Dark mode support

## Troubleshooting

### Common Issues

**Metro bundler not starting:**
```bash
npm start -- --clear
```

**iOS build errors:**
```bash
cd ios && pod install && cd ..
```

**Android build errors:**
- Ensure Android SDK is properly installed
- Check that ANDROID_HOME environment variable is set

**Dependencies issues:**
```bash
rm -rf node_modules
npm install
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is part of the Plan-it campus event platform.

## Support

For issues and questions:
- Open an issue on GitHub
- Contact the development team

## Acknowledgments

- Built with [Expo](https://expo.dev/)
- UI inspired by modern mobile design patterns
- Event data structure optimized for campus activities
