import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, StyleSheet, FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { SAMPLE_SERMONS } from '../../data/sampleData';

const FILTERS = ['All', 'Sermons', 'Devotionals', 'Series'];

interface Props { navigation: any; }

export const SermonsScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = SAMPLE_SERMONS.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.preacher.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Sermons & Messages" subtitle="Watch · Listen · Be Inspired" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Search */}
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <View style={[styles.searchBar, { backgroundColor: colors.inputBg, borderColor: colors.border }]}>
            <Ionicons name="search" size={18} color={colors.textMuted} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search sermons..."
              placeholderTextColor={colors.textMuted}
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons name="close-circle" size={18} color={colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingTop: 12 }} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
          {FILTERS.map(f => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              style={[styles.filterChip, {
                backgroundColor: filter === f ? colors.primary : colors.inputBg,
                borderColor: filter === f ? colors.primary : colors.border,
              }]}
            >
              <Text style={[styles.filterText, { color: filter === f ? '#fff' : colors.textSecondary }]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sermons List */}
        <View style={{ paddingHorizontal: 16, paddingTop: 16, gap: 12 }}>
          {filtered.map(sermon => (
            <Card key={sermon.id} elevated onPress={() => {}}>
              <View style={styles.sermonRow}>
                <View style={[styles.thumb, { backgroundColor: colors.primary + '22' }]}>
                  <Ionicons name="play-circle" size={36} color={colors.primary} />
                  {sermon.isFeatured && (
                    <View style={[styles.featBadge, { backgroundColor: colors.accent }]}>
                      <Text style={styles.featText}>FEATURED</Text>
                    </View>
                  )}
                </View>
                <View style={styles.info}>
                  {sermon.series && <Badge label={sermon.series} type="sermon" small />}
                  <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>{sermon.title}</Text>
                  <Text style={[styles.preacher, { color: colors.primary }]}>{sermon.preacher}</Text>
                  <View style={styles.meta}>
                    <Ionicons name="calendar-outline" size={11} color={colors.textMuted} />
                    <Text style={[styles.metaText, { color: colors.textMuted }]}>
                      {new Date(sermon.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </Text>
                    {sermon.duration && <>
                      <Text style={[styles.metaText, { color: colors.textMuted }]}>  ·  </Text>
                      <Ionicons name="time-outline" size={11} color={colors.textMuted} />
                      <Text style={[styles.metaText, { color: colors.textMuted }]}>{sermon.duration}</Text>
                    </>}
                  </View>
                </View>
              </View>
              <View style={[styles.actions, { borderTopColor: colors.border }]}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="play" size={16} color={colors.primary} />
                  <Text style={[styles.actionText, { color: colors.primary }]}>Watch</Text>
                </TouchableOpacity>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="headset" size={16} color={colors.textSecondary} />
                  <Text style={[styles.actionText, { color: colors.textSecondary }]}>Listen</Text>
                </TouchableOpacity>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="share-social" size={16} color={colors.textSecondary} />
                  <Text style={[styles.actionText, { color: colors.textSecondary }]}>Share</Text>
                </TouchableOpacity>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="bookmark-outline" size={16} color={colors.textSecondary} />
                  <Text style={[styles.actionText, { color: colors.textSecondary }]}>Save</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, paddingHorizontal: 12, height: 44, gap: 8 },
  searchInput: { flex: 1, fontSize: 15 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20, borderWidth: 1 },
  filterText: { fontWeight: '600', fontSize: 13 },
  sermonRow: { flexDirection: 'row', gap: 14, marginBottom: 12 },
  thumb: { width: 90, height: 90, borderRadius: 12, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  featBadge: { position: 'absolute', top: 4, right: -4, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  featText: { fontSize: 8, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
  info: { flex: 1, gap: 4 },
  title: { fontSize: 15, fontWeight: '700', lineHeight: 20 },
  preacher: { fontSize: 12, fontWeight: '600' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metaText: { fontSize: 11 },
  actions: { flexDirection: 'row', borderTopWidth: 1, paddingTop: 10, marginTop: 4 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 },
  actionText: { fontSize: 12, fontWeight: '600' },
  divider: { width: 1, height: 20 },
});
