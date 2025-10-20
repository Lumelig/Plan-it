import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SwipeCard } from '../components/SwipeCard';
import { EventCard } from '../components/EventCard';
import { MOCK_EVENTS } from '../data/mockData';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const SwipeScreen: React.FC = () => {
  const [liked, setLiked] = useState<number[]>([]);
  const [passed, setPassed] = useState<number[]>([]);

  const deck = useMemo(
    () => MOCK_EVENTS.filter((e) => !liked.includes(e.id) && !passed.includes(e.id)),
    [liked, passed]
  );

  const topCard = deck[0];
  const nextCard = deck[1];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!topCard) return;
    
    if (direction === 'right') {
      setLiked((prev) => [...prev, topCard.id]);
    } else {
      setPassed((prev) => [...prev, topCard.id]);
    }
  };

  const handleLike = () => {
    if (topCard) {
      setLiked((prev) => [...prev, topCard.id]);
    }
  };

  const handlePass = () => {
    if (topCard) {
      setPassed((prev) => [...prev, topCard.id]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CampusSwipe</Text>
        <Text style={styles.likesCount}>{liked.length} Likes</Text>
      </View>

      <View style={styles.cardContainer}>
        {nextCard && (
          <View style={styles.nextCard}>
            <EventCard event={nextCard} />
          </View>
        )}
        {topCard ? (
          <View style={styles.topCard}>
            <SwipeCard event={topCard} onSwipe={handleSwipe} />
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Keine Events mehr</Text>
            <Text style={styles.emptyText}>Ändere die Filter im Menü.</Text>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.nopeButton]}
          onPress={handlePass}
          disabled={!topCard}
        >
          <Text style={styles.buttonText}>✕ Nein</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.likeButton]}
          onPress={handleLike}
          disabled={!topCard}
        >
          <Text style={styles.buttonText}>❤ Ja</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  likesCount: {
    fontSize: 16,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  cardContainer: {
    flex: 1,
    padding: 20,
    position: 'relative',
  },
  nextCard: {
    position: 'absolute',
    top: 30,
    left: 20,
    right: 20,
    bottom: 100,
    opacity: 0.5,
    transform: [{ scale: 0.95 }],
  },
  topCard: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 90,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    gap: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nopeButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  likeButton: {
    backgroundColor: '#0f172a',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
