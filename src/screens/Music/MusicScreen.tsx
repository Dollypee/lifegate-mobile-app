import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { SAMPLE_MUSIC } from '../../data/sampleData';
import { MusicItem } from '../../types';

const PLATFORM_ICONS: Record<string, { name: string; color: string }> = {
  youtube: { name: 'logo-youtube', color: '#FF0000' },
  spotify: { name: 'musical-notes', color: '#1DB954' },
  soundcloud: { name: 'cloud', color: '#FF5500' },
  other: { name: 'musical-note', color: '#6B7280' },
};

interface Props { navigation: any; }

export const MusicScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(SAMPLE_MUSIC.filter(m => m.isFavorite).map(m => m.id))
  );

  const toggleFav = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const openStream = (item: MusicItem) => {
    Linking.openURL(item.streamUrl).catch(() => {});
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Worship Music" subtitle="Songs that lift your spirit" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Featured Banner */}
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <View style={[styles.banner, { backgroundColor: colors.primary }]}>
            <Ionicons name="musical-notes" size={48} color="rgba(255,255,255,0.3)" style={StyleSheet.absoluteFill} />
            <View style={styles.bannerContent}>
              <Text style={styles.bannerLabel}>NOW PLAYING</Text>
              <Text style={styles.bannerTitle}>Lifegate Worship Collection</Text>
              <Text style={styles.bannerSub}>Stream on your favourite platform</Text>
            </View>
            <View style={styles.waveform}>
              {[4,8,12,7,10,5,9,6,11,8].map((h, i) => (
                <View key={i} style={[styles.bar, { height: h * 3, backgroundColor: 'rgba(255,255,255,0.6)' }]} />
              ))}
            </View>
          </View>
        </View>

        {/* Track List */}
        <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Music Library</Text>
          <View style={{ gap: 10 }}>
            {SAMPLE_MUSIC.map((item, idx) => {
              const platform = PLATFORM_ICONS[item.platform] || PLATFORM_ICONS.other;
              const isFav = favorites.has(item.id);
              return (
                <Card key={item.id} elevated>
                  <View style={styles.trackRow}>
                    <View style={[styles.trackNum, { backgroundColor: colors.primary + '18' }]}>
                      <Text style={[styles.numText, { color: colors.primary }]}>{idx + 1}</Text>
                    </View>
                    <View style={styles.trackInfo}>
                      <Text style={[styles.trackTitle, { color: colors.text }]} numberOfLines={1}>{item.title}</Text>
                      <Text style={[styles.trackArtist, { color: colors.textMuted }]}>{item.artist}</Text>
                      {item.album && (
                        <Text style={[styles.trackAlbum, { color: colors.textMuted }]} numberOfLines={1}>{item.album}</Text>
                      )}
                    </View>
                    <View style={styles.trackActions}>
                      <TouchableOpacity onPress={() => toggleFav(item.id)} style={styles.iconBtn}>
                        <Ionicons
                          name={isFav ? 'heart' : 'heart-outline'}
                          size={20}
                          color={isFav ? '#EF4444' : colors.textMuted}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => openStream(item)}
                        style={[styles.playBtn, { backgroundColor: platform.color }]}
                      >
                        <Ionicons name={platform.name as any} size={14} color="#fff" />
                        <Text style={styles.playText}>Play</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Card>
              );
            })}
          </View>
        </View>

        {/* Platforms Section */}
        <View style={{ paddingHorizontal: 16, paddingTop: 24 }}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Stream On</Text>
          <View style={styles.platforms}>
            {[
              { name: 'YouTube Music', icon: 'logo-youtube', color: '#FF0000', url: 'https://music.youtube.com' },
              { name: 'Spotify', icon: 'musical-notes', color: '#1DB954', url: 'https://spotify.com' },
              { name: 'SoundCloud', icon: 'cloud', color: '#FF5500', url: 'https://soundcloud.com' },
            ].map(p => (
              <TouchableOpacity
                key={p.name}
                style={[styles.platformCard, { backgroundColor: p.color + '18', borderColor: p.color + '33' }]}
                onPress={() => Linking.openURL(p.url)}
              >
                <Ionicons name={p.icon as any} size={28} color={p.color} />
                <Text style={[styles.platformName, { color: colors.text }]}>{p.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: { borderRadius: 20, padding: 20, overflow: 'hidden', minHeight: 140, justifyContent: 'space-between' },
  bannerContent: {},
  bannerLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 4 },
  bannerTitle: { color: '#fff', fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  bannerSub: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 },
  waveform: { flexDirection: 'row', alignItems: 'flex-end', gap: 3, marginTop: 12 },
  bar: { width: 4, borderRadius: 2 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12, letterSpacing: -0.3 },
  trackRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  trackNum: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  numText: { fontWeight: '800', fontSize: 14 },
  trackInfo: { flex: 1, gap: 2 },
  trackTitle: { fontSize: 14, fontWeight: '700' },
  trackArtist: { fontSize: 12 },
  trackAlbum: { fontSize: 11 },
  trackActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconBtn: { padding: 4 },
  playBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20 },
  playText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  platforms: { flexDirection: 'row', gap: 10 },
  platformCard: { flex: 1, alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, gap: 8 },
  platformName: { fontSize: 11, fontWeight: '600', textAlign: 'center' },
});
