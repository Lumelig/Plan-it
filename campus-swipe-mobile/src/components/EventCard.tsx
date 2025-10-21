import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Calendar, MapPin } from 'lucide-react-native';
import { Event } from '../types';
import { useAppStore } from '../store/AppStore';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { theme } = useAppStore();
  const dark = theme === 'dark';
  return (
    <View style={[styles.card, { backgroundColor: dark ? '#0f172a' : '#fff' }]}>
      <Image 
        source={{ uri: event.img }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={[styles.title, { color: dark ? '#e5e7eb' : '#1a1a1a' }]}>{event.title}</Text>
        <View style={styles.tags}>
          {event.tags.map((tag, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: dark ? '#111827' : '#f0f0f0' }]}>
              <Text style={[styles.tagText, { color: dark ? '#cbd5e1' : '#666' }]}>{tag}</Text>
            </View>
          ))}
        </View>
        <View style={styles.infoRow}>
          <Calendar size={16} color={dark ? '#cbd5e1' : '#666'} />
          <Text style={[styles.infoText, { color: dark ? '#cbd5e1' : '#666' }]}>{event.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <MapPin size={16} color={dark ? '#cbd5e1' : '#666'} />
          <Text style={[styles.infoText, { color: dark ? '#cbd5e1' : '#666' }]}>{event.location}</Text>
        </View>
        <Text style={[styles.description, { color: dark ? '#94a3b8' : '#888' }]}>{event.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 6,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  infoRow: {
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
    lineHeight: 20,
  },
});
