import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MOCK_FRIENDS, MOCK_EVENTS } from '../data/mockData';
import { toggleId } from '../utils/helpers';
import { useAppStore } from '../store/AppStore';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeartIcon as Heart, CheckIcon as Check, PlusIcon as Plus } from 'phosphor-react-native';

export const FriendsScreen: React.FC = () => {
  const { joined, join, leave, theme } = useAppStore();
  const insets = useSafeAreaInsets();

  const colors = theme === 'dark'
    ? {
        bg: '#0b0f1a',
        headerBg: '#0f172a',
        headerBorder: '#1f2937',
        title: '#f8fafc',
        subText: '#cbd5e1',
        cardBg: '#111827',
        cardBorder: '#334155',
        chipBg: '#0b1220',
      }
    : {
        bg: '#f8fafc',
        headerBg: '#ffffff',
        headerBorder: '#e5e7eb',
        title: '#1a1a1a',
        subText: '#666',
        cardBg: '#ffffff',
        cardBorder: '#e5e7eb',
        chipBg: '#f0f0f0',
      };

  const toggleJoin = (id: number) => {
    if (joined.includes(id)) {
      leave(id);
    } else {
      join(id);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.header, { paddingTop: Math.max(12, insets.top), backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder, justifyContent: 'flex-start' }]}> 
        <Text style={[styles.title, { color: colors.title }]}>Freunde</Text> 
      </View>

      <ScrollView style={styles.friendsList} contentContainerStyle={{ paddingBottom: Math.max(16, insets.bottom + 8) }}>
        {MOCK_FRIENDS.map((friend) => (
          <View key={friend.id} style={[styles.friendCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <View style={styles.friendHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{friend.avatar}</Text>
              </View>
              <Text style={[styles.friendName, { color: colors.title }]}>{friend.name}</Text>
            </View>

            <Text style={[styles.likesLabel, { color: colors.subText }]}>Likes</Text>
            <View style={styles.likesList}>
              {friend.likes.map((eventId) => {
                const event = MOCK_EVENTS.find((e) => e.id === eventId);
                if (!event) return null;

                const isJoined = joined.includes(eventId);

                return (
                  <View key={eventId} style={styles.likeItem}>
                    <View style={styles.likeInfo}>
                      <Heart size={14} color="#ef4444" weight="fill" style={{ marginRight: 8 }} />
                      <Text style={[styles.likeTitle, { color: colors.title }]}>{event.title}</Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.joinButton, { backgroundColor: colors.bg, borderColor: colors.cardBorder }, isJoined && { backgroundColor: theme === 'dark' ? '#0b2e4a' : '#dbeafe', borderColor: theme === 'dark' ? '#38bdf8' : '#3b82f6' }]}
                      onPress={() => toggleJoin(eventId)}
                    >
                      {isJoined ? (
                        <Check size={18} color={theme === 'dark' ? '#38bdf8' : '#3b82f6'} />
                      ) : (
                        <Plus size={18} color={theme === 'dark' ? '#9ca3af' : '#111827'} />
                      )}
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  likesBadge: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  friendsList: {
    flex: 1,
    padding: 16,
  },
  friendCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  friendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
  },
  friendName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  likesLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  likesList: {
    gap: 8,
  },
  likeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  likeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  likeIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  likeTitle: {
    fontSize: 14,
    color: '#1a1a1a',
    flex: 1,
  },
  joinButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  joinButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
});
