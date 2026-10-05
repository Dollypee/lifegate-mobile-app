import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Image, Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { Header } from '../../components/Header';
import { VideoModal } from '../../components/VideoModal';
import { getYouTubeId, getYouTubeThumbnail } from '@/utils/helper';

interface Ministration {
  id: string;
  title: string;
  videoUrl: string;
  occasion: string;
  date: string;
  duration?: string;
}

interface ChoirMember {
  id: string;
  name: string;
  role: string;
  initial: string;
  color: string;
}

const SAMPLE_MINISTRATIONS: Ministration[] = [
  {
    id: 'm1',
    title: 'Praise Medley — Anniversary Service 2025',
    videoUrl: 'https://youtu.be/RYDbaldHWEc?si=2DmoCk4pP1XdxXrY',
    occasion: 'Church Anniversary',
    date: '2025-08-31',
    duration: '12:30',
  },
  {
    id: 'm2',
    title: 'Worship Set — Sunday 26 July 2026',
    videoUrl: 'https://youtu.be/GRMDfe03q4o?si=vwhW6RXWvnuWeYPd',
    occasion: 'Sunday Service',
    date: '2026-07-26',
    duration: '18:45',
  },
  {
    id: 'm3',
    title: 'Special Ministration — Easter Sunday',
    videoUrl: 'https://youtu.be/RYDbaldHWEc?si=2DmoCk4pP1XdxXrY',
    occasion: 'Easter',
    date: '2026-04-05',
    duration: '9:15',
  },
];

const CHOIR_MEMBERS: ChoirMember[] = [
  { id: 'ch1', name: 'Timi Adeniyi', role: 'Music Director', initial: 'TA', color: '#203668' },
  { id: 'ch2', name: 'Olubunmi F.', role: 'Lead Vocalist', initial: 'OF', color: '#9D1C20' },
  { id: 'ch3', name: 'Frederick O.', role: 'Instrumentalist', initial: 'FO', color: '#10B981' },
  { id: 'ch4', name: 'Seun B.', role: 'Vocalist', initial: 'SB', color: '#8B5CF6' },
  { id: 'ch5', name: 'Elohor U.', role: 'Vocalist', initial: 'EU', color: '#F59E0B' },
  { id: 'ch6', name: 'Omolara L.', role: 'Vocalist', initial: 'OL', color: '#EC4899' },
];

interface Props { navigation: any; }

