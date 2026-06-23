import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { SAMPLE_EVENTS } from '../../data/sampleData';

const CATEGORIES = ['All', 'Service', 'Prayer', 'Youth', 'Outreach', 'Special'];

interface Props { navigation: any; }

export const EventsScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [cat, setCat] = useState('All');

  const filtered = cat === 'All'
    ? SAMPLE_EVENTS
    : SAMPLE_EVENTS.filter(e => e.category.toLowerCase() === cat.toLowerCase());

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Church Events" subtitle="Stay connected with what's happening" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Category Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingTop: 16 }} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
          {CATEGORIES.map(c => (
            <TouchableOpacity
              key={c}
              onPress={() => setCat(c)}
              style={[styles.chip, {
                backgroundColor: cat === c ? colors.primary : colors.inputBg,
                borderColor: cat === c ? colors.primary : colors.border,
              }]}
            >
              <Text style={[styles.chipText, { color: cat === c ? '#fff' : colors.textSecondary }]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ paddingHorizontal: 16, paddingTop: 16, gap: 14 }}>
          {filtered.map(event => (
            <Card key={event.id} elevated onPress={() => {}}>
              {/* Banner area */}
              <View style={[styles.banner, { backgroundColor: colors.primary + '18' }]}>
                <Ionicons name="calendar" size={36} color={colors.primary} />
              </View>
              <View style={{ padding: 14 }}>
                <Badge label={event.category} type={event.category} />
                <Text style={[styles.title, { color: colors.text }]}>{event.title}</Text>
                <Text style={[styles.desc, { color: colors.textSecondary }]} numberOfLines={2}>{event.description}</Text>

                <View style={styles.detailRow}>
                  <View style={styles.detail}>
                    <Ionicons name="calendar-outline" size={14} color={colors.primary} />
                    <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                      {new Date(event.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </Text>
                  </View>
                  <View style={styles.detail}>
                    <Ionicons name="time-outline" size={14} color={colors.primary} />
                    <Text style={[styles.detailText, { color: colors.textSecondary }]}>{event.time}</Text>
                  </View>
                  <View style={styles.detail}>
                    <Ionicons name="location-outline" size={14} color={colors.primary} />
                    <Text style={[styles.detailText, { color: colors.textSecondary }]} numberOfLines={1}>{event.location}</Text>
                  </View>
                </View>

                <TouchableOpacity style={[styles.rsvpBtn, { backgroundColor: colors.primary }]}>
                  <Text style={styles.rsvpText}>Add to Calendar</Text>
                  <Ionicons name="add-circle-outline" size={18} color="#fff" />
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
  chip: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20, borderWidth: 1 },
  chipText: { fontWeight: '600', fontSize: 13 },
  banner: { height: 120, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 0 },
  title: { fontSize: 18, fontWeight: '800', marginTop: 10, marginBottom: 6, letterSpacing: -0.3 },
  desc: { fontSize: 14, lineHeight: 20, marginBottom: 12 },
  detailRow: { gap: 8, marginBottom: 14 },
  detail: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  detailText: { fontSize: 13, flex: 1 },
  rsvpBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, borderRadius: 10 },
  rsvpText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
