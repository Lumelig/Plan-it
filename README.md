# Plan-it / CampusSwipe

A mobile application for discovering and managing campus events through an intuitive swipe interface.

## 🎯 Overview

CampusSwipe (Plan-it) is a cross-platform mobile app that helps students discover campus events, connect with friends, and manage their social calendar. The app features a Tinder-style swipe interface, smart search, and social integration.

## 📱 Mobile App

The mobile app is built with React Native and Expo for iOS, Android, and Web platforms.

**Location:** `/campus-swipe-mobile/`

See the [Mobile App README](./campus-swipe-mobile/README.md) for detailed setup and build instructions.

### Quick Start

```bash
cd campus-swipe-mobile
npm install
npm start
```

## 🚀 Features

- **Swipe Interface**: Discover events with intuitive swipe gestures
- **Smart Search**: Filter events by categories, tags, and keywords
- **Friends Integration**: See what events your friends like
- **Event Management**: Track your likes and RSVPs
- **Cross-Platform**: Native apps for iOS and Android, plus web support
- **Modern UI**: Clean, responsive design with smooth animations

## 📂 Repository Structure

```
Plan-it/
├── campus-swipe-mobile/       # React Native mobile app
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── screens/           # App screens
│   │   ├── data/              # Mock data
│   │   ├── types/             # TypeScript types
│   │   └── utils/             # Helper functions
│   ├── assets/                # App icons and images
│   ├── App.tsx                # Main app file
│   └── README.md              # Mobile app documentation
├── campus_swipe_mvp_react_prototype (1).jsx  # Original web prototype
├── dark_mode_campus_swipe_mvp_react_prototype.jsx  # Dark mode web prototype
└── README.md                  # This file
```

## 🛠️ Technology Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation
- **Animations**: React Native Reanimated & Gesture Handler
- **UI Components**: Custom components with React Native primitives
- **Build Tool**: Expo EAS (Expo Application Services)

## 📲 Building the App

### Prerequisites

- Node.js 14+
- npm or yarn
- Expo account (for builds)

### Development Build

```bash
cd campus-swipe-mobile
npm install
npm run ios     # iOS
npm run android # Android
npm run web     # Web
```

### Production Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build
eas build --platform android
eas build --platform ios
```

See the [Mobile App README](./campus-swipe-mobile/README.md) for complete build instructions.

## 🎨 Design Concepts

The app includes both light and dark mode prototypes:
- `campus_swipe_mvp_react_prototype (1).jsx` - Light mode web prototype
- `dark_mode_campus_swipe_mvp_react_prototype.jsx` - Dark mode web prototype

These prototypes were the foundation for the mobile app implementation.

## 📖 Documentation

- [Mobile App Documentation](./campus-swipe-mobile/README.md)
- [TypeScript Type Definitions](./campus-swipe-mobile/src/types/index.ts)
- [Helper Functions](./campus-swipe-mobile/src/utils/helpers.ts)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is part of the Plan-it campus event platform.

## 🙏 Acknowledgments

- Built with Expo and React Native
- UI design inspired by modern mobile app patterns
- Optimized for campus event discovery and social networking

## 📧 Support

For issues and questions:
- Open an issue on GitHub
- Check the [Mobile App README](./campus-swipe-mobile/README.md) for troubleshooting

---

**Made with ❤️ for campus communities**
