import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MOCK_FRIENDS, MOCK_EVENTS } from '../data/mockData';
import { toggleId } from '../utils/helpers';

export const FriendsScreen: React.FC = () => {
  const [joined, setJoined] = useState<number[]>([]);

  const toggleJoin = (id: number) => {
    setJoined((prev) => toggleId(prev, id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Freunde</Text>
      </View>

      <ScrollView style={styles.friendsList}>
        {MOCK_FRIENDS.map((friend) => (
          <View key={friend.id} style={styles.friendCard}>
            <View style={styles.friendHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{friend.avatar}</Text>
              </View>
              <Text style={styles.friendName}>{friend.name}</Text>
            </View>

            <Text style={styles.likesLabel}>Likes</Text>
            <View style={styles.likesList}>
              {friend.likes.map((eventId) => {
                const event = MOCK_EVENTS.find((e) => e.id === eventId);
                if (!event) return null;

                const isJoined = joined.includes(eventId);

                return (
                  <View key={eventId} style={styles.likeItem}>
                    <View style={styles.likeInfo}>
                      <Text style={styles.likeIcon}>❤</Text>
                      <Text style={styles.likeTitle}>{event.title}</Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.joinButton, isJoined && styles.joinButtonActive]}
                      onPress={() => toggleJoin(eventId)}
                    >
                      <Text style={[styles.joinButtonText, isJoined && styles.joinButtonTextActive]}>
                        {isJoined ? '✓ Beigetreten' : 'Beitreten'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
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
  joinButtonActive: {
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
  },
  joinButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  joinButtonTextActive: {
    color: '#3b82f6',
  },
});
