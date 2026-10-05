import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

// Full article bodies keyed by article id (static for now, will come from API)
const ARTICLE_BODIES: Record<string, string> = {
  a1: `Dear friends,\n\nIt gives me great pleasure to welcome you to this edition of LifeNews.\n\nWe commenced our series on 'Empowerment for Divine Manifestation' at the beginning of this month and completed four sessions in the course of the month.\n\nThe first four messages established the biblical foundations for experiencing and demonstrating God's supernatural power in everyday life. The series emphasised that divine manifestation is not the product of human ability, ambition, or effort, but the outworking of God's power through believers who understand their identity, depend on the Holy Spirit, and walk by faith.\n\nThe series began by establishing God as the ultimate source of all divine power. In a world where people relentlessly pursue influence, success, and control, Scripture reveals that true and lasting power originates only from the Self-Existent, All-Sufficient, and Eternal God.\n\nBuilding upon this foundation, the second message explored the believer's identity and authority in Christ. Divine manifestation requires more than possessing power — it requires understanding and exercising God-given authority.\n\nThe third message focused on the indispensable ministry of the Holy Spirit, who empowers believers for supernatural living. The Holy Spirit teaches, guides, comforts, convicts, and empowers God's people with dunamis — the miraculous, explosive power of God.\n\nThe fourth message concluded this opening section by showing that faith is the divinely appointed means of activating God's power for manifestation. Faith bridges the gap between God's promises and their fulfilment.\n\nI pray that the word of God will continue to grow and prevail in all our circumstances in Jesus name (Amen).\n\nThe Lord bless you.\nPastor David.`,
  a2: `The Great Commission calls believers to make disciples of all nations. AI can support this mission in practical and meaningful ways. Ministry leaders can use AI to organise research, compare translations, locate supporting references, and structure teaching materials.\n\nWhile AI should never replace prayer, revelation, or biblical study, it can serve as a helpful research assistant. Churches can use AI to develop newsletters, devotionals, social media posts, event communications, and educational resources.\n\nEthical Responsibilities for Christians\n\nAs Christians embrace AI, they must also uphold ethical standards that reflect the character of Christ.\n\nHonesty and Integrity: Believers should avoid using AI to deceive, mislead or misrepresent their abilities. Integrity must remain central to every application of technology.\n\nAccountability: AI generated content should be reviewed carefully before being shared or implemented. Christians remain responsible for the decisions they make and the information they communicate.\n\nRespect for Human Dignity: Technology should never replace compassion, empathy, and human relationships. People are created in God's image and must always be valued above processes and systems.\n\nThe Importance of Spiritual Discernment\n\nAlthough AI can provide information, it cannot replace spiritual wisdom. AI can analyse data, but it cannot hear God's voice.\n\nConclusion\n\nArtificial Intelligence presents significant opportunities for Christians to increase their impact, productivity, and service. When used wisely, AI can help believers work more efficiently, communicate more effectively, support ministry efforts, and steward resources responsibly.\n\nHowever, Christians must remember that technology is a tool, not a substitute for God. Our trust remains in the Lord, our wisdom comes from His Word, and our guidance comes from the Holy Spirit.`,
  a3: `Lifegate Communities, in partnership with The New Art Gallery Walsall, has been awarded a £3,300 Spark Grant, funded by the UK Government through the UK Shared Prosperity Fund (UKSPF).\n\nBuilding on the Walsall Heritage Strategy (2021–2026), the project will explore African links within Walsall's public collections, helping to improve access, encourage community engagement, and strengthen collaboration between local organisations.`,
  a4: `Lifegate Communities has launched GenNxt Power, a free, year-long youth programme for young people aged 12–18 in Walsall. Funded by the West Midlands Police and Crime Commissioner through the My Community Fund, the project aims to reduce youth violence and anti-social behaviour by providing a safe, positive environment where young people can participate in sports, develop life skills, and build confidence.\n\nMeeting on the last Saturday of each month, the programme combines physical activities such as football, basketball, badminton, tennis, and team games with workshops on goal setting, leadership, resilience, communication, emotional well-being, and decision-making.\n\nThe first session, held in June, focused on goal setting through a bowling activity and SMART goal workshops. Throughout the year, participants will also engage in community service, anti-violence campaigns, and youth-led events, with five Community Youth Champions selected to promote positive peer influence.\n\nLifegate Communities thanks the Office of the West Midlands Police and Crime Commissioner and the LifeYouths coordinators at Lifegate Outreach Centre for supporting this initiative.`,
  a5: `The LifeMen group under the bigger umbrella of Lifegate Outreach Centre exists to promote the spiritual, emotional, and physical wellbeing of men within the church with aim to reach wider community while encouraging personal growth, meaningful fellowship, and active participation in the life of the church.\n\nIts purpose is to equip men to become strong disciples, supportive family members, and positive role models in their communities through prayer, mentorship, teaching, and shared experiences.\n\nOne of the group's approach is to engage annual seminars across different spheres of life to create the atmosphere of learning and capacity building. One of the recent successes has been the continued engagement in the uplifting book reading series, which has inspired thoughtful discussions, deeper biblical understanding, and practical application of Christian principles in everyday life.\n\nRecognising the importance of holistic wellbeing, LifeMen also organises physical activities, including fortnightly sports sessions throughout the summer. Another key initiative is LifeMen Time Out, where members gather at carefully selected retreat locations for spiritual reflection, leadership development, and seminars designed to equip men for everyday challenges.`,
  a6: `Mama stood at the door with her market bag. Lily and Daisy each had their separate rooms side by side down the hall. And right now, both rooms were messy. Clothes on the floor. Toys everywhere. Beds unmade. Crumbs under the pillows.\n\n"Girls," Mama said firmly, "I need both of you to clean your separate rooms before I get back. Properly. Not halfway. I'll check when I return."\n\nDaisy jumped up the minute Mama left. "Let's go, Lily! Mama said now."\n\nShe ran to her room and started picking up, making her bed, sweeping every corner. Within an hour, her room was neat and beautiful.\n\nLily sighed and rolled over. "We have plenty of time. I'll do mine when I hear Mama coming."\n\nThen... click-clack ...Mama's sandals on the gate.\n\nLily panicked! She ran, shoving things under the bed, kicking clothes into the wardrobe. She was still panting and sweeping when Mama opened the door.\n\nMama walked into Daisy's room first. It was clean, the bed was made, and it smelled fresh.\n\nMama smiled and handed Daisy a new storybook and hair band. "Daisy, I'm proud of you. You obeyed right away. You didn't wait until you saw me. That's the kind of obedience that pleases God."\n\nLily burst into tears and ran outside. She found Grandpa under the mango tree.\n\n"Grandpa, it's not fair! I cleaned too!" she sobbed.\n\nGrandpa pulled her onto his lap. "Hmm. Let me tell you two stories, little one."\n\n"Obedience, my girl, is doing it immediately, doing it fully, and doing it even when Mama isn't watching. That's how we keep oil in our lamp."\n\nFrom that day, both sisters kept their "rooms" — and their hearts — ready.\n\nThe Lesson:\nObedience is doing what you're told, right away, fully, and whether anyone is watching.\nJohn 14:23 "If a man love me, he will keep my words."`,
};

