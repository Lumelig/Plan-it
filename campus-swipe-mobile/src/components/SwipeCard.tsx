import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { EventCard } from './EventCard';
import { Event } from '../types';
import { Heart, X, Bookmark } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = 100;

interface SwipeCardProps {
  event: Event;
  onSwipe: (direction: 'left' | 'right') => void;
  onSwipeUp?: () => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({ event, onSwipe, onSwipeUp }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startX = useSharedValue(0);

  useEffect(() => {
    translateX.value = 0;
    translateY.value = 0;
    startX.value = 0;
  }, [event.id]);

  const handleSwipeEnd = useCallback((direction: 'left' | 'right') => {
    onSwipe(direction);
  }, [onSwipe]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate((g) => {
      translateX.value = startX.value + g.translationX;
      translateY.value = g.translationY;
    })
    .onEnd((g) => {
      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        const direction = translateX.value > 0 ? 'right' : 'left';
        translateX.value = withSpring(
          translateX.value > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH,
          { velocity: g.velocityX, damping: 15, stiffness: 120 },
          () => runOnJS(handleSwipeEnd)(direction)
        );
      } else if (translateY.value < -SWIPE_THRESHOLD && onSwipeUp) {
        runOnJS(onSwipeUp)();
        translateX.value = withSpring(0, { damping: 20, stiffness: 160 });
        translateY.value = withSpring(0, { damping: 20, stiffness: 160 });
      } else {
        translateX.value = withSpring(0, { damping: 20, stiffness: 160 });
        translateY.value = withSpring(0, { damping: 20, stiffness: 160 });
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      [-30, 0, 30]
    );
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  const likeOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1]);
    return { opacity };
  });

  const nopeOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [-SWIPE_THRESHOLD, 0], [1, 0]);
    return { opacity };
  });

  const upOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateY.value, [-SWIPE_THRESHOLD, -SWIPE_THRESHOLD / 2, 0], [1, 0.5, 0]);
    return { opacity };
  });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, cardStyle]}>
          <EventCard event={event} />
          <Animated.View style={[styles.overlay, styles.likeOverlay, likeOpacityStyle]}>
            <Heart size={24} color="#16a34a" />
          </Animated.View>
          <Animated.View style={[styles.overlay, styles.nopeOverlay, nopeOpacityStyle]}>
            <X size={24} color="#dc2626" />
          </Animated.View>
          <Animated.View style={[styles.overlay, styles.upOverlay, upOpacityStyle]}>
            <Bookmark size={22} color="#0284c7" />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { flex: 1 },
  overlay: {
    position: 'absolute',
    top: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)'
  },
  likeOverlay: { left: 20, borderColor: '#4ade80', backgroundColor: 'rgba(74, 222, 128, 0.15)' },
  nopeOverlay: { right: 20, borderColor: '#f87171', backgroundColor: 'rgba(248, 113, 113, 0.15)' },
  upOverlay: { alignSelf: 'center', top: 8, borderColor: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.15)' },
});
import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { EventCard } from './EventCard';
import { Event } from '../types';
import { Heart, X, Bookmark } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = 100;

