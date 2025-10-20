# Build and Deployment Guide

## Prerequisites

Before building the app, ensure you have:

- Node.js 14+ installed
- npm or yarn package manager
- Expo CLI (installed automatically with npx)
- For iOS: macOS with Xcode
- For Android: Android Studio with SDK

## Development Setup

1. **Clone and Install**
```bash
git clone https://github.com/Lumelig/Plan-it.git
cd Plan-it/campus-swipe-mobile
npm install
```

2. **Start Development Server**
```bash
npm start
```

This will open Expo DevTools in your browser with options to:
- Run on iOS Simulator (press `i`)
- Run on Android Emulator (press `a`)
- Open in web browser (press `w`)
- Scan QR code with Expo Go app on physical device

## Platform-Specific Development

### iOS Development

**Requirements:**
- macOS
- Xcode 12+
- iOS Simulator

**Run iOS:**
```bash
npm run ios
```

### Android Development

**Requirements:**
- Android Studio
- Android SDK (API 31+)
- Android Emulator or physical device

**Run Android:**
```bash
npm run android
```

### Web Development

**Run Web:**
```bash
npm run web
```

The web version will run at `http://localhost:19006`

## Production Builds

### Using EAS Build (Recommended)

Expo Application Services (EAS) is the recommended way to build production apps.

1. **Install EAS CLI:**
```bash
npm install -g eas-cli
```

2. **Login to Expo:**
```bash
eas login
```

3. **Configure EAS:**
```bash
eas build:configure
```

4. **Build for Android:**
```bash
# Production build (AAB for Play Store)
eas build --platform android --profile production

# Development build (APK for testing)
eas build --platform android --profile development
```

5. **Build for iOS:**
```bash
# Production build (for App Store)
eas build --platform ios --profile production

# Development build (for testing)
eas build --platform ios --profile development
```

### Local Builds (Alternative)

#### Android APK (Local)

```bash
# Classic build (being deprecated)
expo build:android -t apk

# Or use EAS locally
eas build --platform android --local
```

#### iOS IPA (Local - requires macOS)

```bash
expo build:ios -t archive
```

## Build Profiles

Edit `eas.json` to customize build profiles:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "distribution": "store"
    }
  }
}
```

## Environment Configuration

### App Configuration

Edit `app.json` to configure:
- App name and display name
- Bundle identifier (iOS) / Package name (Android)
- Version number
- Icons and splash screens
- Orientation and status bar

### Secrets and API Keys

For production builds, use environment variables:

```bash
# Create .env file
echo "API_URL=https://api.example.com" > .env
echo "API_KEY=your-secret-key" >> .env
```

Then use `expo-constants` to access:
```typescript
import Constants from 'expo-constants';
const apiUrl = Constants.manifest.extra.apiUrl;
```

## Testing

### Run Tests

```bash
# TypeScript type checking
npx tsc --noEmit

# ESLint (if configured)
npx eslint src/

# Jest tests (if configured)
npm test
```

### Manual Testing

1. Test on iOS Simulator
2. Test on Android Emulator
3. Test on physical iOS device (via Expo Go or TestFlight)
4. Test on physical Android device (via Expo Go or APK)
5. Test web version in different browsers

## Deployment

### Google Play Store (Android)

1. Build production AAB:
```bash
eas build --platform android --profile production
```

2. Download the AAB file from EAS

3. Upload to Google Play Console:
   - Go to https://play.google.com/console
   - Create a new app or select existing
   - Upload AAB to internal testing track
   - Submit for review

### Apple App Store (iOS)

1. Build production IPA:
```bash
eas build --platform ios --profile production
```

2. Submit to App Store:
```bash
eas submit --platform ios
```

3. Or download IPA and upload via:
   - Xcode Organizer
   - Transporter app
   - App Store Connect website

### Web Deployment

Build for web:
```bash
npx expo export:web
```

Deploy the `web-build` folder to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

Example with Netlify:
```bash
npm install -g netlify-cli
netlify deploy --dir=web-build --prod
```

## Continuous Integration

### GitHub Actions Example

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run test
      - run: npx expo export:web
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./web-build
```

## Troubleshooting

### Common Issues

**Metro bundler cache:**
```bash
npm start -- --clear
```

**Node modules:**
```bash
rm -rf node_modules
npm install
```

**iOS pods:**
```bash
cd ios && pod install && cd ..
```

**Build errors:**
- Check Node version (16+ recommended)
- Check Expo SDK compatibility
- Update dependencies: `npm update`

### Debug Builds

Enable remote debugging:
1. Shake device (or Cmd+D on iOS, Cmd+M on Android)
2. Select "Debug Remote JS"
3. Open Chrome DevTools

## Performance Optimization

### Bundle Size

Check bundle size:
```bash
npx expo customize metro.config.js
```

### Asset Optimization

- Compress images with tools like ImageOptim
- Use WebP format for images
- Lazy load components
- Use React.memo for expensive components

## Security

### Code Obfuscation

For production builds, consider:
- ProGuard (Android)
- Strip debug symbols
- Use environment variables for secrets

### App Signing

- Android: Generate keystore and configure in `app.json`
- iOS: Use certificates from Apple Developer Portal

## Support

- EAS Build Docs: https://docs.expo.dev/build/introduction/
- Expo Forums: https://forums.expo.dev/
- GitHub Issues: Open an issue for bugs

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Play Store Guidelines](https://play.google.com/console/about/guides/releasewithconfidence/)
