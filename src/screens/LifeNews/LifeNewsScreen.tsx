import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Image, FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Header } from '../../components/Header';

interface NewsArticle {
  id: string;
  title: string;
  author?: string;
  category: string;
  excerpt: string;
  imageUrl?: string;
}

interface NewsEdition {
  id: string;
  title: string;
  date: string;
  coverImageUrl?: string;
  theme: string;
  articles: NewsArticle[];
}

// ─── Sample data from the LifeNews PDF ───────────────────────────────────────
const SAMPLE_EDITIONS: NewsEdition[] = [
  {
    id: '1',
    title: 'LifeNews — July 2026',
    date: '2026-07-26',
    theme: 'Understanding your Identity in Christ',
    coverImageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800',
    articles: [
      {
        id: 'a1',
        title: 'Understanding your Identity in Christ',
        author: 'Pastor David',
        category: 'Pastoral Letter',
        excerpt: 'We commenced our series on Empowerment for Divine Manifestation at the beginning of this month and completed four sessions in the course of the month.',
      },
      {
        id: 'a2',
        title: 'Leveraging AI for Greater Impact and Service II',
        author: 'Stephen Nworgu',
        category: 'Technology & Faith',
        excerpt: 'The Great Commission calls believers to make disciples of all nations. AI can support this mission in practical and meaningful ways.',
      },
      {
        id: 'a3',
        title: 'Lifegate Communities Awarded Spark Grant',
        author: 'Toyin Oshhaniwa',
        category: 'Community',
        excerpt: 'Lifegate Communities, in partnership with The New Art Gallery Walsall, has been awarded a £3,300 Spark Grant funded by the UK Government.',
      },
      {
        id: 'a4',
        title: 'GenNxt Power: Empowering Young People Through Sport and Life Skills',
        author: 'Elohor Irikefe',
        category: 'Youth',
        excerpt: 'Lifegate Communities has launched GenNxt Power, a free, year-long youth programme for young people aged 12–18 in Walsall.',
      },
      {
        id: 'a5',
        title: 'Our LifeTeams: The LifeMen',
        author: 'Frederick Odogwu',
        category: 'Community',
        excerpt: 'The LifeMen group exists to promote the spiritual, emotional, and physical wellbeing of men within the church.',
      },
      {
        id: 'a6',
        title: 'Short Story: Obedience — Two Sisters',
        author: 'Nkesi Kasi',
        category: 'Short Story',
        excerpt: 'Mama stood at the door with her market bag. Lily and Daisy each had their separate rooms side by side down the hall...',
      },
    ],
  },
  {
    id: '2',
    title: 'LifeNews — June 2026',
    date: '2026-06-29',
    theme: 'Empowerment for Divine Manifestation',
    coverImageUrl: 'https://images.unsplash.com/photo-1438232992991-995b671e5466?w=800',
    articles: [
      {
        id: 'b1',
        title: 'Empowerment for Divine Manifestation',
        author: 'Pastor David',
        category: 'Pastoral Letter',
        excerpt: 'As we continue our journey of faith, we are reminded that divine manifestation begins with knowing the Source of all power.',
      },
    ],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Pastoral Letter': '#203668',
  'Technology & Faith': '#8B5CF6',
  'Community': '#10B981',
  'Youth': '#F59E0B',
  'Short Story': '#EC4899',
  'Faith': '#EF4444',
};

interface Props { navigation: any; }

export const LifeNewsScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [selectedEdition, setSelectedEdition] = React.useState<NewsEdition>(SAMPLE_EDITIONS[0]);

  const categoryColor = (cat: string) => CATEGORY_COLORS[cat] || colors.primary;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="LifeNews" subtitle="Church Newsletter" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* ── Edition selector ──────────────────────────────────────── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16, gap: 10 }}
        >
          {SAMPLE_EDITIONS.map(ed => (
            <TouchableOpacity
              key={ed.id}
              onPress={() => setSelectedEdition(ed)}
              style={[
                styles.editionTab,
                {
                  backgroundColor: selectedEdition.id === ed.id ? colors.primary : colors.card,
                  borderColor: selectedEdition.id === ed.id ? colors.primary : colors.border,
                },
              ]}
            >
              <Text style={[
                styles.editionTabText,
                { color: selectedEdition.id === ed.id ? '#fff' : colors.textSecondary },
              ]}>
                {new Date(ed.date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Cover card ────────────────────────────────────────────── */}
        <View style={{ paddingHorizontal: 16 }}>
          <View style={[styles.coverCard, { borderColor: colors.border }]}>
            {selectedEdition.coverImageUrl && (
              <Image
                source={{ uri: selectedEdition.coverImageUrl }}
                style={styles.coverImage}
                resizeMode="cover"
              />
            )}
            <View style={[styles.coverOverlay]}>
              <View style={[styles.coverBadge, { backgroundColor: colors.accent }]}>
                <Text style={styles.coverBadgeText}>
                  {new Date(selectedEdition.date).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </Text>
              </View>
              <Text style={styles.coverTitle}>{selectedEdition.title}</Text>
              <Text style={styles.coverTheme}>{selectedEdition.theme}</Text>
            </View>
          </View>
        </View>

        {/* ── Articles section ──────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Articles · {selectedEdition.articles.length}
          </Text>

          {selectedEdition.articles.map((article, i) => (
            <TouchableOpacity
              key={article.id}
              style={[styles.articleCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => navigation.navigate('LifeNewsArticle', { article, edition: selectedEdition })}
              activeOpacity={0.75}
            >
              {/* Category pill */}
              <View style={styles.articleHeader}>
                <View style={[styles.categoryPill, { backgroundColor: categoryColor(article.category) + '18' }]}>
                  <Text style={[styles.categoryText, { color: categoryColor(article.category) }]}>
                    {article.category}
                  </Text>
                </View>
                {i === 0 && (
                  <View style={[styles.featuredPill, { backgroundColor: colors.accent }]}>
                    <Text style={styles.featuredText}>FEATURED</Text>
                  </View>
                )}
              </View>

              <Text style={[styles.articleTitle, { color: colors.text }]} numberOfLines={2}>
                {article.title}
              </Text>
              <Text style={[styles.articleExcerpt, { color: colors.textMuted }]} numberOfLines={3}>
                {article.excerpt}
              </Text>

              {article.author && (
                <View style={styles.articleFooter}>
                  <View style={[styles.authorAvatar, { backgroundColor: colors.primary + '22' }]}>
                    <Ionicons name="person" size={12} color={colors.primary} />
                  </View>
                  <Text style={[styles.authorName, { color: colors.textSecondary }]}>
                    {article.author}
                  </Text>
                  <Ionicons name="chevron-forward" size={14} color={colors.textMuted} style={{ marginLeft: 'auto' }} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  editionTab: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 20, borderWidth: 1,
  },
  editionTabText: { fontSize: 13, fontWeight: '600' },
  coverCard: { borderRadius: 20, overflow: 'hidden', borderWidth: 1, height: 220 },
  coverImage: { width: '100%', height: '100%', position: 'absolute' },
  coverOverlay: {
    flex: 1, padding: 20, justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  coverBadge: {
    alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 20, marginBottom: 8,
  },
  coverBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  coverTitle: { color: '#fff', fontSize: 20, fontWeight: '800', letterSpacing: -0.3 },
  coverTheme: { color: 'rgba(255,255,255,0.75)', fontSize: 13, marginTop: 4 },
  section: { paddingHorizontal: 16, marginTop: 24 },
  sectionTitle: { fontSize: 17, fontWeight: '700', letterSpacing: -0.3, marginBottom: 14 },
  articleCard: {
    borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 12, gap: 8,
  },
  articleHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  categoryPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  categoryText: { fontSize: 11, fontWeight: '700' },
  featuredPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  featuredText: { color: '#fff', fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  articleTitle: { fontSize: 16, fontWeight: '700', lineHeight: 22 },
  articleExcerpt: { fontSize: 13, lineHeight: 20 },
  articleFooter: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  authorAvatar: { width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  authorName: { fontSize: 13, fontWeight: '600' },
});