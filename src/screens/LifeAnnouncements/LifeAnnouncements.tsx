import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { Header } from '../../components/Header';

interface AnnouncementItem {
  id: string;
  number?: number;
  heading: string;
  body: string;
  icon: string;
  color: string;
  link?: string;
  linkLabel?: string;
  highlight?: boolean;
}

interface Announcement {
  id: string;
  weekOf: string;
  title: string;
  welcome: string;
  items: AnnouncementItem[];
}

// ─── Sample data from the real announcements docx (09/08/26) ─────────────────
const CURRENT_ANNOUNCEMENT: Announcement = {
  id: '1',
  weekOf: '2026-08-09',
  title: 'Announcements — 09/08/26',
  welcome: 'We welcome everyone again to Lifegate in the name of God the Father, the Son and the Holy Spirit. Here, we celebrate Abundant Life in Jesus Christ.',
  items: [
    {
      id: 'i1',
      number: 1,
      heading: 'Sunday Service',
      icon: 'sunny',
      color: '#203668',
      body: 'Power Tower: 9:30 – 10:00 (Everyone is welcome and encouraged to attend).\nMain Service: 10:00 – 12:15.\n\nNext Week\'s theme is Holiness and Obedience for Sustaining Divine Manifestation as we continue our series on Embracing the Power of Divine Manifestation.',
    },
    {
      id: 'i2',
      number: 2,
      heading: 'Midweek Service',
      icon: 'videocam',
      color: '#8B5CF6',
      body: 'Our Midweek service is on Wednesday and will be held online through Zoom.\n\nTime: 7:30pm to 9:00pm. Please log on as from 7:30pm as service starts at 7:35pm prompt. Feel free to invite others by sending the link shared on the Church WhatsApp group to them.',
    },
    {
      id: 'i3',
      number: 3,
      heading: 'Early Morning Prayer Meetings',
      icon: 'moon',
      color: '#10B981',
      body: 'Our weekly Early Morning Prayer program continues from tomorrow till Friday from 5am to 6am daily.\n\nPlease note that we will fast tomorrow from 6am and pray by 5pm before we break the fast at 6pm. All meetings take place on our Zoom platform.',
    },
    {
      id: 'i4',
      number: 4,
      heading: 'September Workers Training',
      icon: 'people',
      color: '#F59E0B',
      body: 'Our September Workers Training comes up on Saturday 12th of September at 9am. The meeting will take place on Zoom.\n\nThis meeting is mandatory for all Church Workers. Please kindly ensure that your unit leader is aware of your inability to attend if you will be absent. New members are most welcomed to join in as well.',
    },
    {
      id: 'i5',
      number: 5,
      heading: 'August Outreaches',
      icon: 'walk',
      color: '#EC4899',
      body: 'Our August 2026 Outreach events will continue to take place on Saturday 15th and 22nd August.\n\nEach day we will meet at Church by 10am to pray and set out to the Town Centre afterwards. Please kindly watch out for detail information to be provided through the Church WhatsApp group.',
    },
    {
      id: 'i6',
      number: 6,
      heading: 'CELEBRATE LIFE 2026!',
      icon: 'star',
      color: '#9D1C20',
      highlight: true,
      body: 'Hallelujah! Our 13th Church Anniversary (CELEBRATE LIFE 2026) comes up on Sunday the 30th of August 2026 by 10am.\n\nThe events will also feature our annual community BBQ which will take place on Saturday 29th August by 11am. Please mark your diaries and invite others. All events are FREE to attend.',
    },
    {
      id: 'i7',
      number: 7,
      heading: 'Testimonies',
      icon: 'heart',
      color: '#EF4444',
      body: 'You are encouraged to send in your testimonies to glorify God. It is a good thing to give thanks to the Lord for what He has done.',
      link: 'mailto:testimony@lifegatecentre.org',
      linkLabel: 'Send your testimony',
    },
  ],
};

interface Props { navigation: any; }

