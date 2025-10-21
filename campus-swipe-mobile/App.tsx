import React from 'react';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, TouchableOpacity, Text, View, Image, TextInput, Platform, Animated, Easing } from 'react-native';
import { IconContext, FireSimpleIcon, MagnifyingGlassIcon, UsersThreeIcon, UserCircleIcon, SunIcon, MoonIcon } from 'phosphor-react-native';
import { StatusBar } from 'expo-status-bar';
import { AppStoreProvider, useAppStore } from './src/store/AppStore';

import { SwipeScreen } from './src/screens/SwipeScreen';
import { SearchScreen } from './src/screens/SearchScreen';
import { FriendsScreen } from './src/screens/FriendsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { RootStackParamList } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();

// Global font: Use San Francisco on iOS (system font), sans-serif fallback on Android
// Note: Apple SF is the default on iOS; Android uses Roboto unless a custom font is bundled.
// This sets a default font family for all Text and TextInput components app-wide.
// @ts-ignore
if (!(Text as any).defaultProps) (Text as any).defaultProps = {};
// @ts-ignore
(Text as any).defaultProps.style = [
  // keep any existing defaults
  // @ts-ignore
  (Text as any).defaultProps.style,
  { fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }) },
];
// @ts-ignore
if (!(TextInput as any).defaultProps) (TextInput as any).defaultProps = {};
// @ts-ignore
(TextInput as any).defaultProps.style = [
  // @ts-ignore
  (TextInput as any).defaultProps.style,
  { fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }) },
];

function HomeScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { theme, toggleTheme, likes } = useAppStore();
  const isFocused = useIsFocused();
  const logoScale = React.useRef(new Animated.Value(1)).current;
  const BASE_LOGO_SIZE = 240;
  const [line1Width, setLine1Width] = React.useState(0);
  const [line2Width, setLine2Width] = React.useState(0);
  const [boundaryWidth, setBoundaryWidth] = React.useState(0);
  const line1aWords = React.useMemo(() => ['Endecke', 'Events.'], []);
  const line1bWords = React.useMemo(() => ['Swipe.'], []);
  const line2Words = React.useMemo(() => ['Vernetzt', 'dich.'], []);
  const l1a = React.useRef(line1aWords.map(() => new Animated.Value(0))).current;
  const l1b = React.useRef(line1bWords.map(() => new Animated.Value(0))).current;
  const l2 = React.useRef(line2Words.map(() => new Animated.Value(0))).current;
  // Prefer explicit boundary width when available, else fall back to measured lines
  const textMaxWidth = boundaryWidth > 0 ? boundaryWidth : Math.max(line1Width, line2Width);
  const desiredScale = textMaxWidth > 0 ? (textMaxWidth / BASE_LOGO_SIZE) : 1;
  const logoReady = textMaxWidth > 0;
  const targetScale = Math.min(Math.max(desiredScale, 1), 3.0); // allow even larger growth to match text width

  React.useEffect(() => {
    // Pulse around the targetScale when > 1, otherwise around 1.0
    const maxScale = targetScale > 1 ? targetScale : 1;
    const minScale = targetScale > 1 ? Math.max(1, targetScale - 0.03) : 0.97;
    // Jump immediately to the maxScale so width updates right away
    logoScale.setValue(maxScale);
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(logoScale, {
          toValue: minScale,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: maxScale,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [logoScale, targetScale]);

  // Staggered appearance for the two tagline lines
  React.useEffect(() => {
    if (!logoReady || !isFocused) return;
    // reset
    l1a.forEach(v => v.setValue(0));
    l1b.forEach(v => v.setValue(0));
    l2.forEach(v => v.setValue(0));
    const all = [...l1a, ...l1b, ...l2];
    const seq: Animated.CompositeAnimation[] = [];
    // Group 1: "Endecke Events" together
    if (l1a.length) {
      seq.push(
        Animated.parallel(
          l1a.map((v) =>
            Animated.timing(v, {
              toValue: 1,
              duration: 1200,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            })
          )
        )
      );
    }
  // 80ms pause between sentences (after "Endecke Events." before "Swipe.")
  if (l1b.length > 0) seq.push(Animated.delay(80));
    // Group 2: "Swipe." (single word)
    if (l1b.length) {
      seq.push(
        Animated.parallel(
          l1b.map((v) =>
            Animated.timing(v, {
              toValue: 1,
              duration: 1200,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            })
          )
        )
      );
    }
  // 80ms pause between sentences (after "Swipe." before second line)
  if (l2.length > 0) seq.push(Animated.delay(80));
    // Group 3: "Vernetzt dich" together
    if (l2.length) {
      seq.push(
        Animated.parallel(
          l2.map((v) =>
            Animated.timing(v, {
              toValue: 1,
              duration: 1200,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            })
          )
        )
      );
    }
    const show = Animated.sequence(seq);
    show.start();
    return () => {
      all.forEach(v => v.stopAnimation());
    };
  }, [logoReady, isFocused, l1a, l1b, l2]);

  const colors = theme === 'dark'
    ? {
        bg: '#0b0f1a',
        headerBg: '#0f172a',
        headerBorder: '#1f2937',
        brand: '#e5e7eb',
        text: '#e5e7eb',
        subText: '#94a3b8',
        cardBg: '#111827',
        cardBorder: '#334155',
      }
    : {
        bg: '#f8fafc',
        headerBg: '#ffffff',
        headerBorder: '#e5e7eb',
        brand: '#0f172a',
        text: '#0f172a',
        subText: '#475569',
        cardBg: '#ffffff',
        cardBorder: '#e5e7eb',
      };

  return (
    <SafeAreaView style={[styles.homeContainer, { backgroundColor: colors.bg, paddingTop: Math.max(12, insets.top), paddingBottom: Math.max(12, insets.bottom) }]}>
      <View style={[styles.homeHeader, { backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder }]}>
        <Text style={[styles.brand, { color: colors.brand }]}>Plan-it</Text>
        <TouchableOpacity onPress={toggleTheme} style={{ paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, backgroundColor: theme === 'dark' ? '#111827' : '#f8fafc', borderWidth: 1, borderColor: colors.cardBorder }}>
          {theme === 'dark' ? (
            <SunIcon size={16} color={colors.text} />
          ) : (
            <MoonIcon size={16} color={colors.text} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.homeContent}>
        <View style={{ height: BASE_LOGO_SIZE * (targetScale > 1 ? targetScale : 1), alignItems: 'center', justifyContent: 'center' }}>
          <Animated.Image
            source={require('./assets/logo_Plan_it.png')}
            style={[
              styles.logoImage,
              {
                width: BASE_LOGO_SIZE,
                height: BASE_LOGO_SIZE,
                transform: [{ scale: logoScale }],
                opacity: logoReady ? 1 : 0,
              },
            ]}
            resizeMode="contain"
          />
        </View>
        {/* Invisible measurement for boundary: "Endecke Events. Swipe." with same style as tagline */}
        <Text
          onLayout={(e) => setBoundaryWidth(e.nativeEvent.layout.width)}
          style={[styles.tagline, { fontWeight: '800', position: 'absolute', opacity: 0, left: 0 }]}
        >
          Endecke Events. Swipe.
        </Text>
        <View style={{ marginTop: -14 }}>
          <View
            onLayout={(e) => setLine1Width(e.nativeEvent.layout.width)}
            style={{ flexDirection: 'row', alignSelf: 'center' }}
          >
            {line1aWords.map((w, i) => (
              <Animated.Text
                key={`l1a-${i}`}
                style={[styles.tagline, { color: colors.subText, fontWeight: '800', opacity: l1a[i] }]}
              >
                {w + (i < line1aWords.length - 1 ? ' ' : ' ')}
              </Animated.Text>
            ))}
            {line1bWords.map((w, i) => (
              <Animated.Text
                key={`l1b-${i}`}
                style={[styles.tagline, { color: colors.subText, fontWeight: '800', opacity: l1b[i] }]}
              >
                {w}
              </Animated.Text>
            ))}
          </View>
          <View
            onLayout={(e) => setLine2Width(e.nativeEvent.layout.width)}
            style={{ flexDirection: 'row', alignSelf: 'center' }}
          >
            {line2Words.map((w, i) => (
              <Animated.Text
                key={`l2-${i}`}
                style={[styles.tagline, { color: colors.subText, fontWeight: '800', opacity: l2[i] }]}
              >
                {w + (i < line2Words.length - 1 ? ' ' : '')}
              </Animated.Text>
            ))}
          </View>
        </View>
      </View>

      {/* Bottom-centered dock */}
      <View
        style={[
          styles.bottomDockWrapper,
          { bottom: Math.max(12, insets.bottom) + 6 },
        ]}
      >
        <View
          style={[
            styles.bottomDock,
            { backgroundColor: colors.headerBg, borderColor: colors.headerBorder },
          ]}
        >
          <TouchableOpacity style={styles.dockButton} onPress={() => navigation.navigate('Swipe')}>
            <FireSimpleIcon size={28} color={colors.brand} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.dockButton} onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size={28} color={colors.brand} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.dockButton} onPress={() => navigation.navigate('Friends')}>
            <UsersThreeIcon size={28} color={colors.brand} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.dockButton} onPress={() => navigation.navigate('Profile')}>
            <UserCircleIcon size={28} color={colors.brand} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppStoreProvider>
        <IconContext.Provider value={{ weight: 'bold' }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#0f172a',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Swipe"
              component={SwipeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Friends"
              component={FriendsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          {/* Status bar follows theme */}
          <StatusBar style={(/* @ts-ignore expo types */ undefined) as any} />
        </NavigationContainer>
        </IconContext.Provider>
        </AppStoreProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  homeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  brand: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
  homeContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  logoImage: {
    width: 240,
    height: 240,
    marginBottom: 0,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 6,
  },
  tagline: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 8,
    textAlign: 'center'
  },
  bottomDockWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bottomDock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
    borderWidth: 1,
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  dockButton: {
    padding: 10,
    borderRadius: 16,
  },
});