interface SwipeCardProps {
  event: Event;
  onSwipe: (direction: 'left' | 'right') => void;
  onSwipeUp?: () => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({ event, onSwipe, onSwipeUp }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startX = useSharedValue(0);

  // Ensure new card starts centered when event changes
  useEffect(() => {
    translateX.value = 0;
    translateY.value = 0;
    startX.value = 0;
  }, [event.id]);

  const handleSwipeEnd = useCallback((direction: 'left' | 'right') => {
    onSwipe(direction);
  }, [onSwipe]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate((event) => {
      translateX.value = startX.value + event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        const direction = translateX.value > 0 ? 'right' : 'left';
        translateX.value = withSpring(
          translateX.value > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH,
          { velocity: event.velocityX, damping: 15, stiffness: 120 },
          () => {
            runOnJS(handleSwipeEnd)(direction);
          }
        );
      } else if (translateY.value < -SWIPE_THRESHOLD && onSwipeUp) {
        // Swipe up: call without removing the card
        runOnJS(onSwipeUp)();
        import React, { useCallback, useEffect } from 'react';
        import { View, StyleSheet, Dimensions } from 'react-native';
        import { GestureDetector, Gesture } from 'react-native-gesture-handler';
        import Animated, {
          useSharedValue,
          useAnimatedStyle,
          withSpring,
          interpolate,
          runOnJS,
        } from 'react-native-reanimated';
        import { EventCard } from './EventCard';
        import { Event } from '../types';
        import { Heart, X, Bookmark } from 'lucide-react-native';

        const { width: SCREEN_WIDTH } = Dimensions.get('window');
        const SWIPE_THRESHOLD = 100;

        interface SwipeCardProps {
          event: Event;
          onSwipe: (direction: 'left' | 'right') => void;
          onSwipeUp?: () => void;
        }

        export const SwipeCard: React.FC<SwipeCardProps> = ({ event, onSwipe, onSwipeUp }) => {
          const translateX = useSharedValue(0);
          const translateY = useSharedValue(0);
          const startX = useSharedValue(0);

          useEffect(() => {
            translateX.value = 0;
            translateY.value = 0;
            startX.value = 0;
          }, [event.id]);

          const handleSwipeEnd = useCallback((direction: 'left' | 'right') => {
            onSwipe(direction);
          }, [onSwipe]);

          const panGesture = Gesture.Pan()
            .onStart(() => {
              startX.value = translateX.value;
            })
            .onUpdate((g) => {
              translateX.value = startX.value + g.translationX;
              translateY.value = g.translationY;
            })
            .onEnd((g) => {
              if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
                const direction = translateX.value > 0 ? 'right' : 'left';
                translateX.value = withSpring(
                  translateX.value > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH,
                  { velocity: g.velocityX, damping: 15, stiffness: 120 },
                  () => runOnJS(handleSwipeEnd)(direction)
                );
              } else if (translateY.value < -SWIPE_THRESHOLD && onSwipeUp) {
                runOnJS(onSwipeUp)();
                translateX.value = withSpring(0, { damping: 20, stiffness: 160 });
                translateY.value = withSpring(0, { damping: 20, stiffness: 160 });
              } else {
                translateX.value = withSpring(0, { damping: 20, stiffness: 160 });
                translateY.value = withSpring(0, { damping: 20, stiffness: 160 });
              }
            });

          const cardStyle = useAnimatedStyle(() => {
            const rotate = interpolate(
              translateX.value,
              [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
              [-30, 0, 30]
            );
            return {
              transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { rotate: `${rotate}deg` },
              ],
            };
          });

          const likeOpacityStyle = useAnimatedStyle(() => {
            const opacity = interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1]);
            return { opacity };
          });

          const nopeOpacityStyle = useAnimatedStyle(() => {
            const opacity = interpolate(translateX.value, [-SWIPE_THRESHOLD, 0], [1, 0]);
            return { opacity };
          });

          const upOpacityStyle = useAnimatedStyle(() => {
            const opacity = interpolate(translateY.value, [-SWIPE_THRESHOLD, -SWIPE_THRESHOLD / 2, 0], [1, 0.5, 0]);
            return { opacity };
          });

          return (
            <View style={styles.container}>
              <GestureDetector gesture={panGesture}>
                <Animated.View style={[styles.card, cardStyle]}>
                  <EventCard event={event} />
                  <Animated.View style={[styles.overlay, styles.likeOverlay, likeOpacityStyle]}>
                    <Heart size={24} color="#16a34a" />
                  </Animated.View>
                  <Animated.View style={[styles.overlay, styles.nopeOverlay, nopeOpacityStyle]}>
                    <X size={24} color="#dc2626" />
                  </Animated.View>
                  <Animated.View style={[styles.overlay, styles.upOverlay, upOpacityStyle]}>
                    <Bookmark size={22} color="#0284c7" />
                  </Animated.View>
                </Animated.View>
              </GestureDetector>
            </View>
          );
        };

        const styles = StyleSheet.create({
          container: {
            flex: 1,
          },
          card: {
            flex: 1,
          },
          overlay: {
            position: 'absolute',
            top: 20,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 8,
            borderWidth: 3,
            alignItems: 'center',
            justifyContent: 'center',
          },
          likeOverlay: {
            left: 20,
            borderColor: '#4ade80',
            backgroundColor: 'rgba(74, 222, 128, 0.1)',
          },
          nopeOverlay: {
            right: 20,
            borderColor: '#f87171',
            backgroundColor: 'rgba(248, 113, 113, 0.1)',
          },
          upOverlay: {
            alignSelf: 'center',
            top: 8,
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.1)'
          },
        });
