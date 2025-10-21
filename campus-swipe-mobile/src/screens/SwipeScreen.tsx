import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { XIcon as IconX, HeartIcon as IconHeart, QuestionIcon as IconQuestion } from 'phosphor-react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { SwipeCardNew as SwipeCard } from '../components/SwipeCardNew';
import { EventCard } from '../components/EventCard';
import { MOCK_EVENTS } from '../data/mockData';
import { useAppStore } from '../store/AppStore';

export const SwipeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { likes, passed, like, pass, theme } = useAppStore();
  const [queue, setQueue] = useState<number[]>([]);

  const colors = theme === 'dark'
    ? {
        bg: '#0b0f1a',
        headerBg: '#0f172a',
        headerBorder: '#1f2937',
        title: '#f8fafc',
        subText: '#cbd5e1',
        chipBg: '#111827',
        likeBtnBg: '#0ea5e9',
        likeText: '#ffffff',
        nopeBtnBg: '#111827',
        nopeText: '#e2e8f0',
      }
    : {
        bg: '#f8fafc',
        headerBg: '#ffffff',
        headerBorder: '#e5e7eb',
        title: '#1a1a1a',
        subText: '#666',
        chipBg: '#f0f0f0',
        likeBtnBg: '#0f172a',
        likeText: '#ffffff',
        nopeBtnBg: '#ffffff',
        nopeText: '#0f172a',
      };

  const baseDeck = useMemo(
    () => MOCK_EVENTS.filter((e) => !likes.includes(e.id) && !passed.includes(e.id)),
    [likes, passed]
  );

  // initialize/realign queue when source deck changes
  useEffect(() => {
    const ids = baseDeck.map((e) => e.id);
    // keep existing order for remaining ids, append any new ids
    setQueue((prev) => {
      const filtered = prev.filter((id) => ids.includes(id));
      const missing = ids.filter((id) => !filtered.includes(id));
      return [...filtered, ...missing];
    });
  }, [baseDeck]);

  const topId = queue[0];
  const nextId = queue[1];
  const topCard = topId ? MOCK_EVENTS.find((e) => e.id === topId) : undefined;
  const nextCard = nextId ? MOCK_EVENTS.find((e) => e.id === nextId) : undefined;

  // no replay logic; up-swipe simply rotates current card to end of queue

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!topCard) return;
    
    if (direction === 'right') {
      like(topCard.id);
      setQueue((q) => q.slice(1));
    } else {
      // Left swipe removes
      pass(topCard.id);
      setQueue((q) => q.slice(1));
    }
  };

  const handleLike = () => {
    if (topCard) {
      like(topCard.id);
      setQueue((q) => q.slice(1));
    }
  };

  const handlePass = () => {
    if (topCard) {
      pass(topCard.id);
      setQueue((q) => q.slice(1));
    }
  };

  const handleMaybe = () => {
    // Behaves like up-swipe: send current to the back of the queue
    setQueue((q) => (q.length > 0 ? [...q.slice(1), q[0]] : q));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }] }>
      <View style={[styles.header, { paddingTop: Math.max(12, insets.top), backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder }]}>
        <Text style={[styles.title, { color: colors.title }]}>Plan-it</Text>
        <Text style={[styles.likesCount, { color: colors.subText, backgroundColor: colors.chipBg }]}>{likes.length} Likes</Text>
      </View>

      <View style={styles.cardContainer}>
        {nextCard && (
          <View key={`next-${nextCard.id}`} style={[styles.nextCard, { bottom: 110 + insets.bottom }]}>
            <View style={{ flex: 1, transform: [{ scale: 0.96 }], opacity: 0.9 }}>
              <EventCard event={nextCard} />
            </View>
          </View>
        )}
        {topCard ? (
          <View key={`top-${topCard.id}`} style={[styles.topCard, { bottom: 100 + insets.bottom }]}>
            <SwipeCard
              event={topCard}
              onSwipe={handleSwipe}
              onSwipeUp={() => {
                // Relocate to the end of the queue without removing
                setQueue((q) => (q.length > 0 ? [...q.slice(1), q[0]] : q));
              }}
            />
          </View>
        ) : (
          <View style={[styles.emptyState, { backgroundColor: colors.headerBg }]}>
            <Text style={[styles.emptyTitle, { color: colors.title }]}>Keine Events mehr</Text>
            <Text style={[styles.emptyText, { color: colors.subText }]}>Ändere die Filter im Menü.</Text>
          </View>
        )}
      </View>

      <View style={[styles.actions, { paddingBottom: Math.max(16, insets.bottom + 8) }] }>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.nopeBtnBg, borderWidth: 2, borderColor: theme === 'dark' ? '#334155' : '#e5e7eb' }]}
          onPress={handlePass}
          disabled={!topCard}
        >
          <View style={styles.buttonRow}>
            <IconX size={20} color={colors.nopeText} />
            <Text style={[styles.buttonText, { color: colors.nopeText }]}>Nein</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.nopeBtnBg, borderWidth: 2, borderColor: theme === 'dark' ? '#334155' : '#e5e7eb' }]}
          onPress={handleMaybe}
          disabled={!topCard}
        >
          <View style={styles.buttonRow}>
            <IconQuestion size={20} color={colors.nopeText} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.likeBtnBg }]}
          onPress={handleLike}
          disabled={!topCard}
        >
          <View style={styles.buttonRow}>
            <IconHeart size={20} color={colors.likeText} />
            <Text style={[styles.buttonText, { color: colors.likeText }]}>Ja</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    paddingHorizontal: 24,
    paddingVertical: 16,
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
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  likeText: {
    color: '#fff',
  },
  nopeText: {
    color: '#0f172a',
  },
});
