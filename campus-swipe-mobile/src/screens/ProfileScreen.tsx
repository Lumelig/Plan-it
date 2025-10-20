import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export const ProfileScreen: React.FC = () => {
  const [liked, setLiked] = useState<number[]>([1, 3]);
  const [joined, setJoined] = useState<number[]>([1]);

  const exportData = () => {
    const data = {
      likes: liked,
      joined: joined,
      timestamp: new Date().toISOString(),
    };
    
    Alert.alert(
      'Export',
      `Data exported:\n${JSON.stringify(data, null, 2)}`,
      [{ text: 'OK' }]
    );
  };

  const clearData = () => {
    Alert.alert(
      'Daten löschen',
      'Möchtest du alle deine Likes und Zusagen zurücksetzen?',
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Löschen',
          style: 'destructive',
          onPress: () => {
            setLiked([]);
            setJoined([]);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profil & Einstellungen</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistiken</Text>
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{liked.length}</Text>
              <Text style={styles.statLabel}>Likes</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{joined.length}</Text>
              <Text style={styles.statLabel}>Zusagen</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kategorien</Text>
          <View style={styles.categories}>
            {['Tech', 'Networking', 'Hackathon', 'Green', 'Kultur', 'Film', 'Sport'].map((category) => (
              <View key={category} style={styles.categoryTag}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Benachrichtigungen</Text>
          <Text style={styles.infoText}>
            In n8n einen Flow bauen: Wenn Freund:in ein Event liked, sende Push / E‑Mail.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daten</Text>
          <TouchableOpacity style={styles.button} onPress={exportData}>
            <Text style={styles.buttonText}>Daten exportieren (JSON)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={clearData}>
            <Text style={[styles.buttonText, styles.dangerButtonText]}>Alle Daten löschen</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Über CampusSwipe</Text>
          <Text style={styles.infoText}>Version 1.0.0</Text>
          <Text style={styles.infoText}>
            Eine App für Campus-Events mit Swipe-Interface, Freunde-Integration und n8n-Export.
          </Text>
        </View>
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
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#0f172a',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  dangerButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  dangerButtonText: {
    color: '#ef4444',
  },
});
