import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  StyleSheet, KeyboardAvoidingView, Platform, Switch, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Header } from '../../components/Header';

type Tab = 'wall' | 'submit';

interface PrayerRequest {
  id: string;
  name: string;
  isAnonymous: boolean;
  request: string;
  category: string;
  submittedAt: string;
  prayerCount: number;
  hasPrayed?: boolean;
}

const CATEGORIES = ['Healing', 'Family', 'Finance', 'Salvation', 'Guidance', 'Thanksgiving', 'Other'];

const CATEGORY_ICONS: Record<string, string> = {
  Healing: 'medkit', Family: 'people', Finance: 'cash',
  Salvation: 'heart', Guidance: 'compass', Thanksgiving: 'star', Other: 'ellipsis-horizontal',
};

const CATEGORY_COLORS: Record<string, string> = {
  Healing: '#EF4444', Family: '#10B981', Finance: '#F59E0B',
  Salvation: '#9D1C20', Guidance: '#8B5CF6', Thanksgiving: '#203668', Other: '#6B7280',
};

// ─── Sample prayer wall data ──────────────────────────────────────────────────
const SAMPLE_PRAYERS: PrayerRequest[] = [
  {
    id: 'p1', name: 'Sarah O.', isAnonymous: false,
    request: 'Please pray for my mother\'s complete recovery from surgery. The doctors say it went well but we are believing God for full healing.',
    category: 'Healing', submittedAt: '2026-08-09T09:00:00', prayerCount: 24,
  },
  {
    id: 'p2', name: 'Anonymous', isAnonymous: true,
    request: 'I need God\'s direction in a major career decision. Please pray that I make the right choice according to His will.',
    category: 'Guidance', submittedAt: '2026-08-08T14:30:00', prayerCount: 17,
  },
  {
    id: 'p3', name: 'James A.', isAnonymous: false,
    request: 'Thanking God for His faithfulness in our family. He provided a miracle for us this month and we want the whole church to rejoice with us!',
    category: 'Thanksgiving', submittedAt: '2026-08-07T11:00:00', prayerCount: 42,
  },
  {
    id: 'p4', name: 'Anonymous', isAnonymous: true,
    request: 'Please intercede for my marriage. We are going through a difficult season and need God\'s restoration and peace in our home.',
    category: 'Family', submittedAt: '2026-08-06T08:15:00', prayerCount: 31,
  },
  {
    id: 'p5', name: 'David K.', isAnonymous: false,
    request: 'Praying for my brother who does not yet know the Lord. Please stand with me for his salvation.',
    category: 'Salvation', submittedAt: '2026-08-05T16:00:00', prayerCount: 19,
  },
];

interface Props { navigation: any; }

