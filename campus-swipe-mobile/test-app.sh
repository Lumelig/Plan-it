#!/bin/bash

# Test script for CampusSwipe Mobile App
# This script verifies that the app structure is correct and dependencies are installed

echo "🧪 Testing CampusSwipe Mobile App..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from campus-swipe-mobile directory"
    exit 1
fi

# Check Node.js version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node --version)
echo "   Node.js: $NODE_VERSION"

# Check npm version
NPM_VERSION=$(npm --version)
echo "   npm: $NPM_VERSION"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "❌ Error: node_modules not found. Run 'npm install' first"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Check TypeScript compilation
echo "🔍 Checking TypeScript compilation..."
npx tsc --noEmit
if [ $? -eq 0 ]; then
    echo "✅ TypeScript compilation passed"
else
    echo "❌ TypeScript compilation failed"
    exit 1
fi
echo ""

# Check if all required source files exist
echo "📁 Checking source files..."
REQUIRED_FILES=(
    "App.tsx"
    "src/types/index.ts"
    "src/utils/helpers.ts"
    "src/data/mockData.ts"
    "src/components/EventCard.tsx"
    "src/components/SwipeCard.tsx"
    "src/screens/SwipeScreen.tsx"
    "src/screens/SearchScreen.tsx"
    "src/screens/FriendsScreen.tsx"
    "src/screens/ProfileScreen.tsx"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✓ $file"
    else
        echo "   ✗ $file (missing)"
        exit 1
    fi
done
echo ""

# Check app.json configuration
echo "⚙️  Checking app configuration..."
if [ -f "app.json" ]; then
    echo "   ✓ app.json exists"
    
    # Check if app name is configured
    APP_NAME=$(grep -o '"name": "[^"]*"' app.json | head -1 | cut -d'"' -f4)
    echo "   App name: $APP_NAME"
    
    SLUG=$(grep -o '"slug": "[^"]*"' app.json | head -1 | cut -d'"' -f4)
    echo "   Slug: $SLUG"
else
    echo "   ✗ app.json missing"
    exit 1
fi
echo ""

# Check for required dependencies
echo "📦 Checking critical dependencies..."
REQUIRED_DEPS=(
    "expo"
    "react"
    "react-native"
    "@react-navigation/native"
    "@react-navigation/stack"
    "react-native-gesture-handler"
    "react-native-reanimated"
)

for dep in "${REQUIRED_DEPS[@]}"; do
    if grep -q "\"$dep\"" package.json; then
        echo "   ✓ $dep"
    else
        echo "   ✗ $dep (missing)"
        exit 1
    fi
done
echo ""

# Summary
echo "================================================"
echo "✅ All tests passed!"
echo "================================================"
echo ""
echo "📱 Your mobile app is ready to run!"
echo ""
echo "Next steps:"
echo "  1. npm start          # Start development server"
echo "  2. npm run ios        # Run on iOS simulator"
echo "  3. npm run android    # Run on Android emulator"
echo "  4. npm run web        # Run in web browser"
echo ""
echo "For production builds:"
echo "  npm install -g eas-cli"
echo "  eas build --platform android"
echo "  eas build --platform ios"
echo ""