export const LifeSingersScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [activeVideo, setActiveVideo] = React.useState<Ministration | null>(null);

  const handleShare = async (m: Ministration) => {
    try {
      await Share.share({
        message: `${m.title}\n\nWatch: ${m.videoUrl}\n\nLifegate Outreach Center`,
        title: m.title,
      });
    } catch (e) { }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="LifeSingers" subtitle="Choir & Worship Ministry" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* ── Hero banner ───────────────────────────────────────────── */}
        <LinearGradient
          colors={['#10B981', '#047857']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.heroBanner}
        >
          <View style={styles.heroIconWrap}>
            <Ionicons name="musical-notes" size={40} color="#fff" />
          </View>
          <Text style={styles.heroTitle}>Lifegate Singers</Text>
          <Text style={styles.heroSub}>
            Ministering through song, worship, and praise to glorify God and edify the body of Christ.
          </Text>
          <View style={styles.heroPills}>
            {['Praise', 'Worship', 'Gospel', 'Choir'].map(tag => (
              <View key={tag} style={styles.heroPill}>
                <Text style={styles.heroPillText}>{tag}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* ── About section ─────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About the Ministry</Text>
          <View style={[styles.aboutCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
              The Lifegate Singers exist to lead the congregation into the presence of God through anointed music and worship. Drawing from gospel, contemporary Christian, and traditional praise music, the choir ministers during Sunday services, special occasions, and outreach events.
            </Text>
            <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
              Rehearsals take place every Friday evening. New members with a heart for worship and a love for God are always welcome to join.
            </Text>
            <TouchableOpacity style={[styles.joinBtn, { backgroundColor: '#10B981' }]}>
              <Ionicons name="musical-note" size={16} color="#fff" />
              <Text style={styles.joinBtnText}>Join the Choir</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Ministrations ─────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Ministrations</Text>
          {SAMPLE_MINISTRATIONS.map(m => {
            const thumbUrl = getYouTubeThumbnail(m.videoUrl);
            return (
              <TouchableOpacity
                key={m.id}
                style={[styles.ministrationCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => setActiveVideo(m)}
                activeOpacity={0.8}
              >
                {/* Thumbnail */}
                <View style={styles.ministrationThumb}>
                  {thumbUrl ? (
                    <Image source={{ uri: thumbUrl }} style={styles.ministrationImg} resizeMode="cover" />
                  ) : (
                    <View style={[styles.ministrationImg, { backgroundColor: '#10B98122' }]} />
                  )}
                  <View style={styles.ministrationOverlay}>
                    <Ionicons name="play-circle" size={36} color="#fff" />
                  </View>
                  {m.duration && (
                    <View style={styles.durationBadge}>
                      <Text style={styles.durationText}>{m.duration}</Text>
                    </View>
                  )}
                </View>

                {/* Info */}
                <View style={styles.ministrationInfo}>
                  <View style={[styles.occasionPill, { backgroundColor: '#10B98118' }]}>
                    <Text style={[styles.occasionText, { color: '#10B981' }]}>{m.occasion}</Text>
                  </View>
                  <Text style={[styles.ministrationTitle, { color: colors.text }]} numberOfLines={2}>
                    {m.title}
                  </Text>
                  <View style={styles.ministrationMeta}>
                    <Ionicons name="calendar-outline" size={11} color={colors.textMuted} />
                    <Text style={[styles.metaText, { color: colors.textMuted }]}>
                      {new Date(m.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </Text>
                  </View>
                  {/* Actions */}
                  <View style={styles.ministrationActions}>
                    <TouchableOpacity
                      style={[styles.watchBtn, { backgroundColor: '#10B981' }]}
                      onPress={() => setActiveVideo(m)}
                    >
                      <Ionicons name="play" size={13} color="#fff" />
                      <Text style={styles.watchBtnText}>Watch</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleShare(m)}>
                      <Ionicons name="share-social-outline" size={18} color={colors.textMuted} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── Choir members ─────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Meet the Team</Text>
          <View style={styles.membersGrid}>
            {CHOIR_MEMBERS.map(member => (
              <View
                key={member.id}
                style={[styles.memberCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <View style={[styles.memberAvatar, { backgroundColor: member.color + '22' }]}>
                  <Text style={[styles.memberInitial, { color: member.color }]}>{member.initial}</Text>
                </View>
                <Text style={[styles.memberName, { color: colors.text }]} numberOfLines={1}>
                  {member.name}
                </Text>
                <Text style={[styles.memberRole, { color: colors.textMuted }]} numberOfLines={1}>
                  {member.role}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Rehearsal info ────────────────────────────────────────── */}
        <View style={{ paddingHorizontal: 16 }}>
          <LinearGradient
            colors={['#10B981', '#047857']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.rehearsalBanner}
          >
            <Ionicons name="time-outline" size={24} color="#fff" />
            <View>
              <Text style={styles.rehearsalTitle}>Rehearsal Schedule</Text>
              <Text style={styles.rehearsalSub}>Every Friday · 6:30pm · Church Hall</Text>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>

      <VideoModal
        visible={!!activeVideo}
        videoId={activeVideo ? getYouTubeId(activeVideo.videoUrl) : null}
        title={activeVideo?.title}
        mode="video"
        onClose={() => setActiveVideo(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heroBanner: {
    margin: 16, borderRadius: 20, padding: 24,
    alignItems: 'center', gap: 10,
  },
  heroIconWrap: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center', marginBottom: 4,
  },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  heroSub: { color: 'rgba(255,255,255,0.8)', fontSize: 13, textAlign: 'center', lineHeight: 20 },
  heroPills: { flexDirection: 'row', gap: 8, marginTop: 4 },
  heroPill: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  heroPillText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  section: { paddingHorizontal: 16, marginTop: 24 },
  sectionTitle: { fontSize: 17, fontWeight: '700', letterSpacing: -0.3, marginBottom: 14 },
  aboutCard: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 12 },
  aboutText: { fontSize: 14, lineHeight: 22 },
  joinBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 12, borderRadius: 12, marginTop: 4,
  },
  joinBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  ministrationCard: {
    flexDirection: 'row', borderRadius: 16, borderWidth: 1,
    overflow: 'hidden', marginBottom: 12,
  },
  ministrationThumb: { width: 110, position: 'relative' },
  ministrationImg: { width: 110, height: '100%' },
  ministrationOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  durationBadge: {
    position: 'absolute', bottom: 6, right: 6,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4,
  },
  durationText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  ministrationInfo: { flex: 1, padding: 12, gap: 6 },
  occasionPill: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  occasionText: { fontSize: 10, fontWeight: '700' },
  ministrationTitle: { fontSize: 14, fontWeight: '700', lineHeight: 18 },
  ministrationMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 11 },
  ministrationActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  watchBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
  },
  watchBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  membersGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  memberCard: {
    width: '30%', borderRadius: 14, borderWidth: 1,
    padding: 12, alignItems: 'center', gap: 6,
  },
  memberAvatar: {
    width: 44, height: 44, borderRadius: 22,
    justifyContent: 'center', alignItems: 'center',
  },
  memberInitial: { fontSize: 16, fontWeight: '800' },
  memberName: { fontSize: 12, fontWeight: '700', textAlign: 'center' },
  memberRole: { fontSize: 10, textAlign: 'center' },
  rehearsalBanner: {
    borderRadius: 16, padding: 18,
    flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 24,
  },
  rehearsalTitle: { color: '#fff', fontSize: 16, fontWeight: '800' },
  rehearsalSub: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 2 },
});