import React, { useCallback } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = 120;

interface SwipeCardProps {
  event: Event;
  onSwipe: (direction: 'left' | 'right') => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({ event, onSwipe }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startX = useSharedValue(0);

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
          { velocity: event.velocityX },
          () => {
            runOnJS(handleSwipeEnd)(direction);
          }
        );
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
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
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1]
    );
    return { opacity };
  });

  const nopeOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0]
    );
    return { opacity };
  });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, cardStyle]}>
          <EventCard event={event} />
          <Animated.View style={[styles.overlay, styles.likeOverlay, likeOpacityStyle]}>
            <Text style={styles.overlayText}>JA</Text>
          </Animated.View>
          <Animated.View style={[styles.overlay, styles.nopeOverlay, nopeOpacityStyle]}>
            <Text style={styles.overlayText}>NEIN</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 3,
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
  overlayText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});