interface Props {
  navigation: any;
  route: { params: { article: any; edition: any } };
}

export const LifeNewsArticleScreen: React.FC<Props> = ({ navigation, route }) => {
  const { article, edition } = route.params;
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const body = ARTICLE_BODIES[article.id] || article.excerpt;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\nFrom ${edition.title} — Lifegate Outreach Center\n\nwww.lifegatecentre.org`,
        title: article.title,
      });
    } catch (e) { }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Custom header */}
      <View style={[styles.header, { paddingTop: insets.top + 8, backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerEdition, { color: colors.textMuted }]} numberOfLines={1}>
          {edition.title}
        </Text>
        <TouchableOpacity onPress={handleShare} style={styles.shareBtn}>
          <Ionicons name="share-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
      >
        {/* Category + title */}
        <View style={[styles.categoryPill, { backgroundColor: colors.primary + '18' }]}>
          <Text style={[styles.categoryText, { color: colors.primary }]}>{article.category}</Text>
        </View>
        <Text style={[styles.title, { color: colors.text }]}>{article.title}</Text>
        {article.author && (
          <View style={styles.authorRow}>
            <View style={[styles.authorAvatar, { backgroundColor: colors.primary + '22' }]}>
              <Ionicons name="person" size={14} color={colors.primary} />
            </View>
            <Text style={[styles.author, { color: colors.textSecondary }]}>{article.author}</Text>
            <Text style={[styles.editionLabel, { color: colors.textMuted }]}>{edition.title}</Text>
          </View>
        )}

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Body text */}
        {body.split('\n\n').map((para, i) => {
          const isHeading = para.length < 60 && !para.includes(' ') === false && para === para.trim() && !para.endsWith('.');
          return (
            <Text
              key={i}
              style={[
                isHeading ? styles.bodyHeading : styles.bodyPara,
                { color: isHeading ? colors.text : colors.textSecondary },
              ]}
            >
              {para}
            </Text>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingBottom: 12,
    borderBottomWidth: 1, gap: 12,
  },
  backBtn: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
  headerEdition: { flex: 1, fontSize: 13, fontWeight: '500' },
  shareBtn: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
  categoryPill: {
    alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 20, marginBottom: 12,
  },
  categoryText: { fontSize: 12, fontWeight: '700' },
  title: { fontSize: 24, fontWeight: '800', lineHeight: 32, letterSpacing: -0.5, marginBottom: 14 },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  authorAvatar: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  author: { fontSize: 14, fontWeight: '600' },
  editionLabel: { fontSize: 12, marginLeft: 'auto' },
  divider: { height: 1, marginBottom: 20 },
  bodyHeading: { fontSize: 17, fontWeight: '700', marginBottom: 8, marginTop: 8 },
  bodyPara: { fontSize: 15, lineHeight: 26, marginBottom: 16 },
});