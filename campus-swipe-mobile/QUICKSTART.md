# Quick Start Guide

Get the CampusSwipe mobile app running in 5 minutes!

## 🚀 Fast Track

```bash
# 1. Clone the repository
git clone https://github.com/Lumelig/Plan-it.git
cd Plan-it/campus-swipe-mobile

# 2. Install dependencies
npm install

# 3. Start the app
npm start
```

Then:
- Press `w` for web browser (fastest)
- Press `i` for iOS simulator (requires macOS + Xcode)
- Press `a` for Android emulator (requires Android Studio)
- Scan QR code with Expo Go app on your phone

## 📱 Testing on Your Phone

### Option 1: Expo Go (Easiest)

1. Install Expo Go app on your phone:
   - iOS: [App Store](https://apps.apple.com/app/apple-store/id982107779)
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Run `npm start` in the project directory

3. Scan the QR code:
   - iOS: Use Camera app
   - Android: Use Expo Go app

### Option 2: Development Build

For a more production-like experience:

```bash
# Install EAS CLI
npm install -g eas-cli

# Build development version
eas build --profile development --platform android  # or ios

# Install on device
# Download and install the APK/IPA from EAS dashboard
```

## 🌐 Web Version (Fastest)

```bash
npm run web
```

Opens at http://localhost:19006

Note: Some mobile-specific features won't work on web (camera, push notifications, etc.)

## 🖥️ iOS Simulator

### Requirements
- macOS
- Xcode installed

### Steps
```bash
# Open Xcode once to install iOS simulators
xcode-select --install

# Run the app
npm run ios
```

## 🤖 Android Emulator

### Requirements
- Android Studio installed
- At least one AVD (Android Virtual Device) created

### Steps
1. Open Android Studio
2. Tools → AVD Manager → Create Virtual Device
3. Run in terminal:
```bash
npm run android
```

## 🎨 App Features to Try

Once the app is running:

1. **Home Screen**: Navigate to different sections
2. **Swipe Screen**: 
   - Swipe right to like events
   - Swipe left to pass
   - Use buttons if swiping doesn't work
3. **Search Screen**: 
   - Try searching for "Basketball"
   - Filter by clubs like "Coding" or "Sport"
4. **Friends Screen**: 
   - See what your friends like
   - Join events they're attending
5. **Profile Screen**: 
   - View your statistics
   - Export your data as JSON

## 🔧 Troubleshooting

### "Cannot find module" error
```bash
rm -rf node_modules
npm install
```

### Metro bundler issues
```bash
npm start -- --clear
```

### iOS simulator not opening
```bash
# Open simulator manually
open -a Simulator

# Then run
npm run ios
```

### Android emulator not starting
1. Open Android Studio
2. Tools → AVD Manager
3. Click ▶️ next to your device
4. Run `npm run android` again

### Web version blank screen
Check browser console for errors. Try:
```bash
npm start -- --clear
npm run web
```

## 📚 Next Steps

- Read [README.md](./README.md) for complete documentation
- Check [BUILD.md](./BUILD.md) for production builds
- See [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details

## 🆘 Still Having Issues?

1. Check Node.js version: `node --version` (should be 14+)
2. Run validation script: `./test-app.sh`
3. Check [Expo docs](https://docs.expo.dev/)
4. Open a GitHub issue with error details

## ⚡ Pro Tips

- Use `Shift + m` in Metro to show menu
- Press `r` to reload app
- Press `d` to open developer menu
- Use React DevTools for debugging
- Enable Fast Refresh for instant updates

---

Happy coding! 🎉