export const PrayerRequestsScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = React.useState<Tab>('submit');
  const [prayers, setPrayers] = React.useState<PrayerRequest[]>(SAMPLE_PRAYERS);

  // Form state
  const [name, setName] = React.useState('');
  const [request, setRequest] = React.useState('');
  const [isAnonymous, setIsAnonymous] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState('Other');
  const [submitting, setSubmitting] = React.useState(false);

  const handlePray = (id: string) => {
    setPrayers(prev => prev.map(p =>
      p.id === id
        ? { ...p, prayerCount: p.hasPrayed ? p.prayerCount - 1 : p.prayerCount + 1, hasPrayed: !p.hasPrayed }
        : p
    ));
  };

  const handleSubmit = async () => {
    if (!request.trim()) {
      Alert.alert('Missing Request', 'Please enter your prayer request before submitting.');
      return;
    }
    // if (!isAnonymous && !name.trim()) {
    //   Alert.alert('Missing Name', 'Please enter your name or enable anonymous submission.');
    //   return;
    // }
    setSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    Alert.alert(
      'Prayer Request Submitted 🙏',
      'Your request has been received. Our prayer team will intercede on your behalf.',
      [{ text: 'Amen!', onPress: () => { setName(''); setRequest(''); } }]
    );
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    return `${diff} days ago`;
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* <Header title="Prayer Requests" subtitle="Submit · Intercede · Believe" /> */}
      <Header title="Prayer Requests" subtitle="" />

      {/* ── Tab switcher ──────────────────────────────────────────── */}
      {/* <View style={[styles.tabBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {(['wall', 'submit'] as Tab[]).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && { backgroundColor: colors.primary },
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Ionicons
              name={tab === 'wall' ? 'people' : 'add-circle'}
              size={16}
              color={activeTab === tab ? '#fff' : colors.textMuted}
            />
            <Text style={[styles.tabText, { color: activeTab === tab ? '#fff' : colors.textMuted }]}>
              {tab === 'wall' ? 'Prayer Wall' : 'Submit Request'}
            </Text>
          </TouchableOpacity>
        ))}
      </View> */}

      {activeTab === 'wall' ? (
        // ── Prayer wall ─────────────────────────────────────────────
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 100, gap: 12 }}>
          <Text style={[styles.wallHint, { color: colors.textMuted }]}>
            Tap 🙏 to let someone know you are praying for them
          </Text>
          {prayers.map(prayer => (
            <View
              key={prayer.id}
              style={[styles.prayerCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              {/* Category badge */}
              <View style={styles.prayerHeader}>
                <View style={[styles.categoryBadge, { backgroundColor: CATEGORY_COLORS[prayer.category] + '18' }]}>
                  <Ionicons name={CATEGORY_ICONS[prayer.category] as any} size={12} color={CATEGORY_COLORS[prayer.category]} />
                  <Text style={[styles.categoryBadgeText, { color: CATEGORY_COLORS[prayer.category] }]}>
                    {prayer.category}
                  </Text>
                </View>
                <Text style={[styles.prayerDate, { color: colors.textMuted }]}>
                  {formatDate(prayer.submittedAt)}
                </Text>
              </View>

              <Text style={[styles.prayerRequest, { color: colors.text }]}>{prayer.request}</Text>

              {/* Footer */}
              <View style={styles.prayerFooter}>
                <View style={styles.prayerName}>
                  <View style={[styles.prayerAvatar, { backgroundColor: colors.primary + '22' }]}>
                    <Ionicons name={prayer.isAnonymous ? 'eye-off' : 'person'} size={12} color={colors.primary} />
                  </View>
                  <Text style={[styles.prayerNameText, { color: colors.textSecondary }]}>
                    {prayer.name}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.prayBtn,
                    { backgroundColor: prayer.hasPrayed ? colors.primary : colors.primary + '15', borderColor: colors.primary },
                  ]}
                  onPress={() => handlePray(prayer.id)}
                >
                  <Text style={{ fontSize: 14 }}>🙏</Text>
                  <Text style={[styles.prayBtnText, { color: prayer.hasPrayed ? '#fff' : colors.primary }]}>
                    {prayer.prayerCount}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        // ── Submit form ─────────────────────────────────────────────
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 100, gap: 16 }}>

            {/* Anonymous toggle */}
            {/* <View style={[styles.anonRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name="eye-off-outline" size={20} color={colors.primary} />
              <Text style={[styles.anonLabel, { color: colors.text }]}>Submit Anonymously</Text>
              <Switch
                value={isAnonymous}
                onValueChange={setIsAnonymous}
                trackColor={{ true: colors.primary, false: colors.border }}
                thumbColor="#fff"
              />
            </View> */}

            {/* Name input */}
            {/* {!isAnonymous && (
              <View>
                <Text style={[styles.inputLabel, { color: colors.textMuted }]}>Your Name</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
                  placeholder="Enter your name"
                  placeholderTextColor={colors.textMuted}
                  value={name}
                  onChangeText={setName}
                />
              </View>
            )} */}

            {/* Category selector */}
            {/* <View>
              <Text style={[styles.inputLabel, { color: colors.textMuted }]}>Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                {CATEGORIES.map(cat => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.catChip,
                      {
                        backgroundColor: selectedCategory === cat ? CATEGORY_COLORS[cat] : colors.card,
                        borderColor: selectedCategory === cat ? CATEGORY_COLORS[cat] : colors.border,
                      },
                    ]}
                    onPress={() => setSelectedCategory(cat)}
                  >
                    <Ionicons
                      name={CATEGORY_ICONS[cat] as any}
                      size={13}
                      color={selectedCategory === cat ? '#fff' : CATEGORY_COLORS[cat]}
                    />
                    <Text style={[styles.catChipText, { color: selectedCategory === cat ? '#fff' : colors.text }]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View> */}

            {/* Prayer request textarea */}
            <View>
              <Text style={[styles.inputLabel, { color: colors.textMuted }]}>Your Prayer Request</Text>
              <TextInput
                style={[styles.textarea, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
                placeholder="Share your prayer request with the church family..."
                placeholderTextColor={colors.textMuted}
                value={request}
                onChangeText={setRequest}
                multiline
                numberOfLines={8}
                textAlignVertical="top"
              />
              <Text style={[styles.charCount, { color: colors.textMuted }]}>{request.length} / 500</Text>
            </View>

            {/* Visibility note */}
            {/* <View style={[styles.noteCard, { backgroundColor: colors.primary + '10', borderColor: colors.primary + '30' }]}>
              <Ionicons name="shield-checkmark-outline" size={16} color={colors.primary} />
              <Text style={[styles.noteText, { color: colors.primary }]}>
                Your request will be reviewed by our prayer team before appearing on the prayer wall. Personal details are handled with care.
              </Text>
            </View> */}

            {/* Submit button */}
            <TouchableOpacity
              style={[styles.submitBtn, { backgroundColor: submitting ? colors.primary + '80' : colors.primary }]}
              onPress={handleSubmit}
              disabled={submitting}
            >
              <Ionicons name="send" size={18} color="#fff" />
              <Text style={styles.submitBtnText}>
                {submitting ? 'Submitting...' : 'Submit Prayer Request'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row', margin: 16, borderRadius: 12, borderWidth: 1,
    padding: 4, gap: 4,
  },
  tab: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, paddingVertical: 10, borderRadius: 10,
  },
  tabText: { fontSize: 13, fontWeight: '600' },
  wallHint: { fontSize: 13, textAlign: 'center', marginBottom: 4 },
  prayerCard: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 10 },
  prayerHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  categoryBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  categoryBadgeText: { fontSize: 11, fontWeight: '700' },
  prayerDate: { fontSize: 12 },
  prayerRequest: { fontSize: 15, lineHeight: 24 },
  prayerFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  prayerName: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  prayerAvatar: { width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  prayerNameText: { fontSize: 13, fontWeight: '600' },
  prayBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1,
  },
  prayBtnText: { fontSize: 13, fontWeight: '700' },
  anonRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 16, borderRadius: 14, borderWidth: 1,
  },
  anonLabel: { flex: 1, fontSize: 15, fontWeight: '500' },
  inputLabel: { fontSize: 13, fontWeight: '600', marginBottom: 8 },
  input: {
    borderRadius: 12, borderWidth: 1,
    paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 15,
  },
  textarea: {
    borderRadius: 12, borderWidth: 1,
    paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 15, minHeight: 120,
  },
  charCount: { fontSize: 12, textAlign: 'right', marginTop: 4 },
  catChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, borderWidth: 1,
  },
  catChipText: { fontSize: 12, fontWeight: '600' },
  noteCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    padding: 14, borderRadius: 12, borderWidth: 1,
  },
  noteText: { flex: 1, fontSize: 13, lineHeight: 20 },
  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 16, borderRadius: 16,
  },
  submitBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});