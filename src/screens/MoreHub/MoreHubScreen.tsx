import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Image, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

const LOGO = require('../../../assets/icon.png');

interface Props { navigation: any; }

// ─── Feature tiles ────────────────────────────────────────────────────────────
const FEATURES = [
  {
    id: 'news',
    label: 'LifeNews',
    sub: 'Monthly newsletter',
    icon: 'newspaper',
    color: '#203668',
    screen: 'LifeNews',
  },
  {
    id: 'announcements',
    label: 'Announcements',
    sub: 'Weekly church notices',
    icon: 'megaphone',
    color: '#9D1C20',
    screen: 'Announcements',
  },
  {
    id: 'prayer',
    label: 'Prayer Requests',
    sub: 'Submit & pray together',
    icon: 'hand-left',
    color: '#8B5CF6',
    screen: 'PrayerRequests',
  },
  {
    id: 'clips',
    label: 'LifeClip',
    sub: 'Short video clips',
    icon: 'play-circle',
    color: '#EF4444',
    screen: 'LifeClip',
  },
  {
    id: 'singers',
    label: 'LifeSingers',
    sub: 'Choir & worship',
    icon: 'musical-notes',
    color: '#10B981',
    screen: 'LifeSingers',
  },
  {
    id: 'podcasts',
    label: 'LifePodcasts',
    sub: 'Coming soon',
    icon: 'mic',
    color: '#F59E0B',
    screen: 'LifePodcasts',
  },
];

// ─── Quick links at bottom ────────────────────────────────────────────────────
const QUICK_LINKS = [
  { icon: 'heart', color: '#EF4444', label: 'Give Online', url: 'https://www.lifegatecentre.org/giving/' },
  { icon: 'logo-youtube', color: '#FF0000', label: 'YouTube', url: 'https://youtube.com' },
  { icon: 'logo-facebook', color: '#1877F2', label: 'Facebook', url: 'https://facebook.com' },
  { icon: 'globe', color: '#4F7FFF', label: 'Website', url: 'https://lifegatecentre.org' },
];

export const MoreHubScreen: React.FC<Props> = ({ navigation }) => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* ── Hero banner ───────────────────────────────────────────── */}
        <LinearGradient
          colors={[colors.heroGradientStart, colors.heroGradientEnd]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={[styles.hero, { paddingTop: insets.top + 16 }]}
        >
          <View style={styles.heroRow}>
            <Image source={LOGO} style={styles.logo} resizeMode="contain" />
            <View style={{ flex: 1 }}>
              <Text style={styles.heroTitle}>Lifegate Outreach Center</Text>
              <Text style={styles.heroSub}>Short Acre St · Walsall WS2 8HW</Text>
            </View>
            <TouchableOpacity
              style={styles.settingsBtn}
              onPress={() => navigation.navigate('Settings')}
            >
              <Ionicons name="settings-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Service times pill */}
          <View style={styles.serviceRow}>
            <View style={styles.servicePill}>
              <Ionicons name="time-outline" size={13} color="rgba(255,255,255,0.8)" />
              <Text style={styles.serviceText}>Sun 10:00am · Wed 7:30pm</Text>
            </View>
          </View>

          {/* Accent line */}
          <View style={[styles.accentLine, { backgroundColor: colors.accent }]} />
        </LinearGradient>

        {/* ── Feature grid ──────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Explore</Text>
          <View style={styles.grid}>
            {FEATURES.map(f => (
              <TouchableOpacity
                key={f.id}
                style={[styles.tile, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => navigation.navigate(f.screen)}
                activeOpacity={0.75}
              >
                <View style={[styles.tileIcon, { backgroundColor: f.color + '18' }]}>
                  <Ionicons name={f.icon as any} size={26} color={f.color} />
                </View>
                <Text style={[styles.tileLabel, { color: colors.text }]}>{f.label}</Text>
                <Text style={[styles.tileSub, { color: colors.textMuted }]} numberOfLines={1}>
                  {f.sub}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Quick links row ───────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Links</Text>
          <View style={[styles.quickCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {QUICK_LINKS.map((link, i) => (
              <React.Fragment key={link.label}>
                <TouchableOpacity
                  style={styles.quickRow}
                  onPress={() => Linking.openURL(link.url)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.quickIcon, { backgroundColor: link.color + '18' }]}>
                    <Ionicons name={link.icon as any} size={20} color={link.color} />
                  </View>
                  <Text style={[styles.quickLabel, { color: colors.text }]}>{link.label}</Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
                </TouchableOpacity>
                {i < QUICK_LINKS.length - 1 && (
                  <View style={[styles.divider, { backgroundColor: colors.border }]} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* ── Settings ──────────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
          <View style={[styles.quickCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <TouchableOpacity
              style={styles.quickRow}
              onPress={() => navigation.navigate('Settings')}
              activeOpacity={0.7}
            >
              <View style={[styles.quickIcon, { backgroundColor: colors.primary + '18' }]}>
                <Ionicons name="settings-outline" size={20} color={colors.primary} />
              </View>
              <Text style={[styles.quickLabel, { color: colors.text }]}>Settings</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
            </TouchableOpacity>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <TouchableOpacity
              style={styles.quickRow}
              onPress={() => navigation.navigate('Notifications')}
              activeOpacity={0.7}
            >
              <View style={[styles.quickIcon, { backgroundColor: '#F59E0B18' }]}>
                <Ionicons name="notifications-outline" size={20} color="#F59E0B" />
              </View>
              <Text style={[styles.quickLabel, { color: colors.text }]}>Notifications</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── App version footer ────────────────────────────────────── */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textMuted }]}>
            Lifegate Outreach Center · v1.0.0
          </Text>
          <Text style={[styles.footerText, { color: colors.textMuted }]}>
            info@lifegatecentre.org
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  hero: { paddingHorizontal: 20, paddingBottom: 24 },
  heroRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  logo: { width: 48, height: 48, borderRadius: 12 },
  heroTitle: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: -0.3 },
  heroSub: { color: 'rgba(255,255,255,0.65)', fontSize: 12, marginTop: 2 },
  settingsBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center', alignItems: 'center',
  },
  serviceRow: { flexDirection: 'row' },
  servicePill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
  },
  serviceText: { color: 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: '600' },
  accentLine: { height: 2, borderRadius: 1, marginTop: 16 },
  section: { paddingHorizontal: 16, marginTop: 24 },
  sectionTitle: { fontSize: 17, fontWeight: '700', letterSpacing: -0.3, marginBottom: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  tile: {
    width: '47%',
    borderRadius: 16, borderWidth: 1,
    padding: 16, gap: 6,
  },
  tileIcon: {
    width: 48, height: 48, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 4,
  },
  tileLabel: { fontSize: 15, fontWeight: '700' },
  tileSub: { fontSize: 12 },
  quickCard: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  quickRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14, gap: 12,
  },
  quickIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  quickLabel: { flex: 1, fontSize: 15, fontWeight: '500' },
  divider: { height: 1, marginHorizontal: 16 },
  footer: { alignItems: 'center', marginTop: 32, gap: 4 },
  footerText: { fontSize: 12 },
});