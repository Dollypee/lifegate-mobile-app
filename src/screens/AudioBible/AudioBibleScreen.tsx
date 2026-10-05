import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Modal, FlatList, TextInput,
  Animated, Easing, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
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

const VERSION_FULL: Record<Version, string> = {
  KJV: 'King James Version',
  // WEB: 'World English Bible',
  ASV: 'American Standard Version',
};

const SPEEDS = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

interface RouteParams { book?: string; chapter?: number; verse?: number; version?: Version; }
interface Props { navigation: any; route?: { params?: RouteParams } }

export const AudioBibleScreen: React.FC<Props> = ({ navigation, route }) => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const [version, setVersion] = useState<Version>(route?.params?.version || 'KJV');
  const [book, setBook] = useState(route?.params?.book || 'Genesis');
  const [chapter, setChapter] = useState(route?.params?.chapter || 1);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(route?.params?.verse || null);
  const [repeatCount, setRepeatCount] = useState(2);
  const [speed, setSpeed] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRepeat, setCurrentRepeat] = useState(0);
  const [currentVerse, setCurrentVerse] = useState<number | null>(null);
  const [showBooks, setShowBooks] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const [searchBook, setSearchBook] = useState('');
  const [playMode, setPlayMode] = useState<'single' | 'chapter'>('single');
  const [chapterVerseIdx, setChapterVerseIdx] = useState(0);
  const [chapterRepeat, setChapterRepeat] = useState(0);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;
  const stopRef = useRef(false);
  const spinRef = useRef<Animated.CompositeAnimation | null>(null);

  const verses = VERSION_DATA[version]?.[book]?.[chapter] || {};
  const verseNumbers = Object.keys(verses).map(Number).sort((a, b) => a - b);
  const chapterCount = CHAPTER_COUNT[book] || 1;
  const filteredBooks = BIBLE_BOOKS.filter(b => b.toLowerCase().includes(searchBook.toLowerCase()));

  const speakText = useCallback((text: string): Promise<void> => {
    return new Promise((resolve) => {
      Speech.speak(text, {
        rate: speed,
        language: 'en-US',
        onDone: resolve,
        onError: () => resolve(),
        onStopped: () => resolve(),
      });
    });
  }, [speed]);

  const startPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.12, duration: 700, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
      ])
    ).start();
    spinRef.current = Animated.loop(
      Animated.timing(spinAnim, { toValue: 1, duration: 4000, useNativeDriver: true, easing: Easing.linear })
    );
    spinRef.current.start();
  };

  const stopAnimations = () => {
    pulseAnim.stopAnimation();
    pulseAnim.setValue(1);
    spinAnim.stopAnimation();
    spinRef.current?.stop();
  };

  const stopPlayback = useCallback(() => {
    stopRef.current = true;
    Speech.stop();
    setIsPlaying(false);
    setCurrentRepeat(0);
    setCurrentVerse(null);
    setChapterVerseIdx(0);
    setChapterRepeat(0);
    stopAnimations();
  }, []);

  useEffect(() => { return () => { Speech.stop(); }; }, []);

  const playSingleVerse = useCallback(async (verseNum: number) => {
    const text = verses[verseNum];
    if (!text) return;
    stopRef.current = false;
    setIsPlaying(true);
    setCurrentVerse(verseNum);
    startPulse();

    for (let i = 1; i <= repeatCount; i++) {
      if (stopRef.current) break;
      setCurrentRepeat(i);
      const intro = i === 1
        ? `${book}, Chapter ${chapter}, Verse ${verseNum}. `
        : `Repeat ${i}. `;
      await speakText(intro + text);
      if (stopRef.current) break;
      if (i < repeatCount) await new Promise(r => setTimeout(r, 500));
    }

    if (!stopRef.current) {
      setIsPlaying(false);
      setCurrentRepeat(0);
      setCurrentVerse(null);
      stopAnimations();
    }
  }, [verses, repeatCount, book, chapter, speakText]);

  const playChapter = useCallback(async () => {
    if (verseNumbers.length === 0) return;
    stopRef.current = false;
    setIsPlaying(true);
    startPulse();

    await speakText(`${book}, Chapter ${chapter}. ${VERSION_FULL[version]}.`);

    for (let vi = 0; vi < verseNumbers.length; vi++) {
      if (stopRef.current) break;
      const vn = verseNumbers[vi];
      setCurrentVerse(vn);
      setChapterVerseIdx(vi);
      for (let rep = 1; rep <= repeatCount; rep++) {
        if (stopRef.current) break;
        setChapterRepeat(rep);
        const intro = rep === 1 ? `Verse ${vn}. ` : `Repeat ${rep}. `;
        await speakText(intro + verses[vn]);
        if (stopRef.current) break;
        if (rep < repeatCount) await new Promise(r => setTimeout(r, 400));
      }
      if (!stopRef.current && vi < verseNumbers.length - 1) await new Promise(r => setTimeout(r, 700));
    }

    if (!stopRef.current) {
      setIsPlaying(false);
      setCurrentRepeat(0);
      setCurrentVerse(null);
      stopAnimations();
    }
  }, [verseNumbers, verses, repeatCount, book, chapter, version, speakText]);

  const handlePlay = () => {
    if (isPlaying) { stopPlayback(); return; }
    if (playMode === 'chapter') { playChapter(); return; }
    if (selectedVerse && verses[selectedVerse]) { playSingleVerse(selectedVerse); return; }
    if (verseNumbers.length > 0) { setSelectedVerse(verseNumbers[0]); playSingleVerse(verseNumbers[0]); }
  };

  const spin = spinAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  const RepeatSlider = () => (
    <View style={styles.sliderWrap}>
      <Text style={[styles.sliderLabel, { color: colors.textSecondary }]}>Repeat Count</Text>
      <View style={styles.repeatRow}>
        {[1, 2, 3, 5, 7, 10, 15, 20].map(n => (
          <TouchableOpacity
            key={n}
            onPress={() => setRepeatCount(n)}
            style={[styles.repeatChip, {
              backgroundColor: repeatCount === n ? colors.primary : colors.inputBg,
              borderColor: repeatCount === n ? colors.primary : colors.border,
            }]}
          >
            <Text style={[styles.repeatChipText, { color: repeatCount === n ? '#fff' : colors.textSecondary }]}>{n}×</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const SpeedSelector = () => (
    <View style={styles.sliderWrap}>
      <Text style={[styles.sliderLabel, { color: colors.textSecondary }]}>Playback Speed</Text>
      <View style={styles.speedRow}>
        {SPEEDS.map(s => (
          <TouchableOpacity
            key={s}
            onPress={() => setSpeed(s)}
            style={[styles.speedChip, {
              backgroundColor: speed === s ? colors.primary : colors.inputBg,
              borderColor: speed === s ? colors.primary : colors.border,
            }]}
          >
            <Text style={[styles.speedChipText, { color: speed === s ? '#fff' : colors.textSecondary }]}>{s}x</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Hero */}
        <LinearGradient
          colors={isDark ? ['#2A0800', '#0F0D0B'] : ['#8B1A00', '#C8400A', '#E86020']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={[styles.hero, { paddingTop: insets.top + 16 }]}
        >
          <View style={styles.heroNav}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={22} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.heroTitle}>Audio Bible</Text>
            <TouchableOpacity onPress={() => setShowVersions(true)} style={[styles.versionPill, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
              <Text style={styles.versionPillText}>{version}</Text>
              <Ionicons name="chevron-down" size={12} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Animated orb */}
          <View style={styles.orbContainer}>
            <Animated.View style={[styles.orbOuter, { transform: [{ scale: pulseAnim }], borderColor: 'rgba(255,255,255,0.15)' }]}>
              <Animated.View style={[styles.orbInner, { transform: [{ rotate: spin }], borderColor: 'rgba(255,255,255,0.3)' }]}>
                <View style={[styles.orbCore, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
                  <Ionicons name={isPlaying ? 'volume-high' : 'headset'} size={44} color="#fff" />
                </View>
              </Animated.View>
            </Animated.View>
            {isPlaying && (
              <View style={styles.waveRow}>
                {[3, 6, 9, 5, 8, 4, 7, 10, 6, 5, 9, 4].map((h, i) => (
                  <Animated.View
                    key={i}
                    style={[styles.wave, {
                      height: h * (isPlaying ? 4 : 2),
                      backgroundColor: 'rgba(255,255,255,0.6)',
                      opacity: pulseAnim,
                    }]}
                  />
                ))}
              </View>
            )}
          </View>

          {/* Location */}
          <View style={styles.locationRow}>
            <TouchableOpacity onPress={() => setShowBooks(true)} style={styles.locBtn}>
              <Text style={styles.locBook}>{book}</Text>
              <Ionicons name="chevron-down" size={14} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
            <Text style={styles.locDot}>·</Text>
            <TouchableOpacity onPress={() => setShowChapters(true)} style={styles.locBtn}>
              <Text style={styles.locChap}>Ch {chapter}</Text>
              <Ionicons name="chevron-down" size={14} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          </View>
          <Text style={styles.locVersion}>{VERSION_FULL[version]}</Text>

          {/* Status */}
          {isPlaying && (
            <View style={styles.statusBanner}>
              <Text style={styles.statusText}>
                {playMode === 'chapter'
                  ? `Verse ${currentVerse} · Repeat ${chapterRepeat}/${repeatCount} · (${chapterVerseIdx + 1}/${verseNumbers.length})`
                  : `Verse ${currentVerse} · Repeat ${currentRepeat}/${repeatCount}`}
              </Text>
            </View>
          )}
        </LinearGradient>

        {/* Selector Cards */}
        <View style={{ paddingHorizontal: 16, paddingTop: 16, gap: 12 }}>

          {/* Play Mode Toggle */}
          <Card elevated>
            <Text style={[styles.cardLabel, { color: colors.text }]}>Play Mode</Text>
            <View style={styles.modeRow}>
              {(['single', 'chapter'] as const).map(m => (
                <TouchableOpacity
                  key={m}
                  onPress={() => setPlayMode(m)}
                  style={[styles.modeBtn, {
                    backgroundColor: playMode === m ? colors.primary : colors.inputBg,
                    borderColor: playMode === m ? colors.primary : colors.border,
                    flex: 1,
                  }]}
                >
                  <Ionicons
                    name={m === 'single' ? 'musical-note' : 'list'}
                    size={18}
                    color={playMode === m ? '#fff' : colors.textMuted}
                  />
                  <Text style={[styles.modeBtnText, { color: playMode === m ? '#fff' : colors.textSecondary }]}>
                    {m === 'single' ? 'Single Verse' : 'Full Chapter'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          {/* Verse Selector (single mode) */}
          {playMode === 'single' && verseNumbers.length > 0 && (
            <Card elevated>
              <Text style={[styles.cardLabel, { color: colors.text }]}>Select Verse</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                {verseNumbers.map(v => (
                  <TouchableOpacity
                    key={v}
                    onPress={() => setSelectedVerse(v)}
                    style={[styles.verseChip, {
                      backgroundColor: selectedVerse === v ? colors.primary : colors.inputBg,
                      borderColor: selectedVerse === v ? colors.primary : colors.border,
                    }]}
                  >
                    <Text style={[styles.verseChipText, { color: selectedVerse === v ? '#fff' : colors.text }]}>{v}</Text>
                    {currentVerse === v && isPlaying && (
                      <View style={[styles.activeDot, { backgroundColor: '#fff' }]} />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
              {selectedVerse && verses[selectedVerse] && (
                <View style={[styles.versePreview, { backgroundColor: colors.inputBg, borderColor: colors.border }]}>
                  <Text style={[styles.versePreviewNum, { color: colors.primary }]}>v{selectedVerse}</Text>
                  <Text style={[styles.versePreviewText, { color: colors.textSecondary }]} numberOfLines={3}>{verses[selectedVerse]}</Text>
                </View>
              )}
            </Card>
          )}

          {/* Repeat Count */}
          <Card elevated>
            <RepeatSlider />
          </Card>

          {/* Speed */}
          <Card elevated>
            <SpeedSelector />
          </Card>

          {/* Custom repeat input */}
          <Card elevated>
            <Text style={[styles.cardLabel, { color: colors.text }]}>Custom Repeat Count</Text>
            <View style={styles.customRow}>
              <TouchableOpacity
                onPress={() => setRepeatCount(r => Math.max(1, r - 1))}
                style={[styles.customBtn, { backgroundColor: colors.inputBg, borderColor: colors.border }]}
              >
                <Ionicons name="remove" size={22} color={colors.text} />
              </TouchableOpacity>
              <View style={[styles.customCount, { backgroundColor: colors.primary + '18', borderColor: colors.primary + '44' }]}>
                <Text style={[styles.customCountText, { color: colors.primary }]}>{repeatCount}</Text>
                <Text style={[styles.customCountSub, { color: colors.primary }]}>times</Text>
              </View>
              <TouchableOpacity
                onPress={() => setRepeatCount(r => Math.min(50, r + 1))}
                style={[styles.customBtn, { backgroundColor: colors.inputBg, borderColor: colors.border }]}
              >
                <Ionicons name="add" size={22} color={colors.text} />
              </TouchableOpacity>
            </View>
          </Card>

          {/* Play / Stop Button */}
          <TouchableOpacity
            onPress={handlePlay}
            style={[styles.playBtn, { backgroundColor: isPlaying ? '#EF4444' : colors.primary }]}
            disabled={verseNumbers.length === 0 && !isPlaying}
          >
            <Ionicons name={isPlaying ? 'stop-circle' : 'play-circle'} size={28} color="#fff" />
            <View>
              <Text style={styles.playBtnText}>
                {isPlaying ? 'Stop Playback' : playMode === 'chapter' ? `Play Chapter ${chapter}` : `Play Verse ${selectedVerse || verseNumbers[0] || '—'}`}
              </Text>
              {!isPlaying && (
                <Text style={styles.playBtnSub}>
                  {repeatCount}× repeat · {speed}x speed
                </Text>
              )}
            </View>
          </TouchableOpacity>

          {/* Verses Preview */}
          {verseNumbers.length > 0 && (
            <Card elevated>
              <Text style={[styles.cardLabel, { color: colors.text }]}>Chapter Preview</Text>
              {verseNumbers.slice(0, 6).map(v => (
                <TouchableOpacity
                  key={v}
                  onPress={() => { setSelectedVerse(v); setPlayMode('single'); }}
                  style={[
                    styles.prevRow,
                    currentVerse === v && isPlaying && { backgroundColor: colors.primary + '18', borderRadius: 8, paddingHorizontal: 6 }
                  ]}
                >
                  <Text style={[styles.prevNum, { color: colors.primary }]}>{v}</Text>
                  <Text style={[styles.prevText, { color: colors.textSecondary }]} numberOfLines={2}>{verses[v]}</Text>
                  {currentVerse === v && isPlaying && (
                    <View style={[styles.playingPill, { backgroundColor: colors.primary }]}>
                      <Text style={styles.playingPillText}>▶</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
              {verseNumbers.length > 6 && (
                <Text style={[styles.moreText, { color: colors.textMuted }]}>+ {verseNumbers.length - 6} more verses</Text>
              )}
            </Card>
          )}

          {verseNumbers.length === 0 && (
            <Card elevated style={{ alignItems: 'center', paddingVertical: 24 }}>
              <Ionicons name="book-outline" size={36} color={colors.textMuted} />
              <Text style={[styles.noData, { color: colors.textMuted }]}>No verses bundled for {book} Ch.{chapter}</Text>
              <Text style={[styles.noDataSub, { color: colors.textMuted }]}>Try: John 3, Psalms 23, Philippians 4</Text>
              <View style={styles.suggRow}>
                {[['John', 3], ['Psalms', 23], ['Proverbs', 3]].map(([b, c]) => (
                  <TouchableOpacity
                    key={`${b}${c}`}
                    onPress={() => { setBook(b as string); setChapter(c as number); setSelectedVerse(null); }}
                    style={[styles.suggChip, { backgroundColor: colors.primary + '18', borderColor: colors.primary + '33' }]}
                  >
                    <Text style={[{ color: colors.primary, fontWeight: '700', fontSize: 13 }]}>{b} {c}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card>
          )}
        </View>
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
            placeholder="Search..." placeholderTextColor={colors.textMuted}
            value={searchBook} onChangeText={setSearchBook}
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
                onPress={() => { setBook(item); setChapter(1); setSelectedVerse(null); setShowBooks(false); setSearchBook(''); }}
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
            <Text style={[styles.modalTitle, { color: colors.text }]}>{book} — Select Chapter</Text>
            <TouchableOpacity onPress={() => setShowChapters(false)}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={Array.from({ length: chapterCount }, (_, i) => i + 1)}
            keyExtractor={item => String(item)}
            numColumns={6}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, gap: 8 }}
            columnWrapperStyle={{ gap: 8, justifyContent: 'flex-start' }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.chapItem, { backgroundColor: chapter === item ? colors.primary : colors.inputBg, borderColor: chapter === item ? colors.primary : colors.border }]}
                onPress={() => { setChapter(item); setSelectedVerse(null); setShowChapters(false); }}
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
            <Text style={[styles.modalTitle, { color: colors.text, marginBottom: 12 }]}>Select Bible Version</Text>
            {VERSIONS.map(v => (
              <TouchableOpacity
                key={v}
                style={[styles.versionRow, { borderBottomColor: colors.border }]}
                onPress={() => { setVersion(v); setShowVersions(false); }}
              >
                <View>
                  <Text style={[styles.versionName, { color: colors.text }]}>{v}</Text>
                  <Text style={[styles.versionFull, { color: colors.textMuted }]}>{VERSION_FULL[v]}</Text>
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
  hero: { paddingHorizontal: 20, paddingBottom: 28 },
  heroNav: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  heroTitle: { flex: 1, color: '#fff', fontSize: 20, fontWeight: '800' },
  versionPill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  versionPillText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  orbContainer: { alignItems: 'center', marginVertical: 16 },
  orbOuter: { width: 160, height: 160, borderRadius: 80, borderWidth: 2, justifyContent: 'center', alignItems: 'center' },
  orbInner: { width: 130, height: 130, borderRadius: 65, borderWidth: 2, borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center' },
  orbCore: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center' },
  waveRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 3, marginTop: 12, height: 40 },
  wave: { width: 4, borderRadius: 2 },
  locationRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12 },
  locBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locBook: { color: '#fff', fontSize: 22, fontWeight: '900' },
  locChap: { color: 'rgba(255,255,255,0.85)', fontSize: 18, fontWeight: '700' },
  locDot: { color: 'rgba(255,255,255,0.5)', fontSize: 20 },
  locVersion: { textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 4 },
  statusBanner: { marginTop: 14, backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: 10, paddingVertical: 8, paddingHorizontal: 14, alignItems: 'center' },
  statusText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  cardLabel: { fontSize: 15, fontWeight: '700', marginBottom: 12 },
  modeRow: { flexDirection: 'row', gap: 10 },
  modeBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 11, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1 },
  modeBtnText: { fontWeight: '700', fontSize: 14 },
  sliderWrap: {},
  sliderLabel: { fontSize: 14, fontWeight: '600', marginBottom: 10 },
  repeatRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  repeatChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  repeatChipText: { fontWeight: '700', fontSize: 14 },
  speedRow: { flexDirection: 'row', gap: 8 },
  speedChip: { flex: 1, paddingVertical: 8, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  speedChipText: { fontWeight: '700', fontSize: 13 },
  customRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 },
  customBtn: { width: 48, height: 48, borderRadius: 24, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  customCount: { alignItems: 'center', paddingHorizontal: 28, paddingVertical: 10, borderRadius: 14, borderWidth: 1 },
  customCountText: { fontSize: 36, fontWeight: '900', lineHeight: 40 },
  customCountSub: { fontSize: 12, fontWeight: '600' },
  playBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, paddingVertical: 18, borderRadius: 16, marginHorizontal: 0 },
  playBtnText: { color: '#fff', fontSize: 17, fontWeight: '800' },
  playBtnSub: { color: 'rgba(255,255,255,0.75)', fontSize: 12, textAlign: 'center', marginTop: 2 },
  verseChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, borderWidth: 1, alignItems: 'center', minWidth: 48 },
  verseChipText: { fontWeight: '700', fontSize: 14 },
  activeDot: { width: 6, height: 6, borderRadius: 3, marginTop: 4 },
  versePreview: { marginTop: 12, padding: 12, borderRadius: 10, borderWidth: 1, flexDirection: 'row', gap: 8 },
  versePreviewNum: { fontWeight: '800', fontSize: 13, minWidth: 20 },
  versePreviewText: { flex: 1, fontSize: 13, lineHeight: 20 },
  prevRow: { flexDirection: 'row', gap: 8, paddingVertical: 8, alignItems: 'flex-start' },
  prevNum: { fontWeight: '800', fontSize: 12, minWidth: 20, paddingTop: 2 },
  prevText: { flex: 1, fontSize: 13, lineHeight: 18 },
  playingPill: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  playingPillText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  moreText: { fontSize: 12, textAlign: 'center', marginTop: 8 },
  noData: { fontSize: 15, fontWeight: '600', textAlign: 'center', marginTop: 10 },
  noDataSub: { fontSize: 13, textAlign: 'center', marginTop: 4 },
  suggRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  suggChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  modal: { flex: 1, paddingTop: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 14, marginTop: 24 },
  modalTitle: { fontSize: 18, fontWeight: '800' },
  modalSearch: { marginHorizontal: 16, marginBottom: 12, borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, fontSize: 15 },
  bookItem: { paddingVertical: 12, paddingHorizontal: 14, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  bookItemText: { fontSize: 14, fontWeight: '600' },
  chapItem: { width: 56, height: 56, borderRadius: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  chapItemText: { fontSize: 15, fontWeight: '700' },
  overlay: { flex: 1, justifyContent: 'flex-end' },
  versionSheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, borderWidth: 1, borderBottomWidth: 0 },
  versionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1 },
  versionName: { fontSize: 16, fontWeight: '700' },
  versionFull: { fontSize: 13, marginTop: 2 },
});
