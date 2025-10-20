import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MOCK_EVENTS, CLUBS } from '../data/mockData';
import { toggleId, eventMatches } from '../utils/helpers';

export const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [liked, setLiked] = useState<number[]>([]);
  const [joined, setJoined] = useState<number[]>([]);

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter((e) => eventMatches(e, query, selectedClubs));
  }, [query, selectedClubs]);

  const toggleClub = (club: string) => {
    setSelectedClubs((prev) => toggleId(prev, club));
  };

  const clearClubs = () => {
    setSelectedClubs([]);
  };

  const toggleLike = (id: number) => {
    setLiked((prev) => toggleId(prev, id));
  };

  const toggleJoin = (id: number) => {
    setJoined((prev) => {
      const newJoined = toggleId(prev, id);
      // Auto-like when joining
      if (newJoined.includes(id) && !liked.includes(id)) {
        setLiked((prevLiked) => [...prevLiked, id]);
      }
      return newJoined;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Suche</Text>
      </View>

      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Suche nach Titel, Ort oder Tag…"
          value={query}
          onChangeText={setQuery}
          placeholderTextColor="#999"
        />

        <View style={styles.clubsHeader}>
          <Text style={styles.clubsTitle}>Clubs</Text>
          {selectedClubs.length > 0 && (
            <TouchableOpacity onPress={clearClubs}>
              <Text style={styles.clearButton}>zurücksetzen</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.clubs}>
          {CLUBS.map((club) => {
            const isSelected = selectedClubs.includes(club);
            return (
              <TouchableOpacity
                key={club}
                style={[styles.clubTag, isSelected && styles.clubTagActive]}
                onPress={() => toggleClub(club)}
              >
                <Text style={[styles.clubTagText, isSelected && styles.clubTagTextActive]}>
                  {club}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <ScrollView style={styles.eventsList}>
        {filteredEvents.map((event) => (
          <View key={event.id} style={styles.eventItem}>
            <Image source={{ uri: event.img }} style={styles.eventImage} />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDetails}>📅 {event.date}</Text>
              <Text style={styles.eventDetails}>📍 {event.location}</Text>
              <View style={styles.eventTags}>
                {event.tags.map((tag, index) => (
                  <View key={index} style={styles.eventTag}>
                    <Text style={styles.eventTagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.eventActions}>
              <TouchableOpacity
                style={[styles.actionButton, joined.includes(event.id) && styles.actionButtonActive]}
                onPress={() => toggleJoin(event.id)}
              >
                <Text style={styles.actionButtonText}>
                  {joined.includes(event.id) ? '✓' : 'Join'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, liked.includes(event.id) && styles.actionButtonLiked]}
                onPress={() => toggleLike(event.id)}
              >
                <Text style={styles.actionButtonText}>
                  {liked.includes(event.id) ? '❤' : '♡'}
                </Text>
              </TouchableOpacity>
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
  searchSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchInput: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  clubsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clubsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  clearButton: {
    fontSize: 14,
    color: '#3b82f6',
  },
  clubs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  clubTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  clubTagActive: {
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
  },
  clubTagText: {
    fontSize: 12,
    color: '#666',
  },
  clubTagTextActive: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  eventsList: {
    flex: 1,
  },
  eventItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  eventInfo: {
    flex: 1,
    marginLeft: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  eventDetails: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  eventTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 4,
  },
  eventTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  eventTagText: {
    fontSize: 10,
    color: '#666',
  },
  eventActions: {
    justifyContent: 'center',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonActive: {
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
  },
  actionButtonLiked: {
    backgroundColor: '#fee2e2',
    borderColor: '#ef4444',
  },
  actionButtonText: {
    fontSize: 18,
  },
});
