import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { Header } from '../../components/Header';

const COMING_SOON_FEATURES = [
  { icon: 'mic', label: 'Sermon Audio', sub: 'Listen to full sermon recordings' },
  { icon: 'headset', label: 'Devotionals', sub: 'Daily audio devotionals' },
  { icon: 'people', label: 'Interviews', sub: 'Conversations with ministry leaders' },
  { icon: 'book', label: 'Bible Studies', sub: 'In-depth Bible teaching series' },
];

interface Props { navigation: any; }

export const LifePodcastsScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="LifePodcasts" subtitle="Audio Teaching & Devotionals" />

      <View style={styles.container}>
        {/* Hero illustration */}
        <LinearGradient
          colors={['#F59E0B22', '#F59E0B08']}
          style={styles.heroCircle}
        >
          <View style={[styles.innerCircle, { backgroundColor: '#F59E0B18' }]}>
            <Ionicons name="mic" size={56} color="#F59E0B" />
          </View>
        </LinearGradient>

        {/* Coming soon text */}
        <View style={[styles.badge, { backgroundColor: '#F59E0B18', borderColor: '#F59E0B40' }]}>
          <View style={[styles.badgeDot, { backgroundColor: '#F59E0B' }]} />
          <Text style={[styles.badgeText, { color: '#F59E0B' }]}>Coming Soon</Text>
        </View>

        <Text style={[styles.title, { color: colors.text }]}>LifePodcasts</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          We're working on bringing you anointed audio content you can listen to anywhere, anytime.
        </Text>

        {/* Feature previews */}
        <View style={styles.featureList}>
          {COMING_SOON_FEATURES.map((f, i) => (
            <View
              key={i}
              style={[styles.featureRow, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <View style={[styles.featureIcon, { backgroundColor: '#F59E0B18' }]}>
                <Ionicons name={f.icon as any} size={18} color="#F59E0B" />
              </View>
              <View>
                <Text style={[styles.featureLabel, { color: colors.text }]}>{f.label}</Text>
                <Text style={[styles.featureSub, { color: colors.textMuted }]}>{f.sub}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Notify button */}
        <TouchableOpacity
          style={[styles.notifyBtn, { backgroundColor: '#F59E0B' }]}
          onPress={() => Linking.openURL('mailto:info@lifegatecentre.org?subject=LifePodcasts Notification')}
        >
          <Ionicons name="notifications-outline" size={18} color="#fff" />
          <Text style={styles.notifyBtnText}>Notify Me When Live</Text>
        </TouchableOpacity>

        {/* In the meantime — listen via sermons */}
        <TouchableOpacity
          style={[styles.sermonsLink, { borderColor: colors.border }]}
          onPress={() => navigation.navigate('SermonsTab')}
        >
          <Text style={[styles.sermonsLinkText, { color: colors.textSecondary }]}>
            In the meantime, browse our Sermons →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 32, gap: 16,
  },
  heroCircle: {
    width: 160, height: 160, borderRadius: 80,
    justifyContent: 'center', alignItems: 'center',
  },
  innerCircle: {
    width: 110, height: 110, borderRadius: 55,
    justifyContent: 'center', alignItems: 'center',
  },
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: 20, borderWidth: 1,
  },
  badgeDot: { width: 6, height: 6, borderRadius: 3 },
  badgeText: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  title: { fontSize: 26, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
  featureList: { width: '100%', gap: 8, marginTop: 4 },
  featureRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderRadius: 14, borderWidth: 1, padding: 14,
  },
  featureIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  featureLabel: { fontSize: 14, fontWeight: '600' },
  featureSub: { fontSize: 12, marginTop: 2 },
  notifyBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 24, paddingVertical: 14, borderRadius: 16,
    width: '100%', justifyContent: 'center', marginTop: 4,
  },
  notifyBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  sermonsLink: {
    borderTopWidth: 1, paddingTop: 16, width: '100%', alignItems: 'center',
  },
  sermonsLinkText: { fontSize: 13, fontWeight: '500' },
});