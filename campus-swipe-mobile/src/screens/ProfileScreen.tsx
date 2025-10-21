import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, TextInput, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppStore } from '../store/AppStore';
// Removed theme toggle icons from header

export const ProfileScreen: React.FC = () => {
  const { likes, joined, theme, resetLikes, resetJoined } = useAppStore();
  const insets = useSafeAreaInsets();
  const [createType, setCreateType] = React.useState<'event' | 'club'>('event');
  const [name, setName] = React.useState('');
  const [date, setDate] = React.useState('');
  const [location, setLocation] = React.useState('');
  // Planung: Beschreibung (200) + Foto (Mock)
  const [desc, setDesc] = React.useState('');
  const DESC_LIMIT = 200;
  const [hasCreatePhoto, setHasCreatePhoto] = React.useState(false);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const categories = React.useMemo(() => ['Tech', 'Networking', 'Hackathon', 'Green', 'Kultur', 'Film', 'Sport'], []);

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
        dangerBorder: '#ef4444',
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
        dangerBorder: '#ef4444',
      };

  const confirmResetLikes = () => {
    Alert.alert('Likes zurücksetzen', 'Möchtest du wirklich alle Likes löschen?', [
      { text: 'Abbrechen', style: 'cancel' },
      { text: 'Zurücksetzen', style: 'destructive', onPress: () => resetLikes() },
    ]);
  };

  const confirmResetJoined = () => {
    Alert.alert('Zusagen zurücksetzen', 'Möchtest du wirklich alle Zusagen löschen?', [
      { text: 'Abbrechen', style: 'cancel' },
      { text: 'Zurücksetzen', style: 'destructive', onPress: () => resetJoined() },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }] }>
      <View style={[styles.header, { paddingTop: Math.max(12, insets.top), backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder }]}>
        <Text style={[styles.title, { color: colors.title }]}>Account</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: Math.max(16, insets.bottom + 8) }}>
        <View style={[styles.section, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          {/* Statistik-Titel entfernt, Werte bleiben sichtbar */}
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.title }]}>{likes.length}</Text>
              <Text style={[styles.statLabel, { color: colors.subText }]}>Likes</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.title }]}>{joined.length}</Text>
              <Text style={[styles.statLabel, { color: colors.subText }]}>Zusagen</Text>
            </View>
          </View>
        </View>

        {/* Planung: Event oder Club */}
        <View style={[styles.section, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          <Text style={[styles.sectionTitle, { color: colors.title }]}>Planung:</Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity
              onPress={() => setCreateType('event')}
              style={[styles.toggleBtn, { borderColor: createType === 'event' ? (theme === 'dark' ? '#38bdf8' : '#3b82f6') : colors.cardBorder, backgroundColor: createType === 'event' ? (theme === 'dark' ? '#0b2e4a' : '#dbeafe') : colors.bg }]}
            >
              <Text style={[styles.toggleText, { color: createType === 'event' ? (theme === 'dark' ? '#38bdf8' : '#3b82f6') : colors.subText }]}>Event</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCreateType('club')}
              style={[styles.toggleBtn, { borderColor: createType === 'club' ? (theme === 'dark' ? '#38bdf8' : '#3b82f6') : colors.cardBorder, backgroundColor: createType === 'club' ? (theme === 'dark' ? '#0b2e4a' : '#dbeafe') : colors.bg }]}
            >
              <Text style={[styles.toggleText, { color: createType === 'club' ? (theme === 'dark' ? '#38bdf8' : '#3b82f6') : colors.subText }]}>Club</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.inputLabel, { color: colors.subText }]}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={createType === 'event' ? 'Event-Name' : 'Club-Name'}
            placeholderTextColor={colors.subText}
            style={[styles.input, { borderColor: colors.cardBorder, backgroundColor: theme === 'dark' ? '#0b1220' : '#f8fafc', color: colors.title }]}
          />

          <Text style={[styles.inputLabel, { color: colors.subText }]}>Datum</Text>
          <TextInput
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD HH:mm"
            placeholderTextColor={colors.subText}
            style={[styles.input, { borderColor: colors.cardBorder, backgroundColor: theme === 'dark' ? '#0b1220' : '#f8fafc', color: colors.title }]}
          />

          <Text style={[styles.inputLabel, { color: colors.subText }]}>Ort</Text>
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Ort/Adresse"
            placeholderTextColor={colors.subText}
            style={[styles.input, { borderColor: colors.cardBorder, backgroundColor: theme === 'dark' ? '#0b1220' : '#f8fafc', color: colors.title }]}
          />

          {/* Beschreibung (200) */}
          <Text style={[styles.inputLabel, { color: colors.subText }]}>Beschreibung (max. 200 Zeichen)</Text>
          <TextInput
            value={desc}
            onChangeText={(t) => setDesc(t.slice(0, DESC_LIMIT))}
            placeholder={createType === 'event' ? 'Event-Beschreibung' : 'Club-Beschreibung'}
            placeholderTextColor={colors.subText}
            multiline
            style={[
              styles.input,
              {
                borderColor: colors.cardBorder,
                backgroundColor: theme === 'dark' ? '#0b1220' : '#f8fafc',
                color: colors.title,
                minHeight: 96,
                textAlignVertical: 'top',
              },
            ]}
            maxLength={DESC_LIMIT}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={{ color: desc.length >= DESC_LIMIT ? (theme === 'dark' ? '#38bdf8' : '#3b82f6') : colors.subText, fontSize: 12 }}>
              {desc.length}/{DESC_LIMIT}
            </Text>
          </View>

          {/* Foto (Mock) */}
          <Text style={[styles.inputLabel, { color: colors.subText, marginTop: 10 }]}>Foto</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 6 }}>
            <View style={{ width: 84, height: 84, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: colors.cardBorder, backgroundColor: theme === 'dark' ? '#111827' : '#f0f0f0' }}>
              {hasCreatePhoto ? (
                <Image
                  source={require('../../assets/icon.png')}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                  onError={() => setHasCreatePhoto(false)}
                />
              ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: colors.subText, fontSize: 12 }}>Kein Foto</Text>
                </View>
              )}
            </View>
            <View style={{ flex: 1, flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity
                onPress={() => setHasCreatePhoto(true)}
                style={{
                  flex: 1,
                  backgroundColor: theme === 'dark' ? '#0ea5e9' : '#0f172a',
                  paddingVertical: 10,
                  borderRadius: 10,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>{hasCreatePhoto ? 'Foto ändern' : 'Foto auswählen'}</Text>
              </TouchableOpacity>
              {hasCreatePhoto && (
                <TouchableOpacity
                  onPress={() => setHasCreatePhoto(false)}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.cardBorder,
                    backgroundColor: colors.cardBg,
                  }}
                >
                  <Text style={{ color: colors.subText, fontWeight: '600' }}>Entfernen</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <Text style={[styles.inputLabel, { color: colors.subText }]}>Kategorien (max. 3)</Text>
          <View style={styles.categoriesRow}>
            {categories.map((cat) => {
              const active = selectedCategories.includes(cat);
              const onToggle = () => {
                if (active) {
                  setSelectedCategories(prev => prev.filter(c => c !== cat));
                } else {
                  setSelectedCategories(prev => {
                    if (prev.length >= 3) {
                      Alert.alert('Limit erreicht', 'Du kannst maximal 3 Kategorien auswählen.');
                      return prev;
                    }
                    return [...prev, cat];
                  });
                }
              };
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={onToggle}
                  style={[styles.categoryChip, { borderColor: active ? (theme === 'dark' ? '#38bdf8' : '#3b82f6') : colors.cardBorder, backgroundColor: active ? (theme === 'dark' ? '#0b2e4a' : '#dbeafe') : (theme === 'dark' ? '#111827' : '#f0f0f0') }]}
                >
                  <Text style={{ color: active ? (theme === 'dark' ? '#38bdf8' : '#3b82f6') : colors.subText, fontWeight: active ? '600' : '400' }}>{cat}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            onPress={() => {
              if (!name.trim() || !date.trim() || !location.trim() || selectedCategories.length === 0 || !desc.trim()) {
                Alert.alert('Fehlende Daten', 'Bitte Name, Datum, Ort, Beschreibung und mindestens eine Kategorie angeben.');
                return;
              }
              Alert.alert('Gespeichert', `${createType === 'event' ? 'Event' : 'Club'} erstellt:\nName: ${name}\nDatum: ${date}\nOrt: ${location}\nBeschreibung: ${desc}\nFoto: ${hasCreatePhoto ? 'Ja' : 'Nein'}\nKategorien: ${selectedCategories.join(', ')}`);
              setName('');
              setDate('');
              setLocation('');
              setDesc('');
              setHasCreatePhoto(false);
              setSelectedCategories([]);
            }}
            style={[styles.createButton, { backgroundColor: theme === 'dark' ? '#0ea5e9' : '#0f172a' }]}
          >
            <Text style={styles.createButtonText}>Erstellen</Text>
          </TouchableOpacity>
        </View>

        {/* Kategorien- und n8n-Benachrichtigungsbereiche entfernt */}

        <View style={[styles.section, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}> 
          <Text style={[styles.sectionTitle, { color: colors.title }]}>Aktionen</Text> 
          <TouchableOpacity style={[styles.button, { backgroundColor: theme === 'dark' ? '#0ea5e9' : '#0f172a' }]} onPress={confirmResetLikes}> 
            <Text style={styles.buttonText}>Likes zurücksetzen</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={[styles.button, styles.dangerButton, { backgroundColor: colors.cardBg, borderColor: colors.dangerBorder }]} onPress={confirmResetJoined}> 
            <Text style={[styles.buttonText, styles.dangerButtonText]}>Zusagen zurücksetzen</Text> 
          </TouchableOpacity> 
        </View>

        <View style={[styles.section, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          <Text style={[styles.sectionTitle, { color: colors.title }]}>Über Plan-it</Text>
          <Text style={[styles.infoText, { color: colors.subText }]}>Version 1.0.0</Text>
          <Text style={[styles.infoText, { color: colors.subText }]}>Eine App für Campus-Events mit Swipe-Interface und Freunde-Integration.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
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
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a' },
  likesBadge: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  themeToggle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  themeToggleText: { fontSize: 12, color: '#0f172a', fontWeight: '600' },
  content: { flex: 1 },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#1a1a1a', marginBottom: 12 },
  inputLabel: { fontSize: 12, marginTop: 8 },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginTop: 6,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  toggleBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  toggleText: { fontSize: 14, fontWeight: '600' },
  categoriesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  categoryChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  createButton: {
    marginTop: 12,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  createButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  statsCard: { flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 32, fontWeight: 'bold', color: '#0f172a' },
  statLabel: { fontSize: 14, color: '#666', marginTop: 4 },
  statDivider: { width: 1, backgroundColor: '#e5e7eb' },
  categories: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryText: { fontSize: 12, color: '#666' },
  infoText: { fontSize: 14, color: '#666', lineHeight: 20 },
  button: { backgroundColor: '#0f172a', paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  buttonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  dangerButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ef4444' },
  dangerButtonText: { color: '#ef4444' },
});
