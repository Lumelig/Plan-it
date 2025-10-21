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
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppStore } from '../store/AppStore';
import { CalendarIcon as Calendar, MapPinIcon as MapPin, HeartIcon as Heart, CheckIcon as Check, PlusIcon as Plus } from 'phosphor-react-native';

export const SearchScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const { likes, joined, like, unlike, join, leave, theme } = useAppStore();

  const colors = theme === 'dark'
    ? {
        bg: '#0b0f1a',
        headerBg: '#0f172a',
        headerBorder: '#1f2937',
        title: '#f8fafc',
        subText: '#cbd5e1',
        cardBg: '#111827',
        cardBorder: '#334155',
        inputBg: '#0b1220',
        inputText: '#e5e7eb',
        inputPlaceholder: '#94a3b8',
        tagBg: '#111827',
        tagText: '#cbd5e1',
        tagActiveBg: '#0b2e4a',
        tagActiveBorder: '#38bdf8',
        actionBg: '#111827',
        actionBorder: '#334155',
        actionActiveBg: '#0b2e4a',
        actionActiveBorder: '#38bdf8',
      }
    : {
        bg: '#f8fafc',
        headerBg: '#ffffff',
        headerBorder: '#e5e7eb',
        title: '#1a1a1a',
        subText: '#666',
        cardBg: '#ffffff',
        cardBorder: '#e5e7eb',
        inputBg: '#f8fafc',
        inputText: '#0f172a',
        inputPlaceholder: '#999',
        tagBg: '#f8fafc',
        tagText: '#666',
        tagActiveBg: '#dbeafe',
        tagActiveBorder: '#3b82f6',
        actionBg: '#f8fafc',
        actionBorder: '#e5e7eb',
        actionActiveBg: '#dbeafe',
        actionActiveBorder: '#3b82f6',
      };

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
    if (likes.includes(id)) unlike(id); else like(id);
  };

  const toggleJoin = (id: number) => {
    if (joined.includes(id)) leave(id); else join(id);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.header, { paddingTop: Math.max(12, insets.top), backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder }]}>
        <Text style={[styles.title, { color: colors.title }]}>Suche</Text>
        <Text style={[styles.likesBadge, { color: colors.subText, backgroundColor: theme === 'dark' ? '#0b1220' : '#f0f0f0' }]}>{likes.length} Likes</Text>
      </View>

      <View style={[styles.searchSection, { backgroundColor: colors.cardBg, borderBottomColor: colors.headerBorder }]}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: colors.inputBg, color: colors.inputText, borderColor: colors.cardBorder }]}
          placeholder="Suche nach Titel, Ort oder Tag…"
          value={query}
          onChangeText={setQuery}
          placeholderTextColor={colors.inputPlaceholder}
        />

        <View style={styles.clubsHeader}>
          <Text style={[styles.clubsTitle, { color: colors.subText }]}>Clubs</Text>
          {selectedClubs.length > 0 && (
            <TouchableOpacity onPress={clearClubs}>
              <Text style={[styles.clearButton, { color: '#3b82f6' }]}>zurücksetzen</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.clubs}>
          {CLUBS.map((club) => {
            const isSelected = selectedClubs.includes(club);
            return (
              <TouchableOpacity
                key={club}
                style={[styles.clubTag, { backgroundColor: colors.tagBg, borderColor: colors.cardBorder }, isSelected && { backgroundColor: colors.tagActiveBg, borderColor: colors.tagActiveBorder }]}
                onPress={() => toggleClub(club)}
              >
                <Text style={[styles.clubTagText, { color: colors.tagText }, isSelected && { color: '#3b82f6', fontWeight: '600' }]}>
                  {club}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <ScrollView style={styles.eventsList} contentContainerStyle={{ paddingBottom: Math.max(16, insets.bottom + 8) }}>
        {filteredEvents.map((event) => (
          <View key={event.id} style={[styles.eventItem, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Image source={{ uri: event.img }} style={[styles.eventImage, { backgroundColor: theme === 'dark' ? '#0b1220' : '#f0f0f0' }]} />
            <View style={styles.eventInfo}>
              <Text style={[styles.eventTitle, { color: colors.title }]}>{event.title}</Text>
              <View style={styles.detailRow}>
                <Calendar size={14} color={colors.subText} />
                <Text style={[styles.eventDetails, { color: colors.subText }]}>{event.date}</Text>
              </View>
              <View style={styles.detailRow}>
                <MapPin size={14} color={colors.subText} />
                <Text style={[styles.eventDetails, { color: colors.subText }]}>{event.location}</Text>
              </View>
              <View style={styles.eventTags}>
                {event.tags.map((tag, index) => (
                  <View key={index} style={[styles.eventTag, { backgroundColor: theme === 'dark' ? '#111827' : '#f0f0f0' }]}>
                    <Text style={[styles.eventTagText, { color: colors.subText }]}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.eventActions}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.actionBg, borderColor: colors.actionBorder }, joined.includes(event.id) && { backgroundColor: colors.actionActiveBg, borderColor: colors.actionActiveBorder }]}
                onPress={() => toggleJoin(event.id)}
              >
                {joined.includes(event.id) ? (
                  <Check size={18} color={theme === 'dark' ? '#38bdf8' : '#3b82f6'} />
                ) : (
                  <Plus size={18} color={theme === 'dark' ? '#9ca3af' : '#111827'} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.actionBg, borderColor: colors.actionBorder }, likes.includes(event.id) && { backgroundColor: theme === 'dark' ? '#3f1d1d' : '#fee2e2', borderColor: theme === 'dark' ? '#ef4444' : '#ef4444' }]}
                onPress={() => toggleLike(event.id)}
              >
                <Heart size={18} color={likes.includes(event.id) ? '#ef4444' : (theme === 'dark' ? '#9ca3af' : '#111827')} weight={likes.includes(event.id) ? 'fill' : 'regular'} />
              </TouchableOpacity>
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
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
