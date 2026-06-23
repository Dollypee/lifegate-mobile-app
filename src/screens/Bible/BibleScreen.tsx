import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Modal, FlatList, TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { BIBLE_BOOKS, CHAPTER_COUNT } from '../../data/sampleData';
import { KJV_POPULAR, 
        // WEB_POPULAR, 
        ASV_POPULAR } from '../../data/bibleVerses';

const VERSIONS = ['KJV', 'ASV'] as const;
type Version = typeof VERSIONS[number];

const VERSION_DATA: Record<Version, typeof KJV_POPULAR> = {
  KJV: KJV_POPULAR, // WEB: WEB_POPULAR, 
  ASV: ASV_POPULAR,
};

interface Bookmark {
  book: string; chapter: number; verse: number; text: string; version: Version;
}

interface Props { navigation: any; }

export const BibleScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [version, setVersion] = useState<Version>('KJV');
  const [book, setBook] = useState('Genesis');
  const [chapter, setChapter] = useState(1);
  const [showBooks, setShowBooks] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [highlights, setHighlights] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState(17);
  const [searchBook, setSearchBook] = useState('');

  const verses = VERSION_DATA[version]?.[book]?.[chapter] || {};
  const verseNumbers = Object.keys(verses).map(Number).sort((a, b) => a - b);
  const chapterCount = CHAPTER_COUNT[book] || 1;
  const filteredBooks = BIBLE_BOOKS.filter(b => b.toLowerCase().includes(searchBook.toLowerCase()));

  const toggleHighlight = (v: number) => {
    const key = `${book}-${chapter}-${v}`;
    setHighlights(prev => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; });
    setSelected(null);
  };

  const addBookmark = (v: number) => {
    const key = `${book}-${chapter}-${v}`;
    if (!bookmarks.find(b => b.book === book && b.chapter === chapter && b.verse === v)) {
      setBookmarks(prev => [...prev, { book, chapter, verse: v, text: verses[v], version }]);
    }
    setSelected(null);
  };

  const VerseAction = ({ verse }: { verse: number }) => (
    <View style={[styles.verseActions, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <TouchableOpacity style={styles.vAction} onPress={() => addBookmark(verse)}>
        <Ionicons name="bookmark" size={16} color={colors.primary} />
        <Text style={[styles.vActionText, { color: colors.primary }]}>Bookmark</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.vAction} onPress={() => toggleHighlight(verse)}>
        <Ionicons name="color-fill" size={16} color="#F59E0B" />
        <Text style={[styles.vActionText, { color: '#F59E0B' }]}>Highlight</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.vAction} onPress={() => navigation.navigate('AudioBible', { book, chapter, verse, version })}>
        <Ionicons name="volume-medium" size={16} color="#8B5CF6" />
        <Text style={[styles.vActionText, { color: '#8B5CF6' }]}>Listen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.vAction} onPress={() => setSelected(null)}>
        <Ionicons name="close" size={16} color={colors.textMuted} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Holy Bible" subtitle={`${book} ${chapter} · ${version}`} />

      {/* Controls Row */}
      <View style={[styles.controls, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity style={[styles.ctrlBtn, { backgroundColor: colors.inputBg, borderColor: colors.border }]} onPress={() => setShowBooks(true)}>
          <Text style={[styles.ctrlText, { color: colors.text }]} numberOfLines={1}>{book}</Text>
          <Ionicons name="chevron-down" size={14} color={colors.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.ctrlBtnSm, { backgroundColor: colors.inputBg, borderColor: colors.border }]} onPress={() => setShowChapters(true)}>
          <Text style={[styles.ctrlText, { color: colors.text }]}>Ch {chapter}</Text>
          <Ionicons name="chevron-down" size={14} color={colors.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.ctrlBtnSm, { backgroundColor: colors.primary + '22', borderColor: colors.primary + '44' }]} onPress={() => setShowVersions(true)}>
          <Text style={[styles.ctrlText, { color: colors.primary, fontWeight: '700' }]}>{version}</Text>
          <Ionicons name="chevron-down" size={14} color={colors.primary} />
        </TouchableOpacity>
        <View style={styles.fontRow}>
          <TouchableOpacity onPress={() => setFontSize(s => Math.max(13, s - 1))} style={[styles.fontBtn, { borderColor: colors.border }]}>
            <Text style={[{ color: colors.textSecondary, fontSize: 14, fontWeight: '700' }]}>A-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFontSize(s => Math.min(26, s + 1))} style={[styles.fontBtn, { borderColor: colors.border }]}>
            <Text style={[{ color: colors.textSecondary, fontSize: 16, fontWeight: '700' }]}>A+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        {/* Chapter Header */}
        <View style={styles.chapterHeader}>
          <Text style={[styles.chapterTitle, { color: colors.text }]}>{book}</Text>
          <Text style={[styles.chapterNum, { color: colors.primary }]}>Chapter {chapter}</Text>
        </View>

        {verseNumbers.length === 0 ? (
          <View style={styles.noVerses}>
            <Ionicons name="book-outline" size={48} color={colors.textMuted} />
            <Text style={[styles.noVersesText, { color: colors.textMuted }]}>
              Navigate to a book with bundled verses.{'\n'}Try John 3, Psalms 23, or Proverbs 3.
            </Text>
            <View style={styles.suggRow}>
              {[['John', 3], ['Psalms', 23], ['Proverbs', 3], ['Matthew', 11]].map(([b, c]) => (
                <TouchableOpacity
                  key={`${b}${c}`}
                  onPress={() => { setBook(b as string); setChapter(c as number); }}
                  style={[styles.suggChip, { backgroundColor: colors.primary + '18', borderColor: colors.primary + '33' }]}
                >
                  <Text style={[styles.suggText, { color: colors.primary }]}>{b} {c}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          verseNumbers.map(v => {
            const hKey = `${book}-${chapter}-${v}`;
            const isHighlighted = highlights.has(hKey);
            const isBookmarked = bookmarks.some(b => b.book === book && b.chapter === chapter && b.verse === v);
            return (
              <TouchableOpacity key={v} onPress={() => setSelected(selected === v ? null : v)} activeOpacity={0.8}>
                <View style={[
                  styles.verseRow,
                  isHighlighted && { backgroundColor: '#F59E0B22', borderRadius: 8, paddingHorizontal: 8 }
                ]}>
                  <Text style={[styles.verseNum, { color: colors.primary }]}>{v}</Text>
                  <Text style={[styles.verseText, { color: colors.text, fontSize }]}>
                    {verses[v]}
                    {isBookmarked && <Text style={{ color: colors.primary }}> 🔖</Text>}
                  </Text>
                </View>
                {selected === v && <VerseAction verse={v} />}
              </TouchableOpacity>
            );
          })
        )}

        {/* Prev / Next chapter nav */}
        <View style={styles.chapterNav}>
          {chapter > 1 && (
            <TouchableOpacity style={[styles.navBtn, { backgroundColor: colors.inputBg, borderColor: colors.border }]} onPress={() => setChapter(c => c - 1)}>
              <Ionicons name="chevron-back" size={18} color={colors.textSecondary} />
              <Text style={[styles.navText, { color: colors.textSecondary }]}>Ch {chapter - 1}</Text>
            </TouchableOpacity>
          )}
          <View style={{ flex: 1 }} />
          {chapter < chapterCount && (
            <TouchableOpacity style={[styles.navBtn, { backgroundColor: colors.inputBg, borderColor: colors.border }]} onPress={() => setChapter(c => c + 1)}>
              <Text style={[styles.navText, { color: colors.textSecondary }]}>Ch {chapter + 1}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Bookmarks */}
        {bookmarks.length > 0 && (
          <View style={{ marginTop: 24 }}>
            <Text style={[styles.bkTitle, { color: colors.text }]}>📌 Your Bookmarks</Text>
            {bookmarks.map((bm, i) => (
              <Card key={i} style={{ marginBottom: 8 }}>
                <View style={styles.bkRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.bkRef, { color: colors.primary }]}>{bm.book} {bm.chapter}:{bm.verse} ({bm.version})</Text>
                    <Text style={[styles.bkText, { color: colors.textSecondary }]} numberOfLines={2}>{bm.text}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setBookmarks(prev => prev.filter((_, j) => j !== i))}>
                    <Ionicons name="trash-outline" size={18} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Book Picker Modal */}
      <Modal visible={showBooks} animationType="slide" presentationStyle="pageSheet">
        <View style={[styles.modal, { backgroundColor: colors.surface }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Select Book</Text>
            <TouchableOpacity onPress={() => setShowBooks(false)}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          <TextInput
            style={[styles.modalSearch, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
            placeholder="Search book..."
            placeholderTextColor={colors.textMuted}
            value={searchBook}
            onChangeText={setSearchBook}
          />
          <FlatList
            data={filteredBooks}
            keyExtractor={item => item}
            numColumns={2}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, gap: 8 }}
            columnWrapperStyle={{ gap: 8 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.bookItem, { backgroundColor: book === item ? colors.primary : colors.inputBg, borderColor: book === item ? colors.primary : colors.border, flex: 1 }]}
                onPress={() => { setBook(item); setChapter(1); setShowBooks(false); setSearchBook(''); }}
              >
                <Text style={[styles.bookItemText, { color: book === item ? '#fff' : colors.text }]} numberOfLines={1}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      {/* Chapter Picker Modal */}
      <Modal visible={showChapters} animationType="slide" presentationStyle="pageSheet">
        <View style={[styles.modal, { backgroundColor: colors.surface }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Select Chapter — {book}</Text>
            <TouchableOpacity onPress={() => setShowChapters(false)}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={Array.from({ length: chapterCount }, (_, i) => i + 1)}
            keyExtractor={item => String(item)}
            numColumns={5}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, gap: 8 }}
            columnWrapperStyle={{ gap: 8 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.chapItem, { backgroundColor: chapter === item ? colors.primary : colors.inputBg, borderColor: chapter === item ? colors.primary : colors.border }]}
                onPress={() => { setChapter(item); setShowChapters(false); }}
              >
                <Text style={[styles.chapItemText, { color: chapter === item ? '#fff' : colors.text }]}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      {/* Version Picker Modal */}
      <Modal visible={showVersions} animationType="fade" transparent>
        <TouchableOpacity style={[styles.overlay, { backgroundColor: colors.overlay }]} onPress={() => setShowVersions(false)}>
          <View style={[styles.versionSheet, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text, marginBottom: 12 }]}>Bible Version</Text>
            {VERSIONS.map(v => (
              <TouchableOpacity
                key={v}
                style={[styles.versionRow, { borderBottomColor: colors.border }]}
                onPress={() => { setVersion(v); setShowVersions(false); }}
              >
                <View>
                  <Text style={[styles.versionName, { color: colors.text }]}>{v}</Text>
                  <Text style={[styles.versionFull, { color: colors.textMuted }]}>
                    {v === 'KJV' ? 'King James Version' : //v === 'WEB' ? 'World English Bible' : 
                    'American Standard Version'}
                  </Text>
                </View>
                {version === v && <Ionicons name="checkmark-circle" size={22} color={colors.primary} />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, gap: 8, borderBottomWidth: 1 },
  ctrlBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 7 },
  ctrlBtnSm: { flexDirection: 'row', alignItems: 'center', gap: 4, borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 7 },
  ctrlText: { fontSize: 13, fontWeight: '600' },
  fontRow: { flexDirection: 'row', gap: 4 },
  fontBtn: { borderWidth: 1, borderRadius: 6, paddingHorizontal: 7, paddingVertical: 4 },
  chapterHeader: { alignItems: 'center', marginBottom: 24 },
  chapterTitle: { fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  chapterNum: { fontSize: 14, fontWeight: '600', marginTop: 2 },
  verseRow: { flexDirection: 'row', marginBottom: 14, gap: 8 },
  verseNum: { fontSize: 13, fontWeight: '800', minWidth: 24, paddingTop: 2 },
  verseText: { flex: 1, lineHeight: 28, fontFamily: 'serif' },
  verseActions: { flexDirection: 'row', borderWidth: 1, borderRadius: 10, marginBottom: 12, marginLeft: 32, overflow: 'hidden' },
  vAction: { flex: 1, alignItems: 'center', paddingVertical: 10, gap: 3 },
  vActionText: { fontSize: 11, fontWeight: '600' },
  noVerses: { alignItems: 'center', paddingTop: 40, gap: 12 },
  noVersesText: { textAlign: 'center', fontSize: 14, lineHeight: 22 },
  suggRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  suggChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  suggText: { fontWeight: '700', fontSize: 13 },
  chapterNav: { flexDirection: 'row', marginTop: 24, gap: 12 },
  navBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, borderWidth: 1 },
  navText: { fontSize: 14, fontWeight: '600' },
  bkTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  bkRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  bkRef: { fontSize: 13, fontWeight: '700', marginBottom: 3 },
  bkText: { fontSize: 13, lineHeight: 18 },
  modal: { flex: 1, paddingTop: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 14, marginBottom: 4, marginTop: 24 },
  modalTitle: { fontSize: 18, fontWeight: '800' },
  modalSearch: { marginHorizontal: 16, marginBottom: 12, borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, fontSize: 15 },
  bookItem: { paddingVertical: 12, paddingHorizontal: 14, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  bookItemText: { fontSize: 14, fontWeight: '600' },
  chapItem: { flex: 1, aspectRatio: 1, borderRadius: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  chapItemText: { fontSize: 15, fontWeight: '700' },
  overlay: { flex: 1, justifyContent: 'flex-end' },
  versionSheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, borderWidth: 1, borderBottomWidth: 0 },
  versionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1 },
  versionName: { fontSize: 16, fontWeight: '700' },
  versionFull: { fontSize: 13, marginTop: 2 },
});