export const AnnouncementsScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [expanded, setExpanded] = React.useState<string | null>('i1');

  const toggle = (id: string) => setExpanded(prev => prev === id ? null : id);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Announcements" subtitle="Weekly Church Notices" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* ── Welcome banner ────────────────────────────────────────── */}
        <LinearGradient
          colors={[colors.heroGradientStart, colors.heroGradientEnd]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={styles.bannerTop}>
            <View style={[styles.bannerDot, { backgroundColor: colors.accent }]} />
            <Text style={styles.bannerDate}>
              {new Date(CURRENT_ANNOUNCEMENT.weekOf).toLocaleDateString('en-GB', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
              })}
            </Text>
          </View>
          <Text style={styles.bannerWelcome}>{CURRENT_ANNOUNCEMENT.welcome}</Text>
        </LinearGradient>

        {/* ── Announcement items ────────────────────────────────────── */}
        <View style={{ paddingHorizontal: 16, paddingTop: 20, gap: 10 }}>
          {CURRENT_ANNOUNCEMENT.items.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => toggle(item.id)}
              activeOpacity={0.85}
              style={[
                styles.card,
                {
                  backgroundColor: item.highlight ? item.color + '10' : colors.card,
                  borderColor: item.highlight ? item.color + '50' : colors.border,
                },
              ]}
            >
              {/* Header row */}
              <View style={styles.cardHeader}>
                <View style={[styles.cardIcon, { backgroundColor: item.color + '18' }]}>
                  <Ionicons name={item.icon as any} size={18} color={item.color} />
                </View>
                <View style={{ flex: 1 }}>
                  {item.number && (
                    <Text style={[styles.cardNumber, { color: item.color }]}>#{item.number}</Text>
                  )}
                  <Text style={[styles.cardHeading, { color: colors.text }]}>{item.heading}</Text>
                </View>
                <Ionicons
                  name={expanded === item.id ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={colors.textMuted}
                />
              </View>

              {/* Expanded body */}
              {expanded === item.id && (
                <View style={styles.cardBody}>
                  <View style={[styles.bodyDivider, { backgroundColor: colors.border }]} />
                  {item.body.split('\n\n').map((para, i) => (
                    <Text key={i} style={[styles.bodyText, { color: colors.textSecondary }]}>
                      {para}
                    </Text>
                  ))}
                  {item.link && (
                    <TouchableOpacity
                      style={[styles.linkBtn, { borderColor: item.color, backgroundColor: item.color + '12' }]}
                      onPress={() => Linking.openURL(item.link!)}
                    >
                      <Ionicons name="mail-outline" size={14} color={item.color} />
                      <Text style={[styles.linkBtnText, { color: item.color }]}>{item.linkLabel}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Footer note ───────────────────────────────────────────── */}
        <View style={styles.footer}>
          <Ionicons name="information-circle-outline" size={16} color={colors.textMuted} />
          <Text style={[styles.footerText, { color: colors.textMuted }]}>
            Announcements updated weekly every Sunday
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: { margin: 16, borderRadius: 20, padding: 20, gap: 12 },
  bannerTop: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bannerDot: { width: 8, height: 8, borderRadius: 4 },
  bannerDate: { color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: '600' },
  bannerWelcome: { color: '#fff', fontSize: 14, lineHeight: 22 },
  card: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  cardIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  cardNumber: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  cardHeading: { fontSize: 15, fontWeight: '700' },
  cardBody: { paddingHorizontal: 16, paddingBottom: 16, gap: 8 },
  bodyDivider: { height: 1, marginBottom: 8 },
  bodyText: { fontSize: 14, lineHeight: 22 },
  linkBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    alignSelf: 'flex-start', marginTop: 4,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1,
  },
  linkBtnText: { fontSize: 13, fontWeight: '600' },
  footer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, marginTop: 24, paddingBottom: 8,
  },
  footerText: { fontSize: 12 },
});